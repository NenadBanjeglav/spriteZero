# Purpose

- Own the Vite React single-page campaign application source and source-adjacent tests.

# Ownership

- React components, route state, Tailwind styles, UI behavior, and imported campaign assets live under this folder.
- Root configuration files own build, dependency, and test runner setup.

# Local Contracts

- Public UI copy must use Serbian Latin only.
- Use the canonical Serbian Location List from `convex/locations.ts` for Controlled City Vote UI; do not duplicate location ids in app source.
- The campaign uses a Fixed Cinematic Theme; do not add light/dark theme switching.
- The hero must remain Emotion-First: no live vote numbers or stats-led opening.
- Preserve accessibility for Focused Vote Entry placeholders, including labels, focusable controls, and ESC close behavior when implemented.
- Vercel Analytics events must use non-identifying metadata only; never send raw emails, normalized emails, or individual identity values.

# Work Guidance

- Build mobile-first layouts, then enhance desktop composition.
- Respect `prefers-reduced-motion` for cinematic effects.
- When adding GSAP cinematic animation, register plugins once at module scope, use `useGSAP` with refs and scoped selectors, and set `revertOnUpdate: true` when responsive measurements rebuild.
- Prefer pinned, scrubbed ScrollTrigger timelines for long narrative sections; use viewport-relative `end` values, `invalidateOnRefresh`, and top-level timeline/tween triggers only.
- Choreograph timelines with position parameters such as `<`, `-=...`, and `+=...` instead of delay-heavy sequencing.
- For mask reveals, keep the mask in CSS and animate `maskPosition` or `maskSize`; measure DOM targets with `getBoundingClientRect()` when the animation must land on visible artwork.
- Keep responsive animation constants centralized in hooks or constants instead of scattering breakpoint-specific values through components.
- For scroll-scrubbed videos, tween `currentTime` after metadata loads; use `ease: "none"` when scroll distance must map directly to frames, and cinematic eases only when non-linear playback is intentional.
- Use negative margins and independent parallax tweens deliberately for overlapping cinematic sections, with reduced-motion alternatives.
- Keep tests behavior-focused through public UI rather than component internals.

# Verification

- Run `npm.cmd test -- --run` for app behavior tests.
- Run `npm.cmd run build` before completing app-source changes.

# Child DOX Index

- `assets/` - Imported campaign visual assets. Read `src/assets/AGENTS.md` before changing assets.
