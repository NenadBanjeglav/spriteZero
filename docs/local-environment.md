# Local Environment

## Convex

- Install packages with `npm.cmd install`.
- Provision and validate the local anonymous Convex deployment:

```powershell
$env:CONVEX_AGENT_MODE='anonymous'; npx.cmd convex dev --once
```

- The command writes `.env.local` with `CONVEX_DEPLOYMENT`, `VITE_CONVEX_URL`, and `VITE_CONVEX_SITE_URL`.
- Run the full local dev loop with `npm.cmd run dev`. This starts `convex dev` and Vite together.
- Use `npm.cmd run dev:web` only when Convex is already running separately.

## Human-Owned Setup

- A public or team Convex deployment requires the campaign owner to run `npx.cmd convex login` and connect the project to the intended Convex account/team.
- Do not commit `.env.local`; use `.env.example` as the safe placeholder list.

## Verification

- `npm.cmd test -- --run`
- `npm.cmd run build`
- `npx.cmd convex dev --once`
