/** Reusable requirements stored only in template definitions. */
export interface TaskBrief {
    requirements: string;
    deliverables: string;
    acceptance: string;
}
export declare const emptyBrief: () => TaskBrief;
export declare function isTaskBrief(value: unknown): value is TaskBrief;
export declare function parseBrief(value: unknown, path?: string): TaskBrief;
export declare function briefText(value: TaskBrief): string;
