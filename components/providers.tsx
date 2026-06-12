'use client'

import React, { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <CustomCursor />
        {children}
      </SmoothScroll>
    </MotionConfig>
  )
}
