'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    id: 'semis',
    name: 'Semi-Trucks',
    subtitle: 'Long-haul OTR',
    description: 'Cross-country loads, high mileage, established brokers',
    accent: '#FF8A00',
    rate: '$2.87',
    rateUnit: 'avg/mile',
    icon: '🚛',
  },
  {
    id: 'box-trucks',
    name: '26-ft Box Trucks',
    subtitle: 'Regional & Local',
    description: 'Regional runs, faster turnarounds, consistent freight',
    accent: '#22D3EE',
    rate: '$1.95',
    rateUnit: 'avg/mile',
    icon: '📦',
  },
  {
    id: 'hotshots',
    name: 'Hotshots',
    subtitle: 'Expedited',
    description: 'Time-sensitive loads, higher rates, premium service',
    accent: '#EF4444',
    rate: '$4.50+',
    rateUnit: 'avg/mile',
    icon: '⚡',
  },
]

export function ServicesPreview() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 bg-midnight">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-clash font-bold tracking-wide mb-4">
            Pick Your Lane
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Three specialized dispatch streams. One exceptional platform.
          </p>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <motion.div
                className="bg-midnight-light border border-white/10 rounded-xl p-8 cursor-pointer overflow-hidden group"
                animate={{
                  flex: hoveredId === service.id ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-4xl">{service.icon}</span>
                      <div>
                        <h3 className="text-2xl font-clash font-bold">{service.name}</h3>
                        <p className="text-sm text-slate-400">{service.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 mt-3">{service.description}</p>
                  </div>

                  {/* Rate display */}
                  <motion.div
                    className="flex-shrink-0 ml-8 text-right"
                    animate={{
                      scale: hoveredId === service.id ? 1.1 : 1,
                    }}
                  >
                    <div
                      className="text-3xl font-bold font-mono"
                      style={{ color: service.accent }}
                    >
                      {service.rate}
                    </div>
                    <p className="text-xs text-slate-400">{service.rateUnit}</p>
                  </motion.div>
                </div>

                {/* Hover underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${service.accent}, transparent)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredId === service.id ? '100%' : '0%',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
