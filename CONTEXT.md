# Sprite Zero Serbia Campaign

This context defines the language for a public campaign website that presents demand for Sprite Zero in the Serbian market.

## Language

**Public Demand Campaign**:
A public-facing campaign that invites Serbian consumers to express interest in Sprite Zero and turns that interest into a visible demand signal.
_Avoid_: Pitch deck, landing page, petition

**Decision-Maker Audience**:
The business audience the campaign is meant to influence, especially Coca-Cola HBC Srbija and its local product stakeholders.
_Avoid_: Client, company, brand owner

**Demand Signal**:
Evidence that Serbian consumers want Sprite Zero, such as votes, signups, city-level interest, or short responses.
_Avoid_: Engagement, hype, buzz

**Email-Backed Vote**:
The primary demand signal: a visitor confirms interest in Sprite Zero in Serbia by submitting an email address and city.
_Avoid_: Like, reaction, anonymous vote

**Controlled City Vote**:
An email-backed vote whose city is selected from a Serbian city autocomplete or select list, keeping demand map data consistent.
_Avoid_: Free-text city, typo-prone location, unstructured place entry

**Serbian Location List**:
The vote selector's location coverage: all official Serbian cities and municipalities, including Kosovo municipalities, represented as selectable places for demand counting and map pins.
_Avoid_: Major-cities-only list, village-level selector, free-text place entry

**Counted Vote**:
An email-backed vote that is accepted immediately and deduplicated by normalized email address.
_Avoid_: Verified vote, pending signup, anonymous count

**Already-Counted Vote**:
The friendly success state shown when a submitted email has already been counted, keeping the visitor in the map and share flow instead of treating it as an error.
_Avoid_: Duplicate error, rejected voter, blocked share flow

**Invisible Vote Protection**:
Low-friction anti-spam controls for voting, such as email deduplication, honeypot fields, and rate limiting, without visible CAPTCHA.
_Avoid_: CAPTCHA, friction-heavy verification, unprotected public form

**Missing From The Fridge Story**:
The campaign narrative: Serbian zero-sugar consumers already have the occasions and desire for Sprite Zero, but the product is visibly absent from local shelves, cafés, and everyday moments.
_Avoid_: Product launch story, availability notice

**Serbian Moments**:
The everyday scenes where Sprite Zero would fit: summer city heat, late-night food, study or work breaks, and sport or walks by the river.
_Avoid_: Tourism montage, stereotype reel, generic stock lifestyle

**Concept Product Visual**:
A cinematic depiction of Sprite Zero as an imagined product for Serbia, used to show demand without implying official local availability or endorsement.
_Avoid_: Official packshot, Serbian launch asset, retail listing

**Sprite-Inspired Visual Language**:
Original campaign visuals that evoke lemon-lime refreshment, cold fizz, green-white energy, and zero-sugar contrast without copying official Sprite or Coca-Cola logo files.
_Avoid_: Official logo reuse, copied brand assets, fake launch creative

**Realistic Beverage Cues**:
Concrete product-adjacent visuals such as cold glass, fizz, lemon-lime slices, ice, fridge light, condensation, and can or bottle silhouettes.
_Avoid_: Abstract-only emotion, generic green atmosphere, unreadable product fantasy

**Quiet Campaign Disclosure**:
A secondary disclosure that the campaign is public, unofficial, and not affiliated with The Coca-Cola Company or Coca-Cola HBC Srbija, kept out of the main cinematic story and placed only where credibility or legal clarity requires it, such as the footer or privacy page.
_Avoid_: Hero disclaimer, intrusive legal copy, official endorsement claim

**Serbian Latin Voice**:
The campaign's writing language and script: Serbian in Latin script, with no Cyrillic toggle in the first version.
_Avoid_: English-first copy, bilingual copy, Cyrillic mode

**Cinematic Direct Tone**:
The campaign copy style: emotional and visual, but still concise, credible, and direct enough for both Serbian consumers and the decision-maker audience.
_Avoid_: Youth slang, corporate pitch copy, meme copy

**Scroll-Driven Cinematic Motion**:
The primary animation style: GSAP ScrollTrigger and Lenis powered scroll reveals, parallax, light, condensation, fizz, scene transitions, and map pin motion that support the story without blocking usability.
_Avoid_: Constant motion, decorative animation, form-blocking effects

**Reduced-Motion Respect**:
The accessibility rule that cinematic effects must honor `prefers-reduced-motion` with calmer transitions and no aggressive scroll/parallax behavior.
_Avoid_: Forced motion, animation-only comprehension, inaccessible spectacle

**Generated Cinematic Imagery**:
Custom generated bitmap scenes used as the visual base for the hero and story moments, with CSS and GSAP overlays adding light, fizz, condensation, and motion.
_Avoid_: Pure abstract visuals, generic stock imagery, copied official brand assets

**Runway-First Video Loops**:
The v1 asset workflow: create strong still frames, animate key moments into short cinematic loops with Runway, and use still images plus GSAP where full video is unnecessary.
_Avoid_: Full video-only site, static-only prototype, unmanaged AI video montage

**Three-Loop Video Scope**:
The v1 video asset boundary: one loop for the empty fridge hero, one for Serbian moments, and one for the final ask.
_Avoid_: Video in every section, long-form film, unmanaged video library

**Atmospheric Video Loop**:
A short background video used for mood, light, cold, fizz, and motion while readable copy, forms, counts, and CTAs stay in the website UI.
_Avoid_: AI-generated text, readable packaging labels, video-only messaging

**Empty Fridge Hero**:
The opening cinematic moment: a cold fridge scene where zero-sugar choices exist, but the Sprite Zero space is visibly empty.
_Avoid_: Product hero, launch announcement, generic beverage hero

**Expanded Cinematic Story Arc**:
The campaign structure: cover intro, empty fridge, world contrast, Serbia demand, imagined local arrival, final ask, and open letter.
_Avoid_: Five-part-only arc, long microsite, product catalogue, corporate presentation

**World Contrast Scene**:
The story beat that shows Sprite Zero exists in other markets while Serbia still lacks the same zero-sugar lemon-lime choice.
_Avoid_: Market report, country ranking, travel brag

**Imagine It Here Scene**:
The story beat that shows Sprite Zero fitting naturally into Serbian everyday moments as a desired future rather than a launch claim.
_Avoid_: Official launch scene, retail availability claim, generic product fantasy

**Open Letter**:
A readable closing support section that states the campaign's serious request to Coca-Cola HBC Srbija after the cinematic story.
_Avoid_: Legal page, complaint letter, petition wall

**Single-Page Campaign Experience**:
The main site structure: one continuous cinematic scroll page for the campaign story, with separate utility routes only where needed.
_Avoid_: Multi-page story, route-per-section, fragmented campaign flow

**Mobile-First Cinematic Layout**:
The responsive layout priority: the campaign must work beautifully on mobile first while still feeling premium and cinematic on desktop.
_Avoid_: Desktop-only spectacle, mobile fallback, cramped phone layout

**Fixed Cinematic Theme**:
The campaign's single visual theme: cold, dark, cinematic atmosphere with green, white, ice, fizz, and lemon-lime highlights.
_Avoid_: Light mode, theme switcher, generic dark mode

**Final Ask**:
A closing message addressed to Coca-Cola HBC Srbija: bring Sprite Zero to the Serbian places where people are already asking for it.
_Avoid_: Demand letter, complaint, launch claim

**Availability Gap Note**:
A brief factual story beat that says Sprite Zero exists in other markets while Serbia still does not have it, used to support demand without turning the page into a research report.
_Avoid_: Research-heavy explainer, market report, unsupported launch claim

**Zero-Sugar Choice Frame**:
The campaign's zero-sugar message: Serbian consumers should have the choice of lemon-lime refreshment without sugar, without making health or fitness claims.
_Avoid_: Health claim, diet promise, fitness positioning

**Sprite Zero Naming**:
The campaign names the desired product as Sprite Zero and uses "bez šećera" as the Serbian explanatory phrase.
_Avoid_: Sprite Zero Sugar, Serbianized product name, inconsistent naming

**Vote Consent**:
The visitor's submission-based consent: short form copy explains that submitting an email and city counts demand for Sprite Zero in Serbia and may be used for campaign-related contact, without adding a required checkbox.
_Avoid_: Newsletter opt-in, marketing permission, hidden consent, required consent checkbox

**Privacy Route**:
A separate privacy page that explains what vote data is collected, why it is collected, and how it is used.
_Avoid_: Hidden privacy copy, modal-only privacy note, legal clutter in the story

**Share After Vote**:
The post-vote moment where a visitor is invited to spread the campaign after their email-backed vote is counted.
_Avoid_: Follow-up survey, newsletter upsell, generic thank-you

**Post-Vote Map Reveal**:
The success behavior after a counted vote: reveal or scroll to the Serbia demand map so the visitor sees their city become part of the demand proof.
_Avoid_: Static thank-you, dead-end confirmation, hidden impact

**Voter City Highlight**:
The post-vote map feedback: the voter's selected city pin pulses or shows a brief "+1" without exposing personal data.
_Avoid_: Personal identification, raw email display, anonymous action with no visible effect

**Share Metadata**:
Serbian SEO and social preview metadata for the campaign, including title, description, and an Open Graph image that supports sharing.
_Avoid_: Generic meta tags, English-first previews, missing social image

**Focused Vote Entry**:
The voting interaction pattern: CTAs open a compact modal or drawer, while the final ask can include a full embedded vote form.
_Avoid_: Repeated inline forms, survey flow, distracting signup wall

**Accessible Vote Entry**:
The accessibility behavior for the vote modal or drawer: labels, keyboard support, focus management, ESC close, email autofill, and no animation blocking submission.
_Avoid_: Mouse-only voting, unlabeled form, animation-blocked form

**Primary CTA**:
The campaign's main action text: "Hoću Sprite Zero u Srbiji".
_Avoid_: Sign up, join waitlist, submit interest

**Serbia Demand Map**:
A visual map of Serbia that shows where email-backed votes are coming from, with animated city pins and count bubbles.
_Avoid_: Top-cities-only list, abstract analytics chart, fake heat map

**Stylized Serbia Silhouette**:
The map treatment: a simplified Serbia-shaped outline including Kosovo, without district borders, municipality boundaries, or political labels.
_Avoid_: Detailed political map, district choropleth, cropped Serbia outline

**Live Demand Count**:
The exact vote total and city pin counts are based on real email-backed votes and can be shown publicly without fake thresholds, but the experience may reveal them after voting or in the demand section rather than before the main CTA.
_Avoid_: Hidden threshold, simulated momentum, delayed public count

**Emotion-First Hero**:
The hero avoids live numbers and leads with the missing-fridge story, cinematic feeling, and primary CTA before showing demand proof later.
_Avoid_: Stats-first hero, counter-led landing page, analytics in the opening moment

**Vercel Analytics Signal**:
First-party Vercel Analytics used to understand visits, CTA clicks, and vote conversion alongside Convex demand counts.
_Avoid_: Invasive tracking, ad-tech analytics, analytics as demand proof

**Vercel Deployment**:
The v1 hosting target for the campaign site, used for public deployment, previews, and Vercel Analytics.
_Avoid_: Static-only local hosting, custom server deployment, non-Vercel analytics host

**Real-Data Zero State**:
The demand map's empty state: polished city labels and atmosphere are allowed, but counts appear only after real email-backed votes exist.
_Avoid_: Fake seed votes, simulated city counts, placeholder metrics
