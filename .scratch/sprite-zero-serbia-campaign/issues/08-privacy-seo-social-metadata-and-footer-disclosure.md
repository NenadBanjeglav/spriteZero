# Privacy SEO Social Metadata And Footer Disclosure

Status: ready-for-agent

## What to build

Finish the trust and sharing surfaces around the Public Demand Campaign. The Privacy Route should clearly explain Vote Consent and data use, while Share Metadata and Quiet Campaign Disclosure support credibility without interrupting the main cinematic story.

## Acceptance criteria

- [x] `/privacy` explains collected data, purpose, public aggregate display, private raw email handling, and deletion/contact process.
- [x] The vote form links to the Privacy Route near the submission-based consent copy.
- [x] Footer includes a quiet public/unofficial campaign disclosure and privacy link.
- [ ] Quiet Campaign Disclosure makes clear the campaign is not affiliated with The Coca-Cola Company or Coca-Cola HBC Srbija without moving heavy disclaimer copy into the hero.
- [x] The hero and main story avoid intrusive unofficial disclaimer copy.
- [x] Serbian SEO title and description are present.
- [x] Open Graph and Twitter/social card metadata are present.
- [x] The OG image does not depend on official Sprite or Coca-Cola logo files.
- [x] Metadata and privacy copy use Serbian Latin and the Sprite Zero Naming convention.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/01-campaign-shell-with-emotion-first-hero.md
- .scratch/sprite-zero-serbia-campaign/issues/02-email-backed-vote-with-controlled-location.md

## Comments

### 2026-06-14 - Agent implementation

- Replaced the `/privacy` placeholder with finished Serbian Latin privacy copy covering collected vote data, anti-abuse metadata, campaign purpose, public aggregate-only display, private raw email handling, and deletion flow.
- Preserved the vote-form Privacy Route link and the quiet footer disclosure/privacy link, with tests covering both and no intrusive unofficial disclaimer added to the hero or story sections.
- Added Serbian SEO title/description plus Open Graph and Twitter card metadata in `index.html`.
- Added `public/og-empty-fridge-hero-generated-v1.png` from the existing generated empty-fridge hero image so social metadata does not rely on official Sprite or Coca-Cola logo files.
- DOX pass updated root `AGENTS.md` to document the new `public/` static-file boundary without adding an `AGENTS.md` inside the public web root.
- No repository contact address was available. The privacy page uses the clearly temporary human-owner contact placeholder `[dopisati lični email vlasnika kampanje pre javne objave]` for deletion requests until the campaign owner supplies a real contact.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`. Confirmed the production build includes `dist/og-empty-fridge-hero-generated-v1.png`. `npx.cmd convex dev --once` was not run because no Convex/backend-facing files were changed.

### 2026-06-14 - Addressee update

- Added a disclosure requirement that the quiet unofficial campaign copy name The Coca-Cola Company and Coca-Cola HBC Srbija as non-affiliated parties.
- Kept the requirement out of the hero and main story so the cinematic flow stays emotion-first.
