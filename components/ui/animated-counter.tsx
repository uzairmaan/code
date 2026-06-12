'use client'

import React, { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, motion, animate } from 'framer-motion'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  format?: (val: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  format,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => {
    return format ? format(Math.round(latest)) : Math.round(latest).toString()
  })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration })
    }
  }, [isInView, value, duration, motionValue])

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  )
}
