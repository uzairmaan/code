'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function HeroTruck() {
  return (
    <motion.svg
      viewBox="0 0 400 200"
      className="w-full max-w-2xl"
      initial={{ x: '-120%' }}
      animate={{ x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 12,
        mass: 1.5,
        delay: 0.2,
      }}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Truck shadow */}
      <ellipse cx="200" cy="180" rx="150" ry="15" fill="#000" opacity="0.2" />

      {/* Cab */}
      <rect
        x="60"
        y="100"
        width="60"
        height="60"
        rx="4"
        fill="#1a1d24"
        stroke="#FF8A00"
        strokeWidth="2"
        filter="url(#shadow)"
      />

      {/* Cab top (roof) */}
      <path d="M 60 100 L 80 70 L 120 70 L 120 100 Z" fill="#2a2e38" stroke="#FF8A00" strokeWidth="2" />

      {/* Windshield */}
      <rect x="65" y="105" width="25" height="35" fill="#4A90E2" opacity="0.4" rx="2" />

      {/* Trailer */}
      <rect
        x="130"
        y="110"
        width="210"
        height="50"
        rx="4"
        fill="#0f1217"
        stroke="#FF8A00"
        strokeWidth="2"
        filter="url(#shadow)"
      />

      {/* Trailer stripes */}
      <line x1="150" y1="110" x2="150" y2="160" stroke="#FF8A00" strokeWidth="1" opacity="0.3" />
      <line x1="180" y1="110" x2="180" y2="160" stroke="#FF8A00" strokeWidth="1" opacity="0.3" />
      <line x1="210" y1="110" x2="210" y2="160" stroke="#FF8A00" strokeWidth="1" opacity="0.3" />
      <line x1="240" y1="110" x2="240" y2="160" stroke="#FF8A00" strokeWidth="1" opacity="0.3" />
      <line x1="270" y1="110" x2="270" y2="160" stroke="#FF8A00" strokeWidth="1" opacity="0.3" />
      <line x1="300" y1="110" x2="300" y2="160" stroke="#FF8A00" strokeWidth="1" opacity="0.3" />

      {/* Front wheel (cab) - rotating */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        origin="100 170"
      >
        <circle cx="100" cy="170" r="15" fill="none" stroke="#1a1d24" strokeWidth="3" />
        <circle cx="100" cy="170" r="12" fill="none" stroke="#FF8A00" strokeWidth="1" />
        <line
          x1="100"
          y1="155"
          x2="100"
          y2="185"
          stroke="#1a1d24"
          strokeWidth="2"
        />
      </motion.g>

      {/* Dual rear wheels (left) - rotating */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        origin="280 170"
      >
        <circle cx="280" cy="170" r="15" fill="none" stroke="#1a1d24" strokeWidth="3" />
        <circle cx="280" cy="170" r="12" fill="none" stroke="#FF8A00" strokeWidth="1" />
        <line
          x1="280"
          y1="155"
          x2="280"
          y2="185"
          stroke="#1a1d24"
          strokeWidth="2"
        />
      </motion.g>

      {/* Dual rear wheels (right) - rotating */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        origin="310 170"
      >
        <circle cx="310" cy="170" r="15" fill="none" stroke="#1a1d24" strokeWidth="3" />
        <circle cx="310" cy="170" r="12" fill="none" stroke="#FF8A00" strokeWidth="1" />
        <line
          x1="310"
          y1="155"
          x2="310"
          y2="185"
          stroke="#1a1d24"
          strokeWidth="2"
        />
      </motion.g>

      {/* Exhaust smoke particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={45}
          cy={90 + i * 8}
          r="3"
          fill="#888"
          opacity="0.3"
          animate={{
            x: -20,
            opacity: 0,
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Cab bounce animation */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect
          x="60"
          y="100"
          width="60"
          height="60"
          rx="4"
          fill="#1a1d24"
          stroke="#FF8A00"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        <path d="M 60 100 L 80 70 L 120 70 L 120 100 Z" fill="#2a2e38" stroke="#FF8A00" strokeWidth="2" />
        <rect x="65" y="105" width="25" height="35" fill="#4A90E2" opacity="0.4" rx="2" />
      </motion.g>
    </motion.svg>
  )
}
