'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const badges = [
  { src: '/awards/bollino-eccellenti-2026.jpg', alt: '50 Top Pizza – Pizzerie Eccellenti 2026' },
  { src: '/awards/rg-cert-18.png',              alt: 'Restaurant Guru Certificate 2018' },
  { src: '/awards/rg-cert-1.png',               alt: 'Restaurant Guru Certificate' },
  { src: '/awards/rg-cert-1-1.png',             alt: 'Restaurant Guru Certificate' },
  { src: '/awards/rg-cert-1-2.png',             alt: 'Restaurant Guru Certificate' },
  { src: '/awards/rg-cert-1-3.png',             alt: 'Restaurant Guru Certificate' },
]

const pdfs = [
  { label: '50 Top Pizza 2018', href: '/awards/certificato-2018.pdf' },
  { label: '50 Top Pizza 2019', href: '/awards/certificato-2019.pdf' },
]

export default function Premi() {
  return (
    <section id="premi" className="bg-nero py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-inter text-xs tracking-[0.25em] uppercase text-rosso mb-3 block">
            Riconoscimenti
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-extrabold text-bianco mb-4">
            Premi e Riconoscimenti
          </h2>
          <p className="font-inter text-grigio text-base max-w-xl mx-auto leading-relaxed">
            Premiati e giudicati da chi dedica alla pizza tutta la propria passione.
          </p>
          <div className="mt-6 w-16 h-px bg-rosso mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-12">
          {badges.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl overflow-hidden flex items-center justify-center p-4 hover:border-oro/40 transition-colors"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {pdfs.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-oro/40 text-oro font-inter text-sm font-semibold px-6 py-3 rounded-full hover:bg-oro/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              {p.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
