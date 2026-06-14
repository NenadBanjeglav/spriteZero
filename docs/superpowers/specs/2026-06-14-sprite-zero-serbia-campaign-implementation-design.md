# Sprite Zero Serbia Campaign Implementation Design

## Source And Scope

Source PRD: `.scratch/sprite-zero-serbia-campaign/PRD.md`

This document is the implementation-ready v1 design for the Sprite Zero Serbia Public Demand Campaign. It does not replace the PRD. The PRD remains the product source of truth for audience, goals, non-goals, narrative, copy direction, and acceptance criteria.

This design defines how the Vite React app, Convex backend, Serbia Demand Map, Email-Backed Vote flow, cinematic motion, campaign assets, analytics, privacy route, and deployment checks should fit together.

The v1 campaign must implement the 7-beat Expanded Cinematic Story Arc:

1. Cover Intro
2. Empty Fridge Hero
3. World Contrast Scene
4. Serbia Demand Map
5. Imagine It Here Scene
6. Final Ask
7. Open Letter

## Target Architecture

The app remains a Vite + React + Tailwind single-page campaign with a separate `/privacy` route. It uses Convex for vote storage and aggregate demand queries, Vercel Analytics for non-identifying event telemetry, and Vercel for previews and deployment.

`src/App.tsx` owns route selection, campaign page composition, vote modal or drawer state, post-vote map reveal, share actions, and privacy route rendering. It may delegate sections and primitives as the file grows, but the public route behavior stays there unless a broader app routing decision is made.

Shared modules keep narrow responsibilities:

- `src/voteBackend.ts` wraps Convex vote hooks and frontend vote result types.
- `src/voteLocations.ts` exposes and searches the canonical Serbian Location List from Convex.
- `src/demandMap.ts` maps aggregate counts to visible map pins.
- `src/analytics.ts` wraps Vercel Analytics events and prevents identifying metadata from leaking into telemetry.
- `convex/locations.ts` remains the canonical Serbian Location List used by Convex validation and React UI.
- `convex/votes.ts` owns vote submission, email normalization, deduplication, honeypot handling, rate limiting, and aggregate public totals.

Public frontend data is limited to total votes and per-location counts. Raw email, normalized email, client id, user agent hash, individual timestamps, and per-vote records stay private.

The current Convex aggregate query collects all votes to compute totals. This is acceptable for a small v1 campaign, but it is a documented scale limit. If demand grows, replace it with denormalized aggregate documents updated transactionally during vote submission.

## Campaign Page Structure

The main route should render one conceptual React section per story beat. Shared primitives should handle repeated cinematic media, section headings, CTA buttons, and copy blocks so the implementation stays coherent without turning each beat into bespoke code.

Tests should assert the seven public sections by accessible names and visible copy, not by internal component names.

### 1. Cover Intro

Purpose: create mystery before the fridge reveal.

The section should use a concise absence statement in Serbian Latin and establish the cold, dark, lemon-lime atmosphere. It should not show live vote counts, demand proof, or form fields. If a CTA appears here, it should be visually quieter than the Empty Fridge Hero CTA and keep the absence statement dominant.

### 2. Empty Fridge Hero

Purpose: deliver the Emotion-First Hero.

The hero shows the cold fridge scene where the Sprite Zero space is visibly empty. It includes the primary CTA text:

```text
Hoću Sprite Zero u Srbiji
```

It must not show live vote numbers. Demand proof appears later in the page and after voting.

### 3. World Contrast Scene

Purpose: explain the availability gap without becoming a market report.

This beat should include the factual note:

```text
Sprite Zero postoji na drugim tržištima. U Srbiji ga još nema.
```

Before public publishing, verify the factual availability wording against current public sources. The section should avoid rankings, unsupported market claims, or a research-heavy treatment.

### 4. Serbia Demand Map

Purpose: turn Email-Backed Votes into visible real-data demand proof.

The section uses a stylized Serbia silhouette including Kosovo, without district borders, municipality boundaries, or political labels. It shows a polished zero state until real aggregate counts exist. City pins, count bubbles, top-location lists, and totals must come only from Convex aggregate data.

After a counted or already-counted vote, the page reveals or scrolls to this section, highlights the selected location, and shows Share After Vote actions.

### 5. Imagine It Here Scene

Purpose: show Sprite Zero fitting naturally into Serbian everyday moments without implying official launch or availability.

The scene should reference Serbian Moments such as summer city heat, late-night food, study or work breaks, and sport or walks by the river. Visuals remain concept product visuals and Sprite-inspired, not copied official packshots or logo files.

### 6. Final Ask

Purpose: address the Decision-Maker Audience directly after desire and demand proof have been established.

Use Coca-Cola HBC Srbija consistently as the addressee:

```text
Coca-Cola HBC Srbija, donesite Sprite Zero tamo gde ga ljudi već traže.
```

The section should include a primary CTA or a focused embedded vote form. It must not claim an official launch, affiliation, or endorsement.

### 7. Open Letter

Purpose: close with a readable serious request after the cinematic story.

The Open Letter should restate the campaign request, why the demand signal matters, and how aggregate votes are being shown. It may include quiet unofficial campaign framing and a privacy link. It should not become a legal page or a long market research report.

## Vote Flow

The campaign uses Focused Vote Entry:

- CTAs open one compact modal or drawer.
- The final ask may include an embedded full form.
- Repeated inline forms across the page are out of scope for v1.

Fields:

- Email address with browser autofill support.
- City or municipality selected from the Serbian Location List.
- Invisible honeypot field.
- Hidden `consentCopyVersion`.

There is no required consent checkbox. Submission-based consent copy appears near submit:

```text
Slanjem emaila i mesta glasaš da Sprite Zero dođe u Srbiju. Email koristimo za brojanje interesovanja i eventualno obaveštenje o kampanji.
```

Required behavior:

- Keyboard navigation and visible labels are required.
- Modal or drawer focus moves to the form on open.
- Escape closes the modal or drawer.
- Animation must not block typing, selecting a location, or submitting.
- Counted votes close the entry surface, reveal the demand map, highlight the selected location, and show sharing.
- Already-Counted Votes use the same success path and must not show a duplicate error.
- Honeypot-protected submissions do not create public demand counts.

## Convex Data Contract

The vote mutation accepts:

- `email`
- `locationId`
- `consentCopyVersion`
- `honeypot`
- optional `clientId`
- optional non-identifying abuse metadata such as `userAgentHash`

The mutation must:

- Normalize email before deduplication.
- Validate `locationId` against `validLocationIds`.
- Deduplicate by normalized email.
- Return `{ status: "counted", locationId }` for new votes.
- Return `{ status: "already_counted", locationId }` for duplicate emails, using the original counted location.
- Return `{ status: "protected", locationId }` for honeypot submissions.
- Keep raw email and normalized email private.
- Record vote attempts for low-friction abuse control.

The public totals query returns only:

- `total`
- `byLocation: Array<{ locationId: string; count: number }>`

The public query must not expose raw vote records, email addresses, normalized emails, client ids, user agent hashes, or timestamps.

## Serbian Location List

`convex/locations.ts` owns the canonical Serbian Location List. React imports through `src/voteLocations.ts`; app source must not duplicate ids or create a second list.

The selector stays controlled, not free text. Search may accept Latin input with or without diacritics, but selected values must be stable canonical ids.

The list includes all official Serbian cities and municipalities, including Kosovo municipalities, with approximate latitude and longitude for map placement.

## Analytics And Sharing

Use Vercel Analytics for supporting telemetry only. Convex Email-Backed Votes remain the demand signal.

Track these events with non-identifying metadata only:

- `primary_cta_clicked`
- `vote_entry_opened`
- `vote_submitted`
- `vote_counted`
- `vote_already_counted`
- `share_clicked`

Do not send raw emails, normalized emails, location plus identity combinations, client ids, or user agent hashes to analytics.

Share After Vote supports native share where available and copy-link fallback. Prepared share text stays in Serbian Latin and links to the campaign root.

## Motion And Assets

React owns UI state, forms, sharing, accessibility states, and data rendering. Cinematic animation must not block demand interactions.

GSAP ScrollTrigger owns:

- pinned cinematic sections
- scrubbed text and media reveals
- scene holds
- scroll-linked transitions

Lenis owns smooth scrolling and must be synchronized with ScrollTrigger.

Reduced-motion users get still images, readable sections, no aggressive parallax, and no video autoplay requirement. Story comprehension must not depend on animation.

The v1 asset plan has three video loop slots:

- Empty Fridge Hero
- Imagine It Here, using the Serbian Moments asset direction
- Final Ask

Generated stills and development loops may support implementation and testing. Final Runway production loops remain gated on human approval of prompts and rendered files. Video loops must not contain AI-generated readable text or labels that carry important meaning; all readable campaign copy, counts, forms, and CTAs are rendered by React.

## Privacy And Disclosure

The `/privacy` route explains:

- collected data: email, selected city or municipality, timestamp, consent copy version, and abuse-prevention metadata if used
- purpose: count demand for Sprite Zero in Serbia and possible campaign-related contact
- public display: aggregate total and location-level counts only
- private data: raw email addresses and individual identities
- deletion/contact process

Before public launch, replace the placeholder privacy contact with the campaign owner's chosen contact address.

The footer and privacy page may include quiet unofficial campaign disclosure. The hero and main story beats should not carry heavy disclaimer copy.

## SEO And Deployment

`index.html` owns Serbian SEO, Open Graph, and Twitter metadata. Metadata must stay Serbian Latin and use an original empty-fridge or cold lemon-lime concept image, not official logo files.

Use Vercel for previews and public deployment. Vercel Speed Insights remains out of v1 scope.

## Current Implementation Gaps

The current app has useful groundwork: Convex vote storage, a controlled Serbian Location List, aggregate demand map rendering, share actions, Vercel Analytics wrappers, a privacy route, SEO metadata, generated stills, and development video loops.

The main gaps to close for the target v1 contract are:

- The app and tests still mostly express a 5-part story shape; they must move to the 7-beat Expanded Cinematic Story Arc.
- GSAP, ScrollTrigger, and Lenis are specified in the PRD and ADRs but are not integrated as the primary cinematic scroll system.
- The final ask currently uses inconsistent addressee copy in places; target copy uses Coca-Cola HBC Srbija.
- The privacy route still contains a placeholder contact address.
- The Open Letter beat is not yet a distinct public section.
- The Cover Intro and World Contrast Scene need distinct public sections.
- Production Runway loops are not final and remain human-approval gated.
- The Convex aggregate query is simple and should be revisited if vote volume grows.

## Implementation Sequencing

1. Update the campaign composition and tests to render seven accessible public sections.
2. Normalize copy for Coca-Cola HBC Srbija, the availability gap note, and the Open Letter.
3. Add or extract shared section primitives only where they reduce duplication across the seven beats.
4. Integrate GSAP ScrollTrigger and Lenis for cinematic scroll while preserving reduced-motion behavior.
5. Verify vote modal, duplicate success, protected submissions, map reveal, share actions, and aggregate-only display still pass.
6. Replace the placeholder privacy contact before public launch.
7. Keep production Runway loop replacement behind human approval of prompts and rendered assets.
8. Run `npm.cmd test -- --run` and `npm.cmd run build` before closing app-source changes.
9. For Convex schema or function changes, run `npm.cmd test -- --run`; run `npx convex dev --once` when credentials are available.
10. Before launch, do a browser pass over `/` and `/privacy` on mobile and desktop, including reduced motion if possible.

## Acceptance Trace

This design is complete when:

- The main route exposes seven public story sections matching the PRD arc.
- Vote entry remains focused, accessible, and animation-independent.
- Convex stores Counted Votes and returns aggregate-only public totals.
- The Serbia Demand Map uses real data only.
- Post-vote map reveal, Voter City Highlight, and Share After Vote work for counted and already-counted states.
- Analytics events are installed without identifying metadata.
- `/privacy` and footer disclosure are present without weakening the main cinematic story.
- GSAP ScrollTrigger and Lenis own cinematic scroll behavior, with reduced-motion alternatives.
- SEO/social metadata is Serbian Latin and does not use official logo files.
