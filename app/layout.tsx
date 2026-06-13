import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/sections/footer'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, OG_IMAGE, organizationLd, websiteLd } from '@/lib/site'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const grotesk = Space_Grotesk({ variable: '--font-clash', subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const mono = JetBrains_Mono({ variable: '--font-jetbrains', subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'truck dispatch', 'truck dispatching service', 'semi truck dispatcher', 'box truck dispatch',
    'hotshot dispatch', 'owner operator dispatch', 'OTR dispatch', 'freight dispatch service',
    '24/7 truck dispatch', 'dispatch service for owner operators', 'load board negotiation',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'business',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1600, height: 893, alt: 'FreightFlow — premium truck dispatch above the clouds' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable} ${mono.variable} bg-gray-50 text-gray-900 antialiased`}>
        <JsonLd data={[organizationLd, websiteLd]} />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
