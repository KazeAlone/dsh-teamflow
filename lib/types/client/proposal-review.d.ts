import { type WorkflowText } from './workflow-text.ts';
/** Readable field comparisons and line diffs for human workflow approval. */
import type { TeamState } from '../types.ts';
import type { WorkflowOperation } from '../workflow-types.ts';
export type ReviewField = {
    key: string;
    label: string;
    before: string;
    after: string;
    array: boolean;
    editable: boolean;
};
export declare function reviewFields(team: TeamState, operation: WorkflowOperation, l?: WorkflowText): {
    title: string;
    fields: ReviewField[];
};
export declare function setReviewField(operation: WorkflowOperation, field: ReviewField, value: string): WorkflowOperation;
export declare function reviewedOperations(team: TeamState, operations: WorkflowOperation[], included: boolean[]): WorkflowOperation[];
export type DiffLine = {
    kind: 'same' | 'removed' | 'added';
    text: string;
};
export declare function lineDiff(before: string, after: string): DiffLine[];
/** Find unresolved issues in submission order without clearing or confirming them implicitly. */
export declare function proposalIssues(team: TeamState, operations: WorkflowOperation[], included: boolean[]): {
    index: number;
    issue: string;
    blocksApply: boolean;
}[];
/** Template approval must carry inherited issues because its server normalization defaults missing values to empty. */
export declare function adaptationReviewOperations(team: TeamState, operations: WorkflowOperation[]): WorkflowOperation[];
