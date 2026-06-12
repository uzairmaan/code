'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UseFormSetValue } from 'react-hook-form'
import { DispatchFormData } from '@/lib/dispatch-schema'

const trucks = [
  {
    id: 'semis',
    name: 'Semi-Trucks',
    icon: '🚛',
    subtitle: 'Long-haul OTR',
    rateRange: '$2.20 - $3.50/mi',
  },
  {
    id: 'box-trucks',
    name: '26-ft Box Trucks',
    icon: '📦',
    subtitle: 'Regional runs',
    rateRange: '$1.60 - $2.40/mi',
  },
  {
    id: 'hotshots',
    name: 'Hotshots',
    icon: '⚡',
    subtitle: 'Expedited freight',
    rateRange: '$3.50 - $7.00/mi',
  },
]

interface Step1Props {
  selected: string | undefined
  setValue: UseFormSetValue<DispatchFormData>
}

export function Step1TruckSelection({ selected, setValue }: Step1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-clash font-bold mb-2">Choose Your Truck</h2>
        <p className="text-slate-400">What type of hauling are you doing?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {trucks.map((truck) => (
          <motion.button
            key={truck.id}
            onClick={() => setValue('truckType', truck.id as any)}
            className="p-6 rounded-xl border-2 transition-all text-left group"
            animate={{
              borderColor: selected === truck.id ? '#FF8A00' : 'rgba(255,255,255,0.1)',
              backgroundColor: selected === truck.id ? 'rgba(255,138,0,0.05)' : 'transparent',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-4xl mb-3">{truck.icon}</div>
            <h3 className="font-bold text-lg mb-1">{truck.name}</h3>
            <p className="text-sm text-slate-400 mb-3">{truck.subtitle}</p>
            <p className="text-sm font-mono text-amber">{truck.rateRange}</p>

            {selected === truck.id && (
              <motion.div
                className="absolute top-2 right-2 w-6 h-6 bg-amber rounded-full flex items-center justify-center text-black font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
