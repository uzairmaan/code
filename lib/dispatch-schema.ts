import { z } from 'zod'

export const DispatchFormSchema = z.object({
  // Step 1: Truck Selection
  truckType: z.enum(['semis', 'box-trucks', 'hotshots'], {
    errorMap: () => ({ message: 'Please select a truck type' }),
  }),

  // Step 2: Operation Details
  mcNumber: z.string().min(2, 'MC number required').max(20),
  dotNumber: z.string().min(2, 'DOT number required').max(20),
  yearsInOperation: z.number().min(0).max(50),
  operationType: z.enum(['existing-authority', 'new-authority'], {
    errorMap: () => ({ message: 'Please select operation type' }),
  }),

  // Step 3: Equipment & Lanes
  trailerTypes: z.array(z.string()).min(1, 'Select at least one trailer type'),
  preferredRegions: z.array(z.string()).min(1, 'Select at least one region'),

  // Step 4: Goals
  targetWeeklyGross: z.number().min(500).max(10000),
  homeTimePreference: z.enum(['weekly', 'bi-weekly', 'monthly', 'flexible']),

  // Step 5: Contact
  name: z.string().min(2, 'Name required').max(100),
  phone: z.string().regex(/^\d{10}$/, 'Valid 10-digit phone required'),
  email: z.string().email('Valid email required'),
  companyName: z.string().optional(),
})

export type DispatchFormData = z.infer<typeof DispatchFormSchema>

export const stepSchemas = {
  1: DispatchFormSchema.pick({ truckType: true }),
  2: DispatchFormSchema.pick({
    mcNumber: true,
    dotNumber: true,
    yearsInOperation: true,
    operationType: true,
  }),
  3: DispatchFormSchema.pick({
    trailerTypes: true,
    preferredRegions: true,
  }),
  4: DispatchFormSchema.pick({
    targetWeeklyGross: true,
    homeTimePreference: true,
  }),
  5: DispatchFormSchema.pick({
    name: true,
    phone: true,
    email: true,
    companyName: true,
  }),
}
