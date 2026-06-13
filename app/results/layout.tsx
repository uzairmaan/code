import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Results — Real Loads & Carrier Wins',
  description:
    'Real loads FreightFlow has dispatched for owner-operators: lanes, rates, RPM, and weekly gross across semi-trucks, box trucks, and hotshots. Real loads. Real money.',
  alternates: { canonical: '/results' },
  openGraph: {
    title: 'Results — Real Loads & Carrier Wins | FreightFlow',
    description: 'Lanes, rates, RPM, and weekly gross from loads we have dispatched for carriers.',
    url: '/results',
    images: ['/services/semis.jpg'],
  },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children
}
