'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

export default function ChiSiamo() {
  return (
    <section className="py-24 bg-nero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/images/ristorante.jpg"
                alt="L'interno accogliente del ristorante Neapolis"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-rosso rounded-2xl -z-10" />
          </motion.div>

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
                  La nostra filosofia è semplice: pochi ingredienti, eccellenti. Pomodoro San Marzano DOP, Fior di Latte di qualità, basilico fresco e un impasto che riposa 48 ore prima di incontrare il forno.
                </p>
              </div>
            </div>

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
