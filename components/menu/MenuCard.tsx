import Image from 'next/image'
import { MenuItem } from '@/data/menu'

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-rosso/40 transition-all duration-300 hover:shadow-lg hover:shadow-rosso/10 hover:scale-[1.02]">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.glutenFree && (
          <span className="absolute top-3 left-3 bg-green-600 text-white font-inter text-xs font-bold px-2 py-1 rounded-full">
            Senza Glutine
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-playfair text-lg font-bold text-bianco leading-snug">{item.name}</h3>
          <span className="bg-oro/20 text-oro font-inter text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            €{item.price}
          </span>
        </div>
        <p className="font-inter text-xs text-grigio mb-3 leading-relaxed">{item.description}</p>
        <p className="font-inter text-xs text-grigio/60 line-clamp-1">
          {item.ingredients.join(' · ')}
        </p>
      </div>
    </div>
  )
}
