import React from 'react'
import { Hero } from '@/components/sections/hero'
import { ServicesPreview } from '@/components/sections/services-preview'
import { HowDispatchWorks } from '@/components/sections/how-dispatch-works'
import { LogoMarquee } from '@/components/sections/logo-marquee'
import { StatsBand } from '@/components/sections/stats-band'
import { TestimonialsTeaser } from '@/components/sections/testimonials-teaser'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { ContactSection } from '@/components/sections/contact-section'
import { ClosingCTA } from '@/components/sections/closing-cta'

export default function Home() {
  return (
    <main className="bg-midnight">
      <Hero />
      <ServicesPreview />
      <HowDispatchWorks />
      <LogoMarquee />
      <StatsBand />
      <TestimonialsTeaser />
      <TestimonialsCarousel />
      <ContactSection />
      <ClosingCTA />
    </main>
  )
}
