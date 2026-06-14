# Post-Vote Serbia Demand Map

Status: ready-for-agent

## What to build

Build the Serbia Demand Map as the visual proof moment after voting. The map should use a Stylized Serbia Silhouette, show only real aggregate demand data, support a Real-Data Zero State, reveal after a Counted Vote or Already-Counted Vote, and highlight the Voter City Highlight without exposing personal data.

## Acceptance criteria

- [x] The demand section renders a Stylized Serbia Silhouette including Kosovo.
- [x] The map has no district borders, municipality boundaries, or political labels.
- [x] Public aggregate vote totals and per-location counts are displayed only from Convex query data.
- [x] The map shows a polished Real-Data Zero State when no votes exist.
- [x] City pins and count bubbles appear for locations with real votes.
- [x] After voting, the page reveals or scrolls to the demand map.
- [x] The voter-selected city pin pulses or shows a brief "+1" after voting.
- [x] No raw email or individual identity data is exposed.
- [x] The map remains usable and readable on mobile and desktop.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md
- .scratch/sprite-zero-serbia-campaign/issues/03-complete-serbian-location-list.md

## Comments

### 2026-06-14 - Agent implementation

- Implemented the Serbia Demand Map section with a stylized Serbia silhouette including Kosovo, aggregate-only count display, real vote pins, a distinct loading state, and a polished no-votes zero state without seed data.
- Added `src/demandMap.ts` to place pins from the canonical Serbian Location List coordinates and to build visible pins only from Convex aggregate location counts.
- Updated successful Counted Vote and Already-Counted Vote flows to close the Focused Vote Entry, scroll to the demand map, show a status message, and highlight the counted location with a brief `+1` pulse.
- Kept raw emails and individual vote records out of public UI; the frontend still consumes only `votes.totals`.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`; `npx.cmd convex dev --once`; local browser check at `http://127.0.0.1:5174` for the map loading/real-data state, vote modal search/select path, counted vote reveal/highlight, duplicate already-counted reveal/highlight, issue 01 hero/privacy behavior, and mobile/desktop overflow. The shared Convex dev deployment contained existing real votes during browser verification, so the true no-votes zero state was verified by the failing-first UI test rather than by deleting backend data.
