'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  color?: string
  icon?: string
}

export function AnimatedStat({ value, label, suffix = '', color = '#FF8A00', icon = '' }: AnimatedStatProps) {
  const numberRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!numberRef.current || !barRef.current) return

    ScrollTrigger.create({
      trigger: numberRef.current,
      onEnter: () => {
        // Count up animation
        gsap.fromTo(
          { num: 0 },
          { num: value },
          {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              if (numberRef.current) {
                numberRef.current.textContent = Math.floor(this.targets()[0].num).toLocaleString()
              }
            },
          },
        )

        // Bar fill animation
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 2,
            ease: 'power2.out',
            transformOrigin: 'left',
          },
        )
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [value])

  return (
    <div className="space-y-3">
      {icon && <div className="text-4xl">{icon}</div>}

      <div className="h-12 flex items-center">
        <div ref={numberRef} className="text-4xl font-bold font-mono" style={{ color }}>
          0
        </div>
        <span className="ml-2 text-lg" style={{ color }}>
          {suffix}
        </span>
      </div>

      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>

      <p className="text-sm text-slate-400">{label}</p>
    </div>
  )
}
