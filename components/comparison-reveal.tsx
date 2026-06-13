'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ComparisonPoint {
  feature: string
  withFreightFlow: string
  without: string
}

interface ComparisonRevealProps {
  points: ComparisonPoint[]
  accent: string
}

export function ComparisonReveal({ points, accent }: ComparisonRevealProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <motion.div
      className="overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Table */}
      <div className="bg-gradient-to-b from-gray-100 to-transparent rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-white/5 to-transparent">
          <motion.div variants={itemVariants} className="text-xs uppercase tracking-widest text-gray-600 font-semibold">
            Feature
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: accent }}
          >
            ✓ With FreightFlow
          </motion.div>
          <motion.div variants={itemVariants} className="text-xs uppercase tracking-widest text-gray-500">
            Without
          </motion.div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {points.map((point, idx) => (
            <motion.div key={idx} variants={itemVariants} className="grid grid-cols-3 gap-4 p-6 hover:bg-gray-50 transition-colors">
              {/* Feature */}
              <div className="font-semibold text-gray-700">{point.feature}</div>

              {/* With FreightFlow */}
              <div className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-lg flex-shrink-0" style={{ color: accent }}>
                  ✓
                </span>
                <span>{point.withFreightFlow}</span>
              </div>

              {/* Without */}
              <div className="text-sm text-gray-500 flex items-start gap-2">
                <span className="text-lg flex-shrink-0 opacity-30">×</span>
                <span className="opacity-70">{point.without}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom callout */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-4 rounded-lg text-center text-sm"
        style={{
          background: `linear-gradient(135deg, ${accent}15, ${accent}05)`,
          borderLeft: `3px solid ${accent}`,
        }}
      >
        <p>
          <strong>💡 The difference?</strong> We're not just a load board—we're your dispatch partner, handling logistics so you can focus on driving and earning.
        </p>
      </motion.div>
    </motion.div>
  )
}
