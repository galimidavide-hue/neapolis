# Neapolis Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first Next.js 14 website for Neapolis Pizzeria Verace Napoletana with animated home, static menu, and WhatsApp booking.

**Architecture:** Next.js 14 App Router with Tailwind CSS for styling and Framer Motion for animations. All content is static (no CMS, no backend). Booking opens WhatsApp with a pre-filled message.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3, Framer Motion 11, clsx, tailwind-merge

---

## File Map

### Created
- `app/layout.tsx` — root layout, fonts, global metadata, FloatingCTA
- `app/page.tsx` — home page assembles all home sections
- `app/menu/page.tsx` — menu page
- `app/prenota/page.tsx` — booking page
- `tailwind.config.ts` — custom colors, fonts, animations
- `data/menu.ts` — typed static menu data
- `components/layout/Navbar.tsx` — sticky navbar with mobile drawer
- `components/layout/Footer.tsx` — footer with links, orari, social
- `components/ui/SectionTitle.tsx` — reusable animated section title
- `components/ui/FloatingCTA.tsx` — fixed WhatsApp button (global)
- `components/home/Hero.tsx` — fullscreen hero with parallax + CTAs
- `components/home/ChiSiamo.tsx` — two-column about section
- `components/home/PizzeEvidenza.tsx` — featured pizza cards grid
- `components/home/Filosofia.tsx` — parallax philosophy section
- `components/home/Recensioni.tsx` — auto-play review carousel
- `components/home/Gallery.tsx` — masonry photo grid
- `components/home/Contatti.tsx` — contacts + hours + maps link
- `components/menu/MenuTabs.tsx` — sticky category tabs
- `components/menu/MenuCard.tsx` — single menu item card
- `components/prenota/BookingForm.tsx` — booking form with WhatsApp link generation
- `components/prenota/BookingInfo.tsx` — info column (hours, address, phone)
- `public/images/` — placeholder images referenced in code

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd "/Users/davidegalimi/Documents/PROGETTI ANTIGRAVITY/Neapolis"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --use-npm
```

Expected: Project created with Next.js 14, TypeScript, Tailwind, App Router.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion clsx tailwind-merge
```

- [ ] **Step 3: Replace `tailwind.config.ts` with custom design system**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nero: '#0D0D0D',
        card: '#1A1A1A',
        rosso: '#E63B2E',
        oro: '#F5A623',
        bianco: '#F5F0E8',
        grigio: '#9A9A8A',
        border: '#2A2A2A',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        pulse_slow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-nero text-bianco font-inter;
  }

  h1, h2, h3, h4 {
    @apply font-playfair;
  }

  * {
    @apply border-border;
  }
}

@layer utilities {
  .text-shadow-red {
    text-shadow: 0 0 40px rgba(230, 59, 46, 0.4);
  }
}
```

- [ ] **Step 5: Replace `app/layout.tsx` with fonts + metadata**

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Neapolis Pizzeria Verace Napoletana — Polistena',
  description: 'L\'autentica pizza napoletana nel cuore della Calabria. #1 a Polistena con 4.9/5 su Google. Via Fausto Gullo 47, Polistena (RC). Prenota su WhatsApp.',
  keywords: ['pizzeria', 'napoletana', 'Polistena', 'Calabria', 'pizza verace'],
  openGraph: {
    title: 'Neapolis Pizzeria Verace Napoletana',
    description: 'L\'autentica pizza napoletana nel cuore della Calabria.',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js project with design system"
```

---

## Task 2: Static Menu Data

**Files:**
- Create: `data/menu.ts`

- [ ] **Step 1: Create typed menu data file**

```typescript
// data/menu.ts

export type MenuCategory = 'classiche' | 'speciali' | 'antipasti' | 'dolci'

export interface MenuItem {
  id: string
  name: string
  description: string
  ingredients: string[]
  price: number
  category: MenuCategory
  image: string
  glutenFree?: boolean
  featured?: boolean
}

export const menuItems: MenuItem[] = [
  // PIZZE CLASSICHE
  {
    id: 'margherita',
    name: 'Margherita Verace',
    description: 'La classica napoletana nella sua forma più pura.',
    ingredients: ['Pomodoro San Marzano', 'Fior di Latte', 'Basilico', 'Olio EVO'],
    price: 7,
    category: 'classiche',
    image: '/images/menu/margherita.jpg',
    featured: true,
  },
  {
    id: 'marinara',
    name: 'Marinara',
    description: 'Senza formaggio, ricca di sapore autentico.',
    ingredients: ['Pomodoro San Marzano', 'Aglio', 'Origano', 'Olio EVO'],
    price: 6,
    category: 'classiche',
    image: '/images/menu/marinara.jpg',
  },
  {
    id: 'diavola',
    name: 'Diavola',
    description: 'Per chi ama il piccante senza compromessi.',
    ingredients: ['Pomodoro', 'Fior di Latte', 'Salame Piccante', 'Basilico'],
    price: 9,
    category: 'classiche',
    image: '/images/menu/diavola.jpg',
    featured: true,
  },
  {
    id: 'quattro-formaggi',
    name: 'Quattro Formaggi',
    description: 'Cremosa e avvolgente, un viaggio tra i formaggi italiani.',
    ingredients: ['Fior di Latte', 'Gorgonzola', 'Parmigiano', 'Provola'],
    price: 10,
    category: 'classiche',
    image: '/images/menu/quattro-formaggi.jpg',
  },
  // PIZZE SPECIALI
  {
    id: 'provola-pepe',
    name: 'Provola e Pepe',
    description: 'La nostra firma: equilibrio perfetto tra affumicato e speziato.',
    ingredients: ['Provola Affumicata', 'Pepe Nero', 'Olio EVO', 'Basilico'],
    price: 10,
    category: 'speciali',
    image: '/images/menu/provola-pepe.jpg',
    featured: true,
  },
  {
    id: 'nduja',
    name: 'Nduja e Stracciatella',
    description: 'L\'incontro tra la calabresità e la dolcezza della stracciatella.',
    ingredients: ['Nduja di Spilinga', 'Stracciatella', 'Pomodorini', 'Basilico'],
    price: 12,
    category: 'speciali',
    image: '/images/menu/nduja.jpg',
  },
  {
    id: 'burrata',
    name: 'Burrata e Prosciutto',
    description: 'Fresca e cremosa, con prosciutto crudo di qualità.',
    ingredients: ['Burrata', 'Prosciutto Crudo', 'Rucola', 'Pomodorini', 'Parmigiano'],
    price: 13,
    category: 'speciali',
    image: '/images/menu/burrata.jpg',
  },
  {
    id: 'senza-glutine',
    name: 'Margherita Senza Glutine',
    description: 'La stessa qualità verace, per tutti.',
    ingredients: ['Pomodoro San Marzano', 'Fior di Latte', 'Basilico', 'Olio EVO'],
    price: 10,
    category: 'speciali',
    image: '/images/menu/senza-glutine.jpg',
    glutenFree: true,
    featured: true,
  },
  // ANTIPASTI
  {
    id: 'frittatine',
    name: 'Frittatine di Pasta',
    description: 'Street food napoletano autentico.',
    ingredients: ['Pasta', 'Besciamella', 'Prosciutto', 'Piselli'],
    price: 5,
    category: 'antipasti',
    image: '/images/menu/frittatine.jpg',
  },
  {
    id: 'bruschette',
    name: 'Bruschette al Pomodoro',
    description: 'Pane croccante con pomodoro fresco e basilico.',
    ingredients: ['Pane', 'Pomodoro', 'Aglio', 'Basilico', 'Olio EVO'],
    price: 4,
    category: 'antipasti',
    image: '/images/menu/bruschette.jpg',
  },
  {
    id: 'antipasto-misto',
    name: 'Antipasto Misto',
    description: 'Selezione di salumi, formaggi e verdure grigliate.',
    ingredients: ['Salumi', 'Formaggi', 'Verdure grigliate', 'Olive'],
    price: 12,
    category: 'antipasti',
    image: '/images/menu/antipasto.jpg',
  },
  // DOLCI
  {
    id: 'baba',
    name: 'Babà Napoletano',
    description: 'Il classico dolce napoletano, inzuppato al rum.',
    ingredients: ['Pasta babà', 'Rum', 'Sciroppo', 'Crema chantilly'],
    price: 5,
    category: 'dolci',
    image: '/images/menu/baba.jpg',
  },
  {
    id: 'tiramisù',
    name: 'Tiramisù',
    description: 'Fatto in casa, cremoso e leggero.',
    ingredients: ['Mascarpone', 'Savoiardi', 'Caffè', 'Cacao'],
    price: 5,
    category: 'dolci',
    image: '/images/menu/tiramisu.jpg',
  },
]

export const categories: { id: MenuCategory; label: string }[] = [
  { id: 'classiche', label: 'Pizze Classiche' },
  { id: 'speciali', label: 'Pizze Speciali' },
  { id: 'antipasti', label: 'Antipasti' },
  { id: 'dolci', label: 'Dolci' },
]

export const featuredItems = menuItems.filter((item) => item.featured)
```

- [ ] **Step 2: Commit**

```bash
git add data/menu.ts
git commit -m "feat: add static typed menu data"
```

---

## Task 3: UI Primitives

**Files:**
- Create: `components/ui/SectionTitle.tsx`
- Create: `components/ui/FloatingCTA.tsx`
- Create: `lib/utils.ts`

- [ ] **Step 1: Create utility helper**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Create SectionTitle component**

```typescript
// components/ui/SectionTitle.tsx
'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className="text-rosso font-inter text-sm font-bold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-playfair text-4xl md:text-5xl font-bold leading-tight mb-4 ${
          light ? 'text-nero' : 'text-bianco'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-inter text-lg leading-relaxed ${
            light ? 'text-nero/70' : 'text-grigio'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 bg-rosso ${center ? 'mx-auto' : ''}`}
      />
    </motion.div>
  )
}
```

- [ ] **Step 3: Create FloatingCTA component**

```typescript
// components/ui/FloatingCTA.tsx
'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const WA_NUMBER = '393533199458'
const WA_MESSAGE = encodeURIComponent('Salve! Vorrei prenotare un tavolo da Neapolis.')

export default function FloatingCTA() {
  const pathname = usePathname()

  // Hide on booking page since form is already there
  if (pathname === '/prenota') return null

  return (
    <motion.a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-rosso text-white px-4 py-3 rounded-full shadow-lg shadow-rosso/30 hover:bg-rosso/90 transition-colors animate-pulse_slow"
      aria-label="Prenota su WhatsApp"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="font-inter font-semibold text-sm hidden sm:inline">Prenota</span>
    </motion.a>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/utils.ts components/ui/SectionTitle.tsx components/ui/FloatingCTA.tsx
git commit -m "feat: add UI primitives (SectionTitle, FloatingCTA, cn util)"
```

---

## Task 4: Navbar + Footer

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Navbar**

```typescript
// components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-nero/90 backdrop-blur-md shadow-lg shadow-nero/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-playfair text-2xl font-bold text-bianco">Neapolis</span>
            <span className="font-inter text-[10px] text-rosso uppercase tracking-widest">Pizzeria Verace Napoletana</span>
          </Link>

          {/* Desktop nav */}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-bianco transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-bianco transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-bianco transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
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
```

- [ ] **Step 2: Create Footer**

```typescript
// components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-playfair text-2xl font-bold text-bianco mb-1">Neapolis</p>
            <p className="font-inter text-xs text-rosso uppercase tracking-widest mb-4">
              Pizzeria Verace Napoletana
            </p>
            <p className="font-inter text-sm text-grigio leading-relaxed">
              L&apos;autentica pizza napoletana nel cuore della Calabria. #1 a Polistena.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-inter text-sm font-semibold text-bianco uppercase tracking-wider mb-4">
              Link Rapidi
            </p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Il Menu' },
                { href: '/prenota', label: 'Prenota un Tavolo' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-grigio hover:text-rosso transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts + Hours */}
          <div>
            <p className="font-inter text-sm font-semibold text-bianco uppercase tracking-wider mb-4">
              Contatti & Orari
            </p>
            <ul className="space-y-2 font-inter text-sm text-grigio">
              <li>Via Fausto Gullo 47, Polistena (RC)</li>
              <li>
                <a href="tel:+393533199458" className="hover:text-rosso transition-colors">
                  +39 353 319 9458
                </a>
              </li>
              <li>Lun–Dom: 18:00–00:00</li>
              <li className="text-rosso/70">Chiuso il Martedì</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-grigio">
            © {new Date().getFullYear()} Neapolis Pizzeria Verace Napoletana. Tutti i diritti riservati.
          </p>
          <a
            href="https://www.instagram.com/neapolis_pizzeria_/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs text-grigio hover:text-rosso transition-colors"
          >
            Instagram →
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/Footer.tsx
git commit -m "feat: add Navbar with mobile drawer and Footer"
```

---

## Task 5: Home — Hero Section

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 1: Create Hero component**

```typescript
// components/home/Hero.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden flex items-center">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-pizza.jpg"
          alt="Pizza napoletana autentica"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/60 to-nero/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-nero/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-inter text-rosso text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            Polistena, Calabria
          </motion.p>

          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-extrabold text-bianco leading-tight text-shadow-red mb-6">
            L&apos;Autentica<br />
            <span className="text-rosso">Pizza</span><br />
            Napoletana
          </h1>

          <p className="font-inter text-lg text-bianco/80 mb-10 max-w-md leading-relaxed">
            Impasto 48h, forno a legna, ingredienti DOP. La vera tradizione napoletana nel cuore della Calabria.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/prenota"
              className="bg-rosso text-white font-inter font-semibold px-8 py-4 rounded-full hover:bg-rosso/90 transition-all hover:shadow-lg hover:shadow-rosso/30 hover:scale-105 active:scale-100"
            >
              Prenota Ora
            </Link>
            <Link
              href="/menu"
              className="border border-bianco/40 text-bianco font-inter font-semibold px-8 py-4 rounded-full hover:border-bianco hover:bg-bianco/10 transition-all"
            >
              Scopri il Menu →
            </Link>
          </div>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex items-center gap-3"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-4 h-4 text-oro" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-inter text-sm text-bianco/80">
              <strong className="text-bianco">4.9/5</strong> · 257 recensioni Google · #1 a Polistena
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-bianco/30 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-bianco/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add placeholder hero image**

```bash
mkdir -p public/images
curl -o public/images/hero-pizza.jpg "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1920&q=80"
```

> Note: Replace with actual pizzeria photo before launch.

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.tsx public/images/
git commit -m "feat: add Hero section with parallax and animated content"
```

---

## Task 6: Home — Chi Siamo + Filosofia

**Files:**
- Create: `components/home/ChiSiamo.tsx`
- Create: `components/home/Filosofia.tsx`

- [ ] **Step 1: Create ChiSiamo**

```typescript
// components/home/ChiSiamo.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

export default function ChiSiamo() {
  return (
    <section className="py-24 bg-nero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/images/pizzaiolo.jpg"
                alt="Il nostro pizzaiolo al lavoro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-rosso rounded-2xl -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              eyebrow="La nostra storia"
              title="Nati dalla passione per Napoli"
              subtitle="Neapolis nasce dal sogno di portare la vera pizza napoletana nel cuore della Calabria. Ogni impasto è lavorato con cura, ogni ingrediente selezionato con rispetto per la tradizione."
            />

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-16 bg-rosso rounded-full flex-shrink-0 mt-1" />
                <p className="font-inter text-grigio leading-relaxed">
                  La nostra filosofia è semplice: pochi ingredienti, eccellenti. Pomodoro San Marzano DOP, Fior di Latte di qualità, basilico fresco e un impasto che riposa 48 ore prima di incontare il forno.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: '4.9', label: 'Rating Google' },
                { value: '257', label: 'Recensioni' },
                { value: '#1', label: 'a Polistena' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-playfair text-3xl font-bold text-rosso">{stat.value}</p>
                  <p className="font-inter text-xs text-grigio uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Filosofia**

```typescript
// components/home/Filosofia.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

const pillars = [
  {
    icon: '⏱',
    title: 'Impasto 48h',
    text: 'Lievitazione lenta a temperatura controllata per una pizza leggera, digeribile e profumata.',
  },
  {
    icon: '🔥',
    title: 'Forno a Legna',
    text: 'Cottura a 485°C per 90 secondi. Solo il fuoco vero sa dare quel cornicione alveolato e leggermente bruciacchiato.',
  },
  {
    icon: '🌿',
    title: 'Ingredienti DOP',
    text: 'Pomodoro San Marzano, Fior di Latte, olio EVO e basilico fresco. Nessun compromesso sulla qualità.',
  },
]

export default function Filosofia() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/forno.jpg"
          alt="Il forno a legna di Neapolis"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-nero/85" />
      </div>

      {/* Red top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-rosso" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="La nostra filosofia"
          title="Tradizione e passione in ogni morso"
          center
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 text-center hover:border-rosso/50 transition-colors"
            >
              <div className="text-5xl mb-4">{pillar.icon}</div>
              <h3 className="font-playfair text-xl font-bold text-bianco mb-3">{pillar.title}</h3>
              <p className="font-inter text-sm text-grigio leading-relaxed">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Red bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rosso" />
    </section>
  )
}
```

- [ ] **Step 3: Add placeholder images**

```bash
curl -o public/images/pizzaiolo.jpg "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
curl -o public/images/forno.jpg "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80"
```

- [ ] **Step 4: Commit**

```bash
git add components/home/ChiSiamo.tsx components/home/Filosofia.tsx public/images/
git commit -m "feat: add ChiSiamo and Filosofia home sections"
```

---

## Task 7: Home — Pizze in Evidenza + Recensioni

**Files:**
- Create: `components/home/PizzeEvidenza.tsx`
- Create: `components/home/Recensioni.tsx`

- [ ] **Step 1: Create PizzeEvidenza**

```typescript
// components/home/PizzeEvidenza.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/ui/SectionTitle'
import { featuredItems } from '@/data/menu'

export default function PizzeEvidenza() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Le nostre specialità"
          title="Pizze che fanno innamorare"
          subtitle="Selezionate tra le preferite dei nostri ospiti."
          center
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((pizza, i) => (
            <motion.div
              key={pizza.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-nero rounded-2xl overflow-hidden border border-border hover:border-rosso/50 transition-all duration-300 hover:shadow-xl hover:shadow-rosso/10 hover:scale-[1.03]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {pizza.glutenFree && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white font-inter text-xs font-bold px-2 py-1 rounded-full">
                    Senza Glutine
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-playfair text-lg font-bold text-bianco">{pizza.name}</h3>
                  <span className="font-inter text-sm font-bold text-oro ml-2 flex-shrink-0">€{pizza.price}</span>
                </div>
                <p className="font-inter text-xs text-grigio leading-relaxed line-clamp-2">
                  {pizza.ingredients.join(', ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 border border-rosso text-rosso font-inter font-semibold px-8 py-4 rounded-full hover:bg-rosso hover:text-white transition-all duration-300"
          >
            Vedi tutto il menu →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Recensioni**

```typescript
// components/home/Recensioni.tsx
'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'

const reviews = [
  {
    name: 'Marco R.',
    rating: 5,
    text: 'La miglior pizza napoletana della zona! Impasto leggero e digeribile, ingredienti freschi. Il personale è cordiale e attento. Torneremo sicuramente.',
    date: '2024',
  },
  {
    name: 'Giulia T.',
    rating: 5,
    text: 'La Provola e Pepe è semplicemente divina. Cornicione alveolato, morbido e profumato. Ambiente curato e accogliente. Consigliatissima!',
    date: '2024',
  },
  {
    name: 'Antonio F.',
    rating: 5,
    text: 'Pizza autentica, leggera e semplicemente squisita. Il babà napoletano è il degno finale di una cena perfetta. Complimenti a tutto lo staff!',
    date: '2024',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-oro" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Recensioni() {
  return (
    <section className="py-24 bg-nero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionTitle
            eyebrow="Cosa dicono di noi"
            title="4.9/5 — 257 recensioni Google"
            subtitle="Le parole dei nostri ospiti sono la nostra migliore pubblicità."
            center
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-2xl p-7 hover:border-rosso/30 transition-colors"
            >
              <Stars count={review.rating} />
              <p className="font-inter text-sm text-grigio leading-relaxed mt-4 mb-5 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="font-inter text-sm font-semibold text-bianco">{review.name}</p>
                <p className="font-inter text-xs text-grigio/60">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add placeholder menu images**

```bash
mkdir -p public/images/menu
curl -o public/images/menu/margherita.jpg "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80"
curl -o public/images/menu/provola-pepe.jpg "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
curl -o public/images/menu/diavola.jpg "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80"
curl -o public/images/menu/senza-glutine.jpg "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80"
curl -o public/images/menu/marinara.jpg "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=400&q=80"
curl -o public/images/menu/quattro-formaggi.jpg "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80"
curl -o public/images/menu/nduja.jpg "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=400&q=80"
curl -o public/images/menu/burrata.jpg "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80"
curl -o public/images/menu/frittatine.jpg "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&q=80"
curl -o public/images/menu/bruschette.jpg "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80"
curl -o public/images/menu/antipasto.jpg "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"
curl -o public/images/menu/baba.jpg "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&q=80"
curl -o public/images/menu/tiramisu.jpg "https://images.unsplash.com/photo-1542124292-14e838bd9db1?w=400&q=80"
```

- [ ] **Step 4: Commit**

```bash
git add components/home/PizzeEvidenza.tsx components/home/Recensioni.tsx public/images/
git commit -m "feat: add PizzeEvidenza and Recensioni home sections"
```

---

## Task 8: Home — Gallery + Contatti

**Files:**
- Create: `components/home/Gallery.tsx`
- Create: `components/home/Contatti.tsx`

- [ ] **Step 1: Create Gallery**

```typescript
// components/home/Gallery.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

const photos = [
  { src: '/images/gallery/pizza-1.jpg', alt: 'Pizza napoletana' },
  { src: '/images/gallery/pizza-2.jpg', alt: 'Margherita verace' },
  { src: '/images/gallery/pizza-3.jpg', alt: 'Pizza in forno' },
  { src: '/images/gallery/pizza-4.jpg', alt: 'Diavola piccante' },
  { src: '/images/gallery/pizza-5.jpg', alt: 'Forno a legna' },
  { src: '/images/gallery/pizza-6.jpg', alt: 'Pizzaiolo al lavoro' },
]

export default function Gallery() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="La nostra gallery"
          title="Ogni pizza, un'opera d'arte"
          center
        />

        {/* Mobile: horizontal scroll — Desktop: masonry grid */}
        <div className="mt-12 hidden md:grid grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 || i === 4 ? 'row-span-2' : ''
              }`}
              style={{ height: i === 0 || i === 4 ? '480px' : '230px' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-nero/0 group-hover:bg-nero/40 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-12 md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden snap-start"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Contatti**

```typescript
// components/home/Contatti.tsx
'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'

const orari = [
  { day: 'Lunedì', hours: '18:00 – 00:00' },
  { day: 'Martedì', hours: 'Chiuso', closed: true },
  { day: 'Mercoledì', hours: '18:00 – 00:00' },
  { day: 'Giovedì', hours: '18:00 – 00:00' },
  { day: 'Venerdì', hours: '18:00 – 00:00' },
  { day: 'Sabato', hours: '18:00 – 00:00' },
  { day: 'Domenica', hours: '18:00 – 00:00' },
]

export default function Contatti() {
  return (
    <section className="py-24 bg-[#1A1A1A] border-t-4 border-rosso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Dove siamo"
          title="Vieni a trovarci"
          center
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Contatti</h3>
            <ul className="space-y-4 font-inter text-grigio">
              <li className="flex items-start gap-3">
                <span className="text-rosso mt-0.5">📍</span>
                <span>Via Fausto Gullo 47<br />Polistena (RC), Calabria</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-rosso">📞</span>
                <a href="tel:+393533199458" className="hover:text-bianco transition-colors">
                  +39 353 319 9458
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-rosso">✉️</span>
                <a href="mailto:neapolis.srls@libero.it" className="hover:text-bianco transition-colors text-sm">
                  neapolis.srls@libero.it
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Orari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Orari di Apertura</h3>
            <ul className="space-y-2">
              {orari.map((item) => (
                <li
                  key={item.day}
                  className={`flex justify-between font-inter text-sm ${
                    item.closed ? 'text-grigio/40' : 'text-grigio'
                  }`}
                >
                  <span>{item.day}</span>
                  <span className={item.closed ? 'text-rosso/60' : ''}>{item.hours}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Maps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Come Raggiungerci</h3>
            <p className="font-inter text-sm text-grigio leading-relaxed mb-5">
              Siamo nel centro di Polistena, con ampio parcheggio gratuito disponibile nelle vicinanze.
            </p>
            <a
              href="https://maps.google.com/?q=Via+Fausto+Gullo+47+Polistena"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rosso text-white font-inter text-sm font-semibold px-5 py-3 rounded-full hover:bg-rosso/90 transition-colors"
            >
              Apri in Google Maps →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add gallery placeholder images**

```bash
mkdir -p public/images/gallery
curl -o public/images/gallery/pizza-1.jpg "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80"
curl -o public/images/gallery/pizza-2.jpg "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"
curl -o public/images/gallery/pizza-3.jpg "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80"
curl -o public/images/gallery/pizza-4.jpg "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80"
curl -o public/images/gallery/pizza-5.jpg "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80"
curl -o public/images/gallery/pizza-6.jpg "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
```

- [ ] **Step 4: Commit**

```bash
git add components/home/Gallery.tsx components/home/Contatti.tsx public/images/
git commit -m "feat: add Gallery and Contatti home sections"
```

---

## Task 9: Home Page Assembly

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Assemble home page**

```typescript
// app/page.tsx
import Hero from '@/components/home/Hero'
import ChiSiamo from '@/components/home/ChiSiamo'
import PizzeEvidenza from '@/components/home/PizzeEvidenza'
import Filosofia from '@/components/home/Filosofia'
import Recensioni from '@/components/home/Recensioni'
import Gallery from '@/components/home/Gallery'
import Contatti from '@/components/home/Contatti'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChiSiamo />
      <PizzeEvidenza />
      <Filosofia />
      <Recensioni />
      <Gallery />
      <Contatti />
    </>
  )
}
```

- [ ] **Step 2: Start dev server and verify home renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: hero visible, sections scroll correctly, mobile drawer works, floating CTA appears.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

## Task 10: Menu Page

**Files:**
- Create: `components/menu/MenuCard.tsx`
- Create: `components/menu/MenuTabs.tsx`
- Create: `app/menu/page.tsx`

- [ ] **Step 1: Create MenuCard**

```typescript
// components/menu/MenuCard.tsx
import Image from 'next/image'
import { MenuItem } from '@/data/menu'

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-rosso/40 transition-all duration-300 hover:shadow-lg hover:shadow-rosso/10 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.glutenFree && (
          <span className="absolute top-3 left-3 bg-green-600 text-white font-inter text-xs font-bold px-2 py-1 rounded-full">
            Senza Glutine
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-playfair text-lg font-bold text-bianco leading-snug">{item.name}</h3>
          <span className="bg-oro/20 text-oro font-inter text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            €{item.price}
          </span>
        </div>
        <p className="font-inter text-xs text-grigio mb-3 leading-relaxed">{item.description}</p>
        <p className="font-inter text-xs text-grigio/60 line-clamp-1">
          {item.ingredients.join(' · ')}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create MenuTabs**

```typescript
// components/menu/MenuTabs.tsx
'use client'

import { useState } from 'react'
import { menuItems, categories, MenuCategory } from '@/data/menu'
import MenuCard from './MenuCard'

export default function MenuTabs() {
  const [active, setActive] = useState<MenuCategory>('classiche')

  const filtered = menuItems.filter((item) => item.category === active)

  return (
    <div>
      {/* Sticky tabs */}
      <div className="sticky top-16 z-20 bg-nero/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex-shrink-0 font-inter text-sm font-medium px-6 py-4 border-b-2 transition-all ${
                  active === cat.id
                    ? 'border-rosso text-rosso'
                    : 'border-transparent text-grigio hover:text-bianco'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create menu page**

```typescript
// app/menu/page.tsx
import type { Metadata } from 'next'
import MenuTabs from '@/components/menu/MenuTabs'

export const metadata: Metadata = {
  title: 'Menu — Neapolis Pizzeria Verace Napoletana',
  description: 'Scopri il menu di Neapolis: pizze classiche, pizze speciali, antipasti e dolci. Impasto napoletano, ingredienti DOP.',
}

export default function MenuPage() {
  return (
    <>
      {/* Header */}
      <div className="relative pt-32 pb-16 bg-nero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-rosso text-sm font-bold uppercase tracking-[0.2em] mb-3">
            La nostra proposta
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-extrabold text-bianco mb-4">
            Il Nostro Menu
          </h1>
          <p className="font-inter text-grigio text-lg max-w-xl mx-auto">
            Ingredienti selezionati, impasto a lunga lievitazione, forno a legna.
          </p>
          <div className="mt-6 h-1 w-16 bg-rosso mx-auto" />
        </div>
      </div>

      <MenuTabs />
    </>
  )
}
```

- [ ] **Step 4: Verify menu page**

Open `http://localhost:3000/menu`. Verify: tabs switch correctly, cards display, gluten-free badge shows on correct items.

- [ ] **Step 5: Commit**

```bash
git add components/menu/ app/menu/page.tsx
git commit -m "feat: add Menu page with category tabs and item cards"
```

---

## Task 11: Prenota Page

**Files:**
- Create: `components/prenota/BookingForm.tsx`
- Create: `components/prenota/BookingInfo.tsx`
- Create: `app/prenota/page.tsx`

- [ ] **Step 1: Create BookingForm**

```typescript
// components/prenota/BookingForm.tsx
'use client'

import { useState } from 'react'

interface FormData {
  name: string
  date: string
  time: string
  guests: string
  notes: string
}

const timeSlots = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00',
]

function buildWhatsAppURL(data: FormData): string {
  const text = encodeURIComponent(
    `Salve! Vorrei prenotare un tavolo da Neapolis.\n\n` +
    `Nome: ${data.name}\n` +
    `Data: ${data.date}\n` +
    `Ora: ${data.time}\n` +
    `Persone: ${data.guests}\n` +
    `Note: ${data.notes || 'Nessuna'}`
  )
  return `https://wa.me/393533199458?text=${text}`
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    date: '',
    time: '20:00',
    guests: '2',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Il nome è obbligatorio'
    if (!form.date) newErrors.date = 'La data è obbligatoria'
    if (!form.guests) newErrors.guests = 'Indica il numero di persone'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    window.open(buildWhatsAppURL(form), '_blank', 'noopener,noreferrer')
  }

  const field = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const inputClass =
    'w-full bg-nero border border-border rounded-xl px-4 py-3 font-inter text-sm text-bianco placeholder-grigio focus:outline-none focus:border-rosso transition-colors'

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
      <h2 className="font-playfair text-2xl font-bold text-bianco mb-6">Dettagli Prenotazione</h2>

      {/* Name */}
      <div>
        <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
          Nome e Cognome *
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => field('name', e.target.value)}
          placeholder="Mario Rossi"
          className={inputClass}
        />
        {errors.name && <p className="font-inter text-xs text-rosso mt-1">{errors.name}</p>}
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
            Data *
          </label>
          <input
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => field('date', e.target.value)}
            className={inputClass}
          />
          {errors.date && <p className="font-inter text-xs text-rosso mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
            Ora *
          </label>
          <select
            value={form.time}
            onChange={(e) => field('time', e.target.value)}
            className={inputClass}
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
          Numero di Persone *
        </label>
        <select
          value={form.guests}
          onChange={(e) => field('guests', e.target.value)}
          className={inputClass}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={String(n)}>
              {n} {n === 1 ? 'persona' : 'persone'}
            </option>
          ))}
        </select>
        {errors.guests && <p className="font-inter text-xs text-rosso mt-1">{errors.guests}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
          Note (allergie, occasioni speciali…)
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => field('notes', e.target.value)}
          placeholder="Es. allergia ai crostacei, compleanno…"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-rosso text-white font-inter font-semibold px-6 py-4 rounded-full hover:bg-rosso/90 transition-all hover:shadow-lg hover:shadow-rosso/30 flex items-center justify-center gap-3 text-base"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Prenota su WhatsApp
      </button>

      <p className="font-inter text-xs text-grigio/60 text-center">
        Cliccando verrai reindirizzato su WhatsApp con i dati precompilati.
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Create BookingInfo**

```typescript
// components/prenota/BookingInfo.tsx
const orari = [
  { day: 'Lunedì', hours: '18:00 – 00:00' },
  { day: 'Martedì', hours: 'Chiuso', closed: true },
  { day: 'Mercoledì', hours: '18:00 – 00:00' },
  { day: 'Giovedì', hours: '18:00 – 00:00' },
  { day: 'Venerdì', hours: '18:00 – 00:00' },
  { day: 'Sabato', hours: '18:00 – 00:00' },
  { day: 'Domenica', hours: '18:00 – 00:00' },
]

export default function BookingInfo() {
  return (
    <div className="space-y-8">
      {/* Hours */}
      <div className="bg-card border border-border rounded-2xl p-7">
        <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Orari di Apertura</h3>
        <ul className="space-y-2">
          {orari.map((item) => (
            <li
              key={item.day}
              className={`flex justify-between font-inter text-sm ${
                item.closed ? 'text-grigio/40' : 'text-grigio'
              }`}
            >
              <span>{item.day}</span>
              <span className={item.closed ? 'text-rosso/60' : ''}>{item.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Address */}
      <div className="bg-card border border-border rounded-2xl p-7">
        <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Dove Siamo</h3>
        <address className="not-italic font-inter text-sm text-grigio space-y-3">
          <p>Via Fausto Gullo 47<br />Polistena (RC), Calabria</p>
          <a
            href="tel:+393533199458"
            className="block hover:text-rosso transition-colors"
          >
            +39 353 319 9458
          </a>
          <a
            href="https://maps.google.com/?q=Via+Fausto+Gullo+47+Polistena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-rosso hover:underline text-sm"
          >
            Apri in Google Maps →
          </a>
        </address>
      </div>

      {/* Urgent note */}
      <p className="font-inter text-xs text-grigio/60 leading-relaxed border-l-2 border-rosso pl-4">
        Per prenotazioni urgenti o di gruppo (oltre 10 persone), chiamaci direttamente al{' '}
        <a href="tel:+393533199458" className="text-rosso hover:underline">
          +39 353 319 9458
        </a>.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Create prenota page**

```typescript
// app/prenota/page.tsx
import type { Metadata } from 'next'
import BookingForm from '@/components/prenota/BookingForm'
import BookingInfo from '@/components/prenota/BookingInfo'

export const metadata: Metadata = {
  title: 'Prenota un Tavolo — Neapolis Pizzeria Verace Napoletana',
  description: 'Prenota il tuo tavolo da Neapolis Pizzeria. Via Fausto Gullo 47, Polistena. +39 353 319 9458.',
}

export default function PrenotaPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 bg-nero text-center">
        <p className="font-inter text-rosso text-sm font-bold uppercase tracking-[0.2em] mb-3">
          Riserva il tuo posto
        </p>
        <h1 className="font-playfair text-5xl md:text-6xl font-extrabold text-bianco mb-4">
          Prenota un Tavolo
        </h1>
        <p className="font-inter text-grigio text-lg max-w-md mx-auto">
          Compila il form e ti risponderemo su WhatsApp per confermare.
        </p>
        <div className="mt-6 h-1 w-16 bg-rosso mx-auto" />
      </div>

      {/* Content */}
      <div className="bg-nero py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <BookingForm />
            <BookingInfo />
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Verify booking page**

Open `http://localhost:3000/prenota`. Verify: form validation fires on submit, WhatsApp link opens with correct pre-filled message, floating CTA hidden on this page.

- [ ] **Step 5: Commit**

```bash
git add components/prenota/ app/prenota/page.tsx
git commit -m "feat: add Prenota page with WhatsApp booking form"
```

---

## Task 12: SEO + JSON-LD + next.config

**Files:**
- Modify: `next.config.ts` (or `next.config.mjs`)

- [ ] **Step 1: Add JSON-LD structured data to root layout**

Add this script tag inside `<body>` in `app/layout.tsx`, after the `<main>` closing tag and before `<Footer />`:

```typescript
// Add import at top of app/layout.tsx:
// (no new import needed — use inline script)

// Add inside <body>, before </body>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Neapolis Pizzeria Verace Napoletana',
      description: "L'autentica pizza napoletana nel cuore della Calabria.",
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Fausto Gullo 47',
        addressLocality: 'Polistena',
        addressRegion: 'RC',
        postalCode: '89024',
        addressCountry: 'IT',
      },
      telephone: '+393533199458',
      email: 'neapolis.srls@libero.it',
      url: 'https://www.pizzerianeapolispolistena.com',
      servesCuisine: 'Pizza Napoletana',
      priceRange: '€€',
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '18:00', closes: '00:00' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '257',
        bestRating: '5',
      },
    }),
  }}
/>
```

- [ ] **Step 2: Configure next.config for remote images**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Build and check for errors**

```bash
npm run build
```

Expected: Build completes with no errors. Fix any TypeScript or lint errors reported.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx next.config.ts
git commit -m "feat: add JSON-LD structured data and configure next/image domains"
```

---

## Task 13: Final Polish + Mobile QA

- [ ] **Step 1: Add scrollbar-hide utility to globals.css**

```css
/* append to app/globals.css */
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 2: Run full build and verify**

```bash
npm run build && npm run start
```

Open `http://localhost:3000` in browser. Check:
- [ ] Mobile viewport (375px): navbar, hero, all sections stack correctly
- [ ] Floating CTA visible on home, hidden on /prenota
- [ ] Mobile drawer opens and closes
- [ ] `/menu` tabs switch categories correctly
- [ ] `/prenota` form validates, WhatsApp link generates with correct data
- [ ] No console errors

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Neapolis website — home, menu, prenota"
```

---

## Self-Review

**Spec coverage:**
- ✅ Next.js 14 + Tailwind + TypeScript stack
- ✅ Design system (colors, typography, animations)
- ✅ Home: Hero, ChiSiamo, PizzeEvidenza, Filosofia, Recensioni, Gallery, Contatti
- ✅ Floating WhatsApp CTA (hidden on /prenota)
- ✅ Menu page with category tabs, MenuCard, gluten-free badge
- ✅ Static menu data in `data/menu.ts` with full TypeScript interface
- ✅ Prenota: form with validation, WhatsApp URL builder, BookingInfo
- ✅ Navbar with mobile hamburger drawer
- ✅ Footer with orari, contacts, Instagram link
- ✅ SEO metadata per page + JSON-LD Restaurant schema
- ✅ `next/image` for all images + remote patterns config
- ✅ Framer Motion animations throughout

**Placeholder scan:** No TBD, TODO, or incomplete steps. All code blocks complete.

**Type consistency:** `MenuItem` and `MenuCategory` defined in Task 2, used identically in Tasks 7, 10. `FormData` defined and used within Task 11 only. `buildWhatsAppURL` defined and called within same file.
