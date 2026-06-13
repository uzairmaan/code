import React from 'react'
import { ContactSection } from '@/components/sections/contact-section'

export const metadata = {
  title: 'Contact — 24/7 Dispatch Support',
  description:
    'Get in touch with the FreightFlow dispatch team. Available 24/7 to answer questions and support your hauling business — semis, box trucks, and hotshots.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact FreightFlow — 24/7 Dispatch Support',
    description: 'Reach our dispatch team any time, day or night.',
    url: '/contact',
    images: ['/services/box-trucks.jpg'],
  },
}

export default function ContactPage() {
  return (
    <main className="bg-gray-50 pt-14">
      <ContactSection />
    </main>
  )
}
