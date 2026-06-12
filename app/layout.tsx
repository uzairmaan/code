import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

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
      <body className={`${inter.variable} bg-midnight text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
