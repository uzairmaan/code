import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/sections/service-page'
import { servicesData } from '@/lib/service-data'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((id) => ({
    slug: id,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData[params.slug as keyof typeof servicesData]

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
      url: `https://freightflow.com/services/${params.slug}`,
    },
  }
}

export default function ServicePageRoute({ params }: ServicePageProps) {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  return <ServicePage service={service} />
}
