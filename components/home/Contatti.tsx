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
            <p className="font-inter text-sm text-grigio mb-6 flex items-start gap-2">
              <svg className="w-4 h-4 text-rosso flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Via Fausto Gullo 47<br />Polistena (RC), Calabria
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+393533199458"
                className="flex items-center justify-center gap-3 bg-card border border-border text-bianco font-inter text-sm font-semibold px-5 py-3.5 rounded-xl hover:border-rosso/50 hover:bg-rosso/10 transition-all"
              >
                <svg className="w-4 h-4 text-rosso" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0 1.566.95 3.328 2.078 4.878C5.9 13.32 7.694 14.957 9 15.75c.644.393 1.28.75 2.097.75.703 0 1.406-.469 1.875-1.172l.469-.703c.234-.352.234-.703.118-1.055L12.28 11.4c-.235-.703-.82-.937-1.524-.703l-.937.234c-.352.117-.703 0-.938-.234C8.29 10.11 7.124 8.89 6.5 7.594c-.234-.352-.117-.703.117-.938l.703-.703c.469-.469.469-1.289 0-1.758L5.844 2.72c-.352-.352-.703-.352-1.055-.118l-.703.469C3.383 3.54 2.25 4.773 2.25 6.338z" />
                </svg>
                +39 353 319 9458
              </a>
              <a
                href="https://wa.me/393533199458"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-inter text-sm font-semibold px-5 py-3.5 rounded-xl hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Scrivici su WhatsApp
              </a>
            </div>
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
