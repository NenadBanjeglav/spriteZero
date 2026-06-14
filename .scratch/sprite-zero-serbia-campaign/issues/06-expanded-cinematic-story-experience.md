# Expanded Cinematic Story Experience

Status: ready-for-agent

## What to build

Expand the campaign shell from the completed first-pass story into the full Expanded Cinematic Story Arc using GSAP ScrollTrigger, Lenis, Serbian Latin Voice, Cinematic Direct Tone, and Reduced-Motion Respect. Refactor the large app component only along the boundaries needed for scoped cinematic timelines, while preserving the Focused Vote Entry path, email-backed votes, and real-data Serbia Demand Map.

## Acceptance criteria

- [ ] The main route follows the Expanded Cinematic Story Arc: cover intro, empty fridge, world contrast, Serbia demand, imagined local arrival, final ask, and open letter.
- [ ] The Cover Intro creates mystery before the Empty Fridge Hero without leading with live vote numbers.
- [ ] The World Contrast Scene shows the availability gap briefly without becoming a market report.
- [ ] The Serbia Demand Map preserves real email-backed votes, controlled locations, and no fake seed counts.
- [ ] The Imagine It Here Scene uses Serbian everyday moments as a desired future without making launch or retail availability claims.
- [ ] The Final Ask and Open Letter address Coca-Cola HBC Srbija specifically while keeping the Decision-Maker Audience framing.
- [ ] The Primary CTA remains available without forcing users through the full story.
- [ ] GSAP ScrollTrigger owns pinned scenes, scrubbed text beats, scene holds, and scroll-linked transitions.
- [ ] Lenis owns smooth scrolling and is synchronized with ScrollTrigger.
- [ ] The app is split pragmatically into scene data, cinematic scene/video/text-beat components, vote entry, demand map, final CTA, and open letter surfaces as needed for scoped timelines.
- [ ] Refactoring avoids a broad rewrite of working Convex vote, sharing, privacy, analytics, and location-selection behavior.
- [ ] The expanded story can use existing generated stills and development video loops; final Runway production media is not required for this issue.
- [ ] The implementation does not replace production media or imply final Runway approval.
- [ ] React-owned vote, share, form, accessibility, and data states remain usable without being blocked by cinematic animation.
- [ ] `prefers-reduced-motion` preserves comprehension without aggressive scroll/parallax behavior.
- [ ] Mobile layout is first-class and desktop layout remains cinematic.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/01-campaign-shell-with-emotion-first-hero.md

## Comments

### 2026-06-14 - Agent implementation

- Expanded the main route into the former first-pass story arc: Empty Fridge Hero, Serbian Moments, Zero-Sugar Choice Frame, Serbia Demand Map, and Final Ask.
- Updated Serbian Latin UI copy so the Missing From The Fridge Story is explicit and concise, Serbian Moments cover the required everyday scenes, and the Availability Gap Note stays as a brief standalone note.
- Added CSS scroll-driven cinematic reveal behavior with `prefers-reduced-motion` switching story sections to static motion and suppressing autoplay video while preserving all headings and CTAs.
- Added a first-pass Final Ask section with the primary Focused Vote Entry CTA, without complaint wording or launch claims.
- Preserved existing vote, map, sharing, privacy, and non-identifying analytics behavior; no Convex/raw-vote privacy boundary changes.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`. Started local Vite with `npm.cmd run dev:web -- --host 127.0.0.1 --port 5173 --strictPort`; Playwright visual smoke was attempted but blocked because the local Playwright browser executable was not installed in this environment.

### 2026-06-14 - Scope update

- Re-scoped this issue from the former Five-Part Story Arc to the Expanded Cinematic Story Arc after reviewing the cinematic handoff PDF with the human owner.
- Preserved the existing email-backed vote, controlled Serbian location list, and real-data Serbia Demand Map as required boundaries for the expanded cinematic implementation.
- Confirmed the implementation should split the current large app component only where needed for scene data, reusable cinematic components, scoped GSAP timelines, and isolated vote/map surfaces; this is not a broad architecture rewrite.
- Confirmed the expanded GSAP/Lenis implementation should proceed with current generated stills and development loops first; final Runway-approved loop replacement remains separate human-gated work.
- Confirmed the campaign's direct request should address Coca-Cola HBC Srbija, not the broader Coca-Cola Srbija shorthand.
