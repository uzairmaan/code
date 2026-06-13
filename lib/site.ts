// Central site config + structured-data helpers (SEO + GEO).
import { servicesData } from '@/lib/service-data'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://freightflow.com').replace(/\/$/, '')
export const SITE_NAME = 'FreightFlow'
export const SITE_TAGLINE = 'Premium Truck Dispatch for Owner-Operators & Small Fleets'
export const SITE_DESCRIPTION =
  'FreightFlow is a premium truck dispatching service for owner-operators and small fleets — semi-trucks (OTR), 26-ft box trucks, and hotshots. We find top-paying loads, negotiate the rates, and handle the paperwork so you just drive and get paid. 24/7 dispatch across all 48 states.'
export const OG_IMAGE = '/services/semis.jpg'

// Organization / service-business node (SEO + GEO: areaServed, knowsAbout, offers).
export const organizationLd = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}${OG_IMAGE}`,
  slogan: 'Stop searching. Start hauling.',
  areaServed: { '@type': 'Country', name: 'United States' },
  knowsAbout: [
    'truck dispatching', 'freight dispatch service', 'OTR semi-truck dispatch',
    '26-ft box truck dispatch', 'hotshot dispatch', 'load board negotiation',
    'owner-operator dispatch', 'rate per mile (RPM)',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'dispatch',
    availableLanguage: 'English',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  },
  makesOffer: Object.values(servicesData).map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: `${s.name} Dispatch`, serviceType: s.subtitle },
  })),
}

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#organization` },
}
