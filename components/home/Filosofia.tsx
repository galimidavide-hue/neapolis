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

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rosso" />
    </section>
  )
}
