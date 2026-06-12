'use client'

import React from 'react'
import { motion } from 'framer-motion'

const partners = ['DAT One', 'Truckstop', 'Amazon Relay', 'C.H. Robinson', 'TQL', 'J.B. Hunt 360', 'Coyote', 'Uber Freight']

export function LogoMarquee() {
  const row = [...partners, ...partners]

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-12 overflow-hidden">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
        Sourcing loads across every major board
      </p>

      <div
        className="relative"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        <motion.div
          className="flex w-max items-center gap-16 px-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((name, idx) => (
            <span
              key={idx}
              className="whitespace-nowrap font-clash text-xl font-semibold text-gray-400 transition-colors hover:text-gray-600"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
