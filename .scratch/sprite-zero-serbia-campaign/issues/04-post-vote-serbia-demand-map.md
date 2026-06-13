# Post-Vote Serbia Demand Map

Status: ready-for-agent

## What to build

Build the Serbia Demand Map as the visual proof moment after voting. The map should use a Stylized Serbia Silhouette, show only real aggregate demand data, support a Real-Data Zero State, reveal after a Counted Vote or Already-Counted Vote, and highlight the Voter City Highlight without exposing personal data.

## Acceptance criteria

- [ ] The demand section renders a Stylized Serbia Silhouette including Kosovo.
- [ ] The map has no district borders, municipality boundaries, or political labels.
- [ ] Public aggregate vote totals and per-location counts are displayed only from Convex query data.
- [ ] The map shows a polished Real-Data Zero State when no votes exist.
- [ ] City pins and count bubbles appear for locations with real votes.
- [ ] After voting, the page reveals or scrolls to the demand map.
- [ ] The voter-selected city pin pulses or shows a brief "+1" after voting.
- [ ] No raw email or individual identity data is exposed.
- [ ] The map remains usable and readable on mobile and desktop.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md
- .scratch/sprite-zero-serbia-campaign/issues/03-complete-serbian-location-list.md
