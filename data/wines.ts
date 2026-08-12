export type WineType = 'bianco' | 'rosato' | 'rosso' | 'rosso-fresco'

export interface WinePairing {
  name: string
  price: number
  description: string
  allergens: string
}

export interface WineItem {
  id: string
  name: string
  type: WineType
  typeLabel: string
  grapes: string
  producer: string
  price: number
  description: string
  pairing: WinePairing
}

export const wineItems: WineItem[] = [
  {
    id: 'madre-goccia',
    name: 'Madre Goccia',
    type: 'bianco',
    typeLabel: 'Bianco Strutturato',
    grapes: 'Greco Bianco',
    producer: 'Tenuta Iuzzolini',
    price: 20,
    description:
      "Un bianco minerale e complesso, con sfumature agrumate che si fondono perfettamente con l'olio al bergamotto. Fresco, elegante e sapido, racconta il legame tra terra e mare — proprio come la costa ionica da cui nasce.",
    pairing: {
      name: 'Mediterranea Gialla',
      price: 15,
      description:
        'Pomodoro San Marzano DOP e pomodorini gialli, cipolla di Tropea croccante, bufala campana DOP, bresaola di tonno affumicato, olio al bergamotto e rucola fresca.',
      allergens: '1 · 4 · 7 · 12',
    },
  },
  {
    id: 'lumare',
    name: 'Lumare',
    type: 'rosato',
    typeLabel: 'Rosato',
    grapes: 'Gaglioppo & Cabernet Sauvignon',
    producer: 'Tenuta Iuzzolini',
    price: 20,
    description:
      'Un rosato elegante e vivace che esalta la grassezza della burrata e del guanciale, bilanciandole con freschezza e profumi di frutti rossi. Solare, minerale, contemporaneo — racconta la solarità calabrese in un sorso fresco.',
    pairing: {
      name: 'Carbonara Contemporanea',
      price: 14,
      description:
        'Mozzarella di Agerola, guanciale di maialino nero di Calabria croccante, crema al pecorino avvolgente, burrata di Andria affumicata, pepe nero e basilico fresco.',
      allergens: '1 · 3 · 4 · 7 · 12',
    },
  },
  {
    id: 'muranera',
    name: 'Muranera',
    type: 'rosso',
    typeLabel: 'Rosso',
    grapes: 'Gaglioppo · Magliocco · Cabernet Sauvignon · Merlot',
    producer: 'Tenuta Iuzzolini',
    price: 35,
    description:
      "Un rosso dal carattere deciso e vellutato. Note speziate e fruttate valorizzano la dolcezza della cipolla e la sapidità della porchetta. L'anima passionale di Tenuta Iuzzolini, nato da uve autoctone e internazionali, racconta la forza della terra calabrese.",
    pairing: {
      name: 'Ariccia 50 Top Pizza',
      price: 15,
      description:
        'Fiordilatte di Agerola, porchetta di maialino nero di Calabria, cipolla di Tropea caramellata, pomodorini gialli confit, olio al peperoncino e basilico.',
      allergens: '1 · 4 · 7 · 12',
    },
  },
  {
    id: 'belfresco',
    name: 'Belfresco',
    type: 'rosso-fresco',
    typeLabel: 'Rosso Fresco',
    grapes: 'Gaglioppo & Magliocco',
    producer: 'Tenuta Iuzzolini',
    price: 20,
    description:
      "Un rosso giovane, fragrante e di medio corpo, con note di frutti rossi e spezie leggere. La sua acidità vivace bilancia la frittura e la cremosità della fonduta. Fresco, versatile e autentico, esalta la cucina calabrese contemporanea.",
    pairing: {
      name: 'Nerano Dorata',
      price: 14,
      description:
        'Base fritta in doppia cottura, crema di zucchine speziata, fiordilatte di Agerola, lardo pancettato al forno, chips di zucchine croccanti, fonduta di parmigiano allo zafferano.',
      allergens: '1 · 4 · 7 · 12',
    },
  },
  {
    id: 'nerone-di-calabria',
    name: 'Nerone di Calabria',
    type: 'rosso',
    typeLabel: 'Rosso Riserva',
    grapes: 'Uve autoctone calabresi',
    producer: 'Casa Vinicola Criserà',
    price: 40,
    description:
      "Un rosso importante e speziato, con note di frutta nera matura e tostature eleganti. Potente e avvolgente, rappresenta l'eccellenza enologica del territorio. Perfetto per accompagnare i toni terrosi del tartufo e la succulenza del maialino nero.",
    pairing: {
      name: 'Nera di Calabria',
      price: 16,
      description:
        'Crema di porcini, fiordilatte di Agerola, vellutata di parmigiano allo zafferano, essenza di tartufo e filetto di maialino nero di Calabria.',
      allergens: '1 · 4 · 7 · 12',
    },
  },
]
