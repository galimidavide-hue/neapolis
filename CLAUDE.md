# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (verifies TypeScript + lint)
npm run lint     # ESLint
npm run start    # serve production build
```

No test suite — verify changes with `npm run build`.

## Architecture

Next.js 14 App Router, fully static (no backend, no CMS, no database).

**3 routes:**
- `/` — home page (`app/page.tsx`) — assembles 7 section components in order
- `/menu` — static menu with client-side category tabs
- `/prenota` — booking form that opens WhatsApp with a pre-filled message

**Component layout:**
```
components/
  layout/   Navbar (sticky, scroll-aware, mobile drawer), Footer
  ui/       SectionTitle (Framer Motion scroll-reveal), FloatingCTA (WhatsApp button, hidden on /prenota)
  home/     Hero, ChiSiamo, PizzeEvidenza, Filosofia, Recensioni, Gallery, Contatti
  menu/     MenuTabs (client component, sticky category tabs), MenuCard
  prenota/  BookingForm (client, WhatsApp URL builder), BookingInfo
```

**Data:** All menu content lives in `data/menu.ts`. Edit this to update pizzas, prices, categories. Exports `menuItems`, `featuredItems`, `categories`, `MenuItem` interface, `MenuCategory` type.

**Booking flow:** `BookingForm` builds `https://wa.me/393533199458?text=...` from form state and calls `window.open()` — no server round-trip, no backend needed.

## Design System

Custom Tailwind tokens (`tailwind.config.ts`):

| Token | Hex | Use |
|-------|-----|-----|
| `nero` | `#0D0D0D` | page background |
| `card` | `#1A1A1A` | card/surface background |
| `rosso` | `#E63B2E` | primary accent, CTAs |
| `oro` | `#F5A623` | price badges, stars |
| `bianco` | `#F5F0E8` | primary text |
| `grigio` | `#9A9A8A` | secondary text |
| `border` | `#2A2A2A` | dividers, card borders |

Fonts injected as CSS variables via `next/font/google` in `app/layout.tsx`:
- `font-playfair` → `--font-playfair` (Playfair Display — headings)
- `font-inter` → `--font-inter` (Inter — body/UI)

Animation key uses a hyphen: `'pulse-slow'` in config → use `animate-[pulse-slow]` (arbitrary value syntax) in JSX, not `animate-pulse-slow`.

## Images

Placeholder images from Unsplash live in `public/images/`. `next.config.mjs` allows `images.unsplash.com` as a remote pattern. To replace with real photos: swap files at the same paths — no code changes needed.

## SEO

JSON-LD Restaurant schema is injected as a `<script>` tag in `app/layout.tsx`. Each page has its own `metadata` export for title/description/OG tags.
