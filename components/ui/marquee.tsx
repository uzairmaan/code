'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MarqueeProps {
  items: React.ReactNode[]
  duration?: number
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  items,
  duration = 30,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const duplicatedItems = [items, items, items].flat()

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-6"
        animate={{ x: [-100, -50, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        onHoverStart={() => pauseOnHover && (document.documentElement.style.animationPlayState = 'paused')}
        onHoverEnd={() => pauseOnHover && (document.documentElement.style.animationPlayState = 'running')}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
