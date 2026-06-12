'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MorphingShape } from '@/components/morphing-shape'
import { ScrollReveal } from '@/components/scroll-reveal'

const services = [
  {
    id: 'semis',
    name: 'Semi-Trucks',
    icon: '🚛',
    color: '#FF8A00',
    description: 'Long-haul OTR dispatch',
    rate: '$2.87/mi',
  },
  {
    id: 'box-trucks',
    name: '26-ft Box Trucks',
    icon: '📦',
    color: '#22D3EE',
    description: 'Regional runs',
    rate: '$1.95/mi',
  },
  {
    id: 'hotshots',
    name: 'Hotshots',
    icon: '⚡',
    color: '#EF4444',
    description: 'Expedited freight',
    rate: '$4.50/mi',
  },
]

export function InteractiveServices() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-midnight to-midnight-light relative overflow-hidden">
      <ScrollReveal className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-clash font-bold mb-4">Pick Your Lane</h2>
          <p className="text-lg text-slate-400">Choose your service and earn premium rates</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <motion.div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* 3D Card Effect */}
                <motion.div
                  className="relative z-10 h-80 rounded-2xl p-8 border-2 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm overflow-hidden"
                  style={{ borderColor: `${service.color}33` }}
                  animate={{
                    borderColor: hoveredId === service.id ? service.color : `${service.color}33`,
                    boxShadow:
                      hoveredId === service.id ? `0 0 30px ${service.color}40` : '0 0 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{
                      scale: hoveredId === service.id ? 1.2 : 1,
                      y: hoveredId === service.id ? -10 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-clash font-bold mb-2">{service.name}</h3>
                  <p className="text-sm text-slate-400 mb-6">{service.description}</p>

                  {/* Rate */}
                  <motion.div
                    className="absolute bottom-8 left-0 right-0 px-8"
                    animate={{
                      opacity: hoveredId === service.id ? 1 : 0.5,
                      scale: hoveredId === service.id ? 1.1 : 1,
                    }}
                  >
                    <p className="font-mono font-bold text-lg" style={{ color: service.color }}>
                      {service.rate}
                    </p>
                  </motion.div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${service.color}20, transparent)`,
                    }}
                    animate={{
                      opacity: hoveredId === service.id ? 1 : 0,
                    }}
                  />
                </motion.div>

                {/* Background morphing shape */}
                <motion.div
                  className="absolute inset-0 -z-10 opacity-20"
                  animate={{
                    scale: hoveredId === service.id ? 1.2 : 1,
                    opacity: hoveredId === service.id ? 0.4 : 0.2,
                  }}
                >
                  <MorphingShape color={service.color} />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
