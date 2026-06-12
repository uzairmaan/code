'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your carrier profile in minutes with your MC/DOT info. No setup fees, no contracts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Hunt Loads',
    description: 'Your dispatcher works the boards and broker relationships to line up the best-paying freight.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'You Drive',
    description: 'Run the load with 24/7 dispatch support. We handle check calls, detention, and lumper issues.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" d="M3 8h10v8H3zM13 10h3.6l2.4 3v3h-6M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'You Get Paid',
    description: 'Clean paperwork means fast settlements. Transparent flat-percentage fee, nothing hidden.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" d="M12 6v12m4-9.5C16 7 14.2 6 12 6s-4 1-4 2.75 1.5 2.4 4 2.75 4 1.2 4 2.75S14.2 17 12 17s-4-1-4-2.5" />
      </svg>
    ),
  },
]

export function HowDispatchWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative overflow-hidden bg-midnight px-4 py-28 lg:px-8" id="how-it-works">
      <div className="container mx-auto" ref={ref}>
        <ScrollReveal className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">The process</p>
          <h2 className="mt-3 font-clash text-4xl font-bold md:text-5xl">
            From signup to settled, <span className="text-slate-500">in four moves.</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Scroll-drawn connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block">
            <motion.div className="h-full origin-left bg-gradient-to-r from-amber to-cyan" style={{ scaleX: lineScale }} />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <ScrollReveal key={step.number} delay={idx * 0.12}>
                <motion.div className="group relative" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                  {/* Node */}
                  <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber/30 bg-midnight-light text-amber transition-colors group-hover:border-amber group-hover:bg-amber/10">
                    {step.icon}
                  </div>

                  <span className="font-mono text-xs text-slate-600">{step.number}</span>
                  <h3 className="mt-1 font-clash text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
