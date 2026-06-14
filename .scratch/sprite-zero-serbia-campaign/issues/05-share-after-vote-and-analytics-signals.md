# Share After Vote And Analytics Signals

Status: ready-for-agent

## What to build

Complete the post-vote conversion loop by adding Share After Vote actions and Vercel Analytics Signal tracking. A visitor who casts or repeats an Email-Backed Vote should be guided from success to the demand map, then to sharing the Public Demand Campaign.

## Acceptance criteria

- [x] Post-vote success includes share actions after the map reveal.
- [x] Sharing supports native share where available and copy-link fallback.
- [x] Prepared Serbian share text is used.
- [x] Vercel Analytics is installed without adding Vercel Speed Insights.
- [x] Analytics tracks primary CTA click, vote entry opened, vote submitted, vote counted, duplicate already-counted state, and share clicked.
- [x] Analytics tracking does not expose raw email addresses or personal data.
- [x] Share UI works on mobile and desktop.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md
- .scratch/sprite-zero-serbia-campaign/issues/04-post-vote-serbia-demand-map.md

## Comments

### 2026-06-14 - Agent implementation

- Added Share After Vote actions to the post-vote Serbia Demand Map status for Counted Vote and Already-Counted Vote outcomes, with native share when available and copy-link fallback using prepared Serbian share text.
- Installed `@vercel/analytics`, mounted Vercel Analytics for page views, and added non-identifying custom events for `primary_cta_clicked`, `vote_entry_opened`, `vote_submitted`, `vote_counted`, `vote_already_counted`, and `share_clicked`.
- Kept analytics payloads free of raw emails and individual identity values; tests assert submitted email values do not appear in tracked event calls.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`; `npx.cmd convex dev --once`; browser check at `http://127.0.0.1:5174/` for CTA/modal open, search/select voting, counted and duplicate map reveal/share prompt, copy-link fallback, desktop/mobile share UI, privacy route, no raw email in public UI, and real aggregate map data. The shared Convex dev deployment contained real votes, so map loading/zero states were covered by behavior tests instead of clearing backend data.
