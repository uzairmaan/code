'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Flip3DCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  className?: string
}

export function Flip3DCard({ frontContent, backContent, className = '' }: Flip3DCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`relative w-full cursor-pointer h-full ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          className="w-full p-8 bg-gradient-to-br from-midnight-light to-midnight border border-amber/30 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full p-8 bg-gradient-to-br from-amber/20 to-amber/10 border border-amber/50 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  )
}
