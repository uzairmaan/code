'use client'

import React from 'react'
import { motion } from 'framer-motion'

const logos = [
  { name: 'DAT', emoji: '📊' },
  { name: 'Truckstop', emoji: '🛑' },
  { name: 'Amazon Relay', emoji: '📦' },
  { name: 'Load Board', emoji: '📋' },
  { name: 'Broker Direct', emoji: '🤝' },
]

export function LogoMarquee() {
  const duplicated = [logos, logos, logos].flat()

  return (
    <section className="py-16 px-4 bg-midnight-light border-t border-b border-white/5">
      <div className="container mx-auto">
        <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8">
          Trusted By
        </p>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [-100 * (logos.length) + '%', 0] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicated.map((logo, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-3xl">{logo.emoji}</span>
                <span className="text-slate-400 font-semibold whitespace-nowrap">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
