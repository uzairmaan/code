# FreightFlow — project guide for Claude

Premium marketing site for a truck-dispatching business (semi-trucks, box
trucks, hotshots), adapted from a private-jet landing-page aesthetic.

## Resuming in-progress work
**Read `HANDOFF.md` first** — it captures the current state, settled design
decisions, and the next task. (Web sessions don't inherit prior chat history;
that file is the handoff.)

## Stack & commands
- Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v3 · Framer Motion
  · GSAP/ScrollTrigger · Three.js · Lenis.
- `npm run dev` · `npm run build` · `npm run type-check`
- GitHub Pages static export: `GITHUB_PAGES=true npm run build` (outputs `/out`,
  served under the `/code` base path).

## Conventions
- **Theme:** light premium — gray-50 surfaces, white cards, `#202A36` ink CTAs,
  Inter type, pill buttons. (A dark theme was tried and rejected; keep it light.)
- **Branch:** develop on `claude/freightflow-dispatch-design-5029yx`; open PRs as
  draft against `main`.
- **Verify visually:** the user judges by the deployed preview, so build the app
  and screenshot-verify changes before reporting them done.
- Detailed brief: `FREIGHTFLOW_PROJECT_PLAN.md`.
