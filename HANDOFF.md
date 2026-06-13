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
- **Branch:** active work on `claude/trusting-fermi-r5eh6n` (continuation of
  `claude/freightflow-dispatch-design-5029yx`; both shared HEAD at session start).
- **PR:** #1 (draft) — https://github.com/uzairmaan/code/pull/1 (older branch)
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

## Status — scroll-cinematic hero (updated 2026-06-13)

**Done this session (branch `claude/trusting-fermi-r5eh6n`):** the homepage hero is
now a **scroll-cinematic canvas frame-scrub** (Apple/Awwwards style), replacing the
static `HeroVideo`.

- **Tooling fixed permanently:** the `scroll-cinematic` skill is now committed in-repo
  at `.claude/skills/scroll-cinematic/` (the user uploaded it as a zip — web sessions
  don't hot-reload skills, but keeping it in git means every future session has it on
  disk; just `Read` the `SKILL.md` and follow it). The Higgsfield MCP connector is
  live and working. NOTE: the skill's `ensure-ffmpeg.sh` is stale (download URL 404s);
  ffmpeg here came from `apt-get install -y ffmpeg`.
- **Hero keyframe:** Higgsfield `nano_banana_pro` (2k, 16:9) — a glossy-black sleeper
  semi on a sea of clouds, warm amber headlights. Job `de741aed-7b2a-4f77-916e-0db769ac7e8b`
  (2nd candidate `19596f6c-0639-4be8-922c-8cf8e574f92f`).
- **Frames:** `scripts/gen-hero-frames.py` (Pillow+numpy) renders the keyframe into
  **140 JPGs** at `public/frames/hero/frame_0001…0140.jpg` (~15 MB) — an eased dolly
  push-in with pulsing headlight glow, soft vignette, film grain. Poster:
  `public/hero-cinematic.jpg`. Re-run: `python3 scripts/gen-hero-frames.py`.
- **Component:** `components/sections/hero-cinematic.tsx` — sticky 420vh stage, HiDPI
  cover-fit canvas, continuous rAF scrub (robust to the app's Lenis), four crossfading
  copy beats + final CTA, progress bar, scroll hint, and a `prefers-reduced-motion`
  static-poster fallback. Light theme (NOT the skill's dark demo styling). Wired into
  `app/page.tsx`. (`hero-video.tsx` is kept but no longer imported.)
- **Verified:** `npm run build` and `GITHUB_PAGES=true npm run build` both pass;
  Playwright confirmed the canvas paints, frames advance on scroll, and all four copy
  beats crossfade (screenshots at p=0 / 0.32 / 0.62 / 0.95).

### ⚠️ Higgsfield credits — the live constraint
Account is **free tier, ~6 credits left** (started at 10; spent 2×2 cr on images).
**Video is out of budget:** Seedance 1080p = 45 cr, 720p ≈ 23 cr, even Grok 480p/4 s =
10 cr. That's why the hero motion is a *code-generated* push-in, not a true Higgsfield
3D clip. Image gen is cheap (2 cr @ 2k), so keyframes are fine.

### Next steps (priority order)
1. **Top up credits → real 3D clip.** Generate a `seedance_2_0` 1080p clip from the
   keyframe id, then `scripts/extract-frames.sh clip.mp4 public/frames/hero 140` and
   rebuild. The engine is unchanged — it's a pure frames-folder swap.
2. Optional **second scrub section** deeper in the page (e.g. a 360° turntable for
   "Pick Your Lane"); the engine handles multiple sections.
3. **Mobile perf:** ~15 MB of frames preloads on mount — consider a smaller mobile
   frame set or deferring the preload until the hero is near the viewport.

### Environment caveats (fresh container resets these)
- Re-install if you need them: Playwright browser
  (`npx playwright install chromium`), and `pip install pillow rembg onnxruntime`
  for any image work. These are NOT persisted across sessions.
- Anything in git (the branch, `public/` assets, these docs) **is** persisted.

## Verified working
- `npm run build` and `GITHUB_PAGES=true npm run build` both pass (all 10 routes
  prerender; frames export to `out/frames/hero/`).
- Scroll-cinematic hero verified via Playwright (canvas paints, frames scrub on
  scroll, copy beats crossfade). Confirm the final look on the deployed preview.
