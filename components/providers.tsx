'use client'

import React, { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { CustomCursor } from '@/components/custom-cursor'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      {children}
    </MotionConfig>
  )
}
