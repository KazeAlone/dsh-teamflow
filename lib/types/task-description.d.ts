/** Single execution descriptions and explicit configuration holds. */
export declare function taskNeedsConfiguration(task: {
    workflowConfigPending?: boolean;
    adaptationIssue?: string;
}): boolean;
export declare function taskText(task: {
    description?: string;
}): string;
/** Model-authored tasks need a complete, single execution description. */
export declare function requireTaskDescriptions(operations: import('./workflow-types.ts').WorkflowOperation[]): void;
