import type { SessionListState } from '@deepseek-ai/dsh-api-session-controller/client';
type Catalog = {
    getSnapshot(): SessionListState;
};
/** Older discussion headers are immutable. Project their existing catalog rows
 * as auxiliary sessions so the host's normal workspace/search filters exclude
 * them. Keep ids, history, retention and the underlying store untouched.
 * Harness has no additive catalog-filter API; this narrow adapter is removable
 * and memoized to satisfy useSyncExternalStore's snapshot identity contract. */
export declare function installDiscussionSessionPresentation(catalog: Catalog): () => void;
export {};
