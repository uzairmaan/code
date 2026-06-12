'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Hotspot {
  label: string
  x: number
  y: number
  description: string
}

interface TruckSpecDiagramProps {
  hotspots: Hotspot[]
  accent: string
  truckType: 'semi' | 'box' | 'hotshot'
}

export function TruckSpecDiagram({ hotspots, accent, truckType }: TruckSpecDiagramProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  const getTruckSvg = () => {
    if (truckType === 'semi') {
      return (
        <svg viewBox="0 0 400 200" className="w-full">
          <defs>
            <filter id="truck-shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx="200" cy="180" rx="160" ry="12" fill="#000" opacity="0.15" />

          {/* Cab */}
          <rect x="40" y="90" width="70" height="70" rx="4" fill="#1a1d24" stroke={accent} strokeWidth="2" filter="url(#truck-shadow)" />
          <path d="M 40 90 L 65 55 L 110 55 L 110 90 Z" fill="#2a2e38" stroke={accent} strokeWidth="2" />
          <rect x="48" y="98" width="20" height="30" fill="#4A90E2" opacity="0.5" rx="2" />

          {/* Trailer */}
          <rect x="120" y="105" width="220" height="55" rx="4" fill="#0f1217" stroke={accent} strokeWidth="2" filter="url(#truck-shadow)" />

          {/* Trailer details */}
          <line x1="140" y1="105" x2="140" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />
          <line x1="170" y1="105" x2="170" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />
          <line x1="200" y1="105" x2="200" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />
          <line x1="230" y1="105" x2="230" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />
          <line x1="260" y1="105" x2="260" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />
          <line x1="290" y1="105" x2="290" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />
          <line x1="320" y1="105" x2="320" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />

          {/* Wheels */}
          <circle cx="75" cy="165" r="14" fill="none" stroke="#1a1d24" strokeWidth="3" />
          <circle cx="75" cy="165" r="10" fill="none" stroke={accent} strokeWidth="1" />
          <circle cx="280" cy="165" r="14" fill="none" stroke="#1a1d24" strokeWidth="3" />
          <circle cx="280" cy="165" r="10" fill="none" stroke={accent} strokeWidth="1" />
          <circle cx="310" cy="165" r="14" fill="none" stroke="#1a1d24" strokeWidth="3" />
          <circle cx="310" cy="165" r="10" fill="none" stroke={accent} strokeWidth="1" />
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 400 200" className="w-full">
        <defs>
          <filter id="truck-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="200" cy="180" rx="140" ry="12" fill="#000" opacity="0.15" />

        {/* Cab */}
        <rect x="50" y="100" width="60" height="60" rx="3" fill="#1a1d24" stroke={accent} strokeWidth="2" filter="url(#truck-shadow)" />
        <path d="M 50 100 L 68 70 L 110 70 L 110 100 Z" fill="#2a2e38" stroke={accent} strokeWidth="2" />
        <rect x="56" y="107" width="16" height="25" fill="#4A90E2" opacity="0.5" rx="1" />

        {/* Box Body */}
        <rect x="115" y="110" width="200" height="50" rx="3" fill="#0f1217" stroke={accent} strokeWidth="2" filter="url(#truck-shadow)" />

        {/* Door line */}
        <line x1="215" y1="110" x2="215" y2="160" stroke={accent} strokeWidth="1" opacity="0.2" />

        {/* Wheels */}
        <circle cx="80" cy="165" r="12" fill="none" stroke="#1a1d24" strokeWidth="2.5" />
        <circle cx="80" cy="165" r="9" fill="none" stroke={accent} strokeWidth="1" />
        <circle cx="290" cy="165" r="12" fill="none" stroke="#1a1d24" strokeWidth="2.5" />
        <circle cx="290" cy="165" r="9" fill="none" stroke={accent} strokeWidth="1" />
      </svg>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Diagram Container */}
      <div className="relative bg-gradient-to-b from-slate-900/30 to-transparent rounded-xl border border-white/5 p-12 overflow-hidden">
        {/* Truck SVG */}
        <div className="relative z-10">{getTruckSvg()}</div>

        {/* Hotspots */}
        <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
          <AnimatePresence>
            {hotspots.map((hotspot, idx) => (
              <motion.g
                key={idx}
                pointerEvents="auto"
                onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Pulse circle */}
                <motion.circle
                  cx={`${hotspot.x}%`}
                  cy={`${hotspot.y}%`}
                  r="8"
                  fill="none"
                  stroke={accent}
                  strokeWidth="2"
                  opacity={0.5}
                  animate={{ r: [8, 14, 8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Center dot */}
                <circle
                  cx={`${hotspot.x}%`}
                  cy={`${hotspot.y}%`}
                  r="4"
                  fill={accent}
                />

                {/* Label on hover */}
                <motion.text
                  x={`${hotspot.x}%`}
                  y={`${hotspot.y - 3}%`}
                  textAnchor="middle"
                  fontSize="12"
                  fill={accent}
                  fontWeight="bold"
                  opacity={activeHotspot === idx ? 1 : 0.3}
                  pointerEvents="none"
                >
                  {hotspot.label}
                </motion.text>
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {activeHotspot !== null && (
          <motion.div
            className="glass rounded-lg p-6 border"
            style={{ borderColor: `${accent}33` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accent }} />
              <div>
                <h4 className="font-semibold mb-1" style={{ color: accent }}>
                  {hotspots[activeHotspot].label}
                </h4>
                <p className="text-sm text-slate-300">{hotspots[activeHotspot].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <p className="text-center text-sm text-slate-400">
        💡 Tap the colored dots on the truck to learn more about each component
      </p>
    </motion.div>
  )
}
