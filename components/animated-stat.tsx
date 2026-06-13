'use client'

import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  color?: string
}

export function AnimatedStat({ value, label, suffix = '', prefix = '', color = '#FF8A00' }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
      if (barRef.current) {
        barRef.current.style.transform = 'scaleX(1)'
      }
    }
  }, [inView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = Math.floor(latest).toLocaleString()
      }
    })
  }, [spring])

  return (
    <div ref={ref} className="group">
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="font-clash text-2xl font-bold md:text-3xl" style={{ color }}>
            {prefix}
          </span>
        )}
        <span ref={numberRef} className="font-clash text-4xl font-bold tabular-nums md:text-5xl" style={{ color }}>
          0
        </span>
        <span className="font-clash text-2xl font-bold md:text-3xl" style={{ color }}>
          {suffix}
        </span>
      </div>

      <div className="mt-4 h-px w-full overflow-hidden bg-gray-200">
        <div
          ref={barRef}
          className="h-full origin-left transition-transform duration-[1.6s] ease-out"
          style={{ backgroundColor: color, transform: 'scaleX(0)' }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-600">{label}</p>
    </div>
  )
}
