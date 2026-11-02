/** Read compatibility only. New tasks never write reusable or instance layers. */
import { type TaskBrief } from './template-brief.ts';
export interface TaskLayers {
    general: TaskBrief;
    specific: TaskBrief;
}
export declare function isTaskLayers(value: unknown): value is TaskLayers;
export declare function legacyDescription(value: {
    description?: unknown;
    layers?: unknown;
    specificContractVersion?: unknown;
}): string;
export declare function flattenLegacyTask(value: Record<string, unknown>): Record<string, unknown>;
