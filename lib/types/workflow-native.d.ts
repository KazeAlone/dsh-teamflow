/** Native Harness conversations, with proposal-only authority and durable scoping. */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
import type { ToolsConfig } from './tools.ts';
import type { TeamState } from './types.ts';
import type { WorkflowDiscussion } from './workflow-types.ts';
export declare function reviewOpening(team: TeamState, taskId: string): string;
export declare function taskDiscussionContext(team: TeamState, id: string): {
    task: import("./types.ts").TeamTask;
    upstream: import("./types.ts").TeamTask[];
    downstream: import("./types.ts").TeamTask[];
    owner: {
        name: string;
        summary: string | undefined;
        role: string | undefined;
        executionPrompt: string | undefined;
        specificPrompt: string | undefined;
        provider: string | undefined;
        model: string | undefined;
    } | undefined;
};
export declare function workflowDiscussion(team: TeamState, key: string): WorkflowDiscussion;
/** The reserved ID namespace fails closed if plugin state is missing. Native
 * session logs contain only host-supported records; identity lives in team.json. */
export declare function discussionAddress(agent: Agent, stateDir: string): {
    teamId: string;
    captainSessionId: string;
    label: string;
} | undefined;
export declare function boundDiscussion(team: TeamState, agent: Agent): WorkflowDiscussion | undefined;
export declare function installWorkflowConversations(ctx: Context, config: ToolsConfig, materials: (team: TeamState, taskId: string, workspace: string) => {
    text: string;
    evidence: string;
}): {
    readEmbedded(team: TeamState, key: string): Promise<{
        messages: {
            id: string;
            role: string;
            text: string;
        }[];
        busy: boolean;
    }>;
    sendEmbedded(team: TeamState, key: string, text: string): Promise<void>;
    open(captain: Agent, team: TeamState, key: string, root: string, options?: {
        fresh?: boolean;
        message?: string;
    }): Promise<string>;
};
