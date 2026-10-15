import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface FinestSelectionSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSeeAll: () => void;
  currency: 'USD' | 'INR';
}

export const FinestSelectionSection: React.FC<FinestSelectionSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onSeeAll,
  currency,
}) => {
  // Grab the 4 curated products from Image 1 & Image 3
  const curatedIds = [
    'cute-corsage-flower',
    'enchanted-garden-bouquet',
    'luxury-flower-box',
    'aesthetic-home-flowers',
  ];

  const curated = curatedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const formatPrice = (p: Product) => {
    return currency === 'USD' ? `$${p.priceUsd.toFixed(2)}` : `₹${p.priceInr.toLocaleString()}`;
  };

  return (
    <section className="w-full py-12 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto">
      {/* Header Flex Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-16">
        <div>
          <span className="font-label-caps text-xs uppercase text-[#8d4e20] tracking-widest block mb-2 font-semibold">
            Curated Offerings
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-[48px] leading-[1.12] text-[#33251e] font-bold">
            Discover <br className="hidden sm:inline" /> Our Finest Selection
          </h2>
        </div>
        <div>
          <button
            onClick={onSeeAll}
            className="inline-flex items-center justify-center border border-[#33251e] rounded-full px-6 sm:px-7 py-2 sm:py-2.5 font-label-caps text-xs uppercase text-[#33251e] tracking-wider hover:bg-[#33251e] hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
          >
            See All Collections
          </button>
        </div>
      </div>

      {/* Grid: 2 columns on mobile (Image 1), 4 columns with staggered vertical offset on desktop (Image 3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-start">
        {curated.map((item, index) => {
          const isSecondCard = index === 1; // Enchanted Garden (Featured Best active card)
          const isStaggered = index % 2 === 0; // Staggered vertical translation on desktop

          return (
            <div
              key={item.id}
              className={`w-full flex flex-col items-center group transition-transform ${
                isStaggered ? 'lg:translate-y-8' : ''
              }`}
            >
              {/* Arched Card Frame */}
              <div
                onClick={() => onSelectProduct(item)}
                className={`w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-t-[100px] sm:rounded-t-[120px] rounded-b-[18px] overflow-hidden p-3 pt-6 sm:pt-8 flex flex-col items-center justify-between relative cursor-pointer transition-all duration-300 ${
                  isSecondCard
                    ? 'bg-[#feab75] shadow-[0_16px_36px_-10px_rgba(247,165,111,0.55)] hover:shadow-2xl'
                    : 'bg-[#ffdbc7]/70 border border-[#33251e]/10 hover:shadow-md'
                }`}
              >
                {/* Top Badge/Header */}
                {isSecondCard ? (
                  <div className="w-full flex items-center justify-between px-2 sm:px-3">
                    <span className="font-label-caps text-[9px] sm:text-[10px] uppercase tracking-widest text-[#33251e] font-bold">
                      Featured Best
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#33251e]"></span>
                  </div>
                ) : (
                  <span className="font-label-caps text-[9px] sm:text-[10px] uppercase tracking-wider text-[#33251e]/70 font-semibold">
                    {item.badge || `Atelier No. 0${index + 1}`}
                  </span>
                )}

                {/* Card Product Image */}
                <div className="w-full h-[200px] sm:h-[250px] lg:h-[280px] flex items-center justify-center p-1 sm:p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-t-[75px] sm:rounded-t-[90px] rounded-b-xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
                  />
                </div>

                {/* Bottom Card Element */}
                {isSecondCard ? (
                  <div className="w-full flex justify-center pb-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="inline-flex items-center gap-1.5 bg-white text-[#33251e] font-body-md text-xs font-bold px-5 sm:px-6 py-2 rounded-full shadow-md hover:bg-[#33251e] hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Cart</span>
                    </button>
                  </div>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33251e]/20 mb-2"></span>
                )}
              </div>

              {/* Title & Price Below Arch */}
              <div
                onClick={() => onSelectProduct(item)}
                className="w-full text-center mt-3 sm:mt-5 cursor-pointer"
              >
                <h3 className="font-body-md text-sm sm:text-[15px] font-medium text-[#33251e] group-hover:text-[#8d4e20] transition-colors">
                  {item.name}
                </h3>
                <p className="font-title-editorial text-base sm:text-[18px] font-bold text-[#33251e] mt-1">
                  {formatPrice(item)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
