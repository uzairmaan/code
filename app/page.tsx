import React from 'react'
import { HeroInteractive } from '@/components/sections/hero-interactive'
import { InteractiveServices } from '@/components/sections/interactive-services'
import { HowDispatchWorks } from '@/components/sections/how-dispatch-works'
import { LogoMarquee } from '@/components/sections/logo-marquee'
import { InteractiveStats } from '@/components/sections/interactive-stats'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { ContactSection } from '@/components/sections/contact-section'
import { ClosingCTA } from '@/components/sections/closing-cta'

export default function Home() {
  return (
    <main className="bg-midnight">
      <HeroInteractive />
      <InteractiveServices />
      <HowDispatchWorks />
      <LogoMarquee />
      <InteractiveStats />
      <TestimonialsCarousel />
      <ContactSection />
      <ClosingCTA />
    </main>
  )
}
