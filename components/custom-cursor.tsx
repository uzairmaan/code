'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor: amber dot + trailing ring. Only activates on devices with a
 * fine pointer — touch devices keep their native behavior, and the native
 * cursor is hidden via class only once the component has mounted, so the page
 * is never left cursor-less if JS fails.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [role="button"], [data-cursor="hover"], input, select, textarea, label'))
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-amber/70"
          animate={{
            width: hovering ? 52 : 34,
            height: hovering ? 52 : 34,
            opacity: pressed ? 0.5 : 1,
            backgroundColor: hovering ? 'rgba(255,138,0,0.08)' : 'rgba(255,138,0,0)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full bg-amber"
          animate={{ width: pressed ? 5 : 7, height: pressed ? 5 : 7 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
