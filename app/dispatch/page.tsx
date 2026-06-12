'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DispatchWizard } from '@/components/dispatch-wizard/dispatch-wizard'
import { DispatchFormData } from '@/lib/dispatch-schema'
import { MagneticButton } from '@/components/ui/magnetic-button'

export default function DispatchPage() {
  const [success, setSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState<DispatchFormData | null>(null)

  if (success && submittedData) {
    return (
      <main className="min-h-screen bg-midnight flex items-center justify-center px-4 py-12">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Confetti effect */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-2 h-2 bg-amber rounded-full"
              initial={{
                top: '50%',
                left: '50%',
                opacity: 1,
              }}
              animate={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: 0,
              }}
              transition={{
                duration: 2,
                ease: 'easeOut',
              }}
            />
          ))}

          <motion.div className="mb-8" animate={{ rotate: 360 }} transition={{ duration: 2, ease: 'easeInOut' }}>
            <div className="text-7xl">🚛</div>
          </motion.div>

          <h1 className="text-5xl font-clash font-bold mb-4">You're On The Board!</h1>
          <p className="text-xl text-slate-300 mb-8">
            We're reviewing your application. Expect a call or text from our dispatch team within 24 hours.
          </p>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.div className="glass rounded-lg p-4 border border-amber/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-sm text-slate-400 mb-1">Truck Type</p>
              <p className="font-bold capitalize">{submittedData.truckType.replace('-', ' ')}</p>
            </motion.div>
            <motion.div className="glass rounded-lg p-4 border border-amber/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <p className="text-sm text-slate-400 mb-1">Target Weekly</p>
              <p className="font-bold">${submittedData.targetWeeklyGross.toLocaleString()}</p>
            </motion.div>
          </div>

          {/* Next Steps */}
          <motion.div className="bg-gradient-to-r from-amber/10 to-transparent rounded-lg p-6 border border-amber/30 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="font-bold mb-3 text-amber">📋 What Happens Next</h3>
            <ol className="text-left space-y-2 text-sm text-slate-300">
              <li>✓ <strong>24 hrs:</strong> Dispatch team reviews your application</li>
              <li>○ <strong>24-48 hrs:</strong> Initial onboarding call scheduled</li>
              <li>○ <strong>2-3 days:</strong> Background check & compliance verification</li>
              <li>○ <strong>Day 4:</strong> First load available on your dashboard</li>
            </ol>
          </motion.div>

          <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p className="text-slate-400">Questions? Reach out anytime.</p>
            <div className="flex gap-3 justify-center">
              <a href="tel:+18005551234" className="px-6 py-2 rounded-lg bg-amber text-black font-bold hover:bg-amber-light transition">
                📞 Call Us
              </a>
              <a href="https://freightflow.com/contact" className="px-6 py-2 rounded-lg border border-amber text-amber hover:bg-amber/10 transition">
                💬 Contact
              </a>
            </div>
          </motion.div>

          <motion.button
            onClick={() => (window.location.href = '/')}
            className="mt-12"
            whileHover={{ scale: 1.05 }}
          >
            <MagneticButton variant="ghost">← Back to Home</MagneticButton>
          </motion.button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-midnight py-20 px-4">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-clash font-bold mb-4 tracking-wide">
            Get Dispatched
          </h1>
          <p className="text-xl text-slate-400">
            Join 2,400+ carriers earning premium rates with FreightFlow. Complete your application in 5 minutes.
          </p>
        </div>

        {/* Wizard */}
        <DispatchWizard
          onSuccess={(data) => {
            setSubmittedData(data)
            setSuccess(true)
          }}
        />
      </motion.div>
    </main>
  )
}
