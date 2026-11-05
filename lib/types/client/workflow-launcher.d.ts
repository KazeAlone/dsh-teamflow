/** Session and workspace boundaries for the global Workflow entry. */
import type { ISessions, SessionReference } from '@deepseek-ai/dsh-api-session-controller/client';
import type { WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client';
import type { TeamState } from '../types.ts';
import type { TemplateVersion } from '../templates.ts';
import { currentSessionId } from './session-navigation.ts';
declare module '@deepseek-ai/dsh-api-session-controller/client' {
    interface SessionReferenceSourceMap {
        teamflowLauncher: unknown;
    }
}
export interface WorkflowApplication {
    template: TemplateVersion;
    name: string;
    goal: string;
    language: string;
}
export type WorkflowRequest = (action: string, fields?: Record<string, unknown>) => Promise<{
    team?: TeamState;
}>;
export declare function selectedWorkflowWorkspace(workspaces: readonly WorkspaceView[], sessions: Parameters<typeof currentSessionId>[0] & {
    readonly byId: Readonly<Record<string, {
        readonly id: SessionReference['sessionId'];
        readonly blank?: boolean;
        readonly retainedBy?: Readonly<Record<string, number>>;
    }>>;
}): WorkspaceView | undefined;
export declare function workflowLauncherRequest(action: string, fields?: Record<string, unknown>): Promise<{
    team?: TeamState;
    directoryPicker?: 'native' | 'browse' | 'unavailable';
}>;
/** Owns one fresh conversation across retries, and releases it with the panel. */
export declare class WorkflowLaunchController {
    private sessions;
    private request;
    private attempt?;
    private disposed;
    private busy;
    constructor(sessions: Pick<ISessions, 'create' | 'retain'>, request?: WorkflowRequest);
    release(): void;
    dispose(): void;
    launch(input: WorkflowApplication, workspace: WorkspaceView, signal: AbortSignal): Promise<{
        sessionId: SessionReference['sessionId'];
        team: TeamState;
    }>;
}
