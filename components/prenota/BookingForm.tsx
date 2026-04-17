'use client'

import { useState } from 'react'

interface FormData {
  name: string
  date: string
  time: string
  guests: string
  notes: string
}

const timeSlots = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00',
]

function buildWhatsAppURL(data: FormData): string {
  const text = encodeURIComponent(
    `Salve! Vorrei prenotare un tavolo da Neapolis.\n\n` +
    `Nome: ${data.name}\n` +
    `Data: ${data.date}\n` +
    `Ora: ${data.time}\n` +
    `Persone: ${data.guests}\n` +
    `Note: ${data.notes || 'Nessuna'}`
  )
  return `https://wa.me/393533199458?text=${text}`
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    date: '',
    time: '20:00',
    guests: '2',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Il nome è obbligatorio'
    if (!form.date) newErrors.date = 'La data è obbligatoria'
    if (!form.guests) newErrors.guests = 'Indica il numero di persone'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    window.open(buildWhatsAppURL(form), '_blank', 'noopener,noreferrer')
  }

  const field = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const inputClass =
    'w-full bg-nero border border-border rounded-xl px-4 py-3 font-inter text-sm text-bianco placeholder-grigio focus:outline-none focus:border-rosso transition-colors'

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
      <h2 className="font-playfair text-2xl font-bold text-bianco mb-6">Dettagli Prenotazione</h2>

      <div>
        <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
          Nome e Cognome *
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => field('name', e.target.value)}
          placeholder="Mario Rossi"
          className={inputClass}
        />
        {errors.name && <p className="font-inter text-xs text-rosso mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
            Data *
          </label>
          <input
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => field('date', e.target.value)}
            className={inputClass}
          />
          {errors.date && <p className="font-inter text-xs text-rosso mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
            Ora *
          </label>
          <select
            value={form.time}
            onChange={(e) => field('time', e.target.value)}
            className={inputClass}
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
          Numero di Persone *
        </label>
        <select
          value={form.guests}
          onChange={(e) => field('guests', e.target.value)}
          className={inputClass}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={String(n)}>
              {n} {n === 1 ? 'persona' : 'persone'}
            </option>
          ))}
        </select>
        {errors.guests && <p className="font-inter text-xs text-rosso mt-1">{errors.guests}</p>}
      </div>

      <div>
        <label className="font-inter text-xs text-grigio uppercase tracking-wider mb-1.5 block">
          Note (allergie, occasioni speciali…)
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => field('notes', e.target.value)}
          placeholder="Es. allergia ai crostacei, compleanno…"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-rosso text-white font-inter font-semibold px-6 py-4 rounded-full hover:bg-rosso/90 transition-all hover:shadow-lg hover:shadow-rosso/30 flex items-center justify-center gap-3 text-base"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Prenota su WhatsApp
      </button>

      <p className="font-inter text-xs text-grigio/60 text-center">
        Cliccando verrai reindirizzato su WhatsApp con i dati precompilati.
      </p>
    </form>
  )
}
