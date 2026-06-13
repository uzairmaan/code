import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { servicesData } from '@/lib/service-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ['', '/dispatch', '/results', '/contact']
  const serviceRoutes = Object.keys(servicesData).map((id) => `/services/${id}`)

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : path.startsWith('/services') ? 0.9 : 0.7,
  }))
}
