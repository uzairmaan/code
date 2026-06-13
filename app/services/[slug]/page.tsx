import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/sections/service-page'
import { servicesData } from '@/lib/service-data'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/site'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((id) => ({ slug: id }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]
  if (!service) return { title: 'Not Found' }

  const img = `/services/${slug}.jpg`
  return {
    title: `${service.name} Dispatch`,
    description: service.description,
    keywords: [`${service.name} dispatch`, `${service.name} dispatcher`, service.subtitle, 'owner operator dispatch', 'truck dispatch service'],
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.name} Dispatch | FreightFlow`,
      description: service.description,
      type: 'website',
      url: `/services/${slug}`,
      images: [{ url: img, width: 1600, height: 893, alt: `${service.name} dispatch — premium ${service.name.toLowerCase()}` }],
    },
    twitter: { card: 'summary_large_image', title: `${service.name} Dispatch | FreightFlow`, description: service.description, images: [img] },
  }
}

export default async function ServicePageRoute({ params }: ServicePageProps) {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]
  if (!service) notFound()

  const serviceLd = {
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${slug}#service`,
    name: `${service.name} Dispatch`,
    serviceType: service.subtitle,
    description: `${service.description} Average negotiated rate ~$${service.avgRate.toFixed(2)}/mi (range $${service.rateRange.min.toFixed(2)}–$${service.rateRange.max.toFixed(2)}/mi). Typical freight: ${service.specs.typical}. Service area: ${service.specs.lanes}.`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    image: `${SITE_URL}/services/${slug}.jpg`,
    url: `${SITE_URL}/services/${slug}`,
    category: 'Truck Dispatching',
  }

  const faqLd = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/services/${slug}#faq`,
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${slug}` },
    ],
  }

  return (
    <>
      <JsonLd data={[serviceLd, faqLd, breadcrumbLd]} />
      <ServicePage service={service} />
    </>
  )
}
