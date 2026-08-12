'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { menuItems, categories, MenuCategory, MenuItem } from '@/data/menu'
import MenuCard from './MenuCard'
import WineCard from './WineCard'
import { MorphingText } from '@/components/ui/morphing-text'
import { wineItems } from '@/data/wines'

const CALZONI_BANNER = [
  '/images/menu/calzoni-banner-1.jpg',
  '/images/menu/calzoni-banner-2.jpg',
  '/images/menu/calzoni-banner-3.jpg',
]

const PANUOZZI_BANNER = [
  '/images/menu/panuozzi-banner-1.jpg',
  '/images/menu/panuozzo-americano.jpg',
]

const ANTIPASTI_BANNER = [
  '/images/menu/antipasti-banner-1.jpg',
]

function MenuCardNoImage({ item }: { item: MenuItem }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-rosso/40 transition-all duration-300 hover:shadow-lg hover:shadow-rosso/10 hover:scale-[1.02]">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-playfair text-lg font-bold text-bianco leading-snug">{item.name}</h3>
          <span className="bg-oro/20 text-oro font-inter text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            €{item.price}
          </span>
        </div>
        <p className="font-inter text-xs text-grigio leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

const POPPELLA_IDS = ['fiocchi-neve']

export default function MenuTabs() {
  const [active, setActive] = useState<MenuCategory | 'all'>('antipasti')
  const [dolciOpen, setDolciOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab && categories.some((c) => c.id === tab)) {
      setActive(tab as MenuCategory)
    }
  }, [])

  const filtered = active === 'all' ? menuItems : menuItems.filter((item) => item.category === active)

  return (
    <div>
      <div className="sticky top-16 z-20 bg-nero/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: dropdown */}
          <div className="md:hidden py-3">
            <select
              value={active}
              onChange={(e) => setActive(e.target.value as MenuCategory | 'all')}
              className="w-full bg-card border border-border text-bianco font-inter text-sm font-medium rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-rosso transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
          {/* Desktop: tab bar */}
          <div className="hidden md:flex overflow-x-auto gap-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex-shrink-0 font-inter text-sm font-medium px-6 py-4 border-b-2 transition-all ${
                  active === cat.id ? 'border-rosso text-rosso' : 'border-transparent text-grigio hover:text-bianco'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick-access banner: visible on all tabs except vini */}
        {active !== 'vini' && (
          <button
            onClick={() => setActive('vini')}
            className="w-full flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-4 mb-8 hover:border-oro/40 hover:bg-oro/5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 text-oro flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.198 2.146 2.25 2.25 0 01-2.088 1.329H6.09a2.25 2.25 0 01-2.087-1.329 2.25 2.25 0 01.198-2.146m15.6 0H4.2" />
              </svg>
              <div className="text-left">
                <p className="font-playfair text-base font-bold text-bianco leading-none mb-0.5">Carta dei Vini</p>
                <p className="font-inter text-xs text-grigio">Abbinamenti d&apos;autore · Tenuta Iuzzolini e Casa Criserà</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-grigio group-hover:text-oro transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {active === 'panuozzi' && (
          <div className="grid grid-cols-2 gap-3 mb-10 rounded-2xl overflow-hidden">
            {PANUOZZI_BANNER.map((src, i) => (
              <div key={i} className="relative h-56 sm:h-72">
                <Image
                  src={src}
                  alt={`Panuozzi Neapolis ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 40vw"
                />
              </div>
            ))}
          </div>
        )}

        {active === 'dolci' && (() => {
          const poppella = filtered.filter((i) => POPPELLA_IDS.includes(i.id))
          const altri = filtered.filter((i) => !POPPELLA_IDS.includes(i.id))
          return (
            <>
              {/* Header Poppella */}
              <div className="text-center mb-8">
                <p className="font-inter text-xs tracking-[0.25em] uppercase text-oro mb-3">Esclusiva da noi</p>
                <MorphingText
                  texts={['NEAPOLIS', 'POPPELLA']}
                  className="text-bianco text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] h-20 sm:h-24 lg:h-28"
                />
                <p className="font-inter text-sm tracking-[0.15em] uppercase text-grigio mt-2">in collaborazione con</p>
                <div className="mt-4 w-16 h-px bg-oro/40 mx-auto" />
              </div>

              {/* Split: foto + gusti */}
              <div className="flex flex-col md:flex-row gap-6 mb-12 rounded-2xl overflow-hidden bg-card border border-border">
                <div className="md:w-1/2">
                  <Image
                    src="/images/menu/poppella.jpg"
                    alt="Fiocchi di Neve Poppella"
                    width={1920}
                    height={2560}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center gap-4">
                  {poppella.map((item) => (
                    <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-playfair text-xl font-bold text-bianco">{item.name}</h3>
                        <span className="bg-oro/20 text-oro font-inter text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                          €{item.price}
                        </span>
                      </div>
                      <p className="font-inter text-sm text-grigio leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle I Dolci di Neapolis */}
              <button
                onClick={() => setDolciOpen((o) => !o)}
                className="w-full flex items-center justify-between bg-card border border-border rounded-2xl px-6 py-4 mb-6 hover:border-rosso/40 transition-colors"
              >
                <span className="font-playfair text-xl font-bold text-bianco">I Dolci di Neapolis</span>
                <svg
                  className={`w-5 h-5 text-grigio transition-transform duration-300 ${dolciOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dolciOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {altri.map((item) => <MenuCardNoImage key={item.id} item={item} />)}
                </div>
              )}
            </>
          )
        })()}

        {/* Carta dei Vini */}
        {active === 'vini' && (
          <>
            <div className="text-center mb-12">
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-oro mb-2">Abbinamenti d&apos;autore</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-bianco mb-3">Carta dei Vini</h2>
              <p className="font-inter text-sm text-grigio max-w-xl mx-auto leading-relaxed">
                Vini della Tenuta Iuzzolini e Casa Vinicola Criserà — un percorso sensoriale che unisce
                la tradizione calabrese e l&apos;arte contemporanea della pizza.
              </p>
              <div className="mt-6 w-16 h-px bg-oro/40 mx-auto" />
            </div>
            <div className="flex flex-col gap-6">
              {wineItems.map((wine) => <WineCard key={wine.id} wine={wine} />)}
            </div>
          </>
        )}

        {active !== 'dolci' && active !== 'vini' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              active === 'calzoni' || active === 'panuozzi' || active === 'friggitoria'
                ? <MenuCardNoImage key={item.id} item={item} />
                : active === 'antipasti' && !['tris-montanarine', 'taglieri', 'crocchetton', 'antipasto-neapolis', 'bombette-antipasto', 'salumi-formaggi'].includes(item.id)
                ? <MenuCardNoImage key={item.id} item={item} />
                : <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
