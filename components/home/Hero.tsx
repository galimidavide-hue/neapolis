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
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-pizza.jpg"
          alt="Pizza napoletana autentica"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/60 to-nero/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-nero/50 to-transparent" />
      </motion.div>

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
