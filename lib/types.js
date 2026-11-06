/** Statuses after which a task can no longer be claimed or worked on. */
export const TERMINAL_TASK_STATUSES = ['completed', 'failed', 'cancelled'];
export const TASK_KINDS = [
    'requirements',
    'implementation',
    'verification',
    'review',
    'repair',
    'integration',
    'work',
];
export const REVIEW_VERDICTS = ['pass', 'needs_revision', 'reject'];
export const FINDING_SEVERITIES = ['low', 'medium', 'high', 'blocker'];
