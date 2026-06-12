'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { KineticTagline } from '@/components/kinetic-tagline'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Parallax } from '@/components/scroll-reveal'

// Lazy load Three.js hero to avoid SSR issues
const ThreeHero = dynamic(() => import('@/components/three-hero').then((mod) => ({ default: mod.ThreeHero })), {
  ssr: false,
  loading: () => <div className="h-[70vh] bg-gradient-to-b from-midnight-light to-midnight" />,
})

export function HeroInteractive() {
  return (
    <section className="relative overflow-hidden bg-midnight">
      {/* Three.js 3D Background */}
      <ThreeHero />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          className="container mx-auto px-4 text-center max-w-3xl pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <KineticTagline />

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MagneticButton variant="primary">Get Dispatched →</MagneticButton>
            <MagneticButton variant="ghost">See Our Rates</MagneticButton>
          </motion.div>

          {/* Live Stat Ticker with Parallax */}
          <Parallax offset={30}>
            <motion.div
              className="pt-12 border-t border-white/10 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">Real Numbers</p>
              <div className="font-mono text-sm text-amber space-y-1">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                  ▪ 1,200+ loads booked this month
                </motion.div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
                  ▪ Avg $2.87 per mile | 24/7 dispatch
                </motion.div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.3 }}>
                  ▪ 98% on-time rate
                </motion.div>
              </div>
            </motion.div>
          </Parallax>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-amber mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
