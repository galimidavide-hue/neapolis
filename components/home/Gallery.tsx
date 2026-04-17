'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'

const photos = [
  { src: '/images/gallery/pizza-1.jpg', alt: 'Pizza napoletana' },
  { src: '/images/gallery/pizza-2.jpg', alt: 'Margherita verace' },
  { src: '/images/gallery/pizza-3.jpg', alt: 'Pizza in forno' },
  { src: '/images/gallery/pizza-4.jpg', alt: 'Diavola piccante' },
  { src: '/images/gallery/pizza-5.jpg', alt: 'Forno a legna' },
  { src: '/images/gallery/pizza-6.jpg', alt: 'Pizzaiolo al lavoro' },
]

export default function Gallery() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="La nostra gallery"
          title="Ogni pizza, un'opera d'arte"
          center
        />

        {/* Desktop: masonry-style grid */}
        <div className="mt-12 hidden md:grid grid-cols-3 gap-4" style={{ gridAutoRows: '230px' }}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 || i === 4 ? 'row-span-2' : ''
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-nero/0 group-hover:bg-nero/40 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-12 md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden snap-start"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
