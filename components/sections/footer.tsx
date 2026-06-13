'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const columns = [
  {
    title: 'Services',
    links: [
      { href: '/services/semis', label: 'Semi-Truck Dispatch' },
      { href: '/services/box-trucks', label: '26-ft Box Trucks' },
      { href: '/services/hotshots', label: 'Hotshot Dispatch' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/results', label: 'Results' },
      { href: '/contact', label: 'Contact' },
      { href: '/dispatch', label: 'Get Dispatched' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-gray-200 bg-gray-50 overflow-hidden">
      {/* Glow accent */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-amber/5 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="font-clash text-2xl font-bold tracking-tight">
              Freight<span className="text-amber">Flow</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              Premium dispatch for owner-operators and small fleets. We hunt the loads, negotiate the rates, and handle
              the paperwork — you drive and get paid.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-gray-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Dispatchers online 24/7
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-cursor="hover"
                      className="text-sm text-gray-600 transition-colors hover:text-amber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Animated divider road */}
        <div className="relative mt-14 mb-8 h-px w-full bg-gray-200 overflow-hidden">
          <motion.div
            className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-amber to-transparent"
            animate={{ x: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ left: 0, right: 0 }}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} FreightFlow LLC. All rights reserved.</p>
          <p className="font-mono">MC-compliant · No forced dispatch · Cancel anytime</p>
        </div>
      </div>
    </footer>
  )
}
