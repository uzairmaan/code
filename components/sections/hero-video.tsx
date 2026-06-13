'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Hero artwork: black Kenworth cutout (Pexels photo, recolored) composited over
// a desaturated cloudscape — mirrors the SkyElite jet hero. Served from /public;
// NEXT_PUBLIC_BASE_PATH covers the GitHub Pages /code prefix.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const CLOUDS_URL = `${BASE}/hero-clouds.jpg`
const TRUCK_URL = `${BASE}/hero-truck-black.webp`

export function HeroVideo() {
  return (
    <section className="relative h-screen overflow-hidden bg-gray-100">
      {/* Cloudscape backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CLOUDS_URL})` }}
      />
      {/* Soft wash so the headline zone stays clean */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex flex-col items-center text-center px-6 pt-32 md:pt-36">
          <p className="text-sm font-semibold text-gray-600 tracking-[0.25em] mb-4 uppercase">
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
              className="px-5 py-2.5 rounded-full bg-gray-200/90 text-gray-800 font-medium hover:bg-gray-300 transition-colors backdrop-blur-sm"
            >
              Discover
            </a>
            <Link
              href="/dispatch"
              className="px-5 py-2.5 rounded-full text-white font-medium bg-[#202A36] hover:bg-[#1a2229] transition-colors"
            >
              Get Dispatched
            </Link>
          </div>
        </div>
      </div>

      {/* Black truck driving in from the left, jet-style */}
      <motion.div
        className="absolute bottom-[-6%] left-[-5%] w-[88%] max-w-[860px] md:w-[56%] lg:w-[48%] z-[5]"
        initial={{ x: '-55%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        {/* Gentle drift, like the jet's float */}
        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={TRUCK_URL}
            alt="Black premium semi-truck"
            className="w-full h-auto select-none pointer-events-none drop-shadow-2xl"
            draggable={false}
          />

          {/* Amber headlamp glows — echo the jet's engine glow */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '60%',
              top: '58%',
              width: '22%',
              height: '18%',
              background:
                'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,180,50,0.95) 0%, rgba(255,138,0,0.4) 40%, transparent 72%)',
              filter: 'blur(4px)',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '76%',
              top: '56%',
              width: '18%',
              height: '16%',
              background:
                'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,180,50,0.9) 0%, rgba(255,138,0,0.35) 42%, transparent 72%)',
              filter: 'blur(4px)',
            }}
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Light beam cast ahead of the truck */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '88%',
              top: '52%',
              width: '38%',
              height: '26%',
              background:
                'linear-gradient(95deg, rgba(255,180,60,0.45) 0%, rgba(255,180,60,0.12) 45%, transparent 75%)',
              clipPath: 'polygon(0 32%, 100% 0, 100% 100%, 0 68%)',
              filter: 'blur(8px)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Ground haze so the truck sits naturally on the frame edge */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent pointer-events-none z-[6]" />
    </section>
  )
}
