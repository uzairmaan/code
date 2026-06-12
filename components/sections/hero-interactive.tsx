'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { KineticTagline } from '@/components/kinetic-tagline'
import { MagneticButton } from '@/components/ui/magnetic-button'

const ThreeHero = dynamic(() => import('@/components/three-hero').then((mod) => ({ default: mod.ThreeHero })), {
  ssr: false,
})

const ticker = [
  { value: '1,200+', label: 'loads booked this month' },
  { value: '$2.87', label: 'average rate per mile' },
  { value: '98%', label: 'on-time delivery' },
]

export function HeroInteractive() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-midnight flex items-center">
      {/* Three.js light-trail background */}
      <ThreeHero />

      {/* Readability vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-midnight via-midnight/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-midnight to-transparent" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
            Dispatch desk open 24/7
          </motion.div>

          <KineticTagline />

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link href="/dispatch" data-cursor="hover">
              <MagneticButton variant="primary">Get Dispatched →</MagneticButton>
            </Link>
            <Link href="/results" data-cursor="hover">
              <MagneticButton variant="ghost">See Real Results</MagneticButton>
            </Link>
          </motion.div>

          {/* Stat ticker */}
          <motion.div
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {ticker.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + i * 0.12 }}
              >
                <p className="font-clash text-2xl font-bold text-amber md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
          aria-hidden="true"
        >
          <motion.span
            className="block h-2 w-1 rounded-full bg-amber"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
