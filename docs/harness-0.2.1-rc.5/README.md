# Harness 0.2.1-rc.5 compatibility

Development version `0.2.6-dev.10` adds the exact published `0.2.1-rc.5` target. Install from `github:yogurtss/dsh-teamflow#dev`. The recommended development cohort remains rc.2; `main` and the fixed `classic` tag are unchanged. No host API workaround or compatibility-gate bypass is needed.

## Source and artifact audit

- Plugin baseline: `36e0a56bec91491c3d227e09fadb14cc50f7ee06` (`0.2.6-dev.9`).
- Official rc.3 tag: `1f81c047fc48fa190a683e469daa699857e9afe8`.
- Official rc.5 tag: `b830ec950faba0a46dda564be3e2d854afed94f1` (`dsh-v0.2.1-rc.5`). The complete rc.3 → rc.5 diff contains 13 commits, including the intermediate rc.4 release. See the [official comparison](https://github.com/deepseek-ai/deepseek-harness/compare/dsh-v0.2.1-rc.3...dsh-v0.2.1-rc.5) and [release notes](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.5).
- npm CLI artifact: `@deepseek-ai/dsh@0.2.1-rc.5`, integrity `sha512-WkyJZv4zl9sCAxSzRctGm58m0rilGqwR6pniBiLOz5CPDfHfDuAUicg0AAazXI7oj/Cph6/cjNTncA/rpLTXpw==`. Source tag and registry identity were checked separately.
- Host agent/session/subagent/tools/commands/workspace interfaces consumed by TeamFlow have no functional changes in this corridor. ACP logging and conversation tab tooltips changed upstream.
- The reasoning-body slot adds `rawText`, while `text` becomes display-ready. TeamFlow does not implement that slot; embedded discussions consume assistant-stream reply-text blocks and exclude reasoning. No reasoning renderer migration applies. See the [official field migration](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.1-rc.5/docs/upgrade-guide/v0.2.1-rc.4/reasoning-body-props/guide.md).
- The isolated runtime lock and installed manifests agree on all 296 DSH packages at rc.5. The three browser-only declaration packages (`client-store`, `client-ui-primitives`, `client-ui-slots`) were separately downloaded and integrity-checked for isolated typechecking. All 1,581 recorded DSH type resolutions used rc.5, with no fallback to rc.2.

## Validation

Windows x64 / Node 24.22.1, real rc.5 CLI and plugins, deterministic local model:

- Frontend and backend typecheck against rc.5; normal rc.2 development build and artifact consistency checks.
- Full repository `verify` passed after the fixture corrections described below, with no skipped checks. The additional runtime-runner/platform fixture tests also passed.
- All 12 real-host records passed: lifecycle, lifecycle cold restore, fallback, fallback cold restore, final failure, captain idle wakeup, progressive entry, Web approval, native workflow cold restore, protocol compatibility, stability/HMR, and actual plugin-manager installation.
- Full runtime candidate SHA-256: `140aab24c51db8057fc15184454d1f98ab13151fb776fd4349ed1862429b2f85`. Subsequent package changes add documentation; the implementation and compatibility declarations are unchanged.
- Browser validation on rc.5: Workflow sidebar registration, template library, applying a template in a test workspace, six-node canvas, embedded discussion, Enter submission and completed model replies.
- The CI matrix now derives 12 Ubuntu targets and three Windows targets from the same compatibility policy, including rc.5 on both platforms. Matrix inclusion is not a claim that remote CI has already passed.

The baseline exposed stale local checks: five locale registrations versus the current six, and a fixed count of 21 peer declarations. Runtime fixtures still patched the old `agent-teams` plugin ID, matched a previous prompt sentence, inspected a truncated command instead of the retained full message, and omitted task descriptions required before approval. These fixtures now match the current plugin contract while retaining the behavioral assertions. The Windows doctor test uses a directory junction for linked-path resolution because file symlinks require unavailable privileges. An npm 11 isolated-install attempt stalled in override resolution; the successful runtime installation used npm 10.9.4.

Real provider APIs, native desktop interaction, other operating systems and migration of user-owned data were not tested in this task. A separate rc.2 runtime reinstall hit an npm dependency-tree error before execution; existing rc.2 local build/tests and the declared matrix remain the regression coverage. Test profiles contain only task-owned fixtures; the user's DSH installation was not modified.

## Recovery

Use the prior immutable dev commit if this development update needs reverting. Keep host and plugin versions within their explicit compatibility lists. Do not rewrite published tags or disable the host compatibility check.
