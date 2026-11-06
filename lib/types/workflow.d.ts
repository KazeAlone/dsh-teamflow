import type { TeamState, TeamTask } from './types.ts';
import type { WorkflowOperation, WorkflowProposal, WorkflowState } from './workflow-types.ts';
export declare function workflowState(team: TeamState): WorkflowState;
export declare function workflowFingerprint(team: TeamState): string;
/** Strip unknown fields and validate every browser/model-supplied operation. */
export declare function parseWorkflowOperations(value: unknown): WorkflowOperation[];
export declare function validateWorkflowGraph(team: TeamState): void;
export declare function checkpointReady(team: TeamState, task: TeamTask): boolean;
/** All transitive upstream results, in dependency order. */
export declare function checkpointInputs(team: TeamState, task: TeamTask): TeamTask[];
/** Apply to a detached copy: validation errors never partly modify durable state. */
export declare function applyWorkflowOperations(original: TeamState, operations: WorkflowOperation[], maxMembers?: number): TeamState;
export declare function proposeWorkflow(team: TeamState, title: string, raw: unknown, maxMembers?: number): WorkflowProposal;
export declare function applyWorkflowProposal(team: TeamState, proposal: WorkflowProposal, maxMembers?: number): TeamState;
/** Only the authenticated human route calls this; no model tool can decide a gate. */
export declare function decideCheckpoint(team: TeamState, id: string, decision: 'approve' | 'reject', evidence: string, current: string, note: string, materials?: string): void;
