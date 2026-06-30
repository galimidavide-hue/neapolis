'use client'

import { useState } from 'react'
import Image from 'next/image'
import { menuItems, categories, MenuCategory, MenuItem } from '@/data/menu'
import MenuCard from './MenuCard'

const CALZONI_BANNER = [
  '/images/menu/calzoni-banner-1.jpg',
  '/images/menu/calzoni-banner-2.jpg',
  '/images/menu/calzoni-banner-3.jpg',
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

export default function MenuTabs() {
  const [active, setActive] = useState<MenuCategory | 'all'>('all')

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
              <option value="all">— Tutte le categorie —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
          {/* Desktop: tab bar */}
          <div className="hidden md:flex overflow-x-auto gap-0 scrollbar-hide">
            <button
              onClick={() => setActive('all')}
              className={`flex-shrink-0 font-inter text-sm font-medium px-6 py-4 border-b-2 transition-all ${
                active === 'all' ? 'border-rosso text-rosso' : 'border-transparent text-grigio hover:text-bianco'
              }`}
            >
              Tutto il menu
            </button>
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
        {active === 'calzoni' && (
          <div className="grid grid-cols-3 gap-3 mb-10 rounded-2xl overflow-hidden">
            {CALZONI_BANNER.map((src, i) => (
              <div key={i} className="relative h-56 sm:h-72">
                <Image
                  src={src}
                  alt={`Calzoni Neapolis ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            active === 'calzoni'
              ? <MenuCardNoImage key={item.id} item={item} />
              : <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
