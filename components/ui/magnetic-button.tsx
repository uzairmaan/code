'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  disabled?: boolean
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return

    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = 100
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

    const x = Math.cos(angle) * distance * 0.15
    const y = Math.sin(angle) * distance * 0.15

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles =
    'px-6 py-3 rounded-full font-medium transition-colors duration-300 relative'
  const primaryStyles =
    'bg-[#202A36] hover:bg-[#1a2229] text-white shadow-lg shadow-gray-900/10'
  const ghostStyles =
    'bg-gray-300 text-gray-800 hover:bg-gray-400'

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      <motion.button
        animate={position}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${variant === 'primary' ? primaryStyles : ghostStyles}
          ${className}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {children}
      </motion.button>
    </div>
  )
}
