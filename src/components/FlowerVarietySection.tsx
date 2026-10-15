import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FlowerVarietyCategory, Product } from '../types';

interface FlowerVarietySectionProps {
  onChooseFlowers: (category: FlowerVarietyCategory) => void;
  onQuickAdd: (product: Product) => void;
  currency: 'USD' | 'INR';
}

interface VarietyDisplay {
  category: FlowerVarietyCategory;
  headline: string;
  priceUsd: number;
  priceInr: number;
  description: string;
  image: string;
  badge?: string;
}

const VARIETIES: Record<FlowerVarietyCategory, VarietyDisplay> = {
  'Flower Bouquets': {
    category: 'Flower Bouquets',
    headline: 'Secret Garden Peony & Rose Cascade',
    priceUsd: 59.99,
    priceInr: 4999,
    description: 'A classic choice, perfect for expressing heartfelt emotions and capturing the fleeting essence of each moment.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKaFB1MtrgM8h_T6BFOadji-SerA4hGisVYIypqFiaTQDgQhvwla62HIqW4Kt9YPUe-xOnOahW_ImHaQHY5dAT1uVaZOdEotchdbUzGlkaTSH0TuYIvgw1Yv1HBIzLYRvFvCOkTKnwBpIL8D2qC0GS7ExLzVLXKew0Tpmb6C_Z9FsgPKK-xZf77x01sIQS1TvIQBbpeF6Bo14ad4J_cLfdj42pbUBkQ2OUsGNuXKD7GWxwabiwPlun',
    badge: 'Best Seller',
  },
  'Flower Pots': {
    category: 'Flower Pots',
    headline: 'Frosted Ceramic Vessel Harmony',
    priceUsd: 45.00,
    priceInr: 3750,
    description: 'Subtle earthy botanicals and potted branches suited for modern organic interior decor and longevity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk4kLAPMlHCf59cf_R5IZBmwddprCOYXvLrSWRzTEv-6k9EjjFT9xuVqEKriIRSKVcIU-8MNyDuolmhc6x2a0XfTiWYx3XyKcdI8OI7fW6ZikaHHP-f8lKF-oULMDOGc6AklkE8JvmpbNBmPp-NVOYhdTtTWUIjtvp4KycNSyD1SNx2EPGcHK5IjUcjo1VPxEfcHSz_2fDFOhFNFfb_LsHdqZgc-SjCTG-o3APClmFgk7F8MDXvhNb',
    badge: 'Atelier Favorite',
  },
  'Flower Boards': {
    category: 'Flower Boards',
    headline: 'Archival Pressed Meadow Stems',
    priceUsd: 65.00,
    priceInr: 5400,
    description: 'Hand-pressed meadow blossoms and fern leaves preserved under double floating museum glass.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
    badge: 'Keepsake',
  },
  'Flower Boxes': {
    category: 'Flower Boxes',
    headline: 'Signature Velvet Keepsake Box',
    priceUsd: 64.99,
    priceInr: 5299,
    description: 'Tight pavé arrangement of premium roses seated in our bespoke gold-embossed cylindrical box.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgm2w8g4OAfJpf9aRgjCOD-zE-SycGzJhutAP9kUw-Ho1P9P1EXczGNWAC9PD8fh1aVq8Yb4-s7IlmHN5IIkOSAd_G1bZxxRj55gwPqsz3ciQy_Nv0jjI9joumFVtFvnSWYGBNtuyu0ZYDIE6ORlaEGyyIPjEmT_65CHTAPe-ERTJ1aKJQbX6EyCz-1E30ZHVyMcx1bc7qgn6kfowkSGjf6q6fcKg0tGkVSObKjElJWph8GIs-u2lv',
    badge: 'Signature',
  },
  'Flower Corsages': {
    category: 'Flower Corsages',
    headline: 'Artisanal Miniature Rose Wrist Corsage',
    priceUsd: 29.99,
    priceInr: 2499,
    description: 'Petite spray roses and baby’s breath woven onto raw silk ribbon for weddings and milestones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTx6QI_dgTzSogA14erlMCuxdXHXLuOZyOK01_EJHPtQJvgbe6Yssbg1zNosIaHq4ZymlqYivyyq6l5bUk7tIrQizOBFAaPAO6acPNJSFtk-XlUHqXx2yi4xXWME-FL6a5JSex6_cF-Ux3FynFWaIatLEs8HP4RXh9VdwgSS8XH5UU8vrWmn6BwxO-C3Vdzl5GbsHnlW_NtMNBki6ozzVti0G_XHje60vnKpgA_wHyF80OpEINxF-D',
    badge: 'Handcrafted',
  },
  'Flower Centerpieces': {
    category: 'Flower Centerpieces',
    headline: 'Grand Tabletop Botanical Landscape',
    priceUsd: 99.99,
    priceInr: 8499,
    description: 'Voluminous low-profile runner arrangement of garden roses, scented eucalyptus, and candlelight accents.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
    badge: 'Event Haute',
  },
};

const CATEGORIES: FlowerVarietyCategory[] = [
  'Flower Pots',
  'Flower Bouquets',
  'Flower Boards',
  'Flower Boxes',
  'Flower Corsages',
  'Flower Centerpieces',
];

export const FlowerVarietySection: React.FC<FlowerVarietySectionProps> = ({
  onChooseFlowers,
  onQuickAdd,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FlowerVarietyCategory>('Flower Bouquets');
  const activeVariety = VARIETIES[selectedCategory];

  const formattedPrice =
    currency === 'USD'
      ? `$${activeVariety.priceUsd.toFixed(2)}`
      : `₹${activeVariety.priceInr.toLocaleString()}`;

  const handleQuickAdd = () => {
    // Fabricate corresponding product object
    const quickProduct: Product = {
      id: `variety-${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`,
      name: activeVariety.headline,
      category: 'FLOWERS',
      catalogCategory: 'Bouquets',
      varietyCategory: selectedCategory,
      archTag: activeVariety.badge || 'ATELIER SELECTION',
      priceUsd: activeVariety.priceUsd,
      priceInr: activeVariety.priceInr,
      rating: 4.9,
      reviewsCount: 180,
      image: activeVariety.image,
      description: activeVariety.description,
      inStock: true,
    };
    onQuickAdd(quickProduct);
  };

  return (
    <section className="w-full py-12 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto">
      
      {/* Mobile Top Pills (Image 1 style) */}
      <div className="lg:hidden mb-6">
        <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#33251e] font-bold mb-4">
          Explore <br /> Our Flower Variety
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#33251e] text-white shadow-sm'
                  : 'bg-[#ffdbc7]/70 text-[#33251e] hover:bg-[#ffdbc7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid (Image 3 Desktop layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column (Desktop Categories List) */}
        <div className="hidden lg:block lg:col-span-5 pr-6">
          <h2 className="font-headline-lg text-4xl xl:text-[46px] leading-[1.12] text-[#33251e] font-bold mb-10">
            Explore <br /> Our Flower Variety
          </h2>

          <ul className="space-y-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-headline-sm text-left transition-all relative group cursor-pointer focus:outline-none ${
                      isActive
                        ? 'text-[26px] text-[#33251e] font-bold'
                        : 'text-[24px] text-[#33251e]/35 hover:text-[#33251e]'
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && (
                      <span className="absolute left-0 -bottom-1.5 w-full h-[3px] bg-[#feab75] rounded-full transition-all"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Arch Panel with Overflow Image */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="w-[300px] sm:w-[420px] md:w-[480px] lg:w-[520px] h-[340px] sm:h-[420px] lg:h-[480px] rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] rounded-b-3xl bg-[#ffdbc7]/70 relative flex items-end justify-center border border-[#33251e]/10 overflow-hidden lg:overflow-visible transition-all">
            
            {/* Overflowing Bouquet in Hand Image with smooth AnimatePresence transition */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedCategory}
                src={activeVariety.image}
                alt={activeVariety.headline}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[360px] sm:h-[460px] lg:h-[540px] w-auto max-w-none object-cover transform lg:translate-x-10 lg:-translate-y-4 filter drop-shadow-xl"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Strip Across Section */}
      <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#33251e]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left/Center Price & Editorial Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          <div className="flex items-baseline gap-2">
            <span className="font-label-caps text-[11px] text-[#4f4541] tracking-widest uppercase font-semibold">
              FROM
            </span>
            <span className="font-headline-lg text-2xl sm:text-[32px] font-bold text-[#33251e]">
              {formattedPrice}
            </span>
          </div>

          <div className="sm:pl-8 sm:border-l border-[#33251e]/15">
            <p className="font-body-md text-xs sm:text-[14px] text-[#4f4541] max-w-md leading-relaxed">
              {activeVariety.description}
            </p>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onChooseFlowers(selectedCategory)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center border border-[#33251e] rounded-full px-6 sm:px-8 py-3 font-label-caps text-xs font-semibold tracking-wide uppercase text-[#33251e] hover:bg-[#33251e] hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            Choose Flowers
          </button>
          
          <button
            onClick={handleQuickAdd}
            aria-label="Quick Add to Bag"
            title="Add this curated stem to bag"
            className="w-12 h-12 rounded-full bg-[#33251e] flex items-center justify-center text-white hover:bg-[#8d4e20] transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

      </div>

    </section>
  );
};
