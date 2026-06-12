import React from 'react'
import { ContactSection } from '@/components/sections/contact-section'

export const metadata = {
  title: 'Contact FreightFlow | 24/7 Dispatch Support',
  description: 'Get in touch with our dispatch team. Available 24/7 to answer questions and support your hauling business.',
}

export default function ContactPage() {
  return (
    <main className="bg-midnight pt-14">
      <ContactSection />
    </main>
  )
}
