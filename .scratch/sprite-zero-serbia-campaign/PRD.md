# Sprite Zero Serbia Campaign PRD

## Summary

Build a mobile-first cinematic public demand campaign for Sprite Zero in Serbia. The site should make Serbian visitors feel the absence of Sprite Zero, invite them to cast an email-backed vote, and turn those votes into visible demand proof for Coca-Cola Serbia.

The v1 product is a Vite + React + Tailwind + GSAP single-page campaign experience with a separate privacy route, Convex vote storage, Vercel Analytics, and Vercel deployment previews.

## Problem

Sprite Zero is not currently available in the Serbian market, but Serbian consumers already understand and choose zero-sugar options. A conventional landing page or petition would feel flat. The campaign needs to create desire first, then convert that desire into a credible demand signal.

## Goals

- Create a premium, emotional, cinematic website that makes visitors want Sprite Zero in Serbia.
- Collect real email-backed votes with city/municipality location data.
- Show demand visually through a stylized Serbia map with city pins and real vote counts.
- Give voters a satisfying post-vote moment that reveals their impact and encourages sharing.
- Keep the campaign credible for Coca-Cola Serbia without making the main story feel like a legal disclaimer.

## Non-Goals

- Do not build an admin dashboard in v1; use Convex directly for raw export and inspection.
- Do not require email verification in v1.
- Do not use CAPTCHA in v1.
- Do not collect optional reasons or testimonial copy in v1.
- Do not add Vercel Speed Insights in v1.
- Do not make the site a full market research report.
- Do not make the main experience a multi-page story.

## Audience

Primary audience: Serbian consumers who would want Sprite Zero if it were available locally.

Decision-maker audience: Coca-Cola Serbia and local product stakeholders who may be influenced by the public demand signal.

## Core Narrative

Use the Missing From The Fridge Story:

Serbian zero-sugar consumers already have the moments where Sprite Zero belongs, but the product is absent from the fridge, shelves, cafes, and everyday routines.

The five-part story arc:

1. Empty Fridge Hero: a cold fridge scene where the Sprite Zero space is visibly empty.
2. Serbian Moments: summer city heat, late-night food, study/work breaks, and sport or walks by the river.
3. Zero-Sugar Shift: Serbia already understands the choice of refreshment without sugar.
4. Serbia Demand Map: real votes appear as animated city pins and count bubbles.
5. Final Ask: ask Coca-Cola Serbia to bring Sprite Zero where people are already asking for it.

## Copy Direction

Language: Serbian Latin only.

Tone: cinematic but direct. Avoid forced youth slang, meme copy, or corporate pitch language.

Product naming:

- Use "Sprite Zero" as the product name.
- Use "bez šećera" as the explanatory Serbian phrase.
- Avoid "Sprite Zero Sugar" unless needed for factual reference.

Primary CTA:

```text
Hoću Sprite Zero u Srbiji
```

Hero line direction:

```text
Jedno mesto u frižideru je još prazno.
```

Final ask direction:

```text
Coca-Cola Srbija, donesite Sprite Zero tamo gde ga ljudi već traže.
```

Include a short factual availability gap note in the zero-sugar shift section:

```text
Sprite Zero postoji na drugim tržištima. U Srbiji ga još nema.
```

Before publishing, verify any factual availability wording against current public sources.

## Visual Direction

Use a fixed cinematic theme:

- cold dark atmosphere
- green, white, ice, fizz, and lemon-lime highlights
- realistic beverage cues: cold glass, fizz, lemon-lime slices, ice, fridge light, condensation, and can/bottle silhouettes
- original Sprite-inspired visual language

The campaign may name Sprite Zero, but visuals should be concept product visuals and should avoid copying official Sprite or Coca-Cola logo files. Keep the unofficial disclosure quiet in the footer and privacy page, not in the main hero or story beats.

## Video And Asset Plan

Use Runway-first video loops for v1:

1. Empty Fridge Hero loop.
2. Serbian Moments loop.
3. Final Ask loop.

Loops should be atmospheric video loops:

- background mood, light, cold, fizz, and motion
- no AI-generated readable text
- no AI-generated product labels that carry important meaning
- all readable copy, forms, counts, and CTAs must be rendered in React UI

Other sections may use generated still imagery, CSS, SVG, Canvas, and GSAP instead of full video.

## UX Structure

The main campaign is a single-page cinematic scroll experience with a separate `/privacy` route.

Voting should be available immediately from the hero via the primary CTA. The story persuades undecided visitors, but it must not gate motivated visitors.

Use focused vote entry:

- CTAs open a compact modal or drawer.
- The final ask section may include an embedded full form.
- Avoid repeated inline forms across the page.

Hero should be emotion-first:

- no live vote number in the hero
- lead with the empty fridge story, cinematic feeling, and primary CTA
- demand proof appears later in the page and after voting

After a successful vote:

- reveal or scroll to the Serbia demand map
- highlight the voter city pin with a pulse or brief "+1"
- show a friendly share prompt

Duplicate email behavior:

- do not show an error
- show an already-counted success state
- continue to map reveal and sharing

## Vote Form

Fields:

- Email address
- City/municipality selected from the Serbian Location List
- Invisible honeypot field

No reason/testimonial field in v1.

No required consent checkbox. Use submission-based consent with short explanatory copy near submit:

```text
Slanjem emaila i mesta glasaš da Sprite Zero dođe u Srbiju. Email koristimo za brojanje interesovanja i eventualno obaveštenje o kampanji.
```

The form must support:

- email autofill
- keyboard navigation
- labels
- focus management in modal/drawer
- ESC close
- submission that is not blocked by animation

## Serbian Location List

The selector should include all official Serbian cities and municipalities, including Kosovo municipalities, represented as selectable places for demand counting and map pins.

Avoid free-text city entry. Free text would create messy map data such as Beograd/Belgrade/BG/typos.

Each location should include:

- display name
- normalized id/slug
- approximate latitude and longitude or map coordinates for pin placement

## Demand Map

Use a stylized Serbia silhouette:

- simplified Serbia-shaped outline including Kosovo
- no district borders
- no municipality boundaries
- no political labels
- animated city pins and count bubbles

The demand map should use real data only:

- no fake seed votes
- no simulated city counts
- polished zero-state is allowed
- counts appear only after real email-backed votes exist

Live demand counts are real and may be shown publicly in the demand section and after voting, but should not lead the hero experience.

## Backend

Use Convex for v1 vote storage, per ADR-0001.

Required behavior:

- mutation accepts email, selected location id, and metadata needed for protection
- normalize email before dedupe
- dedupe by normalized email
- immediately accept the vote if not already counted
- return already-counted state for duplicates
- keep raw emails private
- public queries return only aggregate total and per-location counts
- basic rate limiting and honeypot protection

Suggested vote record fields:

- normalizedEmail
- email
- locationId
- createdAt
- userAgent hash or lightweight metadata if useful for abuse controls
- consentCopyVersion

Do not expose raw vote records to the public frontend.

## Analytics

Use Vercel Analytics in v1.

Track:

- page views
- primary CTA click
- vote modal/drawer opened
- vote submitted
- vote counted
- duplicate already-counted state
- share action clicked

Vercel Analytics is supporting telemetry. Convex email-backed votes are the demand signal.

Do not add Vercel Speed Insights in v1.

## Privacy

Add a `/privacy` route.

It should explain:

- what data is collected: email, selected city/municipality, timestamp, and basic technical abuse-prevention metadata if used
- why it is collected: count demand for Sprite Zero in Serbia and possible campaign-related contact
- what is shown publicly: only aggregate counts and location-level counts
- what is not shown publicly: raw email addresses and individual identities
- how to request deletion or contact the campaign owner

The footer may include a quiet public/unofficial campaign disclosure and privacy link. Do not place heavy disclaimer copy in the hero.

## Accessibility And Motion

Support reduced motion:

- respect `prefers-reduced-motion`
- avoid aggressive scroll/parallax behavior for reduced-motion users
- keep story comprehension available without animation

General requirements:

- mobile-first layout
- desktop still feels premium and cinematic
- text must remain readable over video and imagery
- buttons/forms must be usable on touch devices
- no layout shift caused by hover, animation, dynamic counts, or form states

## SEO And Sharing

Include Serbian SEO and social metadata:

- title
- description
- Open Graph image
- Twitter/social card metadata

The OG image should use the empty-fridge or cold lemon-lime concept and should not depend on official logo files.

Share after vote should support:

- copy link
- native share API where available
- prepared Serbian share text

## Deployment

Use Vercel for development previews and deployment.

Use a Vercel subdomain for development. A dedicated public domain can be decided later.

## Acceptance Criteria

- The main route renders a polished single-page cinematic campaign.
- The `/privacy` route exists and is linked from the footer and vote form note.
- The hero uses emotion-first copy and does not show live vote numbers.
- The primary CTA text is "Hoću Sprite Zero u Srbiji".
- Vote modal/drawer accepts email and selected Serbian city/municipality.
- City/municipality selector is controlled, not free text.
- Convex stores votes and deduplicates by normalized email.
- Duplicate emails receive a friendly already-counted success state.
- Public frontend can query aggregate totals and per-location counts only.
- Serbia demand map shows real data only and has a polished zero state.
- After voting, the page reveals or scrolls to the demand map and highlights the voter city.
- Post-vote sharing is available.
- Vercel Analytics is installed and tracks the agreed events.
- No Vercel Speed Insights dependency is included in v1.
- Motion respects `prefers-reduced-motion`.
- Mobile layout is first-class and desktop layout remains cinematic.
- Three video loop slots exist for hero, Serbian moments, and final ask, with still/placeholder fallbacks while final Runway assets are pending.

## Open Questions

- Which exact Runway prompts and source stills will be used for the three video loops?
- What email/contact address should the privacy route use for deletion requests?
- What Vercel project/team will host the development subdomain?
- Should implementation issues be generated now or after the first design pass?
