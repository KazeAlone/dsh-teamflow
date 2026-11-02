/** Portable task contracts shared by the browser, persistence and execution. */
export interface TaskBrief {
    requirements: string;
    deliverables: string;
    acceptance: string;
}
export interface TaskLayers {
    general: TaskBrief;
    specific: TaskBrief;
}
export declare function taskNeedsConfiguration(task: {
    workflowConfigPending?: boolean;
    adaptationIssue?: string;
    layers?: TaskLayers;
    specificContractVersion?: number;
}): boolean;
export declare const emptyBrief: () => TaskBrief;
export declare function isTaskBrief(value: unknown): value is TaskBrief;
export declare function isTaskLayers(value: unknown): value is TaskLayers;
export declare function parseBrief(value: unknown, path?: string): TaskBrief;
export declare function parseLayers(value: unknown, path?: string): TaskLayers;
export declare function briefText(value: TaskBrief): string;
export declare function taskText(task: {
    description?: string;
    layers?: TaskLayers;
}): string;
export declare function layersFromDraft(draft: Record<string, string>): TaskLayers;
/** New model-authored nodes must contain a reusable and an instance contract. */
export declare function requireGeneratedTaskLayers(operations: import('./workflow-types.ts').WorkflowOperation[]): void;
export declare const taskLayersParameter: {
    readonly type: "object";
    readonly description: "Pass a JSON object directly, never a JSON-encoded string, array, null or empty string. general and specific are objects; their requirements, deliverables and acceptance fields are strings. Generate both layers when creating tasks: general is the reusable method and quality constraints; specific is the COMPLETE standalone execution contract, concretizing every general method, deliverable and acceptance constraint for the current goal, paths and parameters. Executors see only specific, never general; do not refer back to general. Do not duplicate layers in description. Omit layers entirely when making an unrelated edit.";
    readonly additionalProperties: false;
    readonly properties: {
        readonly general: {
            readonly required: true;
            readonly type: "object";
            readonly additionalProperties: false;
            readonly properties: {
                readonly requirements: {
                    readonly type: "string";
                    readonly required: true;
                };
                readonly deliverables: {
                    readonly type: "string";
                    readonly required: true;
                    readonly description: "Plain text, not an array. Separate multiple deliverables with newlines.";
                };
                readonly acceptance: {
                    readonly type: "string";
                    readonly required: true;
                    readonly description: "Plain text, not an array. Separate multiple acceptance criteria with newlines.";
                };
            };
        };
        readonly specific: {
            readonly required: true;
            readonly type: "object";
            readonly additionalProperties: false;
            readonly properties: {
                readonly requirements: {
                    readonly type: "string";
                    readonly required: true;
                };
                readonly deliverables: {
                    readonly type: "string";
                    readonly required: true;
                    readonly description: "Plain text, not an array. Separate multiple deliverables with newlines.";
                };
                readonly acceptance: {
                    readonly type: "string";
                    readonly required: true;
                    readonly description: "Plain text, not an array. Separate multiple acceptance criteria with newlines.";
                };
            };
        };
    };
};
