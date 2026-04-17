// data/menu.ts

export type MenuCategory = 'classiche' | 'speciali' | 'antipasti' | 'dolci'

export interface MenuItem {
  id: string
  name: string
  description: string
  ingredients: string[]
  price: number
  category: MenuCategory
  image: string
  glutenFree?: boolean
  featured?: boolean
}

export const menuItems: MenuItem[] = [
  // PIZZE CLASSICHE
  {
    id: 'margherita',
    name: 'Margherita Verace',
    description: 'La classica napoletana nella sua forma più pura.',
    ingredients: ['Pomodoro San Marzano', 'Fior di Latte', 'Basilico', 'Olio EVO'],
    price: 7,
    category: 'classiche',
    image: '/images/menu/margherita.jpg',
    featured: true,
  },
  {
    id: 'marinara',
    name: 'Marinara',
    description: 'Senza formaggio, ricca di sapore autentico.',
    ingredients: ['Pomodoro San Marzano', 'Aglio', 'Origano', 'Olio EVO'],
    price: 6,
    category: 'classiche',
    image: '/images/menu/marinara.jpg',
  },
  {
    id: 'diavola',
    name: 'Diavola',
    description: 'Per chi ama il piccante senza compromessi.',
    ingredients: ['Pomodoro', 'Fior di Latte', 'Salame Piccante', 'Basilico'],
    price: 9,
    category: 'classiche',
    image: '/images/menu/diavola.jpg',
    featured: true,
  },
  {
    id: 'quattro-formaggi',
    name: 'Quattro Formaggi',
    description: 'Cremosa e avvolgente, un viaggio tra i formaggi italiani.',
    ingredients: ['Fior di Latte', 'Gorgonzola', 'Parmigiano', 'Provola'],
    price: 10,
    category: 'classiche',
    image: '/images/menu/quattro-formaggi.jpg',
  },
  // PIZZE SPECIALI
  {
    id: 'provola-pepe',
    name: 'Provola e Pepe',
    description: 'La nostra firma: equilibrio perfetto tra affumicato e speziato.',
    ingredients: ['Provola Affumicata', 'Pepe Nero', 'Olio EVO', 'Basilico'],
    price: 10,
    category: 'speciali',
    image: '/images/menu/provola-pepe.jpg',
    featured: true,
  },
  {
    id: 'nduja',
    name: 'Nduja e Stracciatella',
    description: "L'incontro tra la calabresità e la dolcezza della stracciatella.",
    ingredients: ['Nduja di Spilinga', 'Stracciatella', 'Pomodorini', 'Basilico'],
    price: 12,
    category: 'speciali',
    image: '/images/menu/nduja.jpg',
  },
  {
    id: 'burrata',
    name: 'Burrata e Prosciutto',
    description: 'Fresca e cremosa, con prosciutto crudo di qualità.',
    ingredients: ['Burrata', 'Prosciutto Crudo', 'Rucola', 'Pomodorini', 'Parmigiano'],
    price: 13,
    category: 'speciali',
    image: '/images/menu/burrata.jpg',
  },
  {
    id: 'senza-glutine',
    name: 'Margherita Senza Glutine',
    description: 'La stessa qualità verace, per tutti.',
    ingredients: ['Pomodoro San Marzano', 'Fior di Latte', 'Basilico', 'Olio EVO'],
    price: 10,
    category: 'speciali',
    image: '/images/menu/senza-glutine.jpg',
    glutenFree: true,
    featured: true,
  },
  // ANTIPASTI
  {
    id: 'frittatine',
    name: 'Frittatine di Pasta',
    description: 'Street food napoletano autentico.',
    ingredients: ['Pasta', 'Besciamella', 'Prosciutto', 'Piselli'],
    price: 5,
    category: 'antipasti',
    image: '/images/menu/frittatine.jpg',
  },
  {
    id: 'bruschette',
    name: 'Bruschette al Pomodoro',
    description: 'Pane croccante con pomodoro fresco e basilico.',
    ingredients: ['Pane', 'Pomodoro', 'Aglio', 'Basilico', 'Olio EVO'],
    price: 4,
    category: 'antipasti',
    image: '/images/menu/bruschette.jpg',
  },
  {
    id: 'antipasto-misto',
    name: 'Antipasto Misto',
    description: 'Selezione di salumi, formaggi e verdure grigliate.',
    ingredients: ['Salumi', 'Formaggi', 'Verdure grigliate', 'Olive'],
    price: 12,
    category: 'antipasti',
    image: '/images/menu/antipasto.jpg',
  },
  // DOLCI
  {
    id: 'baba',
    name: 'Babà Napoletano',
    description: 'Il classico dolce napoletano, inzuppato al rum.',
    ingredients: ['Pasta babà', 'Rum', 'Sciroppo', 'Crema chantilly'],
    price: 5,
    category: 'dolci',
    image: '/images/menu/baba.jpg',
  },
  {
    id: 'tiramisu',
    name: 'Tiramisù',
    description: 'Fatto in casa, cremoso e leggero.',
    ingredients: ['Mascarpone', 'Savoiardi', 'Caffè', 'Cacao'],
    price: 5,
    category: 'dolci',
    image: '/images/menu/tiramisu.jpg',
  },
]

export const categories: { id: MenuCategory; label: string }[] = [
  { id: 'classiche', label: 'Pizze Classiche' },
  { id: 'speciali', label: 'Pizze Speciali' },
  { id: 'antipasti', label: 'Antipasti' },
  { id: 'dolci', label: 'Dolci' },
]

export const featuredItems = menuItems.filter((item) => item.featured)
