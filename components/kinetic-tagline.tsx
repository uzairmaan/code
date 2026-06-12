'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['SEMIS', 'BOX TRUCKS', 'HOTSHOTS', 'YOUR SUCCESS']

export function KineticTagline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const headlineText = "WE DISPATCH "

  return (
    <div className="space-y-6">
      <motion.div
        className="text-5xl md:text-7xl font-bold font-clash tracking-wide"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-wrap gap-3">
          {headlineText.split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Rotating word */}
        <div className="relative h-20 md:h-32 mt-4 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 15,
              }}
              className="text-amber inline-block font-clash tracking-wide"
            >
              {words[index]}
              {index === words.length - 1 && (
                <motion.span
                  className="ml-2"
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block h-1 bg-amber"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </motion.span>
              )}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sub-tagline */}
      <motion.div
        className="text-lg md:text-xl text-slate-300 leading-relaxed"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {`Real loads. Real money. Real freedom.`
          .split(' ')
          .map((word, i) => (
            <motion.span key={i} variants={letterVariants} className="inline-block mr-2">
              {word}
            </motion.span>
          ))}
      </motion.div>
    </div>
  )
}
