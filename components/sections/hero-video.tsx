'use client'

import React from 'react'
import Link from 'next/link'

// Semi-truck footage (Pexels, free license) served from /public so we control
// availability. NEXT_PUBLIC_BASE_PATH covers the GitHub Pages /code prefix.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const VIDEO_URL = `${BASE}/hero-truck.mp4`
const POSTER_URL = `${BASE}/hero-truck-poster.jpg`

export function HeroVideo() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER_URL}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
      />

      {/* Frosted wash so the dark text stays readable over the footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/40 pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-6 -mt-20 md:-mt-32">
            <p className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
              Truck Dispatching
            </p>

            <h1 className="leading-none tracking-tighter">
              <span className="block text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500">
                Premium.
              </span>
              <span
                className="block text-6xl md:text-7xl lg:text-8xl font-normal"
                style={{ color: '#202A36', marginTop: '-12px' }}
              >
                Dispatched.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mt-6 mb-6 max-w-2xl mx-auto">
              Your miles deserve better rates.
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="#services"
                className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors"
              >
                Discover
              </a>
              <Link
                href="/dispatch"
                className="px-4 py-2 rounded-full text-white font-medium bg-[#202A36] hover:bg-[#1a2229] transition-colors"
              >
                Get Dispatched
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
