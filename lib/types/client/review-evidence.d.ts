/** Read-only presentation of persisted review evidence. No inferred verdicts or fuzzy matches. */
import type { TeamTask } from '../types.ts';
export interface ReviewReport {
    criterion: string;
    status: 'passed' | 'failed';
    evidence?: string;
}
export interface ReviewResult {
    id: string;
    subject: string;
    output?: string;
    status?: string;
    attemptId?: string;
    acceptanceResults: ReviewReport[];
    commandsRun: {
        command: string;
        status: 'passed' | 'failed';
        evidence?: string;
        exitCode?: number;
    }[];
}
export interface ReviewMaterial {
    check: {
        id: string;
        subject: string;
        description: string;
        round: number;
        acceptance?: string[];
    };
    results: ReviewResult[];
    files: {
        path: string;
        present: boolean;
        unreadable?: boolean;
        sha256?: string;
        reason?: string;
    }[];
    gaps: {
        pattern: string;
        reason: string;
    }[];
    limitation: string;
}
export declare function parseReviewMaterial(raw?: string): ReviewMaterial | undefined;
export interface ReviewItem {
    id: string;
    title: string;
    source?: string;
    reports: (ReviewReport & {
        source?: string;
    })[];
    kind: 'requirement' | 'report';
}
/** Only explicit structured criteria are matched, by exact trimmed text. Prose stays intact. */
export declare function reviewItems(task: TeamTask, material?: ReviewMaterial): ReviewItem[];
/** Compare snapshot content, not volatile timestamps; an unavailable snapshot is never reconstructed. */
export declare function reviewChanges(previous: ReviewMaterial, current: ReviewMaterial): {
    results: {
        id: string;
        before: ReviewResult | undefined;
        after: ReviewResult | undefined;
    }[];
    files: {
        path: string;
        before: {
            path: string;
            present: boolean;
            unreadable?: boolean;
            sha256?: string;
            reason?: string;
        } | undefined;
        after: {
            path: string;
            present: boolean;
            unreadable?: boolean;
            sha256?: string;
            reason?: string;
        } | undefined;
    }[];
    requirementsChanged: boolean;
    gapsChanged: boolean;
};
