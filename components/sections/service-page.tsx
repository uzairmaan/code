'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ServiceData } from '@/lib/service-data'
import { RateCalculator } from '@/components/rate-calculator'
import { FAQAccordion } from '@/components/faq-accordion'
import { ComparisonReveal } from '@/components/comparison-reveal'
import { MagneticButton } from '@/components/ui/magnetic-button'

interface ServicePageProps {
  service: ServiceData
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function ServicePage({ service }: ServicePageProps) {
  const img = `${BASE}/services/${service.id}.jpg`

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const specs = [
    { label: 'Load Capacity', value: service.specs.capacity },
    { label: 'Service Area', value: service.specs.lanes },
    { label: 'Typical Freight', value: service.specs.typical },
    { label: 'Avg Turnaround', value: service.specs.turnAround },
    { label: 'Rate Range', value: `$${service.rateRange.min.toFixed(2)}–$${service.rateRange.max.toFixed(2)}/mi` },
    { label: 'Avg Negotiated', value: `$${service.avgRate.toFixed(2)}/mi` },
  ]

  return (
    <main className="bg-gray-50">
      {/* Hero — real truck photo */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-gray-100">
        <img
          src={img}
          alt={`${service.name} dispatch — glossy black ${service.name.toLowerCase()} above the clouds`}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/85 via-white/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 inline-block rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{ color: service.accent, borderColor: `${service.accent}66`, backgroundColor: `${service.accent}14` }}
          >
            {service.subtitle}
          </motion.p>
          <motion.h1 variants={itemVariants} className="max-w-2xl font-clash text-5xl font-bold tracking-tight text-ink md:text-7xl">
            {service.name}
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {service.description}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: 'Avg Rate', value: `$${service.avgRate.toFixed(2)}/mi` },
              { label: 'Capacity', value: service.specs.capacity },
              { label: 'Turnaround', value: service.specs.turnAround },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
                <p className="text-[0.65rem] uppercase tracking-widest text-gray-500">{stat.label}</p>
                <p className="mt-1 font-bold" style={{ color: service.accent }}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <Link href="/dispatch" className="rounded-full bg-ink px-6 py-3 font-medium text-white transition-colors hover:bg-ink-dark">
              Get Dispatched
            </Link>
            <a href="#calculator" className="rounded-full bg-white/80 px-6 py-3 font-medium text-gray-800 backdrop-blur-sm transition-colors hover:bg-white">
              Estimate earnings
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* The Rig — spec sheet (structured, SEO-friendly facts) */}
      <section className="border-y border-gray-200 px-4 py-24">
        <motion.div
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="mb-12 font-clash text-4xl font-bold">The Rig</motion.h2>
          <motion.dl variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-xl border bg-white p-6" style={{ borderColor: `${service.accent}26` }}>
                <dt className="text-xs uppercase tracking-widest text-gray-500">{s.label}</dt>
                <dd className="mt-2 text-lg font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </section>

      {/* Rate Calculator */}
      <section id="calculator" className="bg-gradient-to-b from-gray-50 to-white px-4 py-24 scroll-mt-24">
        <motion.div className="container mx-auto max-w-4xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="mb-4 font-clash text-4xl font-bold">Earnings Calculator</motion.h2>
          <motion.p variants={itemVariants} className="mb-12 text-lg text-gray-600">See what you could earn with FreightFlow.</motion.p>
          <RateCalculator avgRate={service.avgRate} accent={service.accent} />
        </motion.div>
      </section>

      {/* What We Handle */}
      <section className="border-y border-gray-200 px-4 py-24">
        <motion.div className="container mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="mb-12 font-clash text-4xl font-bold">What We Handle</motion.h2>
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {service.freightTypes.map((type) => (
              <motion.div
                key={type}
                className="rounded-xl border bg-white p-4 text-center transition-all"
                style={{ borderColor: `${service.accent}26` }}
                whileHover={{ scale: 1.04, borderColor: service.accent }}
              >
                <p className="text-sm font-semibold text-gray-700">{type}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Comparison */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-24">
        <motion.div className="container mx-auto max-w-5xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="mb-4 font-clash text-4xl font-bold">With vs. Without</motion.h2>
          <motion.p variants={itemVariants} className="mb-12 text-lg text-gray-600">Why carriers choose FreightFlow over traditional load boards.</motion.p>
          <ComparisonReveal points={service.comparisonPoints} accent={service.accent} />
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="border-y border-gray-200 px-4 py-24">
        <motion.div className="container mx-auto max-w-3xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="mb-12 font-clash text-4xl font-bold">Frequently Asked</motion.h2>
          <FAQAccordion items={service.faqs} accent={service.accent} />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: service.accent }} />
        </div>
        <motion.div className="container relative z-10 mx-auto max-w-2xl text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="mb-6 font-clash text-4xl font-bold">Ready to Get Dispatched?</motion.h2>
          <motion.p variants={itemVariants} className="mb-10 text-lg text-gray-600">
            Join {service.name === 'Semi-Trucks' ? '1,200+' : '800+'} carriers earning premium rates with FreightFlow.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/dispatch"><MagneticButton variant="primary">Get Dispatched Now →</MagneticButton></Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Mobile sticky dock */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent p-4 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Link href="/dispatch"><MagneticButton variant="primary" className="w-full">Get Dispatched →</MagneticButton></Link>
      </motion.div>
      <div className="h-20 md:hidden" />
    </main>
  )
}
