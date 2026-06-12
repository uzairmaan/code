'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/animated-counter'

const stats = [
  { label: 'Loads Dispatched', value: 12000, suffix: '+', format: (v: number) => `${(v / 1000).toFixed(1)}k` },
  { label: 'Active Carriers', value: 2400, suffix: '', format: (v: number) => v.toString() },
  { label: 'Avg RPM', value: 287, suffix: '¢', format: (v: number) => `${(v / 100).toFixed(2)}` },
  { label: 'On-Time Rate', value: 98, suffix: '%', format: (v: number) => v.toString() },
]

export function StatsBand() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-midnight-light via-midnight to-midnight-light border-y border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="mb-3">
                <AnimatedCounter
                  value={stat.value}
                  format={stat.format}
                  className="block text-3xl md:text-4xl font-bold font-mono text-amber"
                />
                <span className="text-amber text-sm ml-1">{stat.suffix}</span>
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
