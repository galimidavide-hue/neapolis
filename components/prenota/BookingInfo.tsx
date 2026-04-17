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

      <p className="font-inter text-xs text-grigio/60 leading-relaxed border-l-2 border-rosso pl-4">
        Per prenotazioni urgenti o di gruppo (oltre 10 persone), chiamaci direttamente al{' '}
        <a href="tel:+393533199458" className="text-rosso hover:underline">
          +39 353 319 9458
        </a>.
      </p>
    </div>
  )
}
