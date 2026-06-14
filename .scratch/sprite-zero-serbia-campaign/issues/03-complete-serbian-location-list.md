# Complete Serbian Location List

Status: ready-for-agent

## What to build

Replace the temporary location options with the Serbian Location List: all official Serbian cities and municipalities, including Kosovo municipalities. The list should support Controlled City Vote selection and provide stable identifiers plus approximate map placement data for the Serbia Demand Map.

## Acceptance criteria

- [x] The location selector uses all official Serbian cities and municipalities, including Kosovo municipalities.
- [x] Each location has a stable id or slug, display name, and approximate coordinates or map placement values.
- [x] The selector remains controlled and does not allow free-text city entry.
- [x] Location names are usable in Serbian Latin and searchable in the vote entry UI.
- [x] Existing votes using temporary location ids are either migrated or the temporary list is removed before real use.
- [x] Location data is structured so the demand map can aggregate and place pins consistently.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md

## Comments

### 2026-06-14 - Agent implementation

- Replaced the temporary ten-option location list with a canonical Serbian Location List in `convex/locations.ts`: 174 official city/municipality records from the RZS 2025 codebook state, including Kosovo municipalities, with stable ASCII ids, Serbian Latin labels, official codes, and approximate coordinates for future Serbia Demand Map pins.
- Reused the same list for Convex validation and the React vote selector, keeping public vote queries aggregate-only.
- Added diacritic-insensitive search in the vote modal while keeping the submitted location as the controlled select value; no free-text location entry was added.
- Preserved compatible temporary ids for real places (`beograd`, `novi-sad`, `nis`, `kragujevac`, `subotica`, `zrenjanin`, `cacak`, `kraljevo`, `novi-pazar`, `pristina`) and removed the temporary-only list, so no migration is needed before real use.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`; `npx.cmd convex dev --once`; local browser check at `http://127.0.0.1:5173` for issue 01 hero/privacy behavior, issue 02 counted and already-counted vote behavior, and issue 03 searchable `Zvečan` location selection.
