import { workflowRequest } from './workflow-request.ts'
/** Session and workspace boundaries for the global Workflow entry. */
import type { ISessions, SessionReference } from '@deepseek-ai/dsh-api-session-controller/client'
import type { WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { TeamState } from '../types.ts'
import type { TemplateVersion } from '../templates.ts'
import { currentSessionId } from './session-navigation.ts'

declare module '@deepseek-ai/dsh-api-session-controller/client' {
  interface SessionReferenceSourceMap { teamflowLauncher: unknown }
}
export interface WorkflowApplication { template: TemplateVersion; name: string; goal: string; language: string }
export type WorkflowRequest = (action: string, fields?: Record<string,unknown>) => Promise<{team?:TeamState}>
export function selectedWorkflowWorkspace(workspaces: readonly WorkspaceView[], sessions: Parameters<typeof currentSessionId>[0] & {readonly byId: Readonly<Record<string,{readonly id:SessionReference['sessionId'];readonly blank?:boolean;readonly retainedBy?:Readonly<Record<string,number>>}>>}): WorkspaceView | undefined {
  const current = currentSessionId(sessions)
  // The host may retain an automatic blank session before a project is chosen.
  return current && sessions.byId[current]?.blank !== true ? workspaces.find(workspace => workspace.sessionIds.includes(current)) : undefined
}
export async function workflowLauncherRequest(action: string, fields: Record<string,unknown> = {}): Promise<{team?:TeamState;directoryPicker?:'native'|'browse'|'unavailable'}> {
  return workflowRequest({action,...fields})
}
/** Owns one fresh conversation across retries, and releases it with the panel. */
export class WorkflowLaunchController {
  private attempt?: {key:string; reference:SessionReference}
  private disposed = false
  private busy = false
  constructor(private sessions: Pick<ISessions,'create'|'retain'>, private request: WorkflowRequest = workflowLauncherRequest) {}
  release(): void { this.attempt?.reference.release(); this.attempt=undefined }
  dispose(): void { this.disposed=true; this.release() }
  async launch(input: WorkflowApplication, workspace: WorkspaceView, signal: AbortSignal): Promise<{sessionId:SessionReference['sessionId'];team:TeamState}> {
    if (this.busy) throw new Error('流程正在创建，请稍候')
    this.busy=true
    const check = () => { signal.throwIfAborted(); if(this.disposed)throw new Error('Workflow entry closed') }
    try {
      check()
      const key=JSON.stringify([workspace.workspaceId,input.template.id,input.template.version,input.name,input.goal,input.language])
      if (this.attempt?.key !== key) {
        this.release()
        const sessionId=await this.sessions.create({workspaceId:workspace.workspaceId})
        check()
        this.attempt={key,reference:this.sessions.retain(sessionId,{source:'teamflowLauncher',signal})}
      }
      const reference=this.attempt!.reference
      await reference.ready; check()
      const same = (team:TeamState|undefined) => team && team.workflow?.templateSource?.id === input.template.id && team.workflow.templateSource.version === input.template.version && team.name === input.name.trim() && team.description === input.goal.trim()
      let team=(await this.request('state',{sessionId:reference.sessionId})).team
      check()
      if (team && !same(team)) throw new Error('新对话已有其他流程，请返回模板库后重试')
      if (!team) {
        try {
          team=(await this.request('template_apply',{sessionId:reference.sessionId,templateId:input.template.id,version:input.template.version,name:input.name,description:input.goal,language:input.language})).team
        } catch(error) {
          // A lost HTTP response must not create a second workflow on retry.
          check()
          const recovered=(await this.request('state',{sessionId:reference.sessionId}).catch(()=>({} as {team?:TeamState}))).team
          if(!same(recovered))throw error
          team=recovered
        }
      }
      check()
      if(!team)throw new Error('未能创建流程，请查看页面错误或刷新重试')
      return {sessionId:reference.sessionId,team}
    } finally { this.busy=false }
  }
}
