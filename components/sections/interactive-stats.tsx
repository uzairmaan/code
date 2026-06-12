'use client'

import React from 'react'
import { AnimatedStat } from '@/components/animated-stat'
import { ScrollReveal } from '@/components/scroll-reveal'

export function InteractiveStats() {
  return (
    <section className="border-y border-white/5 bg-midnight-light/40 px-4 py-24 lg:px-8">
      <div className="container mx-auto">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">By the numbers</p>
          <h2 className="mt-3 max-w-xl font-clash text-3xl font-bold md:text-4xl">
            Dispatch that pays for itself
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatedStat value={1200} suffix="+" label="Loads dispatched every month" color="#FF8A00" />
          <AnimatedStat value={240} suffix="+" label="Active carriers on the roster" color="#22D3EE" />
          <AnimatedStat value={287} suffix="¢/mi" label="Average rate per mile negotiated" color="#A78BFA" />
          <AnimatedStat value={98} suffix="%" label="On-time pickup & delivery rate" color="#10B981" />
        </div>
      </div>
    </section>
  )
}
