'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className="text-rosso font-inter text-sm font-bold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-playfair text-4xl md:text-5xl font-bold leading-tight mb-4 ${
          light ? 'text-nero' : 'text-bianco'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-inter text-lg leading-relaxed ${
            light ? 'text-nero/70' : 'text-grigio'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 bg-rosso ${center ? 'mx-auto' : ''}`}
      />
    </motion.div>
  )
}
