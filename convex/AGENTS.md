# Purpose

- Own Convex backend schema, generated types, vote mutations, and public aggregate queries for the campaign.
- Own Convex AI guidance installed under `convex/_generated/ai/`.

# Ownership

- Vote storage, email deduplication, abuse-protection metadata, and aggregate demand-count functions live under this folder.
- `locations.ts` owns the canonical Serbian Location List used by Convex validation and the React vote selector.
- Public functions must not expose raw emails or individual vote records.

# Local Contracts

- Keep Email-Backed Vote behavior aligned with root `CONTEXT.md` terminology.
- Normalize email addresses before deduplication.
- Keep `validLocationIds` derived from the canonical location list; preserve compatible real-place ids once votes can reference them.
- Return friendly success states for both Counted Vote and Already-Counted Vote outcomes.
- Public queries are aggregate-only: total vote count and per-location counts.

# Work Guidance

- Read `convex/_generated/ai/guidelines.md` before Convex code changes.
- Treat `convex/_generated/ai/` as Convex CLI-managed; refresh it with `npx convex ai-files install`.
- Prefer Convex indexes for lookup paths used by mutations and queries.
- Keep Invisible Vote Protection low friction: no CAPTCHA or required consent checkbox.

# Verification

- Run `npx convex dev --once` after schema or function changes when Convex credentials are available.
- Run `npm.cmd test -- --run` for Convex and app behavior tests.

# Child DOX Index

- No child AGENTS.md files.
