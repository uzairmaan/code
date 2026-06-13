import React from 'react'

/**
 * Renders a JSON-LD <script> for SEO + GEO (generative-engine) structured data.
 * Pass a single schema object, or an array to emit an @graph. Data is authored
 * in-app (not user input), so dangerouslySetInnerHTML is safe here.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
