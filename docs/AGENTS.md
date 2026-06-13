# Purpose

- Own durable agent-facing documentation and architecture decisions for this repository.

# Ownership

- `docs/agents/` owns local skill integration and workflow conventions.
- `docs/adr/` owns accepted architectural decisions.

# Local Contracts

- Keep operational instructions concise and current.
- Do not duplicate root DOX rules unless a child scope needs a concrete local version.

# Work Guidance

- Use root `CONTEXT.md` terminology in docs that mention campaign concepts.

# Verification

- Verify markdown links and referenced paths when changing documentation.

# Child DOX Index

- `agents/` - Skill-facing workflow docs for issue tracking, triage labels, and domain docs. Read `docs/agents/AGENTS.md` before edits.
- `adr/` - Architecture decision records. Read `docs/adr/AGENTS.md` before edits.
