import { WineItem } from '@/data/wines'

const typeConfig: Record<string, { dot: string; badge: string }> = {
  bianco: {
    dot: 'bg-amber-400',
    badge: 'text-amber-400 bg-amber-400/10 border border-amber-400/25',
  },
  rosato: {
    dot: 'bg-pink-400',
    badge: 'text-pink-400 bg-pink-400/10 border border-pink-400/25',
  },
  rosso: {
    dot: 'bg-rosso',
    badge: 'text-rosso bg-rosso/10 border border-rosso/25',
  },
  'rosso-fresco': {
    dot: 'bg-orange-400',
    badge: 'text-orange-400 bg-orange-400/10 border border-orange-400/25',
  },
}

export default function WineCard({ wine }: { wine: WineItem }) {
  const cfg = typeConfig[wine.type] ?? typeConfig['rosso']

  return (
    <article className="flex flex-col md:flex-row bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-oro/30 hover:shadow-xl hover:shadow-nero/60 group">

      {/* ── VINO ─────────────────────────────────── */}
      <div className="md:w-1/2 p-6 lg:p-9 flex flex-col gap-5">

        {/* Header: badge tipo + prezzo */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <span className={`self-start font-inter text-[10px] font-semibold tracking-[0.22em] uppercase px-3 py-1 rounded-full ${cfg.badge}`}>
              {wine.typeLabel}
            </span>
            <p className="font-inter text-xs text-grigio italic leading-snug">{wine.grapes}</p>
            <p className="font-inter text-[10px] text-grigio/60 tracking-wide uppercase">{wine.producer}</p>
          </div>
          <span className="bg-oro/20 text-oro font-inter text-sm font-bold px-3 py-1.5 rounded-full flex-shrink-0 tabular-nums">
            €{wine.price}
          </span>
        </div>

        {/* Nome */}
        <h3 className="font-playfair text-[2.1rem] lg:text-[2.6rem] font-bold text-bianco leading-[1.1] tracking-tight group-hover:text-oro/90 transition-colors duration-300">
          {wine.name}
        </h3>

        {/* Descrizione */}
        <p className="font-inter text-sm text-grigio leading-relaxed">{wine.description}</p>

        {/* Separatore decorativo */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* ── ABBINAMENTO ──────────────────────────── */}
      <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-border bg-nero/30 p-6 lg:p-9 flex flex-col gap-4">

        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-oro font-semibold">
          Abbinamento consigliato
        </p>

        <div className="flex items-start justify-between gap-2">
          <h4 className="font-playfair text-xl lg:text-2xl font-bold text-bianco leading-snug">
            {wine.pairing.name}
          </h4>
          <span className="bg-oro/20 text-oro font-inter text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 tabular-nums">
            €{wine.pairing.price}
          </span>
        </div>

        <p className="font-inter text-sm text-grigio leading-relaxed flex-1">
          {wine.pairing.description}
        </p>

        <p className="font-inter text-[11px] text-grigio/50 tracking-wide mt-auto">
          Allergeni: {wine.pairing.allergens}
        </p>
      </div>

    </article>
  )
}
