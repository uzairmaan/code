'use client'

import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Marcus Johnson',
    company: 'Johnson Semi-Trucking',
    service: 'Semi-Trucks',
    quote: 'Went from averaging $1,900/week to $2,600. The dispatch quality is unreal.',
    rating: 5,
    metric: '+38% weekly gross',
  },
  {
    name: 'Sarah Chen',
    company: 'Chen & Partners Logistics',
    service: 'Box Trucks',
    quote: 'No more dead miles. Every load is profitable and well-planned.',
    rating: 5,
    metric: '15 loads/week avg',
  },
]

export function TestimonialsTeaser() {
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
            What Carriers Are Saying
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real results from real drivers and carriers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-8 border border-amber/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                borderColor: 'rgba(255, 138, 0, 0.4)',
                transition: { duration: 0.3 },
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg leading-relaxed mb-6 text-slate-200">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.company}</p>
                </div>
                <div className="text-right">
                  <div className="text-amber font-bold text-sm">{testimonial.metric}</div>
                  <div className="text-xs text-slate-500">{testimonial.service}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
