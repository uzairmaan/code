'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * HeroCinematic — scroll-scrubbed canvas frame sequence (the "scroll-cinematic"
 * technique). A Higgsfield-generated hero still of a glossy-black semi on a sea
 * of clouds is rendered as a 140-frame cinematic dolly push-in; the frame painted
 * to the canvas is chosen by scroll progress, so scrolling drives the move.
 *
 * Engine notes (mirrors the scroll-cinematic skill):
 *  - Preload every frame; paint frame 0 on first load; redraw only on index change.
 *  - Sticky stage: outer section is tall (SCROLL_VH); inner is position:sticky.
 *    progress = clamp(-rect.top / (rect.height - innerH), 0, 1).
 *  - Cover-fit draw + HiDPI (devicePixelRatio, capped at 2).
 *  - Driven from a continuous rAF loop (robust to the app's Lenis smooth scroll).
 *  - Respects prefers-reduced-motion: renders a static poster + copy, no pin.
 */

const FRAME_COUNT = 140
const SCROLL_VH = 420
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const framePath = (i: number) => `${BASE}/frames/hero/frame_${String(i).padStart(4, '0')}.jpg`
const POSTER = `${BASE}/hero-cinematic.jpg`

// Kinetic copy that crossfades across scroll-progress bands (full opacity inside
// the band, FADE-wide crossfades at the edges). Line 1 starts at 0 so it is fully
// visible the moment the page loads, before any scroll.
const FADE = 0.07
const LINES: { text: string; sub?: string; start: number; end: number }[] = [
  { text: 'Premium.\nDispatched.', sub: 'Your miles deserve better rates.', start: 0.0, end: 0.18 },
  { text: 'We find the loads.\nYou drive the miles.', sub: 'Semi-trucks · box trucks · hotshots.', start: 0.26, end: 0.46 },
  { text: '1,200+ loads booked.\n98% on-time.', sub: 'Around-the-clock dispatch, real rates.', start: 0.54, end: 0.72 },
]
const CTA_BAND = { start: 0.82, end: 1.0 }

function band(p: number, s: number, e: number) {
  if (p <= s) return p >= s - FADE ? (p - (s - FADE)) / FADE : 0
  if (p >= e) return p <= e + FADE ? 1 - (p - e) / FADE : 0
  return 1
}

export function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameRef = useRef(-1)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
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
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Preload every frame; paint the first as soon as it decodes.
    const images: HTMLImageElement[] = []
    let firstDrawn = false
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i + 1)
      img.onload = () => {
        if (!firstDrawn) {
          firstDrawn = true
          draw(0)
        }
      }
      images[i] = img
    }
    imagesRef.current = images

    function draw(index: number) {
      const img = images[index]
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas!.clientWidth
      const ch = canvas!.clientHeight
      const ir = img.naturalWidth / img.naturalHeight
      const cr = cw / ch
      let dw: number, dh: number, dx: number, dy: number
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0 }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      ctx!.fillStyle = '#e9edf2'
      ctx!.fillRect(0, 0, cw, ch)
      ctx!.drawImage(img, dx, dy, dw, dh)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = canvas!.clientWidth * dpr
      canvas!.height = canvas!.clientHeight * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(frameRef.current < 0 ? 0 : frameRef.current)
    }

    let raf = 0
    function render() {
      const rect = section!.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0

      const idx = Math.min(FRAME_COUNT - 1, Math.floor(p * (FRAME_COUNT - 1)))
      if (idx !== frameRef.current) { frameRef.current = idx; draw(idx) }

      // Crossfade kinetic copy lines over their bands.
      lineRefs.current.forEach((el, i) => {
        if (!el) return
        const o = band(p, LINES[i].start, LINES[i].end)
        el.style.opacity = String(o)
        el.style.transform = `translateY(${(1 - o) * 22}px)`
      })

      // Final CTA fades/rises in near the end and stays.
      if (ctaRef.current) {
        const o = band(p, CTA_BAND.start, CTA_BAND.end)
        ctaRef.current.style.opacity = String(o)
        ctaRef.current.style.transform = `translateY(${(1 - o) * 22}px)`
        ctaRef.current.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
      }

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
      <div id="hero-stage" className="sticky top-0 h-screen w-full overflow-hidden bg-[#e9edf2]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }} />

        {/* Soft scrims for copy legibility over the bright cloudscape */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/75 via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />

        {/* Overlay copy — left-aligned in the open sky negative space */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center px-8 md:px-[8vw]">
          <div className="relative h-[300px] w-full max-w-xl md:h-[360px]">
            {LINES.map((l, i) => (
              <div
                key={i}
                ref={(el) => { lineRefs.current[i] = el }}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ opacity: 0, willChange: 'opacity, transform' }}
              >
                <h1 className="whitespace-pre-line text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl" style={{ textShadow: '0 2px 40px rgba(255,255,255,0.85)' }}>
                  {l.text}
                </h1>
                {l.sub && <p className="mt-5 max-w-md text-lg text-gray-600 md:text-xl" style={{ textShadow: '0 1px 20px rgba(255,255,255,0.9)' }}>{l.sub}</p>}
              </div>
            ))}

            {/* Final CTA */}
            <div ref={ctaRef} className="absolute top-1/2 -translate-y-1/2" style={{ opacity: 0, willChange: 'opacity, transform' }}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-600">Stop searching</p>
              <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-7xl" style={{ textShadow: '0 2px 40px rgba(255,255,255,0.85)' }}>Start hauling.</h1>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/dispatch" className="rounded-full bg-ink px-6 py-3 font-medium text-white transition-colors hover:bg-ink-dark">Get Dispatched</Link>
                <a href="#services" className="rounded-full bg-white/80 px-6 py-3 font-medium text-gray-800 backdrop-blur-sm transition-colors hover:bg-white">See Our Rates</a>
              </div>
            </div>
          </div>
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
