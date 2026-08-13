const orari = [
  { day: 'Lunedì', hours: '18:00 – 00:00' },
  { day: 'Martedì', hours: 'Chiuso', closed: true },
  { day: 'Mercoledì', hours: '18:00 – 00:00' },
  { day: 'Giovedì', hours: '18:00 – 00:00' },
  { day: 'Venerdì', hours: '18:00 – 00:00' },
  { day: 'Sabato', hours: '18:00 – 00:00' },
  { day: 'Domenica', hours: '18:00 – 00:00' },
]

export default function BookingInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-2xl p-7">
        <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Orari di Apertura</h3>
        <ul className="space-y-2">
          {orari.map((item) => (
            <li
              key={item.day}
              className={`flex justify-between font-inter text-sm ${
                item.closed ? 'text-grigio/40' : 'text-grigio'
              }`}
            >
              <span>{item.day}</span>
              <span className={item.closed ? 'text-rosso/60' : ''}>{item.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-card border border-border rounded-2xl p-7">
        <h3 className="font-playfair text-xl font-bold text-bianco mb-5">Dove Siamo</h3>
        <address className="not-italic font-inter text-sm text-grigio space-y-3">
          <p>Via Fausto Gullo 47<br />Polistena (RC), Calabria</p>
          <a
            href="tel:+393533199458"
            className="block hover:text-rosso transition-colors"
          >
            +39 353 319 9458
          </a>
          <a
            href="https://maps.google.com/?q=Via+Fausto+Gullo+47+Polistena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-rosso hover:underline text-sm"
          >
            Apri in Google Maps →
          </a>
        </address>
      </div>

      <div className="bg-oro/10 border border-oro/30 rounded-2xl p-5 flex gap-4 items-start">
        <svg className="w-5 h-5 text-oro flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <div>
          <p className="font-playfair text-base font-bold text-oro mb-1">Pizza al Metro — anche da asporto</p>
          <p className="font-inter text-sm text-grigio/80 leading-relaxed">
            Per feste, eventi o cene in grande stile, la nostra pizza è disponibile anche <strong className="text-bianco">al metro</strong>. Contattaci per organizzare il tuo ordine.
          </p>
        </div>
      </div>

      <p className="font-inter text-xs text-grigio/60 leading-relaxed border-l-2 border-rosso pl-4">
        Per prenotazioni urgenti o di gruppo (oltre 10 persone), chiamaci direttamente al{' '}
        <a href="tel:+393533199458" className="text-rosso hover:underline">
          +39 353 319 9458
        </a>.
      </p>
    </div>
  )
}
