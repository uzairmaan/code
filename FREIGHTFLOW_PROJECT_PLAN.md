# FreightFlow LLC — Premium Truck Dispatch Website
## Project Plan & Design Specification

> **Quality bar:** $10,000-tier agency build. Extraordinary, not ordinary — cinematic motion, immersive interactions, and conversion-focused UX for three service lines: **Semi-Trucks (OTR)**, **26-ft Box Trucks**, and **Hotshots**.

---

## 1. Brand & Visual Direction

- **Design language:** "Midnight Logistics" — dark, premium, kinetic.
  - Base: deep charcoal/near-black (`#0A0C10`) with subtle blue-steel gradients.
  - Accent: high-voltage amber/safety-orange (`#FF8A00`) — evokes hazard lights, road markings, urgency.
  - Secondary accent: electric cyan (`#22D3EE`) for live/dispatch states (radar, tracking, "online" signals).
- **Typography:**
  - Display: a condensed industrial grotesk (e.g., **Clash Display** or **Archivo Expanded**) — wide tracking, all-caps headers that feel like trailer decals.
  - Body: **Inter** or **Geist** for clean readability.
  - Numeric/data: tabular mono (e.g., **JetBrains Mono**) for rates, mileage, load numbers — gives a "dispatch terminal" feel.
- **Texture & depth:** subtle asphalt-grain noise overlay, glassmorphism panels for data cards, thin 1px "lane-line" dividers (dashed, animated on scroll).
- **Motion personality:** heavy objects accelerate slowly and settle with weight (custom easing `cubic-bezier(0.16, 1, 0.3, 1)`); UI chrome (buttons, chips) is snappy. Trucks feel like trucks; buttons feel like buttons.

---

## 2. Site Architecture / Sitemap

```
/                      → Homepage
/services/semi-trucks  → Semi-Truck (OTR) dispatch
/services/box-trucks   → 26-ft Box Truck dispatch
/services/hotshots     → Hotshot dispatch
/dispatch              → Booking / Get Dispatched flow (multi-step)
/results               → Testimonials + Portfolio (case studies / carrier wins)
/about                 → Company story, team, compliance
/contact               → Contact form + map + direct lines
```

---

## 3. Homepage Specification

### 3.1 Hero Section — "The Open Road"
- **Layout:** full-viewport (100svh) hero with a horizon line at ~70% height; animated highway perspective receding to a vanishing point.
- **Animated truck graphics:**
  - SVG/Lottie semi-truck silhouette that **drives in from the left** on page load (Framer Motion `initial={{ x: '-120%' }}` → spring with high mass), wheels rotating via CSS `@keyframes`, subtle cab bounce loop.
  - Parallax dust/exhaust particles drift behind it (GSAP ticker or canvas, capped at ~60 particles).
  - Background lane-line dashes scroll infinitely (CSS `background-position` animation) to imply motion even when the truck idles.
- **Dynamic tagline:** kinetic headline with rotating payload word —
  `"WE DISPATCH [SEMIS / BOX TRUCKS / HOTSHOTS / YOUR SUCCESS]"`
  - Each word swaps with a Framer Motion `AnimatePresence` vertical slot-machine roll every 2.5s; final word "YOUR SUCCESS" holds with an amber underline draw-in.
  - Sub-tagline fades up word-by-word (staggered `staggerChildren: 0.04`).
- **CTAs:** primary "Get Dispatched" (magnetic button, amber glow pulse), secondary "See Our Rates" (ghost button with animated border trace).
- **Live stat ticker** along hero bottom edge: scrolling marquee of real proof points — "1,200+ loads booked / avg $2.87 per mile / 24/7 dispatch / 98% on-time" — styled like a highway message board (amber dot-matrix font).
- **Scroll cue:** animated chevron styled as a road sign, bobbing with spring physics.

### 3.2 Services Preview — "Pick Your Lane"
- Three full-bleed horizontal panels (one per truck type) that expand on hover (flex-grow animation via Framer Motion `layout`).
- Hovering a panel: truck illustration slides forward, background tints to that service's accent hue, key rate stat counts up.
- Click → page transition: the panel **expands to fill the viewport** (shared layout animation / `layoutId`) and morphs into the service page hero.

### 3.3 "How Dispatch Works" — Scroll-Driven Journey
- Sticky-pinned section (GSAP ScrollTrigger): a miniature truck travels along a curved SVG road path as the user scrolls (`motionPath` / `useScroll` + `offsetDistance`).
- Four waypoints light up in sequence: **Sign Up → We Find Loads → You Drive → You Get Paid**. Each waypoint card slides in from alternating sides with progress-linked opacity.

### 3.4 Social Proof Strip
- Logo marquee of brokers/load boards (DAT, Truckstop, Amazon Relay), infinite scroll, pause-on-hover, grayscale → color on hover.

### 3.5 Stats Band
- Count-up numbers (Framer Motion `useInView` + `animate()`): loads dispatched, revenue generated for carriers, active trucks, avg RPM. Numbers render in tabular mono with an odometer-roll effect.

### 3.6 Testimonials Teaser + Final CTA
- Two featured testimonial cards (see §6) and a closing CTA section: dark-to-amber gradient, headline "Stop Searching. Start Hauling." with a magnetic "Get Dispatched" button.

---

## 4. Service Pages (×3: Semi-Trucks, Box Trucks, Hotshots)

Shared template, per-service theming (accent hue, truck illustration, copy, rate data).

- **Hero:** service name in oversized outlined display type; the truck illustration arrives via the shared `layoutId` morph from the homepage panel. Per-service accent: Semis = amber, Box Trucks = cyan, Hotshots = red-orange.
- **Spec sheet panel** ("The Rig"): interactive truck diagram — hovering hotspots (trailer, cab, axles) opens floating tooltips with specs (capacity, lanes, typical freight). Hotspots pulse subtly; tooltip enters with scale+blur spring.
- **Rate calculator widget:** sliders for miles/week and target RPM → estimated weekly gross animates in real time (number morph). Slider thumb styled as a mini truck.
- **"What We Handle" grid:** freight-type cards with scroll-triggered stagger reveal (`whileInView`, y: 24 → 0, 60ms stagger); icon line-draw animation (SVG `pathLength`) on hover.
- **Comparison strip:** "With FreightFlow vs. Without" — two-column table that wipes in with a clip-path reveal; checkmarks draw themselves.
- **Service-specific FAQ:** accordion with smooth `height: auto` spring (Framer Motion `AnimatePresence` + `layout`), chevron rotates, open item gets accent left-border grow.
- **Sticky bottom dock (mobile):** "Get Dispatched →" pill that appears after 30% scroll, springs up from bottom.
- **Cross-links:** footer of each service page shows the other two services as compact hover-expand cards.

---

## 5. Booking / Dispatch System — "Get Dispatched" Flow

A multi-step wizard at `/dispatch` designed to feel like a premium onboarding, not a form.

- **Step architecture (5 steps):**
  1. **Choose your truck** — three large selectable cards (animated truck illustrations); selection triggers a check-stamp animation and the chosen truck drives to a "selected" dock at top.
  2. **Your operation** — MC/DOT number, years running, current vs. new authority (segmented control with sliding indicator).
  3. **Equipment & lanes** — trailer type chips (multi-select, spring pop on toggle), preferred regions via an interactive US map (hover state highlights, click to select; SVG regions animate fill).
  4. **Goals** — target weekly gross slider + home-time preference.
  5. **Contact & confirm** — summary card assembles itself piece-by-piece (each detail card flies into a stack), then name/phone/email.
- **Progress indicator:** horizontal "route" bar — a tiny truck icon drives along it as steps complete; completed stops become amber waypoint dots.
- **Transitions:** steps slide horizontally with `AnimatePresence` (`mode="popLayout"`), direction-aware (back = reverse slide). Content within each step staggers in.
- **Validation UX:** inline, real-time; invalid fields shake gently (x-axis spring, 3 oscillations) with an amber hint message sliding down — never a browser alert.
- **Persistence:** form state in `localStorage` (resume where you left off); abandoned-flow toast: "Your dispatch application is saved."
- **Success state:** confetti-free, on-brand payoff — the route bar completes, truck icon accelerates off-screen, headline "You're On The Board." with a green-light pulse, plus calendar embed (Cal.com/Calendly) to book the onboarding call.
- **Backend:** API route → store lead (Supabase/Postgres or Airtable for v1) + email notification (Resend) + optional Slack webhook to the dispatch team; spam protection via Cloudflare Turnstile.

---

## 6. Testimonials & Portfolio ("Results") Section

- **Testimonial cards:**
  - Glassmorphic cards on a dark field; 3D tilt-on-hover (pointer-tracked `rotateX/rotateY`, ±6°, with a moving specular highlight).
  - Entrance: scroll-triggered stagger, cards rise with slight rotation settle.
  - Content: carrier name, truck type chip (color-coded per service), star rating that fills sequentially when in view, pull-quote, and a key metric badge ("+38% weekly gross").
  - Layout: horizontal drag-scroll carousel (Framer Motion `drag="x"` with `dragConstraints` + inertia) with snap; progress dots morph width like a capsule.
- **Portfolio / case studies ("Wins Board"):**
  - Masonry/bento grid of result cards styled like load-board entries: lane (e.g., "ATL → DAL"), rate, RPM, truck type.
  - Cards flip on click (3D rotateY) revealing the story behind the load: broker relationship, negotiation note, payout.
  - Filter chips (All / Semi / Box / Hotshot) animate the grid re-sort via Framer Motion `layout` + `AnimatePresence` (FLIP-style reflow).
- **Aggregate banner:** "Real loads. Real money." with a live-style odometer of total carrier revenue dispatched.

---

## 7. Contact Page & Form Micro-interactions

- **Layout:** split-screen — left: form; right: animated dispatch-radar visual (concentric pulse rings, blinking truck dots) + direct phone/email/hours.
- **Micro-interactions (each one small, all of them together = premium):**
  - **Floating labels** that lift and shrink with a spring when the field focuses or has value.
  - **Focus glow:** input border animates from center outward (scaleX origin-center) in the accent color.
  - **Typing pulse:** subtle caret-synced glow on the active field's icon.
  - **Smart field icons:** phone icon wiggles when a valid phone number completes; email icon's envelope flap opens on valid format.
  - **Textarea growth:** smooth height spring as the message grows.
  - **Magnetic submit button** that leans toward the cursor; on submit → morphs into a progress capsule → success checkmark draws itself (SVG `pathLength`) → button text becomes "Dispatched ✓".
  - **Error states:** gentle shake + field icon flashes amber; error copy slides in under the field.
- **After-submit:** the radar visual pings once and a new truck dot appears — "your message just hit our board."
- **Footer (site-wide):** dark, with an animated horizon line; back-to-top button is a truck icon that drives upward on click.

---

## 8. Technical Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router, React 19)** | SSG/ISR for marketing pages, server actions for the dispatch form, image optimization |
| Language | **TypeScript** | Safety across animation variants and form schemas |
| Styling | **Tailwind CSS v4** + CSS variables for per-service theming | Speed + design-token discipline |
| UI primitives | **shadcn/ui (Radix)** | Accessible accordions, dialogs, selects out of the box |
| Animation (UI) | **Framer Motion (motion v12)** | Layout/shared-element transitions, `AnimatePresence`, springs, drag carousels |
| Animation (scroll/cinematic) | **GSAP + ScrollTrigger (+ MotionPath)** | Pinned scroll scenes, truck-on-path, scrub timelines |
| Smooth scroll | **Lenis** | Buttery scroll that syncs with ScrollTrigger |
| 3D (selective) | **React Three Fiber + drei** | Optional hero 3D truck on desktop only (lazy-loaded) |
| Vector animation | **Lottie (lottie-react)** | Lightweight truck/wheel loops where SVG+CSS isn't enough |
| Forms | **React Hook Form + Zod** | Performant multi-step validation |
| Backend/data | **Next.js API routes/Server Actions + Supabase (Postgres)** | Lead storage; Airtable acceptable for v1 |
| Email | **Resend** | Lead notifications + applicant confirmation |
| Anti-spam | **Cloudflare Turnstile** | Invisible, no UX tax |
| Analytics | **Vercel Analytics + PostHog** | Funnel tracking on the dispatch wizard |
| Hosting | **Vercel** | Edge network, preview deploys, ISR |

---

## 9. Performance Optimization (Smooth Animations, Fast Loads)

- **Animate only compositor properties:** `transform` and `opacity`. Never animate `width/height/top/left` for motion — use scale/translate; use Framer Motion `layout` (FLIP) for size changes.
- **`will-change` discipline:** apply just-in-time (on hover-intent/in-view), remove after — permanent `will-change` bloats GPU memory.
- **Lazy-load heavy motion:** R3F/Lottie/GSAP scenes behind `next/dynamic` + `IntersectionObserver`; 3D truck only on desktop + `navigator.hardwareConcurrency > 4`.
- **Use `LazyMotion` + `domAnimation`** from Framer Motion to cut ~25kb from the initial bundle; load the full feature set only on pages that need drag/layout.
- **Pause off-screen work:** every infinite loop (marquee, wheel spin, radar) must stop when out of view (`useInView`) and when `document.hidden`.
- **`prefers-reduced-motion`:** global `MotionConfig reducedMotion="user"` + CSS fallbacks — replace travel animations with fades; this is both a11y and a perf win.
- **Images:** `next/image` with AVIF/WebP, explicit dimensions (zero CLS), `priority` only on the hero; truck illustrations as optimized SVG (SVGO) — not PNG.
- **Fonts:** `next/font` self-hosted, subset, `display: swap`, max 3 families / 6 weights total.
- **Scroll performance:** one Lenis instance, GSAP ScrollTriggers batched + `scrub` over per-frame listeners; throttle pointer-tracked tilt with `requestAnimationFrame`.
- **Code-split per route**; keep homepage JS < 200kb gzipped; audit with `next build --profile` + Lighthouse CI in the pipeline.
- **Budgets/targets:** LCP < 2.0s, CLS < 0.05, INP < 200ms, 60fps sustained on mid-tier Android (test with 4× CPU throttle).

---

## 10. The 7 "Next-Level" UI/UX Features

1. **Shared-element page transitions** — homepage service panels morph (`layoutId`) into the service-page hero; the site feels like one continuous space, not separate pages.
2. **Scroll-driven truck journey** — a GSAP MotionPath scene where a truck physically drives the "How It Works" route as you scroll; progress = narrative.
3. **Custom dispatch cursor** — a small ring cursor that morphs contextually: crosshair "radar lock" over CTAs, a steering-wheel glyph over truck illustrations, drag arrows over carousels (desktop only; native cursor preserved as fallback).
4. **3D tilt + specular testimonial cards** — pointer-tracked perspective tilt with a moving light glare, making proof feel tangible and premium.
5. **Kinetic typography hero** — slot-machine rotating tagline plus headline letters that "load on like freight" (staggered mass-spring entrance).
6. **Multi-layer parallax horizon** — hero and section backgrounds with 3–4 depth layers (sky, skyline, road, truck) moving at different scroll velocities, plus mouse-parallax on desktop.
7. **The route-style progress system** — the dispatch wizard's truck-on-a-route progress bar and the magnetic, state-morphing buttons (idle → magnetic hover → loading capsule → drawn checkmark) — micro-interactions with a consistent trucking metaphor everywhere.

---

## 11. Implementation Roadmap (6 Weeks)

### Phase 0 — Foundation (Week 1)
- [ ] Scaffold Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui; ESLint/Prettier; Vercel project + preview deploys.
- [ ] Define design tokens (colors, type scale, spacing, easing curves, per-service accent themes as CSS variables).
- [ ] Build core primitives: `MagneticButton`, `RevealOnScroll`, `AnimatedCounter`, `Marquee`, `SectionHeading`, custom cursor provider, Lenis provider, `MotionConfig` (reduced-motion).
- [ ] Commission/produce truck illustrations (3 trucks, layered SVG: body / wheels / shadow) — the single biggest visual-quality lever.

### Phase 1 — Homepage (Week 2)
- [ ] Hero: layered parallax, truck drive-in, kinetic tagline, stat ticker, CTAs.
- [ ] "Pick Your Lane" expanding panels with `layoutId` wiring.
- [ ] Pinned "How Dispatch Works" GSAP scene; stats band; logo marquee; CTA section.

### Phase 2 — Service Pages (Week 3)
- [ ] Build shared service template + theming system; instantiate ×3 with unique copy/illustrations.
- [ ] Interactive spec-sheet hotspots, rate calculator, FAQ accordion, comparison reveal, mobile sticky dock.

### Phase 3 — Dispatch Wizard (Week 4)
- [ ] 5-step flow with direction-aware transitions, route progress bar, validation/shake states, localStorage persistence.
- [ ] Backend: server action → Supabase + Resend + Turnstile; success state + calendar embed; PostHog funnel events per step.

### Phase 4 — Results & Contact (Week 5)
- [ ] Testimonial tilt-card carousel; Wins Board bento grid with flip cards and animated filtering.
- [ ] Contact page: split layout, radar visual, full micro-interaction suite, submit morphing button.

### Phase 5 — Polish, Perf, Launch (Week 6)
- [ ] Motion QA pass: easing consistency, reduced-motion audit, off-screen pause audit.
- [ ] Performance pass: bundle analysis, Lighthouse ≥ 95 on all pages, mid-tier Android 60fps check.
- [ ] Accessibility: keyboard paths through the wizard, focus-visible styles, ARIA on accordions/carousels, contrast (amber-on-dark ≥ 4.5:1 for text).
- [ ] SEO: metadata, OG images per service, `LocalBusiness`/`Service` JSON-LD, sitemap; cross-browser/device QA; launch on Vercel with analytics dashboards.

---

## 12. Definition of Done ("$10k feel" checklist)

- Every interactive element has hover, active, focus, and disabled states — none are browser defaults.
- No animation ever blocks a user action; everything is interruptible.
- The site is fully usable with reduced motion, keyboard only, and on a 3-year-old phone.
- Page transitions, easing curves, and accent usage are consistent enough that screenshots from any two pages look like the same brand.
- The dispatch funnel is instrumented and a lead lands in the database, email, and Slack within seconds.
