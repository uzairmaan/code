'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * HeroCinematic — scroll-scrubbed canvas frame sequence (the "scroll-cinematic"
 * technique). A Higgsfield-generated still of a glossy-black semi on a sea of
 * clouds is rendered (scripts/gen-hero-frames.py) into 140 frames of an easeOut
 * dolly push-in; the frame painted to the canvas is chosen by scroll progress.
 *
 * Overlay copy comes in two forms:
 *  - Fixed beats (opening headline + closing CTA), left-aligned.
 *  - Part-anchored callouts pinned to the truck (headlights / cab / wheels) that
 *    reveal on scroll and TRACK their part as the frame zooms — the push-in
 *    transform from the frame generator is replicated here to map a source-image
 *    point to its on-screen position every rAF tick.
 *
 * Engine: preload all frames; the rAF loop keeps trying to paint the current
 * frame until its image has actually decoded (so a slow-loading frame 0 never
 * leaves the canvas blank); cover-fit draw + HiDPI; respects reduced motion.
 */

const FRAME_COUNT = 140
const SCROLL_VH = 300
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const framePath = (i: number) => `${BASE}/frames/hero/frame_${String(i).padStart(4, '0')}.jpg`
const POSTER = `${BASE}/hero-cinematic.jpg`

// --- Push-in transform constants — MUST mirror scripts/gen-hero-frames.py ---
const SRC_W = 2752, SRC_H = 1536
const OUT_AR = 2048 / 1152
const ZOOM_START = 1.06, ZOOM_END = 1.34
const FOCAL_X = 0.55, FOCAL_Y = 0.62
const DRIFT = 0.7
const MINWH = Math.min(SRC_W, SRC_H * OUT_AR)
const easeOut = (t: number) => 1 - (1 - t) ** 3

const FADE = 0.07
function band(p: number, s: number, e: number) {
  if (p <= s) return p >= s - FADE ? (p - (s - FADE)) / FADE : 0
  if (p >= e) return p <= e + FADE ? 1 - (p - e) / FADE : 0
  return 1
}

// Callouts: anchor in normalized SOURCE-image coords; dx/dy = label offset (px).
const CALLOUTS = [
  { sx: 0.405, sy: 0.705, kicker: '24/7', label: 'Always-on dispatch', dx: -185, dy: 44, in: 0.18, out: 0.45 },
  { sx: 0.560, sy: 0.400, kicker: 'Hands-off', label: 'You just drive', dx: -195, dy: -70, in: 0.37, out: 0.63 },
  { sx: 0.612, sy: 0.800, kicker: 'Proven', label: '1,200+ loads booked', dx: -160, dy: 40, in: 0.56, out: 0.82 },
]
// Keep callout labels clear of the fixed navbar (top) and progress bar (bottom).
const SAFE_TOP = 120
const SAFE_BOTTOM = 110

// Mobile-only centered beats — desktop uses the part-anchored callouts, which
// don't translate to a portrait crop, so phones get a clean kinetic narrative.
const MOBILE_BEATS = [
  { text: 'We find the loads.\nYou drive the miles.', in: 0.2, out: 0.5 },
  { text: '1,200+ loads booked.\n98% on-time.', in: 0.5, out: 0.78 },
]

export function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([])
  const leaderRefs = useRef<(HTMLSpanElement | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileBeatRefs = useRef<(HTMLDivElement | null)[]>([])
  const fillRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d') // alpha:true → poster shows through until first paint
    if (!ctx) return

    const images: HTMLImageElement[] = []
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i + 1)
      images[i] = img
    }

    let painted = -1 // index actually drawn to the canvas (not just requested)
    function draw(index: number): boolean {
      const img = images[index]
      if (!img || !img.complete || !img.naturalWidth) return false
      const cw = canvas!.clientWidth, ch = canvas!.clientHeight
      const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch
      let dw: number, dh: number, dx: number, dy: number
      if (ir > cr) {
        dh = ch; dw = ch * ir
        // On portrait (mobile) the 16:9 frame is wider than the viewport; bias the
        // crop toward the truck (right-of-center) instead of centering on empty sky.
        const focus = cr < 1 ? 0.6 : 0.5
        dx = Math.min(0, Math.max(cw - dw, cw / 2 - focus * dw)); dy = 0
      } else {
        dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2
      }
      ctx!.fillStyle = '#e9edf2'
      ctx!.fillRect(0, 0, cw, ch)
      ctx!.drawImage(img, dx, dy, dw, dh)
      return true
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = canvas!.clientWidth * dpr
      canvas!.height = canvas!.clientHeight * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      painted = -1 // force a repaint at the new size
    }

    let raf = 0
    function render() {
      const rect = section!.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0

      // Paint the scroll-mapped frame; if it hasn't decoded yet, keep the last
      // good frame and retry next tick (so frame 0 paints the instant it loads).
      const idx = Math.min(FRAME_COUNT - 1, Math.floor(p * (FRAME_COUNT - 1)))
      if (idx !== painted) { if (draw(idx)) painted = idx }

      // Fixed beats.
      if (headlineRef.current) {
        const o = band(p, 0, 0.16)
        headlineRef.current.style.opacity = String(o)
        headlineRef.current.style.transform = `translateY(${(1 - o) * 22}px)`
      }
      if (ctaRef.current) {
        const o = band(p, 0.82, 1.0)
        ctaRef.current.style.opacity = String(o)
        ctaRef.current.style.transform = `translateY(${(1 - o) * 22}px)`
        ctaRef.current.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
      }

      // Mobile-only crossfading beats.
      mobileBeatRefs.current.forEach((el, i) => {
        if (!el) return
        const o = band(p, MOBILE_BEATS[i].in, MOBILE_BEATS[i].out)
        el.style.opacity = String(o)
        el.style.transform = `translateY(${(1 - o) * 22}px)`
      })

      // Part-anchored callouts: replicate the generator's crop transform to map
      // each source point to the current frame, then cover-fit it to the canvas.
      const e = easeOut(p)
      const zoom = ZOOM_START + (ZOOM_END - ZOOM_START) * e
      const cw = MINWH / zoom, ch = cw / OUT_AR
      const fx = (0.5 + (FOCAL_X - 0.5) * DRIFT * e) * SRC_W
      const fy = (0.5 + (FOCAL_Y - 0.5) * DRIFT * e) * SRC_H
      const left = Math.min(Math.max(fx - cw / 2, 0), SRC_W - cw)
      const top = Math.min(Math.max(fy - ch / 2, 0), SRC_H - ch)
      const vw = canvas!.clientWidth, vh = canvas!.clientHeight
      const fir = OUT_AR, fcr = vw / vh
      let fdw: number, fdh: number, fdx: number, fdy: number
      if (fir > fcr) { fdh = vh; fdw = vh * fir; fdx = (vw - fdw) / 2; fdy = 0 }
      else { fdw = vw; fdh = vw / fir; fdx = 0; fdy = (vh - fdh) / 2 }

      calloutRefs.current.forEach((el, i) => {
        if (!el) return
        const c = CALLOUTS[i]
        const ox = (c.sx * SRC_W - left) / cw
        const oy = (c.sy * SRC_H - top) / ch
        const x = fdx + ox * fdw
        const y = fdy + oy * fdh
        el.style.transform = `translate(${x}px, ${y}px)`
        el.style.opacity = String(band(p, c.in, c.out))

        // Clamp the label into the safe band; the dot stays pinned to the part
        // and the leader line stretches/rotates to follow.
        const lx = c.dx
        let ly = c.dy
        const lo = SAFE_TOP - y
        const hi = vh - SAFE_BOTTOM - y
        if (ly < lo) ly = lo
        if (hi > lo && ly > hi) ly = hi
        const lbl = labelRefs.current[i]
        const ldr = leaderRefs.current[i]
        if (lbl) lbl.style.transform = `translate(${lx}px, ${ly}px)`
        if (ldr) {
          ldr.style.width = `${Math.hypot(lx, ly)}px`
          ldr.style.transform = `rotate(${Math.atan2(ly, lx)}rad)`
        }
      })

      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`
      if (hintRef.current) hintRef.current.style.opacity = p > 0.02 ? '0' : '1'

      raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  // --- Reduced-motion: static poster hero, no pin ---
  if (reduced) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-100">
        <img src={POSTER} alt="Glossy black semi-truck above the clouds" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-[8vw]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-600">Truck Dispatching</p>
          <h1 className="whitespace-pre-line text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl">{'Premium.\nDispatched.'}</h1>
          <p className="mt-5 max-w-md text-lg text-gray-600">Your miles deserve better rates.</p>
          <div className="mt-8 flex gap-4">
            <Link href="/dispatch" className="rounded-full bg-ink px-6 py-3 font-medium text-white transition-colors hover:bg-ink-dark">Get Dispatched</Link>
            <a href="#services" className="rounded-full bg-white/80 px-6 py-3 font-medium text-gray-800 backdrop-blur-sm transition-colors hover:bg-white">See Our Rates</a>
          </div>
        </div>
      </section>
    )
  }

  // --- Cinematic scroll-scrub hero ---
  return (
    <section ref={sectionRef} className="relative" style={{ height: `${SCROLL_VH}vh` }}>
      <div id="hero-stage" className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Poster behind the canvas so there is never a blank/black frame on load */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${POSTER})` }} />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }} />

        {/* Soft scrims for copy legibility over the bright cloudscape */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/5 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />

        {/* Part-anchored callouts (tracked to the truck) */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {CALLOUTS.map((c, i) => (
            <div
              key={i}
              ref={(el) => { calloutRefs.current[i] = el }}
              className="absolute left-0 top-0"
              style={{ opacity: 0, willChange: 'transform, opacity' }}
            >
              {/* anchor dot on the part */}
              <span className="absolute -ml-[5px] -mt-[5px] block h-[10px] w-[10px] rounded-full bg-amber" style={{ boxShadow: '0 0 0 4px rgba(255,138,0,0.22), 0 0 12px rgba(255,138,0,0.6)' }} />
              {/* leader line — width/rotation set per frame to follow the clamped label */}
              <span ref={(el) => { leaderRefs.current[i] = el }} className="absolute left-0 top-0 h-px origin-left bg-ink/40" />
              {/* label — translate set per frame; inner div right-aligns + vertically centers it */}
              <div ref={(el) => { labelRefs.current[i] = el }} className="absolute left-0 top-0">
                <div style={{ transform: 'translate(-100%, -50%)' }}>
                  <div className="whitespace-nowrap text-right text-xs font-semibold uppercase tracking-[0.3em] text-amber-dark" style={{ textShadow: '0 1px 12px rgba(255,255,255,0.9)' }}>{c.kicker}</div>
                  <div className="whitespace-nowrap text-right text-2xl font-semibold tracking-tight text-ink md:text-3xl" style={{ textShadow: '0 1px 18px rgba(255,255,255,0.95)' }}>{c.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed beats: opening headline + closing CTA */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center px-8 md:px-[8vw]">
          <div ref={headlineRef} className="max-w-xl" style={{ opacity: 0, willChange: 'opacity, transform' }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-600">Truck Dispatching</p>
            <h1 className="whitespace-pre-line text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl" style={{ textShadow: '0 2px 40px rgba(255,255,255,0.85)' }}>{'Premium.\nDispatched.'}</h1>
            <p className="mt-5 max-w-md text-lg text-gray-600 md:text-xl" style={{ textShadow: '0 1px 20px rgba(255,255,255,0.9)' }}>Your miles deserve better rates.</p>
          </div>

          <div ref={ctaRef} className="absolute max-w-xl px-8 md:px-[8vw]" style={{ left: 0, opacity: 0, willChange: 'opacity, transform' }}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-600">Stop searching</p>
            <div className="text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl" style={{ textShadow: '0 2px 40px rgba(255,255,255,0.85)' }}>Start hauling.</div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dispatch" className="rounded-full bg-ink px-6 py-3 font-medium text-white transition-colors hover:bg-ink-dark">Get Dispatched</Link>
              <a href="#services" className="rounded-full bg-white/80 px-6 py-3 font-medium text-gray-800 backdrop-blur-sm transition-colors hover:bg-white">See Our Rates</a>
            </div>
          </div>
        </div>

        {/* Mobile-only centered beats (desktop uses the tracked callouts) */}
        <div className="pointer-events-none absolute inset-0 md:hidden">
          {MOBILE_BEATS.map((b, i) => (
            <div key={i} className="absolute inset-x-7 top-1/2 -translate-y-1/2">
              <div ref={(el) => { mobileBeatRefs.current[i] = el }} style={{ opacity: 0, willChange: 'opacity, transform' }}>
                <h2 className="whitespace-pre-line text-3xl font-semibold leading-[1.1] tracking-tight text-ink" style={{ textShadow: '0 2px 30px rgba(255,255,255,0.92)' }}>{b.text}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll progress + hint */}
        <div className="absolute inset-x-8 bottom-8 z-10 h-[2px] bg-black/10 md:inset-x-[8vw]">
          <div ref={fillRef} className="h-full w-0 bg-gradient-to-r from-amber to-ink" style={{ boxShadow: '0 0 10px rgba(255,138,0,0.5)' }} />
        </div>
        <div ref={hintRef} className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.4em] text-gray-500 transition-opacity duration-500">
          Scroll
        </div>
      </div>
    </section>
  )
}
