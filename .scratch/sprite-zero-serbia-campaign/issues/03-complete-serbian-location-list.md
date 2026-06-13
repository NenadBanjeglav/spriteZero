# Complete Serbian Location List

Status: ready-for-agent

## What to build

Replace the temporary location options with the Serbian Location List: all official Serbian cities and municipalities, including Kosovo municipalities. The list should support Controlled City Vote selection and provide stable identifiers plus approximate map placement data for the Serbia Demand Map.

## Acceptance criteria

- [ ] The location selector uses all official Serbian cities and municipalities, including Kosovo municipalities.
- [ ] Each location has a stable id or slug, display name, and approximate coordinates or map placement values.
- [ ] The selector remains controlled and does not allow free-text city entry.
- [ ] Location names are usable in Serbian Latin and searchable in the vote entry UI.
- [ ] Existing votes using temporary location ids are either migrated or the temporary list is removed before real use.
- [ ] Location data is structured so the demand map can aggregate and place pins consistently.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md
