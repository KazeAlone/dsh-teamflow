/** Bounded tab-local view memory. Cached data never authorizes a mutation. */
export declare function createWorkflowCache<T>(limit?: number, maxBytes?: number, ttlMs?: number): {
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    remove: (key: string) => void;
};
export declare const workflowCacheKey: (session: string, team: string, archived: boolean) => string;
