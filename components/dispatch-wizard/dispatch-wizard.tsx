'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DispatchFormSchema, DispatchFormData, stepSchemas } from '@/lib/dispatch-schema'
import { MagneticButton } from '@/components/ui/magnetic-button'

const steps = [
  { number: 1, title: 'Truck Type', icon: '🚛' },
  { number: 2, title: 'Operations', icon: '📋' },
  { number: 3, title: 'Equipment', icon: '🎛️' },
  { number: 4, title: 'Goals', icon: '🎯' },
  { number: 5, title: 'Contact', icon: '📞' },
]

const trucks = ['semis', 'box-trucks', 'hotshots']
const trailerOptions = ['Dry Van', 'Flatbed', 'Refrigerated', 'Tanker']
const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'Northwest']
const operationTypes = ['existing-authority', 'new-authority']

interface DispatchWizardProps {
  onSuccess?: (data: DispatchFormData) => void
}

export function DispatchWizard({ onSuccess }: DispatchWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DispatchFormData>({
    mode: 'onBlur',
    resolver: zodResolver(DispatchFormSchema),
  })

  const formData = watch()

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('dispatchForm', JSON.stringify(formData))
  }, [formData])

  const onSubmit = async (data: DispatchFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSuccess?.(data)
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canAdvance = currentStep < steps.length
  const canGoBack = currentStep > 1

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-clash font-bold mb-6">Choose Your Truck</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {trucks.map((truck) => (
                <motion.button
                  key={truck}
                  onClick={() => setValue('truckType', truck as any)}
                  className="p-4 rounded-lg border-2 transition-all text-left"
                  animate={{
                    borderColor: formData.truckType === truck ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                    backgroundColor: formData.truckType === truck ? 'rgba(255,138,0,0.05)' : 'transparent',
                  }}
                >
                  <div className="font-bold capitalize">{truck.replace('-', ' ')}</div>
                  {formData.truckType === truck && <div className="text-amber mt-2">✓ Selected</div>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-clash font-bold mb-6">Your Operations</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">MC Number</label>
                <input
                  {...register('mcNumber')}
                  placeholder="e.g., MC123456"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-amber focus:outline-none"
                />
                {errors.mcNumber && <p className="text-amber text-sm mt-1">{errors.mcNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">DOT Number</label>
                <input
                  {...register('dotNumber')}
                  placeholder="e.g., DOT123456"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-amber focus:outline-none"
                />
                {errors.dotNumber && <p className="text-amber text-sm mt-1">{errors.dotNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Years in Operation</label>
                <input
                  type="number"
                  {...register('yearsInOperation', { valueAsNumber: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-amber focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Operation Type</label>
                <div className="flex gap-3">
                  {operationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setValue('operationType', type as any)}
                      className="flex-1 p-3 rounded-lg border-2 transition-all text-sm"
                      style={{
                        borderColor: formData.operationType === type ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                        backgroundColor: formData.operationType === type ? 'rgba(255,138,0,0.05)' : 'transparent',
                      }}
                    >
                      {type === 'existing-authority' ? 'Existing' : 'New'} Authority
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-clash font-bold mb-6">Equipment & Lanes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-3">Trailer Types (select all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  {trailerOptions.map((trailer) => (
                    <button
                      key={trailer}
                      onClick={() => {
                        const current = formData.trailerTypes || []
                        setValue(
                          'trailerTypes',
                          current.includes(trailer) ? current.filter((t) => t !== trailer) : [...current, trailer],
                        )
                      }}
                      className="p-3 rounded-lg border-2 transition-all text-sm"
                      style={{
                        borderColor:
                          formData.trailerTypes?.includes(trailer) ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                        backgroundColor: formData.trailerTypes?.includes(trailer) ? 'rgba(255,138,0,0.05)' : 'transparent',
                      }}
                    >
                      {trailer}
                      {formData.trailerTypes?.includes(trailer) && <span className="ml-2">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Preferred Regions</label>
                <div className="grid grid-cols-2 gap-3">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        const current = formData.preferredRegions || []
                        setValue(
                          'preferredRegions',
                          current.includes(region) ? current.filter((r) => r !== region) : [...current, region],
                        )
                      }}
                      className="p-3 rounded-lg border-2 transition-all text-sm"
                      style={{
                        borderColor:
                          formData.preferredRegions?.includes(region) ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                        backgroundColor: formData.preferredRegions?.includes(region) ? 'rgba(255,138,0,0.05)' : 'transparent',
                      }}
                    >
                      {region}
                      {formData.preferredRegions?.includes(region) && <span className="ml-2">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-clash font-bold mb-6">Your Goals</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Target Weekly Gross: ${formData.targetWeeklyGross}</label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  {...register('targetWeeklyGross', { valueAsNumber: true })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ background: 'linear-gradient(to right, #FF8A00, #FF8A00) no-repeat' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Preferred Home Time</label>
                <div className="grid grid-cols-2 gap-3">
                  {['weekly', 'bi-weekly', 'monthly', 'flexible'].map((pref) => (
                    <button
                      key={pref}
                      onClick={() => setValue('homeTimePreference', pref as any)}
                      className="p-3 rounded-lg border-2 transition-all capitalize"
                      style={{
                        borderColor: formData.homeTimePreference === pref ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                        backgroundColor: formData.homeTimePreference === pref ? 'rgba(255,138,0,0.05)' : 'transparent',
                      }}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-clash font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  {...register('name')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                {errors.name && <p className="text-amber text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  {...register('phone')}
                  placeholder="1234567890"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                {errors.phone && <p className="text-amber text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                {errors.email && <p className="text-amber text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Company Name (optional)</label>
                <input
                  {...register('companyName')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 border-2"
                animate={{
                  borderColor: currentStep >= step.number ? '#FF8A00' : 'rgba(255,255,255,0.1)',
                  backgroundColor: currentStep >= step.number ? 'rgba(255,138,0,0.1)' : 'transparent',
                }}
              >
                {currentStep >= step.number && currentStep !== step.number ? '✓' : step.icon}
              </motion.div>
              <p className="text-xs font-semibold text-center hidden md:block">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber to-amber-light rounded-full"
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 pt-8">
          {canGoBack && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 transition-colors"
            >
              ← Back
            </button>
          )}

          {canAdvance ? (
            <MagneticButton
              variant="primary"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="flex-1"
            >
              Continue →
            </MagneticButton>
          ) : (
            <MagneticButton variant="primary" className="flex-1" disabled={isSubmitting || !isValid}>
              {isSubmitting ? 'Submitting...' : 'Get Dispatched'}
            </MagneticButton>
          )}
        </div>
      </form>

      {/* Hidden inputs to trigger validation */}
      <input type="hidden" {...register('truckType')} />
      <input type="hidden" {...register('operationType')} />
    </div>
  )
}
