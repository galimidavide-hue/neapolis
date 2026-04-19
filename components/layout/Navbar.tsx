'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/prenota', label: 'Prenota' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-nero/90 backdrop-blur-md shadow-lg shadow-nero/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="w-40 sm:w-48 transition-transform hover:scale-105">
            <Logo color="white" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-inter text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-rosso'
                    : 'text-bianco/80 hover:text-bianco'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/prenota"
              className="bg-rosso text-white font-inter text-sm font-semibold px-5 py-2 rounded-full hover:bg-rosso/90 transition-colors"
            >
              Prenota Ora
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Apri menu"
          >
            <span className={`block w-6 h-0.5 bg-bianco transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-bianco transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-bianco transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-nero/80 md:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-64 bg-card flex flex-col pt-20 px-8 gap-6 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-playfair text-2xl transition-colors ${
                    pathname === link.href ? 'text-rosso' : 'text-bianco'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/prenota"
                className="mt-4 bg-rosso text-white font-inter font-semibold px-5 py-3 rounded-full text-center hover:bg-rosso/90 transition-colors"
              >
                Prenota Ora
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
