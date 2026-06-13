# Purpose

- Own the Vite React single-page campaign application source and source-adjacent tests.

# Ownership

- React components, route state, Tailwind styles, UI behavior, and imported campaign assets live under this folder.
- Root configuration files own build, dependency, and test runner setup.

# Local Contracts

- Public UI copy must use Serbian Latin only.
- The campaign uses a Fixed Cinematic Theme; do not add light/dark theme switching.
- The hero must remain Emotion-First: no live vote numbers or stats-led opening.
- Preserve accessibility for Focused Vote Entry placeholders, including labels, focusable controls, and ESC close behavior when implemented.

# Work Guidance

- Build mobile-first layouts, then enhance desktop composition.
- Respect `prefers-reduced-motion` for cinematic effects.
- Keep tests behavior-focused through public UI rather than component internals.

# Verification

- Run `npm.cmd test -- --run` for app behavior tests.
- Run `npm.cmd run build` before completing app-source changes.

# Child DOX Index

- `assets/` - Imported campaign visual assets. Read `src/assets/AGENTS.md` before changing assets.
