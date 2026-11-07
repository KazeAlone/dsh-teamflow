/** Version-tolerant navigation into durable AgentTeams member transcripts. */
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { SubagentAddress } from '@deepseek-ai/dsh-subagent/client';
/** Narrow sessions-service face used by the activity panel and team card. */
export interface AgentTeamsSessionNavigator {
    /** Legacy/ordinary session navigation. */
    open?(id: SessionId): void;
    /** rc.8 addressed subagent navigation. */
    openSubagent?(address: SubagentAddress): void;
    /** Refresh the exact parent's durable direct-child catalog. */
    refreshSubagents?(parentSessionId: SessionId): Promise<void>;
    /** Reuse an address already retained by the client runtime when available. */
    subagentAddress?(id: SessionId): SubagentAddress | undefined;
}
/** Newer sessions retain view ownership instead of publishing list.current. */
export declare function currentSessionId(state: {
    readonly current?: SessionId;
    readonly byId: Readonly<Record<string, {
        readonly id: SessionId;
        readonly retainedBy?: Readonly<Record<string, number>>;
    }>>;
}): SessionId | undefined;
export interface AgentTeamsWorkspaceNavigator {
    openSession(target: SessionId | SubagentAddress): void;
}
/** Main-panel navigation added in Harness 0.1.5; older layouts omit these actions. */
export interface AgentTeamsLayoutNavigator {
    selectPanel?(panelId: null): void;
    beginNavigation?(): AbortSignal;
}
/** Independent workflow discussions are ordinary sessions, never captain subagents. */
export declare function openWorkflowConversation(openMember: (parentId: SessionId, childId: SessionId) => void | Promise<void>, sessionId: SessionId): void | Promise<void>;
export declare function openAgentTeamMember(sessions: AgentTeamsSessionNavigator, parentSessionId: SessionId, childSessionId: SessionId, layout?: AgentTeamsLayoutNavigator, workspace?: AgentTeamsWorkspaceNavigator): Promise<'subagent' | 'session' | 'cancelled'>;
/** Blank sessions suppress the host's normal header actions. */
export declare function blankTeamflowSession(state: Parameters<typeof currentSessionId>[0] & {
    readonly byId: Readonly<Record<string, {
        readonly id: SessionId;
        readonly blank?: boolean;
        readonly retainedBy?: Readonly<Record<string, number>>;
    }>>;
}, conversationVisible: boolean): SessionId | undefined;
