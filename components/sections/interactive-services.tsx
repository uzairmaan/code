'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'

const services = [
  {
    id: 'semis',
    name: 'Semi-Trucks',
    color: '#FF8A00',
    description: 'Long-haul OTR dispatch for dry van, reefer, and flatbed power units.',
    rate: '$2.87/mi',
    rateLabel: 'avg negotiated',
    icon: (
      <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-10 w-14">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 5h16v12H2zM18 9h6l4 4v4h-10M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM23 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    id: 'box-trucks',
    name: '26-ft Box Trucks',
    color: '#22D3EE',
    description: 'Regional runs and expedited LTL freight for non-CDL box trucks.',
    rate: '$1.95/mi',
    rateLabel: 'avg negotiated',
    icon: (
      <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-10 w-14">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 4h18v13H2zM20 9h5l3 4v4h-8M8 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 8h10" />
      </svg>
    ),
  },
  {
    id: 'hotshots',
    name: 'Hotshots',
    color: '#EF4444',
    description: 'Expedited time-critical freight for gooseneck and flatbed trailers.',
    rate: '$4.50/mi',
    rateLabel: 'expedited avg',
    icon: (
      <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-10 w-14">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h10v7H2zM12 10h5l3-5h4M12 15h16v-3M9 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM25.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
]

export function InteractiveServices() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [spot, setSpot] = useState({ x: 50, y: 50 })

  return (
    <section className="relative overflow-hidden bg-midnight px-4 py-28 lg:px-8" id="services">
      <div className="container mx-auto">
        <ScrollReveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">What we dispatch</p>
            <h2 className="mt-3 font-clash text-4xl font-bold md:text-5xl">Pick your lane.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Three fleets, one promise: your truck never sits. Dedicated dispatcher, no forced loads, flat percentage.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 0.1}>
              <Link href={`/services/${service.id}`} data-cursor="hover" className="block h-full">
                <motion.article
                  className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.04] to-transparent p-8"
                  style={{ borderColor: hoveredId === service.id ? service.color : 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect()
                    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  {/* Cursor-tracking spotlight */}
                  {hoveredId === service.id && (
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity"
                      style={{
                        background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${service.color}18, transparent 65%)`,
                      }}
                    />
                  )}

                  <div style={{ color: service.color }}>{service.icon}</div>

                  <h3 className="mt-6 font-clash text-2xl font-bold">{service.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.description}</p>

                  <div className="mt-auto flex items-end justify-between pt-8">
                    <div>
                      <p className="font-mono text-2xl font-bold" style={{ color: service.color }}>
                        {service.rate}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{service.rateLabel}</p>
                    </div>
                    <motion.span
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors group-hover:border-transparent"
                      animate={{
                        backgroundColor: hoveredId === service.id ? service.color : 'rgba(255,255,255,0)',
                        color: hoveredId === service.id ? '#0A0C10' : '#cbd5e1',
                        rotate: hoveredId === service.id ? -45 : 0,
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
