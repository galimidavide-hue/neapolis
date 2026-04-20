'use client'

import { useState } from 'react'
import { menuItems, categories, MenuCategory } from '@/data/menu'
import MenuCard from './MenuCard'

export default function MenuTabs() {
  const [active, setActive] = useState<MenuCategory>('antipasti')

  const filtered = menuItems.filter((item) => item.category === active)

  return (
    <div>
      <div className="sticky top-16 z-20 bg-nero/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex-shrink-0 font-inter text-sm font-medium px-6 py-4 border-b-2 transition-all ${
                  active === cat.id
                    ? 'border-rosso text-rosso'
                    : 'border-transparent text-grigio hover:text-bianco'
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
