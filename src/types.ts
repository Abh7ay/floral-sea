export type ProductCategory =
  | 'ALL PRODUCTS'
  | 'BIRTHDAYS'
  | 'ANNIVERSARY'
  | 'CHOCOLATES'
  | 'CAKES'
  | 'BOUQUETS'
  | 'PLANTS'
  | 'BIG BUNCHES'
  | 'FLOWERS';

export type CatalogFilterCategory =
  | 'All'
  | 'Bouquets'
  | 'Boxes'
  | 'Corsages'
  | 'Pots'
  | 'Centerpieces'
  | 'Vessels';

export type FlowerVarietyCategory =
  | 'Flower Pots'
  | 'Flower Bouquets'
  | 'Flower Boards'
  | 'Flower Boxes'
  | 'Flower Corsages'
  | 'Flower Centerpieces';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  catalogCategory: CatalogFilterCategory;
  varietyCategory?: FlowerVarietyCategory;
  archTag?: string; // As seen in image: 'BESTSELLER', 'PURE ELEGANCE', 'WARM DELIGHT', 'ROYAL SIGNATURE'
  priceUsd: number;
  originalPriceUsd?: number;
  priceInr: number;
  originalPriceInr?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  stems?: string[];
  fragranceProfile?: 'Delicate & Subtle' | 'Sweet & Romantic' | 'Fresh Citrus & Green' | 'Lush & Opulent';
  longevityDays?: string;
  badge?: string;
  isFeaturedBest?: boolean;
  archColor?: 'peach' | 'orange' | 'cream';
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: 'Signature Petite' | 'Grand Classic' | 'Haute Couture Deluxe';
  giftMessage?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  bouquetName: string;
}
