import type { Metadata } from 'next'
import MenuTabs from '@/components/menu/MenuTabs'

export const metadata: Metadata = {
  title: 'Menu — Neapolis Pizzeria Verace Napoletana',
  description: 'Scopri il menu di Neapolis: pizze classiche, pizze speciali, antipasti e dolci. Impasto napoletano, ingredienti DOP.',
}

export default function MenuPage() {
  return (
    <>
      <div className="relative pt-32 pb-16 bg-nero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-rosso text-sm font-bold uppercase tracking-[0.2em] mb-3">
            La nostra proposta
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-extrabold text-bianco mb-4">
            Il Nostro Menu
          </h1>
          <p className="font-inter text-grigio text-lg max-w-xl mx-auto">
            Ingredienti selezionati, impasto a lunga lievitazione, forno a legna.
          </p>
          <div className="mt-6 h-1 w-16 bg-rosso mx-auto" />
        </div>
      </div>

      <div className="bg-nero">
        <MenuTabs />
      </div>
    </>
  )
}
