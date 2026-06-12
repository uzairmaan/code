'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MorphingShapeProps {
  className?: string
  color?: string
}

export function MorphingShape({ className = '', color = '#FF8A00' }: MorphingShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const shapes = [
    'M300,150 Q150,50 150,150 Q150,250 300,250 Q450,250 450,150 Q450,50 300,150',
    'M300,50 L450,150 L400,300 L200,300 L150,150 Z',
    'M300,150 A100,100 0 0,1 400,250 A100,100 0 0,1 300,350 A100,100 0 0,1 200,250 A100,100 0 0,1 300,150',
    'M300,50 Q450,150 400,300 Q300,450 150,300 Q100,150 300,50',
    'M300,150 L350,200 L400,250 L350,300 L300,350 L250,300 L200,250 L250,200 Z',
  ]

  useEffect(() => {
    if (!svgRef.current) return

    const path = svgRef.current.querySelector('path')
    if (!path) return

    let shapeIndex = 0

    const morphAnimation = () => {
      const nextShape = shapes[(shapeIndex + 1) % shapes.length]

      gsap.to(path, {
        attr: { d: nextShape },
        duration: 3,
        ease: 'sine.inOut',
        onComplete: () => {
          shapeIndex = (shapeIndex + 1) % shapes.length
          morphAnimation()
        },
      })
    }

    morphAnimation()

    return () => {
      gsap.killTweensOf(path)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 400"
      className={`w-full max-w-xs mx-auto ${className}`}
      style={{ filter: 'drop-shadow(0 0 20px rgba(255,138,0,0.3))' }}
    >
      <path
        d={shapes[0]}
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}
