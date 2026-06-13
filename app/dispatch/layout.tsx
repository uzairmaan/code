import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Dispatched — Start in Minutes',
  description:
    'Get dispatched with FreightFlow in minutes. Tell us your truck, lanes, and goals — our dispatchers find top-paying loads and negotiate the rates. 24/7 support, no forced dispatch.',
  alternates: { canonical: '/dispatch' },
  openGraph: {
    title: 'Get Dispatched — Start in Minutes | FreightFlow',
    description: 'Tell us your truck, lanes, and goals. We find the loads and negotiate the rates.',
    url: '/dispatch',
    images: ['/services/hotshots.jpg'],
  },
}

export default function DispatchLayout({ children }: { children: React.ReactNode }) {
  return children
}
