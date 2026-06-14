# Runway Video Loop Production And Integration

Status: ready-for-human

## What to build

Produce and integrate the Three-Loop Video Scope for the Runway-First Video Loops workflow. The human owner should approve prompts, source stills, and final loops before they become production campaign assets. The website should use Atmospheric Video Loops only for mood and motion while React UI owns all readable copy, forms, CTAs, and counts.

## Acceptance criteria

- [x] Source stills or prompt briefs exist for the Empty Fridge Hero loop, Serbian Moments loop, and Final Ask loop.
- [ ] Human owner approves the Runway prompts before paid generation.
- [ ] Human owner approves final video loop files before integration.
- [ ] Each loop avoids AI-generated readable text and important product labels.
- [x] Each loop has a still-image or CSS fallback.
- [ ] Video files are optimized for web delivery and do not block the vote path.
- [x] Reduced-motion users are not forced through aggressive video or motion behavior.
- [ ] Integrated loops preserve text readability on mobile and desktop.

## Blocked by

- .scratch/sprite-zero-serbia-campaign/issues/06-expanded-cinematic-story-experience.md

## Runway prompt briefs for human approval

Approval state: prompts and final video files are not approved in this tracker. Do not generate paid Runway assets or replace production campaign media until the human owner explicitly approves the prompts, then explicitly approves the resulting final files.

The Expanded Cinematic Story Arc may be built and tested with existing generated stills and development loops before final Runway approval. This does not satisfy the unchecked production-loop approval criteria in this issue.

Shared constraints for all loops:

- Use Atmospheric Video Loops only: mood, cold light, fizz, condensation, ice, lemon-lime cues, and subtle camera or fluid motion.
- No readable text, no logo marks, no official Sprite or Coca-Cola artwork, no product labels that carry important meaning, and no launch or availability claim inside the video.
- React UI owns every readable heading, CTA, form, count, and campaign message.
- Keep the left or right copy-safe dark area already used by the app overlay so text remains readable on mobile and desktop.
- Target a seamless 5-7 second loop, 16:9, no audio, web-optimized H.264 MP4, with the still source retained as the poster/fallback.

Empty Fridge Hero loop:

- Source still: `src/assets/empty-fridge-hero-generated-v1.png`
- Purpose: opening Empty Fridge Hero background for the emotion-first hero.
- Prompt brief: Cinematic cold refrigerator interior at night, realistic condensation and fridge light, empty central shelf space where a lemon-lime zero-sugar drink should be, surrounding unbranded cans and glass bottles pushed to the edges, subtle vapor and light flicker, cold green-white highlights, realistic beverage cues, premium dark atmosphere, camera locked with slight breathing movement, seamless loop.
- Negative prompt: readable text, labels, logos, official brand packaging, hands, people, product hero packshot, launch announcement, exaggerated animation.

Serbian Moments loop:

- Source still: `src/assets/serbian-moments-generated-v1.png`
- Purpose: Serbian Moments section background for summer heat, late food, study/work break, sport or river-walk mood.
- Prompt brief: Night river promenade table in Serbia with an unbranded lemon-lime sparkling drink over ice, lime slice, condensation, phone and late snack nearby, warm city lights and water reflections in the distance, subtle fizz bubbles and glints moving through the glass, cinematic shallow depth of field, no people as the focus, camera locked with gentle ambient motion, seamless loop.
- Negative prompt: readable signs, text on phone, logos, official product packaging, recognizable brand labels, tourism montage, crowded faces, exaggerated party scene.

Final Ask loop:

- Source still: `src/assets/final-demand-signal-generated-v1.png`
- Purpose: Final Ask background connecting demand signal, Serbia map energy, and cold lemon-lime refreshment.
- Prompt brief: Dark condensation-covered glass wall with an abstract glowing Serbia-shaped demand signal made from soft green-white light points, unbranded clear can silhouette with ice and lime at the edge, small bubbles and droplets moving slowly, premium cold cinematic lighting, copy-safe negative space, camera locked with subtle shimmer, seamless loop.
- Negative prompt: readable map labels, political labels, text, logos, official brand packaging, product label, flag claim, launch claim, aggressive flashing.

## Comments

### 2026-06-14 - Agent implementation

- Added human-approval-ready prompt briefs for the Empty Fridge Hero, Serbian Moments, and Final Ask loops, tied to the existing source stills under `src/assets/`.
- Confirmed no tracker record or asset naming indicates human approval for Runway prompts or final video loop files. No paid Runway generation was performed, and no final files were integrated.
- Left final-video criteria unchecked because final approved Runway files are not present.
- Existing app surface already provides still-image fallbacks for the three video slots and suppresses autoplay video for reduced-motion users; these criteria are checked based on the current app and tests.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`.

### 2026-06-14 - Sequencing update

- Confirmed the expanded GSAP/Lenis cinematic implementation should proceed with current generated stills and development loops first.
- Kept final prompt approval, paid generation, final loop approval, web optimization, and final integrated readability as human-gated asset work in this issue.
