/** Bounded requests. Never replay a mutation when its server-side outcome is unknown. */
export declare function workflowRequest<T>(payload: Record<string, unknown>, fetcher?: typeof fetch, timeoutMs?: number): Promise<T>;
