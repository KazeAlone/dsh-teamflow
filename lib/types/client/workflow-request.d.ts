export declare function workflowRequest<T>(payload: Record<string, unknown>, fetcher?: typeof fetch, timeoutMs?: number, signal?: AbortSignal): Promise<T>;
