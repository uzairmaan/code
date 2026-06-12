'use client'

import React, { useEffect, useState } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
        a, button, [role="button"] { cursor: none !important; }
      `}</style>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none mix-blend-screen z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-8 h-8 border-2 border-amber rounded-full"
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-2 h-2 bg-amber rounded-full"
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Trailing particles */}
      {[...Array(5)].map((_, i) => (
        <TrailingParticle key={i} delay={i * 0.05} cursorX={cursorX} cursorY={cursorY} />
      ))}
    </>
  )
}

function TrailingParticle({ delay, cursorX, cursorY }: any) {
  const x = useTransform(cursorX, (latest: number) => latest - (delay * 20))
  const y = useTransform(cursorY, (latest: number) => latest - (delay * 20))

  return (
    <motion.div
      className="fixed pointer-events-none w-1 h-1 bg-amber rounded-full z-40"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    />
  )
}
