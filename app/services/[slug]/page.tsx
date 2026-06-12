import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/sections/service-page'
import { servicesData } from '@/lib/service-data'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((id) => ({
    slug: id,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    return { title: 'Not Found' }
  }

  return {
    title: `${service.name} Dispatch | FreightFlow`,
    description: service.description,
    openGraph: {
      title: `${service.name} Dispatch | FreightFlow`,
      description: service.description,
      type: 'website',
      url: `https://freightflow.com/services/${slug}`,
    },
  }
}

export default async function ServicePageRoute({ params }: ServicePageProps) {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  return <ServicePage service={service} />
}
