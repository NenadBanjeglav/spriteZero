# Campaign Shell With Emotion-First Hero

Status: ready-for-agent

## What to build

Build the initial campaign shell for the Single-Page Campaign Experience. The visitor should land on an Emotion-First Hero that communicates the Empty Fridge Hero, uses the Primary CTA, opens the Focused Vote Entry placeholder, and links to the Privacy Route. The shell should establish the Fixed Cinematic Theme and be ready for later Convex, map, and story-section integration.

## Acceptance criteria

- [x] A Vite + React + Tailwind app is scaffolded and runs locally.
- [x] The main route renders a mobile-first Emotion-First Hero using Serbian Latin copy.
- [x] The Primary CTA text is "Hoću Sprite Zero u Srbiji".
- [x] Clicking the Primary CTA opens a modal or drawer placeholder for Focused Vote Entry.
- [x] A `/privacy` route exists with placeholder privacy content and is reachable from the footer.
- [x] The shell uses the Fixed Cinematic Theme without light/dark theme switching.
- [x] The layout works on mobile and desktop without text overlap or horizontal scrolling.

## Blocked by

None - can start immediately.

## Comments

### 2026-06-14 - Agent implementation

- Implemented the initial Vite + React + Tailwind campaign shell with an Emotion-First Hero, generated Empty Fridge Hero bitmap, Primary CTA, Focused Vote Entry placeholder modal, footer privacy link, and `/privacy` placeholder route.
- Added behavior tests for hero copy/no live-number lead, CTA dialog opening, footer privacy link, and `/privacy` route rendering.
- Verification: `npm.cmd test -- --run`; `npm.cmd run build`; Vite preview returned `200` for `/` and `/privacy`; Playwright responsive metrics passed at `1440x950` and `390x844` with no horizontal overflow, no checked text out of bounds, loaded hero image, and modal contained inside the viewport.
- Local dev server for review is running at `http://127.0.0.1:5187/` because `5173` was already occupied by another local app.
