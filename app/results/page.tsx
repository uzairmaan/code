'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'

const wins = [
  { lane: 'ATL → DAL', rate: '$2.85/mi', rpM: '285¢', truck: 'Semi', revenue: '$3,420', days: '4.2 days' },
  { lane: 'PHX → LAX', rate: '$1.95/mi', rpM: '195¢', truck: 'Box', revenue: '$1,755', days: '2.1 days' },
  { lane: 'DEN → Houston', rate: '$4.50/mi', rpM: '450¢', truck: 'Hotshot', revenue: '$2,700', days: '1.2 days' },
  { lane: 'CHI → MIA', rate: '$2.72/mi', rpM: '272¢', truck: 'Semi', revenue: '$3,264', days: '5.1 days' },
  { lane: 'SEA → PDX', rate: '$1.80/mi', rpM: '180¢', truck: 'Box', revenue: '$1,620', days: '1.8 days' },
  { lane: 'NYC → BOS', rate: '$3.25/mi', rpM: '325¢', truck: 'Semi', revenue: '$1,950', days: '2.4 days' },
]

const filters = ['All', 'Semi', 'Box', 'Hotshot']

export default function ResultsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredWins = wins.filter((win) => selectedFilter === 'All' || win.truck === selectedFilter)

  return (
    <main className="bg-midnight">
      {/* Hero */}
      <section className="pt-36 pb-20 px-4 bg-gradient-to-b from-midnight-light to-midnight">
        <motion.div
          className="container mx-auto text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-clash font-bold mb-4">Real Loads. Real Money.</h1>
          <p className="text-lg text-slate-400">
            See the loads our carriers are getting and the rates they're earning, updated in real-time.
          </p>
        </motion.div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Wins Board */}
      <section className="py-24 px-4 border-y border-white/5">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-clash font-bold mb-4">Recent Loads</h2>
            <p className="text-slate-400">Loads dispatched in the last 7 days</p>
          </motion.div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className="px-4 py-2 rounded-lg border-2 transition-all text-sm font-semibold"
                animate={{
                  borderColor: selectedFilter === filter ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                  backgroundColor: selectedFilter === filter ? 'rgba(255,138,0,0.1)' : 'transparent',
                }}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            layout
          >
            {filteredWins.map((win, idx) => (
              <motion.div
                key={`${win.lane}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-lg p-4 border border-white/10 hover:border-amber/50 transition cursor-pointer group"
                whileHover={{ borderColor: '#FF8A00', scale: 1.02 }}
              >
                <div className="space-y-3">
                  {/* Lane */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Lane</p>
                    <p className="font-bold text-lg">{win.lane}</p>
                  </div>

                  {/* Rate & RPM */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Rate</p>
                      <p className="font-bold text-amber">{win.rate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">RPM</p>
                      <p className="font-bold text-amber">{win.rpM}</p>
                    </div>
                  </div>

                  {/* Truck Type */}
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-slate-400">{win.truck} Truck</p>
                  </div>

                  {/* Revenue & Time */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    <div>
                      <p className="text-xs text-slate-500">Gross</p>
                      <p className="font-bold text-cyan">{win.revenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Time</p>
                      <p className="font-bold text-cyan">{win.days}</p>
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-amber opacity-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-midnight to-midnight-light text-center">
        <motion.div
          className="container mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-clash font-bold mb-6">Ready to Earn Like This?</h2>
          <a href="/dispatch" className="inline-block px-8 py-3 bg-amber text-black font-bold rounded-lg hover:bg-amber-light transition">
            Get Dispatched Today
          </a>
        </motion.div>
      </section>
    </main>
  )
}
