import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

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
        <main>{children}</main>
      </body>
    </html>
  )
}
