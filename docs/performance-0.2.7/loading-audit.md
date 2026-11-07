# Loading audit — 0.2.7-dev.2

This development iteration checks every browser-owned loading entry in TeamFlow. It does not change the scheduler, agent lifetime, task interruption, approval authority, or native host transcript storage. The reported remote server is unavailable; these are verified local improvements, not a claim that all remote latency has been diagnosed.

| Entry | Loading policy and outcome |
| --- | --- |
| Activity capsule / team cards / archive fallback | Existing owner-scoped shared snapshots and unchanged-response structural sharing remain. A 12-second deadline now releases stuck polling; errors retain the last snapshot and the next tick retries. Background activity remains enabled for status synchronization. |
| Workflow canvas / native discussion controls | Existing four-entry bounded view cache paints immediately, with mutations fenced until authoritative refresh. Reads now share identical in-flight transports; effect cleanup cancels only its read subscription. Hidden-document periodic refresh is skipped, and returning to visibility refreshes immediately. Discovery remains enabled while the compact entry is mounted. |
| Agent native history navigation | Reuse an exact retained address. Concurrent missing-address clicks share only the same parent's catalog lookup. A superseded lookup cannot navigate over the most recent selection, including on older hosts without navigation cancellation. No session or running Agent is disposed. |
| Embedded independent discussion | Render cached tail immediately, but keep sending disabled until synchronized. Cache is scoped by session/team/discussion, four entries / 2 MiB serialized UTF-16 / five minutes. Unchanged log sequence reuses the server's parsed tail; changed logs are scanned backwards until 100 displayed messages are found. Large tails are not retained in the server cache. Conditional responses omit unchanged history while including busy and streaming changes in the revision. Hidden-document polling pauses; visible polling remains serial. |
| Template library / saved-template seed | Bounded catalog display cache; fresh reads still run on entry. Shared read transport, 12-second deadline and cleanup cancellation. Extraction polling cannot overlap on slow connections and skips hidden documents. |
| Member editor | Shared bounded state read; closing the editor releases its subscription and suppresses stale results. Saving remains an independent mutation. |
| Delivery file preview | Shared read transport, 12-second deadline and selection-scoped cancellation. Preview contents are revalidated on selection/refresh rather than trusting cached filesystem bytes. Existing text/image size limits remain. |
| Archived workflow restore | Uses the bounded workflow transport, with no mutation coalescing or automatic retry. |
| Launcher / workspace directory picker | Launcher already uses the bounded workflow transport and explicit recovery. Directory reads already use host AbortSignal and stale-result guards; filesystem contents are not cached as authority. Directory creation and workspace selection retain existing host lifecycle behavior. |
| Plan editor / stop-team controls | These are explicit writes, not background loaders. Existing independent request semantics remain; no retry, deduplication, or panel-lifetime cancellation is introduced. |

## Safety boundaries

The transport allowlist contains only state, archive_state, conversation_state, template_list, template_seed, launcher_context and outcome_preview. In particular, materials captures evidence and writes team state: it must remain a mutation. Starting and completing any workflow mutation fences earlier in-flight reads from being reused by new readers. Cancelling one reader never cancels another reader or a mutation. Settled read responses are not retained by the transport.

The native Agent transcript itself is rendered and hydrated by DSH. This change reduces TeamFlow's navigation prerequisites and independent-discussion work; it does not replace native history loading or evict Agent handles. Cold discussion restore and existing team-lock/ownership checks remain intact. A future host-level optimization needs measurements of native session request sizes, disk read time, and hydration/render time on the affected installation.

## Validation

- Full repository verification chain, backend/frontend typechecks, production build and artifact consistency check passed.
- Added regression coverage for shared reads, independent cancellation, last-reader cleanup, timeout recovery, mutation fencing (including evidence capture), and rapid Agent selection.
- A 100,000-event fixture verifies that old message content is not converted and unchanged logs are not materialized again.
- Conditional discussion tests verify unchanged payload omission, live streaming/busy updates, and no task dispatch during history reads.
- Isolated Edge delayed-reopen test passed: cached canvas appears before the response, controls stay fenced, and fresh state enables them. This fixture is not a measurement of the user's remote host.

Changes belong to dev only. Main and the classic tag are unchanged.
