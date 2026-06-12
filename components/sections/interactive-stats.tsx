'use client'

import React from 'react'
import { AnimatedStat } from '@/components/animated-stat'
import { ScrollReveal } from '@/components/scroll-reveal'

export function InteractiveStats() {
  return (
    <section className="py-24 px-4 bg-midnight border-y border-white/5">
      <ScrollReveal className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <AnimatedStat value={1200} label="Loads Dispatched" suffix="+" icon="📊" color="#FF8A00" />
          <AnimatedStat value={2400} label="Active Carriers" suffix="" icon="👥" color="#22D3EE" />
          <AnimatedStat value={287} label="Avg Rate (¢/mi)" suffix="¢" icon="💰" color="#A78BFA" />
          <AnimatedStat value={98} label="On-Time Rate" suffix="%" icon="✓" color="#10B981" />
        </div>
      </ScrollReveal>
    </section>
  )
}
