'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'

const links = [
  { href: '/services/semis', label: 'Semi-Trucks' },
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
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-40 transition-colors duration-300"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          backgroundColor: scrolled ? 'rgba(10, 12, 16, 0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <nav className="container mx-auto px-4 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" data-cursor="hover">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-amber/15 border border-amber/30 overflow-hidden">
              <motion.svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-amber"
                fill="currentColor"
                whileHover={{ x: [0, 14, -14, 0] }}
                transition={{ duration: 0.5 }}
              >
                <path d="M3 7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v7H3V7zm12 2h2.6a1 1 0 0 1 .8.4l1.9 2.5a1 1 0 0 1 .2.6V14h-5.5V9zM6.5 18.5A1.75 1.75 0 1 1 6.5 15a1.75 1.75 0 0 1 0 3.5zm10.5 0a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z" />
              </motion.svg>
            </span>
            <span className="font-clash font-bold text-lg tracking-tight">
              Freight<span className="text-amber">Flow</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className={`relative text-sm font-medium transition-colors hover:text-white ${
                  pathname === link.href ? 'text-white' : 'text-slate-400'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-amber"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="/dispatch" data-cursor="hover">
              <MagneticButton variant="primary">Get Dispatched</MagneticButton>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-0.5 w-6 bg-white rounded" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-6 bg-white rounded" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="h-0.5 w-6 bg-white rounded" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-midnight/95 backdrop-blur-xl lg:hidden flex flex-col justify-center px-8"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {[{ href: '/', label: 'Home' }, ...links].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 font-clash text-3xl font-bold text-slate-200 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="pt-6"
              >
                <Link
                  href="/dispatch"
                  className="inline-block rounded-full bg-amber px-8 py-4 font-semibold text-midnight"
                >
                  Get Dispatched →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
