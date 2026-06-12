'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['SEMIS', 'BOX TRUCKS', 'HOTSHOTS']
const wordColors = ['#FF8A00', '#22D3EE', '#EF4444']

export function KineticTagline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1 className="font-clash text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        {/* Line 1 */}
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            WE DISPATCH
          </motion.span>
        </span>

        {/* Line 2: rotating word */}
        <span className="block h-[1.15em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              className="block"
              style={{ color: wordColors[index] }}
              initial={{ y: '110%', rotateX: -40 }}
              animate={{ y: 0, rotateX: 0 }}
              exit={{ y: '-110%', rotateX: 40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {words[index]}.
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      <motion.p
        className="mt-6 max-w-md text-lg leading-relaxed text-slate-300 md:text-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Top-paying loads, rate negotiation, and paperwork — handled. You drive,{' '}
        <span className="text-white font-semibold">we keep the wheels earning</span>.
      </motion.p>
    </div>
  )
}
