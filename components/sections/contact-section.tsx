'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', submitted: false })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setFormState({ ...formState, submitted: true })
    setIsLoading(false)

    // Reset after 3 seconds
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '', submitted: false })
    }, 3000)
  }

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-clash font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600">Our dispatch team is available 24/7 to answer your questions.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber focus:outline-none transition"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber focus:outline-none transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={5}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber focus:outline-none transition resize-none"
                placeholder="How can we help?"
                required
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <MagneticButton
                variant="primary"
                disabled={isLoading || formState.submitted}
                className="w-full"
              >
                {isLoading ? 'Sending...' : formState.submitted ? 'Message Sent! ✓' : 'Send Message'}
              </MagneticButton>
            </motion.div>
          </motion.form>

          {/* Contact Info + Radar */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Info Cards */}
            {[
              { label: 'Call', value: '+1 (800) 555-1234', href: 'tel:+18005551234' },
              { label: 'Email', value: 'dispatch@freightflow.com', href: 'mailto:dispatch@freightflow.com' },
              { label: 'Hours', value: '24/7 Dispatch Available', href: null },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="glass rounded-lg p-6 border border-gray-200 hover:border-amber/50 transition cursor-pointer"
                whileHover={{ borderColor: '#FF8A00' }}
                onClick={() => item.href && window.open(item.href)}
              >
                <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                <p className="text-lg font-bold text-amber">{item.value}</p>
              </motion.div>
            ))}

            {/* Radar visual */}
            <div className="glass rounded-lg p-8 border border-gray-200 flex items-center justify-center h-64">
              <motion.div
                className="relative w-32 h-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[0, 1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 border border-amber rounded-full"
                    style={{
                      opacity: 0.3 - ring * 0.07,
                      transform: `scale(${1 - ring * 0.15})`,
                    }}
                  />
                ))}

                {/* Truck dots */}
                {[0, 90, 180, 270].map((angle) => (
                  <motion.div
                    key={angle}
                    className="absolute w-2 h-2 bg-amber rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateY(-32px)`,
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
