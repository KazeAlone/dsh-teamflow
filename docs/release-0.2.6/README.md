# 0.2.6 stable promotion review — 2026-11-07

User-approved destination: main. Reviewed stable baseline: 54b686792f8bbc06c4fda9e760ff95fbadd3443b. Development input: b3c7d6a49d08a3cd44b0b6edcc104cbd7444cb97 plus the stabilization changes below. The classic tag remains fixed at c8530b9f360ac29b1c78179bade3827f49ba31bd (peeled commit).

## Review scope

The complete main-to-development change set covers the Workflow launcher and workspace selection; proposal editing and adaptation fences; streamed discussions; review snapshots, returned reviews and subsequent rounds; deterministic deliverable previews; card and status UI; scheduler recovery and execution controls; localization, compatibility declarations, lockfile changes, generated artifacts, tests and bilingual documentation. Generated bundles are checked against source and build settings.

Execution review checks that completed ancestors are retained, running owners are not duplicated, pauses survive cold recovery, stale attempts cannot commit, dependency and review gates remain authoritative, and explicit reruns invalidate affected descendants. File previews remain bounded to declared workspace files with symlink and excluded-path checks, safe text rendering, and no display-time model call.

## Stabilization findings

- Configuration-only attention was indistinguishable from other problems. The capsule now says Setup needed / 待配置; mixed problems retain Attention / 待处理.
- Completed reruns retained their historical context and therefore incorrectly displayed an updating warning in Deliverables. The warning now checks completion state; historical context remains available.
- Single-node controls, workflow launching, and embedded discussion HTTP requests could remain pending indefinitely after a stalled connection. They now share bounded requests; discussion reads are cancelled on unmount. Uncertain mutations are not automatically replayed.
- The secondary edit-and-rerun button could inherit form submission behavior inside the node editor. It is now explicitly a non-submit action.
- Three workflow history readers bypassed the host compatibility adapter and failed on 0.1.2 hosts without `ownEvents()`. Discussion transcripts, planning context and template-generation context now use `sessionOwnEvents`, preserving the inherited-history boundary on legacy and modern hosts.
- Early 0.1.2 continuable setup registries did not cover main sessions or independently restored discussions. Workflow setup now also observes the host lifecycle, hides discussion-only tools from ordinary sessions, restores discussion restrictions before requests, and deduplicates overlapping hooks with reload cleanup.
- Discussion persona placement now resolves the host's modern prefix or legacy persona section. An unavailable placement fails closed and releases the partially installed tool filter.
- Fresh CI checkouts exposed a template test dependency on an untracked local output directory. Fixtures now use the operating system temporary directory.
- The deterministic discussion adapter mistook legacy user-role tool results for new human turns, repeatedly requesting context. It now identifies human-source messages and bounds requests so a failing fixture cannot generate unbounded traces.

## Validation

Local Windows validation passed frontend/backend typechecks, production build, the complete repository verify chain, focused status/delivery/network regressions, and generated artifact consistency. Packaged real-host scenarios passed on rc.2 and rc.5, including lifecycle, cold restore, fallback, failure, captain wakeup, progressive entry, authenticated Web approval, native discussion restoration, protocol compatibility and stability.

Isolated Edge checks passed interrupted-task continuation, lost-response recovery without mutation replay, offline reconnection and English recovery controls. A real rc.5 Web host loaded the candidate, created a six-node template in a dedicated test workspace, and retained the 待配置 capsule after reload. The secondary rerun action was also exercised inside the real rendered editor with native validation disabled: it did not submit the form.

## Boundaries

Interrupted execution resumes through a fresh fenced attempt with original task requirements, prior rerun instructions, and saved progress. It is not token-exact model continuation. Host stop acknowledgement is required; previously written files and external effects are not rolled back. Failed/cancelled tasks and rejected checkpoints still require explicit handling. Browser fixtures simulate model output; real provider credentials, native desktop behavior, and migration of user-owned data are outside this review.

Git promotion updates main installation only. It does not publish to npm or alter the user's installed profile. Future development continues on dev.
