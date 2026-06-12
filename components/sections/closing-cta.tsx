'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function ClosingCTA() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(600px at 0% 0%, rgba(255, 138, 0, 0.1) 0%, transparent 80%)',
            'radial-gradient(600px at 100% 0%, rgba(255, 138, 0, 0.1) 0%, transparent 80%)',
            'radial-gradient(600px at 0% 0%, rgba(255, 138, 0, 0.1) 0%, transparent 80%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-clash font-bold tracking-wide mb-6">
            Stop Searching.
            <br />
            <span className="text-amber">Start Hauling.</span>
          </h2>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join 2,400+ professional carriers. Better loads. Better rates. Better life.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/dispatch" data-cursor="hover" className="inline-block">
              <MagneticButton variant="primary">
                Get Dispatched Now →
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Subtext */}
          <p className="text-sm text-gray-500 mt-8">
            No credit card required • 5 min signup • Live dispatch available today
          </p>
        </motion.div>
      </div>
    </section>
  )
}
