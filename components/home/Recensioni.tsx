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
