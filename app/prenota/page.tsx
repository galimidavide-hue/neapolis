import type { Metadata } from 'next'
import BookingForm from '@/components/prenota/BookingForm'
import BookingInfo from '@/components/prenota/BookingInfo'

export const metadata: Metadata = {
  title: 'Prenota un Tavolo — Neapolis Pizzeria Verace Napoletana',
  description: 'Prenota il tuo tavolo da Neapolis Pizzeria. Via Fausto Gullo 47, Polistena. +39 353 319 9458.',
}

export default function PrenotaPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-nero text-center">
        <p className="font-inter text-rosso text-sm font-bold uppercase tracking-[0.2em] mb-3">
          Riserva il tuo posto
        </p>
        <h1 className="font-playfair text-5xl md:text-6xl font-extrabold text-bianco mb-4">
          Prenota un Tavolo
        </h1>
        <p className="font-inter text-grigio text-lg max-w-md mx-auto">
          Compila il form e ti risponderemo su WhatsApp per confermare.
        </p>
        <div className="mt-6 h-1 w-16 bg-rosso mx-auto" />
      </div>

      <div className="bg-nero py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <BookingForm />
            <BookingInfo />
          </div>
        </div>
      </div>
    </>
  )
}
