'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/services/semis', label: 'Semis' },
  { href: '/services/box-trucks', label: 'Box Trucks' },
  { href: '/services/hotshots', label: 'Hotshots' },
  { href: '/results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-semibold text-gray-900 tracking-tight" data-cursor="hover">
          FreightFlow
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-gray-900' : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dispatch"
            data-cursor="hover"
            className="px-4 py-2 rounded-full text-sm font-medium text-white bg-[#202A36] hover:bg-[#1a2229] transition-colors"
          >
            Get Dispatched
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-900 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mb-4 rounded-2xl bg-white/95 backdrop-blur-lg shadow-xl border border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col p-4">
              {[{ href: '/', label: 'Home' }, ...links].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dispatch"
                className="mt-2 px-4 py-3 rounded-full text-center font-medium text-white bg-[#202A36] hover:bg-[#1a2229] transition-colors"
              >
                Get Dispatched
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
