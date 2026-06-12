import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/sections/footer'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const grotesk = Space_Grotesk({ variable: '--font-clash', subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const mono = JetBrains_Mono({ variable: '--font-jetbrains', subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'FreightFlow - Premium Truck Dispatch',
  description: 'Dispatch platform for semi-trucks, box trucks, and hotshots. Professional load matching and real-time tracking.',
  openGraph: {
    title: 'FreightFlow - Premium Truck Dispatch',
    description: 'Dispatch platform for semi-trucks, box trucks, and hotshots.',
    url: 'https://freightflow.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable} ${mono.variable} bg-midnight text-white antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
