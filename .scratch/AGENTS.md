# Purpose

- Own local markdown planning records under `.scratch/`, including PRDs, implementation issues, status labels, blockers, and comments.

# Ownership

- This folder owns issue tracker artifacts only; product language and durable domain terms stay in root `CONTEXT.md`.
- Feature folders own their own PRD and issue set.

# Local Contracts

- Follow `docs/agents/issue-tracker.md` for file layout and comment placement.
- Keep `Status:` lines aligned with the triage labels in `docs/agents/triage-labels.md`.
- Append implementation notes under `## Comments` instead of rewriting issue history.

# Work Guidance

- Do not begin work on a later issue just because a blocker changes; only edit issues requested by the user or required for accurate tracker state.

# Verification

- Verify edited issue files still have one `Status:` line near the top and comments under `## Comments` when comments are present.

# Child DOX Index

- `sprite-zero-serbia-campaign/` - PRD and implementation issues for the Sprite Zero Serbia Public Demand Campaign. Read the child `AGENTS.md` before editing campaign tracker files.
