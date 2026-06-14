# Vercel Preview Launch QA

Status: ready-for-human

## What to build

Prepare a Vercel Deployment preview for human review on a Vercel subdomain. The preview should be configured with Convex environment variables, Vercel Analytics, production-like assets or fallbacks, and enough QA coverage to decide whether the Public Demand Campaign is ready for broader sharing.

## Acceptance criteria

- [ ] The app builds successfully for Vercel.
- [ ] Vercel project settings include required Convex environment variables.
- [ ] A Vercel preview URL is available for review.
- [ ] The main campaign route and `/privacy` route work on the preview.
- [ ] Email-Backed Vote flow works against the intended Convex deployment.
- [ ] Serbia Demand Map displays aggregate data and real-data zero state correctly.
- [ ] Vercel Analytics is active for the preview or production environment as intended.
- [ ] Human owner reviews mobile and desktop layouts.
- [ ] Human owner verifies final copy, Quiet Campaign Disclosure, and share metadata.
- [ ] No Vercel Speed Insights dependency is added for v1.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/01-campaign-shell-with-emotion-first-hero.md
- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md
- .scratch/sprite-zero-serbia-campaign/issues/03-complete-serbian-location-list.md
- .scratch/sprite-zero-serbia-campaign/issues/04-post-vote-serbia-demand-map.md
- .scratch/sprite-zero-serbia-campaign/issues/05-share-after-vote-and-analytics-signals.md
- .scratch/sprite-zero-serbia-campaign/issues/06-expanded-cinematic-story-experience.md
- .scratch/sprite-zero-serbia-campaign/issues/07-runway-video-loop-production-and-integration.md
- .scratch/sprite-zero-serbia-campaign/issues/08-privacy-seo-social-metadata-and-footer-disclosure.md
