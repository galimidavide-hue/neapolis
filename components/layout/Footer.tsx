import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="block w-48 mb-4">
              <Logo color="white" />
            </Link>
            <p className="font-inter text-sm text-grigio leading-relaxed">
              L&apos;autentica pizza napoletana nel cuore della Calabria. #1 a Polistena.
            </p>
          </div>

          <div>
            <p className="font-inter text-sm font-semibold text-bianco uppercase tracking-wider mb-4">
              Link Rapidi
            </p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Il Menu' },
                { href: '/prenota', label: 'Prenota un Tavolo' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-grigio hover:text-rosso transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-inter text-sm font-semibold text-bianco uppercase tracking-wider mb-4">
              Contatti & Orari
            </p>
            <ul className="space-y-2 font-inter text-sm text-grigio">
              <li>Via Fausto Gullo 47, Polistena (RC)</li>
              <li>
                <a href="tel:+393533199458" className="hover:text-rosso transition-colors">
                  +39 353 319 9458
                </a>
              </li>
              <li>Lun–Dom: 18:00–00:00</li>
              <li className="text-rosso/70">Chiuso il Martedì</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-grigio">
            © {new Date().getFullYear()} Neapolis Pizzeria Verace Napoletana. Tutti i diritti riservati.
          </p>
          <a
            href="https://www.instagram.com/neapolis_pizzeria_/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs text-grigio hover:text-rosso transition-colors"
          >
            Instagram →
          </a>
        </div>
      </div>
    </footer>
  )
}
