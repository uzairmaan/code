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
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Video background with brightening filter */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER_URL}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
        }}
        src={VIDEO_URL}
      />

      {/* Light overlay wash for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-6 -mt-20 md:-mt-32">
            <p className="text-sm font-semibold text-gray-700 tracking-wider mb-4 uppercase">
              Premium Truck Dispatching
            </p>

            <h1 className="leading-none tracking-tighter">
              <span className="block text-6xl md:text-7xl lg:text-8xl font-normal text-gray-900">
                Premium.
              </span>
              <span
                className="block text-6xl md:text-7xl lg:text-8xl font-normal bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent"
                style={{ marginTop: '-12px' }}
              >
                Dispatched.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mt-6 mb-8 max-w-2xl mx-auto font-medium">
              Better loads, better rates, better life on the road.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/dispatch"
                className="px-8 py-3 rounded-full text-white font-semibold bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
              >
                Get Dispatched →
              </Link>
              <a
                href="#services"
                className="px-8 py-3 rounded-full bg-white text-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-all"
              >
                Discover Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
