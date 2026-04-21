'use client'

import { useState } from 'react'
import { menuItems, categories, MenuCategory } from '@/data/menu'
import MenuCard from './MenuCard'

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
