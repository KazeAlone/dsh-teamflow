import { currentSessionId } from "./session-navigation.js";
export function selectedWorkflowWorkspace(workspaces, sessions) {
    const current = currentSessionId(sessions);
    // The host may retain an automatic blank session before a project is chosen.
    return current && sessions.byId[current]?.blank !== true ? workspaces.find(workspace => workspace.sessionIds.includes(current)) : undefined;
}
export async function workflowLauncherRequest(action, fields = {}) {
    const response = await fetch('/plugins/dsh-agent-teams/workflow', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, ...fields }) });
    const result = await response.json();
    if (!response.ok)
        throw new Error(result.error ?? 'HTTP ' + response.status);
    return result;
}
/** Owns one fresh conversation across retries, and releases it with the panel. */
export class WorkflowLaunchController {
    sessions;
    request;
    attempt;
    disposed = false;
    busy = false;
    constructor(sessions, request = workflowLauncherRequest) {
        this.sessions = sessions;
        this.request = request;
    }
    release() { this.attempt?.reference.release(); this.attempt = undefined; }
    dispose() { this.disposed = true; this.release(); }
    async launch(input, workspace, signal) {
        if (this.busy)
            throw new Error('流程正在创建，请稍候');
        this.busy = true;
        const check = () => { signal.throwIfAborted(); if (this.disposed)
            throw new Error('Workflow entry closed'); };
        try {
            check();
            const key = JSON.stringify([workspace.workspaceId, input.template.id, input.template.version, input.name, input.goal, input.language]);
            if (this.attempt?.key !== key) {
                this.release();
                const sessionId = await this.sessions.create({ workspaceId: workspace.workspaceId });
                check();
                this.attempt = { key, reference: this.sessions.retain(sessionId, { source: 'teamflowLauncher', signal }) };
            }
            const reference = this.attempt.reference;
            await reference.ready;
            check();
            const same = (team) => team && team.workflow?.templateSource?.id === input.template.id && team.workflow.templateSource.version === input.template.version && team.name === input.name.trim() && team.description === input.goal.trim();
            let team = (await this.request('state', { sessionId: reference.sessionId })).team;
            check();
            if (team && !same(team))
                throw new Error('新对话已有其他流程，请返回模板库后重试');
            if (!team) {
                try {
                    team = (await this.request('template_apply', { sessionId: reference.sessionId, templateId: input.template.id, version: input.template.version, name: input.name, description: input.goal, language: input.language })).team;
                }
                catch (error) {
                    // A lost HTTP response must not create a second workflow on retry.
                    check();
                    const recovered = (await this.request('state', { sessionId: reference.sessionId }).catch(() => ({}))).team;
                    if (!same(recovered))
                        throw error;
                    team = recovered;
                }
            }
            check();
            if (!team)
                throw new Error('未能创建流程，请查看页面错误或刷新重试');
            return { sessionId: reference.sessionId, team };
        }
        finally {
            this.busy = false;
        }
    }
}
