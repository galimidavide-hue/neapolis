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
  description: "L'autentica pizza napoletana nel cuore della Calabria. #1 a Polistena con 4.9/5 su Google. Via Fausto Gullo 47, Polistena (RC). Prenota su WhatsApp.",
  keywords: ['pizzeria', 'napoletana', 'Polistena', 'Calabria', 'pizza verace'],
  openGraph: {
    title: 'Neapolis Pizzeria Verace Napoletana',
    description: "L'autentica pizza napoletana nel cuore della Calabria.",
    locale: 'it_IT',
    type: 'website',
  },
}

const jsonLd = {
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
  servesCuisine: 'Pizza Napoletana',
  priceRange: '€€',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '18:00',
      closes: '00:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '257',
    bestRating: '5',
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
        {children}
        <Footer />
        <FloatingCTA />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
