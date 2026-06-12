'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface RateCalculatorProps {
  avgRate: number
  accent: string
}

export function RateCalculator({ avgRate, accent }: RateCalculatorProps) {
  const [milesPerWeek, setMilesPerWeek] = useState(3000)
  const [targetRpm, setTargetRpm] = useState(avgRate * 100)

  const weeklyGross = useMemo(() => {
    return (milesPerWeek * (targetRpm / 100)).toFixed(0)
  }, [milesPerWeek, targetRpm])

  const monthlyGross = useMemo(() => {
    return (Number(weeklyGross) * 4.33).toFixed(0)
  }, [weeklyGross])

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sliders */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Miles Per Week */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-600">Miles Per Week</label>
              <motion.span
                className="text-lg font-mono font-bold"
                style={{ color: accent }}
                key={milesPerWeek}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {milesPerWeek.toLocaleString()}
              </motion.span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="100"
              value={milesPerWeek}
              onChange={(e) => setMilesPerWeek(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accent}, ${accent}) no-repeat`,
                backgroundSize: `${((milesPerWeek - 500) / (8000 - 500)) * 100}% 100%`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>500 mi</span>
              <span>8,000 mi</span>
            </div>
          </div>

          {/* Target RPM */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-600">Target $/Mile (RPM)</label>
              <motion.span
                className="text-lg font-mono font-bold"
                style={{ color: accent }}
                key={targetRpm}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                ${(targetRpm / 100).toFixed(2)}
              </motion.span>
            </div>
            <input
              type="range"
              min="150"
              max="700"
              step="5"
              value={targetRpm}
              onChange={(e) => setTargetRpm(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accent}, ${accent}) no-repeat`,
                backgroundSize: `${((targetRpm - 150) / (700 - 150)) * 100}% 100%`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$1.50</span>
              <span>$7.00</span>
            </div>
          </div>
        </motion.div>

        {/* Results Card */}
        <motion.div
          className="glass rounded-xl p-8 border"
          style={{ borderColor: `${accent}33` }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-sm uppercase tracking-widest text-gray-600 mb-6">
            Estimated Weekly Earnings
          </h3>

          {/* Weekly */}
          <motion.div
            className="mb-8"
            key={`weekly-${weeklyGross}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="text-gray-600 text-sm mb-2">Per Week</p>
            <div
              className="text-5xl font-bold font-mono"
              style={{ color: accent }}
            >
              ${Number(weeklyGross).toLocaleString()}
            </div>
          </motion.div>

          {/* Monthly */}
          <motion.div
            key={`monthly-${monthlyGross}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <p className="text-gray-600 text-sm mb-2">Per Month (avg)</p>
            <div
              className="text-3xl font-bold font-mono"
              style={{ color: accent }}
            >
              ${Number(monthlyGross).toLocaleString()}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-8 pt-6 border-t border-gray-200">
            Estimates based on average rates. Actual earnings vary by load type, season, and fuel costs. Does not include operational expenses.
          </p>
        </motion.div>
      </div>

      {/* Info Banner */}
      <motion.div
        className="bg-gradient-to-r p-6 rounded-xl text-sm"
        style={{
          backgroundImage: `linear-gradient(135deg, ${accent}15, ${accent}05)`,
          borderLeft: `4px solid ${accent}`,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>
          <strong>💡 Pro Tip:</strong> Higher RPM ($/mile) loads tend to have longer hours and less home time. Balance rate with home time preferences for sustainable long-term earnings.
        </p>
      </motion.div>
    </div>
  )
}
