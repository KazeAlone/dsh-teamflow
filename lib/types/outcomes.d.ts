/** Deterministic presentation contracts; no model calls or inferred file paths. */
import type { TeamTask } from './types.ts';
export type OutcomeFile = {
    path: string;
    declared: boolean;
    changed: boolean;
};
export declare function outcomeFiles(task: TeamTask): OutcomeFile[];
export interface OutcomePreview {
    path: string;
    status: 'ready' | 'missing' | 'blocked' | 'unsupported' | 'too_large' | 'unreadable';
    kind?: 'text' | 'markdown' | 'csv' | 'image';
    text?: string;
    dataUrl?: string;
    size?: number;
    modifiedAt?: number;
    sha256?: string;
}
/** RFC-style quoted fields, including embedded delimiters/newlines; bounded display only. */
export declare function outcomeCsv(text: string, maxRows?: number, maxColumns?: number): {
    rows: string[][];
    truncated: boolean;
};
