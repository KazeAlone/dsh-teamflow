# Project maintenance skills

Before using a DSH plugin lifecycle skill in this repository, read `skills/README.md` for its source, version, and project-specific applicability. Prefer the project copy when a global skill has the same name.

Vendored skills are community guidance. Historical version examples are not the current support policy; verify exact Harness tags, npm artifacts, the resolved dependency graph, and AgentTeams behavior. Preserve upstream skill files; record local integration rules separately.

User instructions and authorization take precedence over skill defaults. Do not repeat confirmation for work the user has already authorized.

# Stable main and development dev policy

- main is the user-approved stable installation branch. The approved stable baseline is 0.2.6, promoted after the 2026-11-07 review. The previous Gallery baseline was 0.2.5, promoted from dev commit 04a04143514bc69bd192913da88cfe773eaed076. The no-Gallery classic version remains at c8530b9f360ac29b1c78179bade3827f49ba31bd (package version 0.1.27, tag classic). Keep the classic tag fixed.
- dev is the working branch for the next iteration. All future features, fixes, version updates, and routine maintenance go to dev by default. Before editing, check the branch; if it is main, switch to dev or create a task branch based on dev.
- A request to implement, fix, iterate, commit, or push authorizes development work only. It does not authorize promoting that work to main. Update main only when the user explicitly asks to promote/release the development iteration to main or the stable version. If the destination is ambiguous, keep the completed work on dev.
- Standing commit/push authorization below applies to dev and task branches based on it. It never grants automatic merging, cherry-picking, or pushing development changes to main, moving classic, or publishing a stable release.
- Stable Git installation uses github:yogurtss/dsh-teamflow#main; development installation uses github:yogurtss/dsh-teamflow#dev. Describe development builds as development versions; do not present them as the stable default.
- Before an explicitly authorized stable promotion, review the complete main..dev diff and run appropriate checks. Preserve Git history and do not force-push. Keep these rules present on both branches.

# Git workflow and standing push authorization

Manage project changes with Git. After completing a major update (a feature, substantial fix, or meaningful documentation milestone), review the diff, fix discovered issues, and run checks appropriate to the changed surface. Include required build artifacts and documentation in the commit.

The user explicitly authorizes proactively committing and pushing completed, validated updates without asking again. Push to this user's fork, `origin` (`https://github.com/yogurtss/dsh-teamflow.git`), on the current task branch; confirm the branch and remote before pushing. Do not push to `upstream` or force-push under this standing authorization. Honor any later instruction to keep changes local or defer a push.

Stage only task-related changes; preserve unrelated user work and keep secrets, local state, and temporary test outputs out of commits. After pushing, verify synchronization and report the commit and branch. If checks or the push fail, resolve the issue where possible and report any remaining blocker accurately.

# Browser automation

For interactive browser automation, use the `ego-browser` skill from Ego Lite. Do not use `agent-browser` or another browser-control skill unless the user explicitly requests it or Ego Lite is unavailable.
