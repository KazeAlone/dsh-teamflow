import type { ActivityTeam } from './activity-monitor.ts';
/** Completed nodes, not estimated model progress. Scope matches the badge's click target. */
export declare function activityStatus(team?: ActivityTeam, archived?: boolean): {
    readonly state: "completed" | "review" | "staged" | "running" | "archived" | "history" | "configuration" | "attention" | "paused" | "waiting";
    readonly completed: number;
    readonly total: number;
    readonly percent: number;
    readonly running: number;
    readonly reviews: number;
    readonly attention: number;
};
