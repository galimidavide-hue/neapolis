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
    <section className="py-24 bg-card border-t-4 border-rosso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Dove siamo"
          title="Vieni a trovarci"
          center
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
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
