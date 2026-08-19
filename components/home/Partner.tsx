import Image from 'next/image'

const partners = [
  { name: 'Caffè Cannizzaro',    src: '/images/partners/cannizzaro.png',         bg: 'bg-white' },
  { name: 'Poppella Pasticceria',src: '/images/partners/poppella.png',            bg: 'bg-white' },
  { name: 'Latteria Sorrentina', src: '/images/partners/latteria-sorrentina.png', bg: 'bg-white' },
  { name: 'Astorino Gelateria',  src: '/images/partners/astorino.jpg',            bg: 'bg-nero'  },
  { name: 'Molino Vigevano',     src: '/images/partners/molino-vigevano.png',     bg: 'bg-white' },
]

export default function Partner() {
  return (
    <section className="py-16 bg-nero border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="font-inter text-xs tracking-[0.25em] uppercase text-grigio mb-2">Eccellenze che scegliamo</p>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-bianco">I Nostri Partner</h2>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-nero to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-nero to-transparent" />

        <div
          className="flex gap-10 w-max"
          style={{ animation: 'marquee 22s linear infinite' }}
        >
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className={`flex items-center justify-center ${p.bg} rounded-2xl px-6 py-4 w-52 h-28 flex-shrink-0`}
            >
              <Image
                src={p.src}
                alt={p.name}
                width={180}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
