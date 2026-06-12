'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Marcus Johnson',
    company: 'Johnson Semi-Trucking',
    service: 'Semi-Trucks',
    quote: 'Went from averaging $1,900/week to $2,600. The dispatch quality is unreal.',
    metric: '+38% weekly gross',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    company: 'Chen & Partners Logistics',
    service: 'Box Trucks',
    quote: 'No more dead miles. Every load is profitable and well-planned.',
    metric: '15 loads/week avg',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    company: 'Rodriguez Hotshot Services',
    service: 'Hotshots',
    quote: 'Premium rates and consistent dispatch. This is what I was looking for.',
    metric: '+52% weekly earnings',
    rating: 5,
  },
]

export function TestimonialsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-midnight-light to-midnight">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-clash font-bold mb-4">Carriers Are Earning More</h2>
          <p className="text-lg text-slate-400">Real results from carriers using FreightFlow</p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-xl p-8 md:p-12 border border-amber/30 min-h-80"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                <span key={i} className="text-amber text-lg">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-2xl font-clash font-bold mb-8 text-white">
              "{testimonials[activeIdx].quote}"
            </p>

            {/* Author */}
            <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
              <p className="font-bold text-lg">{testimonials[activeIdx].name}</p>
              <p className="text-sm text-slate-400">{testimonials[activeIdx].company}</p>
            </div>

            {/* Metric */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{testimonials[activeIdx].service}</span>
              <span className="text-amber font-bold">{testimonials[activeIdx].metric}</span>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="h-2 rounded-full transition-all"
                animate={{
                  width: activeIdx === idx ? 24 : 8,
                  backgroundColor: activeIdx === idx ? '#FF8A00' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
