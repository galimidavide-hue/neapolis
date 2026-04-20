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
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-playfair text-lg font-bold text-bianco">{pizza.name}</h3>
                  <span className="font-inter text-sm font-bold text-oro ml-2 flex-shrink-0">€{pizza.price}</span>
                </div>
                <p className="font-inter text-xs text-grigio leading-relaxed line-clamp-2">
                  {pizza.description}
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
