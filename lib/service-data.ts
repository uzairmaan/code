export interface ServiceData {
  id: 'semis' | 'box-trucks' | 'hotshots'
  name: string
  subtitle: string
  accent: string
  icon: string
  description: string
  rateRange: { min: number; max: number }
  avgRate: number
  rpmAvg: number
  specs: { capacity: string; lanes: string; typical: string; turnAround: string }
  hotspots: Array<{ label: string; x: number; y: number; description: string }>
  freightTypes: string[]
  comparisonPoints: Array<{ feature: string; withFreightFlow: string; without: string }>
  faqs: Array<{ question: string; answer: string }>
  testimonialMetric: string
}

export const servicesData: Record<string, ServiceData> = {
  semis: {
    id: 'semis',
    name: 'Semi-Trucks',
    subtitle: 'Long-Haul OTR',
    accent: '#FF8A00',
    icon: '🚛',
    description: 'Cross-country loads from premium brokers. Maximize mileage and revenue with consistent, profitable freight.',
    rateRange: { min: 2.2, max: 3.5 },
    avgRate: 2.87,
    rpmAvg: 287,
    specs: { capacity: '45,000 – 48,000 lbs', lanes: 'All 48 states + Canada', typical: 'Full-truckload (FTL)', turnAround: '3–5 days avg' },
    hotspots: [{ label: 'Cab', x: 18, y: 30, description: 'Climate-controlled sleeper cab' }],
    freightTypes: ['Dry goods', 'Produce', 'Electronics', 'Machinery', 'Consumer goods', 'Building materials'],
    comparisonPoints: [{ feature: 'Load Quality', withFreightFlow: 'Pre-vetted brokers, $2.87+ avg RPM', without: 'Market hunting' }],
    faqs: [{ question: 'Do I need my own MC/DOT?', answer: 'Yes, we work with established carriers.' }],
    testimonialMetric: '+38% weekly gross',
  },
  'box-trucks': {
    id: 'box-trucks',
    name: '26-ft Box Trucks',
    subtitle: 'Regional & Local',
    accent: '#22D3EE',
    icon: '📦',
    description: 'Consistent regional runs with faster turnarounds.',
    rateRange: { min: 1.6, max: 2.4 },
    avgRate: 1.95,
    rpmAvg: 195,
    specs: { capacity: '12,000 – 15,000 lbs', lanes: 'Regional hubs', typical: 'LTL + partial loads', turnAround: '1–2 days avg' },
    hotspots: [{ label: 'Cab', x: 16, y: 35, description: '6-speed transmission' }],
    freightTypes: ['Packaged goods', 'Retail merchandise', 'Perishables'],
    comparisonPoints: [{ feature: 'Load Frequency', withFreightFlow: '15–20 loads/week', without: '5–8 loads/week' }],
    faqs: [{ question: 'Do I need a CDL?', answer: 'No CDL required for vehicles under 26,001 GVWR.' }],
    testimonialMetric: '15 loads/week avg',
  },
  hotshots: {
    id: 'hotshots',
    name: 'Hotshots',
    subtitle: 'Expedited & Specialized',
    accent: '#EF4444',
    icon: '⚡',
    description: 'Time-sensitive loads at premium rates.',
    rateRange: { min: 3.5, max: 7.0 },
    avgRate: 4.5,
    rpmAvg: 450,
    specs: { capacity: '20,000 – 45,000 lbs', lanes: 'Interstate + remote', typical: 'Urgent freight', turnAround: '12–36 hrs avg' },
    hotspots: [{ label: 'Cab', x: 18, y: 32, description: 'Expedited response ready' }],
    freightTypes: ['Emergency machinery', 'Oil & gas equipment', 'Construction materials'],
    comparisonPoints: [{ feature: 'Rate Premium', withFreightFlow: 'Up to $4.50+/mi', without: 'Negotiated rates' }],
    faqs: [{ question: 'What qualifications do I need?', answer: 'Hazmat endorsement, clean record, 5+ years experience.' }],
    testimonialMetric: '+52% weekly earnings',
  },
}
