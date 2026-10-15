import React, { useState, useMemo } from 'react';
import { Search, Plus, X, ChevronDown, Check } from 'lucide-react';
import { Product, CatalogFilterCategory } from '../types';

interface CollectionsViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onClose: () => void;
  initialCategory?: CatalogFilterCategory;
  currency: 'USD' | 'INR';
}

const CATEGORIES: CatalogFilterCategory[] = [
  'All',
  'Bouquets',
  'Boxes',
  'Corsages',
  'Pots',
  'Centerpieces',
  'Vessels',
];

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onClose,
  initialCategory = 'All',
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CatalogFilterCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.catalogCategory !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesStems = p.stems?.some((s) => s.toLowerCase().includes(q));
        const matchesTag = p.archTag?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesStems && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const pA = currency === 'USD' ? a.priceUsd : a.priceInr;
        const pB = currency === 'USD' ? b.priceUsd : b.priceInr;
        return pA - pB;
      }
      if (sortBy === 'price-high') {
        const pA = currency === 'USD' ? a.priceUsd : a.priceInr;
        const pB = currency === 'USD' ? b.priceUsd : b.priceInr;
        return pB - pA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy, currency]);

  const formatPrice = (usd: number, inr: number) => {
    return currency === 'USD' ? `$${usd.toFixed(2)}` : `₹${inr.toLocaleString()}`;
  };

  return (
    <div className="w-full py-4 sm:py-8 md:py-12 px-3 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto animate-fade-in">
      
      {/* Outer Card Wrapper exactly matching the user's image */}
      <div className="w-full bg-[#fff8f6] rounded-3xl border border-[#33251e]/15 shadow-[0_16px_40px_-12px_rgba(51,37,30,0.08)] overflow-hidden">
        
        {/* Top Header Banner matching Image */}
        <div className="w-full bg-[#fff1eb]/60 px-6 sm:px-10 py-6 sm:py-8 border-b border-[#33251e]/10 flex items-start justify-between">
          <div>
            <span className="font-label-caps text-xs uppercase tracking-[0.18em] text-[#8d4e20] font-bold block mb-1">
              Atelier Archive &amp; Collections
            </span>
            <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#33251e] tracking-tight leading-tight">
              Flora Sea Catalog
            </h1>
          </div>

          {/* Close X Button */}
          <button
            onClick={onClose}
            aria-label="Close Catalog"
            className="p-2 rounded-full text-[#33251e] hover:bg-[#ffdbc7] transition-colors focus:outline-none cursor-pointer"
            title="Return to Home Showcase"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Filter Pills, Search Bar & Sort Dropdown Row */}
        <div className="px-6 sm:px-10 py-5 border-b border-[#33251e]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Horizontal Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#231a15] text-white shadow-sm'
                      : 'bg-[#ffdbc7]/70 text-[#33251e] hover:bg-[#ffdbc7]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input Pill */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4f4541]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stems or styles..."
                className="w-full bg-white border border-[#33251e]/20 rounded-full pl-9 pr-8 py-2 text-xs text-[#33251e] placeholder-[#4f4541]/60 focus:outline-none focus:border-[#33251e] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f4541]/60 hover:text-[#33251e]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown Pill */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort Curations"
                className="appearance-none bg-white border border-[#33251e]/20 rounded-full pl-4 pr-9 py-2 text-xs font-medium text-[#33251e] focus:outline-none cursor-pointer shadow-sm w-full sm:w-auto"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#33251e] pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Product Cards Grid: 2 per row on mobile, 4 on desktop */}
        <div className="p-3.5 sm:p-6 lg:p-10">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-headline-sm text-xl text-[#33251e] mb-2">No botanical stems found</p>
              <p className="text-xs text-[#4f4541] mb-4">Try clearing your search term or switching categories.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2 bg-[#33251e] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Show All Stems
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-start">
              {filteredProducts.map((product) => {
                const isJustAdded = addedIds[product.id];
                return (
                  <div
                    key={product.id}
                    className="w-full flex flex-col items-center group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    {/* Arched Card Frame */}
                    <div className="w-full h-[290px] sm:h-[380px] lg:h-[420px] rounded-t-[80px] sm:rounded-t-[120px] rounded-b-[18px] sm:rounded-b-[24px] bg-[#ffe2d1] overflow-hidden p-2.5 sm:p-4 pt-4 sm:pt-6 pb-2.5 sm:pb-4 flex flex-col items-center justify-between relative border border-[#33251e]/10 shadow-[0_6px_20px_-8px_rgba(74,58,51,0.06)] group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      
                      {/* Top Category Tag / Badge */}
                      <span className="font-label-caps text-[8px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.14em] text-[#8d4e20] font-bold text-center line-clamp-1">
                        {product.archTag || product.badge || 'ATELIER SELECTION'}
                      </span>

                      {/* Product Image inside Arch */}
                      <div className="w-full h-[175px] sm:h-[240px] lg:h-[280px] flex items-center justify-center p-1 sm:p-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-[60px] sm:rounded-t-[90px] rounded-b-xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
                        />
                      </div>

                      {/* Floating White Pill Button: + Cart */}
                      <div className="w-full flex justify-center pb-0.5 sm:pb-1">
                        <button
                          onClick={(e) => handleAddClick(product, e)}
                          className={`inline-flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full font-body-md text-[11px] sm:text-xs font-bold shadow-md transition-all duration-200 cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#33251e] text-white scale-105'
                              : 'bg-white text-[#33251e] hover:bg-[#33251e] hover:text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#feab75]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                              <span>Cart</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                    {/* Below Card: Title & Price */}
                    <div className="w-full text-center mt-2.5 sm:mt-4 px-1">
                      <h3 className="font-body-md text-xs sm:text-[15px] font-medium text-[#33251e] group-hover:text-[#8d4e20] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="font-headline-sm text-sm sm:text-[18px] font-bold text-[#33251e] mt-0.5 sm:mt-1">
                        {formatPrice(product.priceUsd, product.priceInr)}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
