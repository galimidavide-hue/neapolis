# Neapolis Pizzeria Verace Napoletana — Website Design Spec

**Data:** 2026-04-17  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + TypeScript  
**Obiettivo:** Sito vetrina mobile-first per pizzeria napoletana con home effetti visivi, menu statico, prenotazione via WhatsApp.

---

## 1. Dati Pizzeria

| Campo | Valore |
|-------|--------|
| Nome | Neapolis Pizzeria Verace Napoletana |
| Indirizzo | Via Fausto Gullo 47, Polistena (RC) |
| Telefono | +39 353 319 9458 (WhatsApp) |
| Email | neapolis.srls@libero.it |
| Orari | Lun-Dom 18:00–00:00, chiuso Martedì |
| Rating | 4.9/5 Google (257 recensioni), #1 a Polistena |
| Prezzo medio | €10–20 a persona |
| Servizi | Asporto, Parcheggio, WiFi, Prenotazione, Accessibile disabili |

---

## 2. Design System

### Palette Colori
```
Background principale:  #0D0D0D  (nero carbone)
Superficie card:        #1A1A1A
Accento primario:       #E63B2E  (rosso napoletano)
Accento secondario:     #F5A623  (oro/arancio)
Testo principale:       #F5F0E8  (bianco caldo)
Testo secondario:       #9A9A8A  (grigio caldo)
Border/divider:         #2A2A2A
```

### Tipografia
- **Titoli H1/H2:** Playfair Display — Bold/ExtraBold, serif
- **Sottotitoli H3/H4:** Playfair Display — Regular/Italic
- **Corpo e UI:** Inter — Regular/Medium/SemiBold
- **Badge/Tag:** Inter — Bold uppercase, letterspacing wide

### Animazioni
- Scroll reveal: Framer Motion `fadeInUp` con stagger
- Hero parallax: movimento sfondo al scroll
- Card hover: `scale(1.03)` + box-shadow rosso `0 8px 32px rgba(230,59,46,0.3)`
- Floating CTA: pulse animation sottile
- Navbar: blur backdrop su scroll

---

## 3. Architettura Progetto

```
neapolis/
├── app/
│   ├── layout.tsx          # Root layout, font, metadata
│   ├── page.tsx            # Home page
│   ├── menu/
│   │   └── page.tsx        # Pagina menu
│   └── prenota/
│       └── page.tsx        # Pagina prenotazione
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Nav con hamburger mobile
│   │   └── Footer.tsx      # Footer con link e social
│   ├── home/
│   │   ├── Hero.tsx        # Sezione hero fullscreen
│   │   ├── ChiSiamo.tsx    # Storia e filosofia
│   │   ├── PizzeEvidenza.tsx  # Card pizze featured
│   │   ├── Filosofia.tsx   # Sezione parallax ingredienti
│   │   ├── Recensioni.tsx  # Carosello recensioni
│   │   ├── Gallery.tsx     # Griglia masonry foto
│   │   └── Contatti.tsx    # Mappa + orari + info
│   ├── menu/
│   │   ├── MenuTabs.tsx    # Tabs categorie
│   │   └── MenuCard.tsx    # Card singolo piatto
│   ├── prenota/
│   │   ├── BookingForm.tsx # Form prenotazione
│   │   └── WhatsAppCTA.tsx # Generatore link WA
│   └── ui/
│       ├── FloatingCTA.tsx # Bottone fisso WhatsApp
│       └── SectionTitle.tsx # Titolo sezione riusabile
├── data/
│   └── menu.ts             # Menu statico tipizzato
├── public/
│   └── images/             # Foto pizze, hero, gallery
└── tailwind.config.ts
```

---

## 4. Pagine

### 4.1 Home (`/`)

**Sezione 1 — Hero**
- Fullscreen (100vh), immagine pizza ad alta risoluzione o video loop
- Overlay gradiente scuro dal basso
- Titolo animato: "L'Autentica Pizza Napoletana" — Playfair Display, grande
- Sottotitolo: "Polistena, Calabria — Dal cuore di Napoli"
- Due CTA: "Prenota Ora" (rosso, primary) + "Scopri il Menu" (outline bianco)
- Scroll indicator animato in basso

**Sezione 2 — Chi Siamo**
- Layout 2 colonne (mobile: stack)
- Sinistra: foto pizzaiolo/forno
- Destra: titolo + testo storia + badge "Verace Pizza Napoletana"
- Accento decorativo: linea rossa + numero recensioni Google

**Sezione 3 — Pizze in Evidenza**
- Titolo sezione + 4 card in griglia (2x2 mobile, 4x1 desktop)
- Ogni card: foto tonda/ovale pizza, nome bold, 3 ingredienti chiave, badge prezzo
- Featured: Provola e Pepe, Margherita Verace, Diavola, Pizza Senza Glutine
- Bottone "Vedi tutto il menu" sotto

**Sezione 4 — Filosofia/Ingredienti**
- Sfondo: immagine parallax forno napoletano
- 3 colonne con icona + titolo + testo: Impasto 48h, Forno a Legna, Ingredienti DOP
- Separatore decorativo rosso

**Sezione 5 — Recensioni**
- Titolo + score 4.9/5 + "257 recensioni Google"
- Carosello 3 card recensioni reali con nome, stelle, testo
- Auto-play lento, drag-to-scroll mobile

**Sezione 6 — Gallery**
- Griglia masonry 6-8 foto pizze
- Hover: overlay scuro + icona zoom
- Mobile: scroll orizzontale

**Sezione 7 — Contatti**
- 3 colonne: Info (indirizzo, tel, email) | Orari | Come Raggiungerci (link Google Maps)
- Sfondo #1A1A1A, bordo superiore rosso

**Floating CTA (globale)**
- Bottone fisso bottom-right: icona WhatsApp + "Prenota"
- Rosso, pulse sottile, scompare su pagina /prenota

---

### 4.2 Menu (`/menu`)

**Header pagina**
- Titolo "Il Nostro Menu" + sottotitolo
- Sfondo nero con immagine decorativa

**Tabs categorie**
- Sticky tabs: Pizze Classiche | Pizze Speciali | Antipasti | Dolci
- Active tab: underline rosso

**Grid piatti**
- Card: foto (aspect 4:3), nome, ingredienti, prezzo (badge dorato)
- Badge "Senza Glutine" in verde dove applicabile
- Layout: 1 col mobile, 2 col tablet, 3 col desktop

**Struttura `data/menu.ts`**
```typescript
export interface MenuItem {
  id: string
  name: string
  description: string
  ingredients: string[]
  price: number
  category: 'classiche' | 'speciali' | 'antipasti' | 'dolci'
  image: string
  glutenFree?: boolean
  featured?: boolean
}

export const menuItems: MenuItem[] = [
  // Pizze Classiche
  { id: 'margherita', name: 'Margherita Verace', ... },
  { id: 'provola-pepe', name: 'Provola e Pepe', featured: true, ... },
  // Pizze Speciali
  // Antipasti
  // Dolci: Babà Napoletano, ...
]
```

---

### 4.3 Prenota (`/prenota`)

**Layout 2 colonne (mobile: stack)**

**Colonna sinistra — Form**
- Campi: Nome e Cognome, Data (date picker), Ora (select: 18:00–23:00 per slot 30min), N° persone (1–20), Note speciali (textarea)
- Validazione client-side
- CTA: "Prenota su WhatsApp" — genera URL:
  ```
  https://wa.me/393533199458?text=Salve! Vorrei prenotare un tavolo.
  %0ANome: {nome}
  %0AData: {data}
  %0AOra: {ora}
  %0APersone: {persone}
  %0ANote: {note}
  ```
- Click apre WhatsApp (web o app) con messaggio precompilato

**Colonna destra — Info**
- Orari di apertura
- Indirizzo + link Google Maps
- Telefono diretto
- Nota: "Per prenotazioni urgenti chiamaci direttamente"

---

## 5. Componenti UI Chiave

### Navbar
- Logo "Neapolis" (Playfair Display) + tagline piccola
- Link: Home, Menu, Prenota
- Mobile: hamburger → drawer dal lato con overlay scuro
- Sticky: sfondo trasparente → blur nero su scroll

### Footer
- Logo + tagline
- Link rapidi + social (Instagram)
- Orari compatti
- P.IVA / © copyright

---

## 6. SEO & Performance

- `metadata` Next.js per ogni pagina (title, description, OG image)
- `next/image` per tutte le immagini (WebP, lazy load, sizes)
- Font Google via `next/font` (no layout shift)
- Schema.org JSON-LD: `Restaurant` type con indirizzo, orari, menu
- Sitemap automatica
- Mobile-first: breakpoints sm/md/lg Tailwind

---

## 7. Dipendenze

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "framer-motion": "^11",
  "clsx": "^2",
  "tailwind-merge": "^2"
}
```

Nessun CMS, nessun backend, nessun database. Deploy statico su Vercel.

---

## 8. Contenuti Testuali Chiave

**Hero tagline:** "L'Autentica Pizza Napoletana nel Cuore della Calabria"  
**Chi siamo (bozza):** "Neapolis nasce dalla passione per la vera pizza napoletana. Impasto a lunga lievitazione, forno a legna, ingredienti DOP selezionati. #1 a Polistena con 4.9/5 su Google."  
**Filosofia — 3 pilastri:**
1. **Impasto 48h** — Lievitazione lenta per una pizza leggera e digeribile
2. **Forno a Legna** — Cottura a 485°C per 90 secondi, come da tradizione
3. **Ingredienti DOP** — Pomodoro San Marzano, Fior di Latte, basilico fresco
