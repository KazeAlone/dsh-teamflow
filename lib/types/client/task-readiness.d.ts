import { type WorkflowText } from './workflow-text.ts';
import type { TeamState, TeamTask } from '../types.ts';
export type ReadinessAction = 'review' | 'edit' | 'rerun' | 'continue' | 'stop' | 'member' | 'path';
export type ExecutionState = 'active' | 'interrupted' | 'stopping' | 'unknown';
export interface TaskReadiness {
    label: string;
    detail: string;
    dependencies: string[];
    action?: ReadinessAction;
}
/** Explain saved execution state without claiming to know live host availability. */
export declare function taskReadiness(team: TeamState, task: TeamTask, l?: WorkflowText, execution?: ExecutionState): TaskReadiness;
