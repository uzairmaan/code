'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ServiceData } from '@/lib/service-data'
import { RateCalculator } from '@/components/rate-calculator'
import { TruckSpecDiagram } from '@/components/truck-spec-diagram'
import { FAQAccordion } from '@/components/faq-accordion'
import { ComparisonReveal } from '@/components/comparison-reveal'
import { MagneticButton } from '@/components/ui/magnetic-button'

interface ServicePageProps {
  service: ServiceData
}

export function ServicePage({ service }: ServicePageProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <main className="bg-midnight">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-midnight-light to-midnight relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: service.accent }}
          />
        </div>

        <motion.div
          className="container mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">{service.icon}</span>
              <div>
                <h1 className="text-5xl md:text-6xl font-clash font-bold tracking-wide">
                  {service.name}
                </h1>
                <p className="text-lg text-slate-400 mt-2">{service.subtitle}</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-2xl mt-8 leading-relaxed"
          >
            {service.description}
          </motion.p>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { label: 'Avg Rate', value: `$${service.avgRate.toFixed(2)}/mi`, color: service.accent },
              { label: 'Load Capacity', value: service.specs.capacity, color: service.accent },
              { label: 'Service Area', value: service.specs.lanes, color: service.accent },
            ].map((stat, idx) => (
              <div key={idx} className="glass rounded-lg p-4 border" style={{ borderColor: `${service.accent}33` }}>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                <p className="font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Specs Section */}
      <section className="py-24 px-4 border-y border-white/5">
        <motion.div
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-clash font-bold mb-12">
            The Rig
          </motion.h2>

          <TruckSpecDiagram
            hotspots={service.hotspots}
            accent={service.accent}
            truckType={service.id === 'semis' ? 'semi' : service.id === 'box-trucks' ? 'box' : 'hotshot'}
          />
        </motion.div>
      </section>

      {/* Rate Calculator Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-midnight to-midnight-light">
        <motion.div
          className="container mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-clash font-bold mb-4">
            Earnings Calculator
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-12">
            See what you could earn with FreightFlow
          </motion.p>

          <RateCalculator avgRate={service.avgRate} accent={service.accent} />
        </motion.div>
      </section>

      {/* What We Handle Section */}
      <section className="py-24 px-4 border-y border-white/5">
        <motion.div
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-clash font-bold mb-12">
            What We Handle
          </motion.h2>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {service.freightTypes.map((type, idx) => (
              <motion.div
                key={idx}
                className="glass rounded-lg p-4 text-center border transition-all hover:border-white/20"
                style={{ borderColor: `${service.accent}33` }}
                whileHover={{ scale: 1.05, borderColor: service.accent }}
              >
                <p className="text-sm font-semibold text-slate-200">{type}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-midnight to-midnight-light">
        <motion.div
          className="container mx-auto max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-clash font-bold mb-4">
            With vs. Without
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-12">
            Why carriers choose FreightFlow over traditional load boards
          </motion.p>

          <ComparisonReveal points={service.comparisonPoints} accent={service.accent} />
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 border-y border-white/5">
        <motion.div
          className="container mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-clash font-bold mb-12">
            Frequently Asked
          </motion.h2>

          <FAQAccordion items={service.faqs} accent={service.accent} />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-midnight to-midnight-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: service.accent }}
          />
        </div>

        <motion.div
          className="container mx-auto text-center relative z-10 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-clash font-bold mb-6">
            Ready to Get Dispatched?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-300 mb-10">
            Join {service.name === 'Semi-Trucks' ? '1,200+' : '800+'} carriers earning premium rates with FreightFlow.
          </motion.p>

          <motion.div variants={itemVariants}>
            <MagneticButton variant="primary">Get Dispatched Now →</MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Mobile Sticky Dock */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-midnight via-midnight to-transparent p-4 border-t border-white/10 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <MagneticButton variant="primary" className="w-full">
          Get Dispatched →
        </MagneticButton>
      </motion.div>

      {/* Mobile padding */}
      <div className="h-20 md:hidden" />
    </main>
  )
}
