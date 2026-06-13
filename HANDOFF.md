# Session Handoff — FreightFlow

> Purpose: let a **fresh Claude Code (web) session** continue this work without the
> previous chat history. The old session ran in an ephemeral container whose
> transcript is gone; everything that matters is captured here + in git.
>
> **To resume:** start a new web session on branch
> `claude/freightflow-dispatch-design-5029yx` and say:
> _"Read HANDOFF.md and continue."_

## What this project is

FreightFlow — a premium marketing site for a truck-dispatching business
(semi-trucks, box trucks, hotshots). Adapted from the "SkyElite" private-jet
landing-page aesthetic.

- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v3 ·
  Framer Motion · GSAP/ScrollTrigger · Three.js · Lenis smooth scroll.
- **Branch:** `claude/freightflow-dispatch-design-5029yx`
- **PR:** #1 (draft) — https://github.com/uzairmaan/code/pull/1
- **Deploy:** Vercel preview (auto on push) + GitHub Pages static export
  (`GITHUB_PAGES=true npm run build` → `/out`, served under `/code`).
- **Commands:** `npm run dev` · `npm run build` · `npm run type-check`.

## Design decisions that are settled (do not re-litigate)

1. **Light theme is the keeper.** We tried reverting to the dark "midnight"
   theme; the user rejected it. Keep the light premium look (gray-50 surfaces,
   white cards, `#202A36` ink CTAs, Inter type, pill buttons).
2. **Hero = composited still, not video.** The `.mp4` truck video was removed.
   Current hero (`components/sections/hero-video.tsx`) layers a recolored
   glossy-black truck over a desaturated cloudscape with animated amber
   headlight glows + a slide-in/float entrance — deliberately matching the
   jet hero's vibe (black aircraft on bright clouds, warm engine glow).
3. **Aesthetic target:** clean, high-end, "luxury," jet-like. The user iterates
   fast and judges by looking at the deployed preview, so ship something
   viewable each round and screenshot-verify before claiming it works.

## Current hero assets (committed, in `public/`)

- `hero-truck-black.webp` (41 KB) — glossy-black truck cutout, cool tint.
  Made from a Pexels photo via `rembg` background removal + a PIL recolor
  (gamma curve to crush midtones, slight blue tint). `.png` fallback alongside.
- `hero-clouds.jpg` (96 KB) — Pexels sky, fully desaturated and lifted into a
  milky gray-white range.
- (Removed: `hero-truck.mp4`, `hero-truck-poster.jpg`.)

## The pending task (why the new session exists)

Build a **3D scroll-cinematic, multi-section site** for FreightFlow:

- Use the **`scroll-cinematic` skill** (uploaded to the account; should be
  available in a fresh session — verify it appears in the skills list).
- Use the **Higgsfield MCP** (added as a connector; verify its tools are
  searchable via ToolSearch, e.g. query "higgsfield video") to generate a
  **high-end cinematic clip + two 3D clips at 1080p**.
- **Slice the clips into scroll frames** and drive them on scroll (canvas
  frame-scrub, Apple-style), wired into a polished, branded, multi-section
  layout that matches the existing FreightFlow look.

### Why it couldn't be done in the previous session
That container was created **before** the skill and connector were added in the
web dashboard. Web sessions load skills + MCP connectors **once at startup** and
don't hot-reload — so they were absent. A fresh environment fixes this.

### First steps for the new session
1. Confirm tooling is actually present: check the skills list for
   `scroll-cinematic`, and run `ToolSearch` for "higgsfield". If either is still
   missing, the connector/skill didn't propagate — tell the user before proceeding.
2. Skim `FREIGHTFLOW_PROJECT_PLAN.md` and the current homepage sections in
   `components/sections/` to match branding.
3. Generate the clips, slice to frames, build the scroll experience.

### Environment caveats (fresh container resets these)
- Re-install if you need them: Playwright browser
  (`npx playwright install chromium`), and `pip install pillow rembg onnxruntime`
  for any image work. These are NOT persisted across sessions.
- Anything in git (the branch, `public/` assets, these docs) **is** persisted.

## Verified working
- `npm run build` passes (all 10 routes prerender).
- Latest Vercel deploy of the current hero is "Ready."
