'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { HeroTruck } from '@/components/hero-truck'
import { KineticTagline } from '@/components/kinetic-tagline'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-midnight via-midnight-light to-midnight pt-20 pb-12">
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Sky layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-midnight to-midnight opacity-40" />

        {/* Horizon line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber to-transparent opacity-20" />

        {/* Lane dashes scrolling */}
        <div className="absolute bottom-1/3 left-0 right-0 h-0.5 lane-pattern" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Truck Illustration */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroTruck />
          </motion.div>

          {/* Right: Headline & CTA */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <KineticTagline />

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MagneticButton variant="primary">
                Get Dispatched →
              </MagneticButton>
              <MagneticButton variant="ghost">
                See Our Rates
              </MagneticButton>
            </motion.div>

            {/* Live Stat Ticker */}
            <motion.div
              className="pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">
                Real Numbers
              </p>
              <div className="font-mono text-sm text-amber space-y-1">
                <div>▪ 1,200+ loads booked this month</div>
                <div>▪ Avg $2.87 per mile | 24/7 dispatch</div>
                <div>▪ 98% on-time rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-amber mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
