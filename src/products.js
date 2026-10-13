/**
 * AUREL ATELIER - Flagship Garment Catalogue & Metadata
 * Tailored specifically for the Pakistani luxury market.
 */

export const PRODUCTS = [
  {
    id: 'aa-w01',
    title: 'The Ivory Asymmetric Raw Silk Co-Ord',
    slug: 'ivory-raw-silk-co-ord',
    category: 'women-pret',
    categoryName: "Women's Ready-to-Wear",
    collection: 'Architectural Edit 01',
    price: 8950,
    priceFormatted: 'PKR 8,950',
    tag: 'Pure Raw Silk',
    image: '/assets/women_pret_ivory.jpg',
    pieceCount: '2-Piece Co-Ord',
    fabric: '100% Hand-Dyed Raw Silk (80g)',
    specs: {
      shirt: 'Tailored boxy tunic with high band collar (Length: 38")',
      trouser: 'Matching pressed cigarette trouser with elasticated waist (Length: 37")',
      inclusions: 'Intricate tone-on-tone marori embroidery on sleeves, hidden mother-of-pearl placket buttons',
      care: 'Dry clean recommended or gentle hand-wash in cold water.'
    },
    sizes: [
      { name: 'XS', chest: '34"', waist: '26"', hips: '36"', length: '38"' },
      { name: 'S', chest: '36"', waist: '28"', hips: '38"', length: '38"' },
      { name: 'M', chest: '38"', waist: '30"', hips: '40"', length: '39"' },
      { name: 'L', chest: '41"', waist: '33"', hips: '43"', length: '40"' },
      { name: 'XL', chest: '44"', waist: '36"', hips: '46"', length: '40"' }
    ],
    stock: 4,
    description: 'A masterclass in modern South Asian minimalism. Cut from textured raw silk, this ensemble features structured dropped shoulders, an architectural asymmetric hem, and delicate gold threadwork along the cuffs.'
  },
  {
    id: 'aa-m01',
    title: 'The Onyx Bandhgala Kurta Set',
    slug: 'onyx-bandhgala-kurta-set',
    category: 'men-eastern',
    categoryName: "Men's Eastern Wear",
    collection: 'Bespoke Eastern',
    price: 7850,
    priceFormatted: 'PKR 7,850',
    tag: 'Egyptian Long-Staple',
    image: '/assets/men_eastern_onyx.jpg',
    pieceCount: '2-Piece Set',
    fabric: 'Super-Fine Giza Egyptian Cotton (Liquid Finished)',
    specs: {
      shirt: 'Clean band collar kurta with concealed placket and French tailored cuffs (Length: 42")',
      trouser: 'Crisp tapered cotton pajama with drawstring waist',
      inclusions: 'Hand-carved matte horn buttons, reinforced side pockets',
      care: 'Steam iron only. Mild detergent.'
    },
    sizes: [
      { name: 'S', chest: '38"', collar: '14.5"', length: '41"' },
      { name: 'M', chest: '40"', collar: '15.5"', length: '42"' },
      { name: 'L', chest: '43"', collar: '16.5"', length: '43"' },
      { name: 'XL', chest: '46"', collar: '17.5"', length: '44"' }
    ],
    stock: 7,
    description: 'Designed for the dignified modern gentleman. Woven from high-thread-count Egyptian cotton with a soft matte luster. Features a minimalist mandarin collar and concealed placket.'
  },
  {
    id: 'aa-w02',
    title: 'The "Nur" Chikankari 3-Piece Luxury',
    slug: 'nur-chikankari-3pc-luxury',
    category: 'women-unstitched',
    categoryName: "Women's Unstitched",
    collection: 'Heirloom Unstitched',
    price: 14500,
    priceFormatted: 'PKR 14,500',
    tag: 'Unstitched 3-Piece',
    image: '/assets/women_unstitched_luxe.jpg',
    pieceCount: '3-Piece Unstitched',
    fabric: 'Fine Lawn Cotton & Sheer Printed Silk Organza',
    specs: {
      shirt: '3.25 Meters Fine Combed Lawn with Heavy Front Chikankari Embroidery',
      dupatta: '2.50 Meters Pure Handwoven Organza with Foliage Digital Print & Zari Border',
      trouser: '2.50 Meters Premium Cambric Dyed Cotton',
      inclusions: 'Embroidered neckline patch, scalloped lace hem border, sleeve lace inserts',
      care: 'Professional dry clean strictly advised.'
    },
    sizes: [
      { name: 'Unstitched', chest: 'Custom Tailoring Available', length: 'Full Fabric Included' }
    ],
    stock: 3,
    description: 'An ode to classical Lahore court ateliers. Muted pistachio sage green lawn enriched with dense ivory and sage needlework, paired with an ethereal organza dupatta that catches every gentle breeze.'
  },
  {
    id: 'aa-m02',
    title: 'The Mineral Slate Raw Silk Waistcoat',
    slug: 'mineral-slate-raw-silk-waistcoat',
    category: 'men-eastern',
    categoryName: "Men's Eastern Wear",
    collection: 'Formal Suiting',
    price: 9200,
    priceFormatted: 'PKR 9,200',
    tag: 'Hand-Tailored Waistcoat',
    image: '/assets/men_waistcoat_heritage.jpg',
    pieceCount: '1-Piece Layer',
    fabric: 'Pure Textured Raw Silk with Viscose Jacquard Lining',
    specs: {
      shirt: 'Tailored 5-button waistcoat with structured floating canvas chest (Length: 28")',
      trouser: 'N/A (Shown paired with Ivory Kurta)',
      inclusions: 'Antiqued brass dome buttons, welt chest pocket, interior passport pocket',
      care: 'Dry clean only.'
    },
    sizes: [
      { name: '38', chest: '38"', waist: '34"', length: '27.5"' },
      { name: '40', chest: '40"', waist: '36"', length: '28"' },
      { name: '42', chest: '42"', waist: '38"', length: '28.5"' },
      { name: '44', chest: '44"', waist: '40"', length: '29"' }
    ],
    stock: 5,
    description: 'Impeccable bespoke craftsmanship. Built with a traditional horsehair floating canvas for a sharp, crease-resistant drape over any kurta or formal eastern ensemble.'
  },
  {
    id: 'aa-w03',
    title: 'The Royal Emerald Formal Peshwas',
    slug: 'royal-emerald-formal-peshwas',
    category: 'festive',
    categoryName: 'Festive & Formal',
    collection: 'Atelier Couture',
    price: 34500,
    priceFormatted: 'PKR 34,500',
    tag: 'Artisanal Festive',
    image: '/assets/women_festive_emerald.jpg',
    pieceCount: '3-Piece Ensemble',
    fabric: 'Pure Silk Karandi & Gold Foil Printed Organza',
    specs: {
      shirt: 'Floor-length flared peshwas with 16 kalis, dense marori and zardozi threadwork (Length: 54")',
      dupatta: '2.75 Meters Gold Tilla embroidered net with finished kiran piping',
      trouser: '2.50 Meters Pure raw silk churidar pajama',
      inclusions: 'Hand-sewn micro pearls, gold sequins, custom tasseled dori back tie',
      care: 'Store in pure muslin cloth. Dry clean only.'
    },
    sizes: [
      { name: 'XS', chest: '34"', waist: '26"', length: '54"' },
      { name: 'S', chest: '36"', waist: '28"', length: '54"' },
      { name: 'M', chest: '38"', waist: '30"', length: '55"' },
      { name: 'L', chest: '41"', waist: '33"', length: '55"' }
    ],
    stock: 2,
    description: 'A breathtaking heirloom piece. Cut from heavyweight royal emerald silk karandi, reflecting rich heritage tones and meticulous hand-embellished zari work for festive occasions and weddings.'
  }
];
