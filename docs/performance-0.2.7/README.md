# TeamFlow latency investigation

Reported symptoms: the whole page slows down; reopening Workflow waits for team state again; opening Agent history is slow. Browser refresh and a later confirmed DSH restart did not improve the reported server. The server URL and timings are unavailable. No remote root cause is claimed from local tests alone.

## Confirmed code paths

- The one-second activity poll requested every workspace's teams. Each team read member mailboxes and synchronously hashed artifact paths and reviewed scopes on the HTTP/session event loop. Persisted teams and growing artifacts increase that repeatable cost, even after restart.
- Every decoded response created new snapshot references and notified all subscribed views, including when the state had not changed.
- Closing the status-capsule Workflow unmounted its component and discarded its view. Reopening waited for a fresh full response. The full team includes persisted discussions and review records.
- On hosts exposing the older addressed-navigation API, clicking a member awaited a fresh parent catalog before opening the child, even when the exact address was already retained. Newer workspace navigation already bypassed this path.
- TeamFlow-created discussion handles follow plugin lifetime. They can retain loaded sessions until disposal; this is a residency risk, not a proven cause of the reported server latency. No automatic eviction was added because disposing a live Agent can stop its work.

## Changes and evidence

| Check | Result |
| --- | --- |
| Four synchronous audits of a 128 MiB fixture | 295 ms; an unrelated zero-delay timer also waited 295 ms |
| Four identical concurrent audits through the worker | 108 ms total; unrelated timer ran after 4 ms |
| Current-owner collection with 40 teams | Only the selected team's audit ran |
| 100 unchanged decoded responses | Zero subscriber notifications |
| Reopen with the state response deliberately held | Previous canvas visible; mutations disabled until fresh state arrives |
| Conditional state | Unchanged response contains only revision acknowledgement; execution/status changes invalidate revision |

Timings are a local synthetic Windows example, not a remote latency forecast. The worker uses the same artifact audit and does not retain successful results across requests. Changed bytes still produce changed digests; failed audits retain the team view with an incomplete audit rather than a clean verdict.

The view cache is tab-local, owner/team/archive scoped, limited to four entries, eight MiB of serialized UTF-16 text, and five minutes. That serialization budget is not an exact JavaScript heap limit. Cached state never bypasses server ownership, version or approval checks.

Validation: full repository verify chain, backend/frontend typechecks, production build, background-audit fidelity/lifetime tests, and isolated Edge delayed-reopen test. Browser fixtures simulate data; actual remote disk speed, proxy latency, session log sizes and Harness history hydration remain unmeasured. Subsequent remote diagnosis should compare the document, activity-state, workflow-state and native session requests separately, including response size and time to first byte.

Development changes belong to `dev`; this investigation does not promote them to stable `main`.
