export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'essentials' | 'comfort' | 'grooming' | 'toys';
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 'bed-ortho-1',
    name: 'Orthopedic Memory Foam Bed',
    description: 'Premium therapeutic support for dogs of all ages. Water-resistant liner and machine washable cover.',
    price: 89.99,
    category: 'comfort',
    image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 128,
    isBestSeller: true
  },
  {
    id: 'bowl-ceramic-set',
    name: 'Modern Ceramic Bowl Set',
    description: 'Heavyweight, non-slip ceramic bowls with a minimalist bamboo stand. Perfect for food and water.',
    price: 45.00,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 84
  },
  {
    id: 'grooming-kit-pro',
    name: 'Professional Grooming Kit',
    description: 'Complete 5-piece set including slicker brush, nail clippers, and grooming scissors. Stainless steel durability.',
    price: 34.95,
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 56
  },
  {
    id: 'toy-interactive-puzzle',
    name: 'Interactive Treat Puzzle',
    description: 'Mental stimulation toy to keep your pet engaged and reduce anxiety. Adjustable difficulty levels.',
    price: 24.99,
    category: 'toys',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 210,
    isBestSeller: true
  },
  {
    id: 'leash-leather',
    name: 'Handcrafted Leather Leash',
    description: 'Full-grain leather leash with brass hardware. Ages beautifully and provides superior control.',
    price: 55.00,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 42,
    isNew: true
  },
  {
    id: 'carrier-travel',
    name: 'Airline-Approved Travel Carrier',
    description: 'Expandable soft-sided carrier with maximum ventilation. Includes plush fleece bedding.',
    price: 65.00,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'shampoo-organic',
    name: 'Organic Oatmeal Shampoo',
    description: 'Hypoallergenic formula for sensitive skin. Soothes itching and leaves coat shiny.',
    price: 18.50,
    category: 'grooming',
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/90917451/ZCXfPXOWIBEVxoBl.webp',
    rating: 4.5,
    reviews: 92
  },
  {
    id: 'toy-rope-set',
    name: 'Natural Cotton Rope Toy Set',
    description: 'Durable, non-toxic cotton ropes for tug-of-war and dental health. Set of 3.',
    price: 22.00,
    category: 'toys',
    image: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 115
  }
];
