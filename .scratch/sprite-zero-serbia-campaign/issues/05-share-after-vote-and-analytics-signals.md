# Share After Vote And Analytics Signals

Status: ready-for-agent

## What to build

Complete the post-vote conversion loop by adding Share After Vote actions and Vercel Analytics Signal tracking. A visitor who casts or repeats an Email-Backed Vote should be guided from success to the demand map, then to sharing the Public Demand Campaign.

## Acceptance criteria

- [ ] Post-vote success includes share actions after the map reveal.
- [ ] Sharing supports native share where available and copy-link fallback.
- [ ] Prepared Serbian share text is used.
- [ ] Vercel Analytics is installed without adding Vercel Speed Insights.
- [ ] Analytics tracks primary CTA click, vote entry opened, vote submitted, vote counted, duplicate already-counted state, and share clicked.
- [ ] Analytics tracking does not expose raw email addresses or personal data.
- [ ] Share UI works on mobile and desktop.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md
- .scratch/sprite-zero-serbia-campaign/issues/04-post-vote-serbia-demand-map.md
