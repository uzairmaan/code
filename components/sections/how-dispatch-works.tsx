'use client'

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your carrier profile in minutes with your MC/DOT info',
    icon: '📝',
  },
  {
    number: '02',
    title: 'We Find Loads',
    description: 'Real-time matching with premium brokers and direct shippers',
    icon: '🔍',
  },
  {
    number: '03',
    title: 'You Drive',
    description: 'Execute the load with 24/7 dispatch support and real-time tracking',
    icon: '🛣️',
  },
  {
    number: '04',
    title: 'You Get Paid',
    description: 'Fast settlements, transparent rates, and instant payouts',
    icon: '💰',
  },
]

export function HowDispatchWorks() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-midnight to-midnight-light relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-clash font-bold tracking-wide mb-4">
            How Dispatch Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From signup to your first load, the process is streamlined and transparent.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <div className="relative">
          {/* Animated connecting line */}
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber to-transparent opacity-30" />

          {/* Steps grid */}
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Step card */}
                <div className="relative">
                  {/* Step number circle */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center mb-6 mx-auto"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-2xl font-clash font-bold text-black">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-clash font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="text-4xl text-center mt-4 opacity-40">{step.icon}</div>

                  {/* Connector arrow (not on last) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/3 text-amber opacity-50">
                      →
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Truck icon travelling the path (decorative) */}
        <motion.div
          className="absolute top-1/4 left-0 text-amber text-4xl"
          animate={{
            x: ['0%', '90%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ pointerEvents: 'none' }}
        >
          🚛
        </motion.div>
      </div>
    </section>
  )
}
