# Purpose

- Own Convex backend schema, generated types, vote mutations, and public aggregate queries for the campaign.

# Ownership

- Vote storage, email deduplication, abuse-protection metadata, and aggregate demand-count functions live under this folder.
- Public functions must not expose raw emails or individual vote records.

# Local Contracts

- Keep Email-Backed Vote behavior aligned with root `CONTEXT.md` terminology.
- Normalize email addresses before deduplication.
- Return friendly success states for both Counted Vote and Already-Counted Vote outcomes.
- Public queries are aggregate-only: total vote count and per-location counts.

# Work Guidance

- Prefer Convex indexes for lookup paths used by mutations and queries.
- Keep Invisible Vote Protection low friction: no CAPTCHA or required consent checkbox.

# Verification

- Run `npx convex dev --once` after schema or function changes when Convex credentials are available.
- Run `npm.cmd test -- --run` for Convex and app behavior tests.

# Child DOX Index

- No child AGENTS.md files.
