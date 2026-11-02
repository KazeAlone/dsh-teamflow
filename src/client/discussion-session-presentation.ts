import type { SessionListState } from '@deepseek-ai/dsh-api-session-controller/client'

// Only TeamFlow's reserved, durable discussion namespace. Ordinary chats,
// execution members and similarly named user sessions keep their presentation.
const discussionId = /^session-at-discussion-[a-f0-9]{16}-[a-f0-9-]{36}$/u
type Catalog = { getSnapshot(): SessionListState }
type Installation = { count: number; original: Catalog['getSnapshot']; projected: Catalog['getSnapshot'] }
// Shared across overlapping old/new client modules during hot reload.
const installationKey = Symbol.for('@yogurtss/dsh-teamflow:discussion-session-presentation')

/** Older discussion headers are immutable. Project their existing catalog rows
 * as auxiliary sessions so the host's normal workspace/search filters exclude
 * them. Keep ids, history, retention and the underlying store untouched.
 * Harness has no additive catalog-filter API; this narrow adapter is removable
 * and memoized to satisfy useSyncExternalStore's snapshot identity contract. */
export function installDiscussionSessionPresentation(catalog: Catalog): () => void {
  const owned = catalog as Catalog & { [installationKey]?: Installation }
  let installed = owned[installationKey]
  if (!installed) {
    const original = catalog.getSnapshot
    const cache = new WeakMap<SessionListState, SessionListState>()
    const projected = () => {
      const source = original.call(catalog)
      if (!source?.byId) return source
      const prior = cache.get(source)
      if (prior) return prior
      const changed = Object.entries(source.byId).filter(([id, row]) => discussionId.test(id) && row.origin !== 'subagent')
      const result = changed.length ? { ...source, byId: { ...source.byId } } : source
      for (const [id, row] of changed) result.byId[id as keyof SessionListState['byId']] = { ...row, origin: 'subagent' }
      cache.set(source, result)
      return result
    }
    installed = { count: 0, original, projected }
    catalog.getSnapshot = projected
    Object.defineProperty(owned, installationKey, { value: installed, configurable: true })
  }
  installed.count++
  let disposed = false
  return () => {
    if (disposed) return
    disposed = true
    if (--installed.count) return
    if (catalog.getSnapshot === installed.projected) catalog.getSnapshot = installed.original
    delete owned[installationKey]
  }
}
