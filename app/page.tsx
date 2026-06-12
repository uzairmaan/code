import React from 'react'
import { HeroVideo } from '@/components/sections/hero-video'
import { InteractiveServices } from '@/components/sections/interactive-services'
import { HowDispatchWorks } from '@/components/sections/how-dispatch-works'
import { LogoMarquee } from '@/components/sections/logo-marquee'
import { InteractiveStats } from '@/components/sections/interactive-stats'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { ContactSection } from '@/components/sections/contact-section'
import { ClosingCTA } from '@/components/sections/closing-cta'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroVideo />
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
