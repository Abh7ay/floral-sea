import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Sparkles, Recycle, Smile } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
}

const HERO_SHOWCASE = [
  {
    title: 'Imperial Pink Lily & Rose Symphony',
    tag: 'Royal Harmony',
    image: '/images/pink-lily-symphony.png',
    alt: 'Grand pink oriental lilies, blush spray roses, and chrysanthemums in ruffled gold-trimmed wrap with pink bow',
  },
  {
    title: 'Golden Sunflower & Ivory Rose Radiance',
    tag: 'Sunlit Harvest',
    image: '/images/sunflower-radiance.png',
    alt: 'Golden sunflowers and pure white roses wrapped in layered ruffled craft paper with white ribbons',
  },
  {
    title: 'Bridal Garden Blush',
    tag: 'Atelier Signature',
    image: '/images/bridal-garden-blush.png',
    alt: 'Lush bridal bouquet with pink garden roses, white lisianthus and silky ribbon',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SHOWCASE.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === HERO_SHOWCASE.length - 1 ? 0 : prev + 1));
  };

  const currentBouquet = HERO_SHOWCASE[activeSlide];

  return (
    <section className="relative w-full pt-6 md:pt-12 pb-16 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto overflow-hidden">
      
      {/* Carousel Side Arrows (Desktop) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Showcase Bouquet"
        className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 border border-[#33251e]/15 items-center justify-center text-[#33251e] shadow-md hover:bg-[#ffdbc7] hover:scale-105 transition-all focus:outline-none cursor-pointer"
        title="Previous arrangement"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Showcase Bouquet"
        className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 border border-[#33251e]/15 items-center justify-center text-[#33251e] shadow-md hover:bg-[#ffdbc7] hover:scale-105 transition-all focus:outline-none cursor-pointer"
        title="Next arrangement"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Main Center Stage with Arch Backdrop */}
      <div className="relative w-full flex flex-col items-center">
        
        {/* Architectural Arch Background Frame */}
        <div className="w-[320px] sm:w-[420px] md:w-[500px] lg:w-[560px] h-[520px] sm:h-[600px] md:h-[640px] lg:h-[690px] rounded-t-[160px] sm:rounded-t-[200px] lg:rounded-t-[220px] bg-[#ffdbc7]/55 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-all">
          {/* Subtle Botanical Halo Border */}
          <div className="absolute inset-x-4 sm:inset-x-8 top-8 sm:top-12 bottom-6 sm:bottom-8 rounded-t-[140px] sm:rounded-t-[190px] border border-[#33251e]/10"></div>
          
          {/* Decorative SVG curves */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            fill="none"
            viewBox="0 0 560 680"
          >
            <path
              className="text-[#33251e]/30"
              d="M 60 480 C 120 400, 200 520, 280 430 C 360 340, 420 440, 500 380"
              stroke="currentColor"
              strokeDasharray="4 6"
              strokeWidth="1"
            />
            <circle className="fill-[#8d4e20]" cx="120" cy="400" r="3" />
            <circle className="fill-[#8d4e20]" cx="440" cy="410" r="3" />
          </svg>
        </div>

        {/* Headline Hierarchy */}
        <div className="relative z-10 text-center flex flex-col items-center pt-4 sm:pt-6 lg:pt-8 px-4">
          <span className="font-headline-lg text-3xl sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[62px] italic text-[#33251e] tracking-wide font-normal">
            Your Floral
          </span>
          <h1 className="font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-[140px] xl:text-[164px] leading-[0.92] font-black text-[#33251e] tracking-[-0.035em] select-none -mt-1 sm:-mt-2">
            Wonderland
          </h1>

          {/* Mobile Description inside upper arch */}
          <p className="lg:hidden font-body-md text-[#4f4541] max-w-[280px] sm:max-w-md text-xs sm:text-sm mt-3 leading-relaxed">
            Discover Floral Sea, where the artistry of flowers blends seamlessly with heartfelt emotion.
          </p>
        </div>

        {/* Main Stage Grid (Desktop 3-column split / Mobile stacked arch + cards) */}
        <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-2 lg:mt-[-30px]">
          
          {/* Left Column: Intro + 2 Staggered Feature Cards (Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-between h-[520px] py-4">
            <div className="pl-2">
              <p className="font-body-md text-[#4f4541] max-w-[240px] leading-relaxed text-sm">
                Discover Floral Sea, where the artistry of flowers blends seamlessly with heartfelt emotion.
              </p>
            </div>

            {/* Feature Card 1 (Freshness Guaranteed) */}
            <div className="p-4 rounded-[14px] bg-[#fff8f6]/95 backdrop-blur-sm border border-[#33251e]/15 max-w-[250px] shadow-[0_8px_24px_-8px_rgba(74,58,51,0.08)] transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#33251e] flex items-center justify-center text-white shrink-0">
                  <Leaf className="w-3.5 h-3.5 fill-current" />
                </div>
                <h3 className="font-body-md text-[#33251e] font-bold text-[14px] leading-none">
                  Freshness Guaranteed
                </h3>
              </div>
              <p className="font-body-sm text-[#4f4541] text-[12px] leading-[18px]">
                Daily handpicked blooms for ultimate vitality and lasting fragrance.
              </p>
            </div>

            {/* Feature Card 2 (Sustainability Matters) */}
            <div className="p-4 rounded-[14px] bg-[#fff8f6]/95 backdrop-blur-sm border border-[#33251e]/15 max-w-[250px] shadow-[0_8px_24px_-8px_rgba(74,58,51,0.08)] transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#33251e] flex items-center justify-center text-white shrink-0">
                  <Recycle className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-body-md text-[#33251e] font-bold text-[14px] leading-none">
                  Sustainability Matters
                </h3>
              </div>
              <p className="font-body-sm text-[#4f4541] text-[12px] leading-[18px]">
                Eco-friendly sourcing and organic craft wrap with zero single-use plastics.
              </p>
            </div>
          </div>

          {/* Center Column: Centerpiece Bouquet Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative my-2 lg:my-0">
            
            {/* Bouquet Display Area */}
            <div className="relative w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[350px] sm:h-[430px] md:h-[480px] lg:h-[520px] flex items-center justify-center">
              
              {/* Central Bouquet Image */}
              <img
                key={activeSlide}
                src={currentBouquet.image}
                alt={currentBouquet.alt}
                className="w-full h-full object-contain filter drop-shadow-[0_24px_38px_rgba(51,37,30,0.22)] transition-all duration-500 animate-fade-in hover:scale-105"
              />

              {/* Mobile Prev/Next Floating Controls */}
              <button
                onClick={prevSlide}
                aria-label="Previous arrangement"
                className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#33251e] border border-[#33251e]/15 flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next arrangement"
                className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#33251e] border border-[#33251e]/15 flex items-center justify-center shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

            {/* Bouquet Carousel Indicators & Title Badge */}
            <div className="flex items-center gap-2 mt-2 sm:mt-3 z-30">
              {HERO_SHOWCASE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    activeSlide === idx
                      ? 'w-7 h-2 bg-[#33251e]'
                      : 'w-2 h-2 bg-[#33251e]/25 hover:bg-[#33251e]/50'
                  }`}
                  aria-label={`Show ${item.title}`}
                  title={item.title}
                />
              ))}
            </div>

            {/* FIXED POSITION: Shop Now Pill Button resting precisely at the bottom base of the arch */}
            <div className="mt-4 sm:mt-6 z-30 flex flex-col items-center">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center px-10 sm:px-12 py-3.5 sm:py-4 bg-white text-[#33251e] border border-[#33251e]/35 rounded-full font-label-sm text-xs sm:text-[13px] uppercase tracking-[0.18em] font-bold shadow-[0_8px_20px_rgba(51,37,30,0.12)] hover:bg-[#33251e] hover:text-white hover:border-[#33251e] hover:shadow-xl transition-all duration-300 focus:outline-none cursor-pointer group scale-100 hover:scale-105"
              >
                <span>Shop Now</span>
                <span className="ml-2.5 group-hover:translate-x-1.5 transition-transform duration-200">→</span>
              </button>

              {/* Discreet Active Bouquet Title */}
              <span className="text-[11px] text-[#4f4541]/80 font-semibold tracking-wider mt-2 uppercase">
                {currentBouquet.title}
              </span>
            </div>

          </div>

          {/* Right Column: Intro + 2 Staggered Feature Cards (Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-between h-[520px] py-4 items-end">
            <div className="pr-2 text-right">
              <p className="font-body-md text-[#4f4541] max-w-[240px] leading-relaxed text-sm">
                Our exquisite bouquets create moments of beauty and joy for every moment.
              </p>
            </div>

            {/* Feature Card 3 (Artistic Arrangements) */}
            <div className="p-4 rounded-[14px] bg-[#fff8f6]/95 backdrop-blur-sm border border-[#33251e]/15 max-w-[250px] text-left shadow-[0_8px_24px_-8px_rgba(74,58,51,0.08)] transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#33251e] flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-body-md text-[#33251e] font-bold text-[14px] leading-none">
                  Artistic Arrangements
                </h3>
              </div>
              <p className="font-body-sm text-[#4f4541] text-[12px] leading-[18px]">
                Unique artisanal designs crafted with passion by master botanical stylists.
              </p>
            </div>

            {/* Feature Card 4 (Customer Delight) */}
            <div className="p-4 rounded-[14px] bg-[#fff8f6]/95 backdrop-blur-sm border border-[#33251e]/15 max-w-[250px] text-left shadow-[0_8px_24px_-8px_rgba(74,58,51,0.08)] transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#33251e] flex items-center justify-center text-white shrink-0">
                  <Smile className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-body-md text-[#33251e] font-bold text-[14px] leading-none">
                  Customer Delight
                </h3>
              </div>
              <p className="font-body-sm text-[#4f4541] text-[12px] leading-[18px]">
                Unmatched care and dedicated flower concierge for all intimate gatherings.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile 2x2 Feature Cards Grid (As seen in Image 1) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:hidden w-full max-w-lg">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#fff8f6] border border-[#33251e]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#33251e] text-white flex items-center justify-center">
                <Leaf className="w-3 h-3" />
              </div>
              <h4 className="font-body-md text-xs sm:text-sm font-bold text-[#33251e]">Freshness</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-[#4f4541] leading-tight">
              Daily handpicked blooms for ultimate vitality.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#fff8f6] border border-[#33251e]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#33251e] text-white flex items-center justify-center">
                <Sparkles className="w-3 h-3" />
              </div>
              <h4 className="font-body-md text-xs sm:text-sm font-bold text-[#33251e]">Artistic</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-[#4f4541] leading-tight">
              Unique artisanal designs crafted with passion.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#fff8f6] border border-[#33251e]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#33251e] text-white flex items-center justify-center">
                <Recycle className="w-3 h-3" />
              </div>
              <h4 className="font-body-md text-xs sm:text-sm font-bold text-[#33251e]">Sustainable</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-[#4f4541] leading-tight">
              Eco-friendly sourcing and organic craft wrap.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#fff8f6] border border-[#33251e]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#33251e] text-white flex items-center justify-center">
                <Smile className="w-3 h-3" />
              </div>
              <h4 className="font-body-md text-xs sm:text-sm font-bold text-[#33251e]">Delight</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-[#4f4541] leading-tight">
              Unmatched care and dedicated flower concierge.
            </p>
          </div>
        </div>

      </div>

      {/* Partner Brand Logos Row */}
      <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#33251e]/10 w-full flex flex-wrap items-center justify-center sm:justify-between gap-y-4 gap-x-6 px-4 text-[#33251e]/70">
        <div className="flex items-center gap-2 hover:text-[#33251e] transition-colors cursor-default">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="font-label-caps text-[11px] uppercase tracking-widest font-bold">L’AURORA</span>
        </div>

        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#33251e]/20"></span>

        <div className="flex items-center gap-2 hover:text-[#33251e] transition-colors cursor-default">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="none" r="9" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          <span className="font-label-caps text-[11px] uppercase tracking-widest font-bold">VERDANTIA</span>
        </div>

        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#33251e]/20"></span>

        <div className="flex items-center gap-2 hover:text-[#33251e] transition-colors cursor-default">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M9 9h6v6H9z" />
          </svg>
          <span className="font-label-caps text-[11px] uppercase tracking-widest font-bold">ATELIER BOTANIC</span>
        </div>

        <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#33251e]/20"></span>

        <div className="flex items-center gap-2 hover:text-[#33251e] transition-colors cursor-default">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
          </svg>
          <span className="font-label-caps text-[11px] uppercase tracking-widest font-bold">FLORESCENCE</span>
        </div>

        <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-[#33251e]/20"></span>

        <div className="hidden sm:flex items-center gap-2 hover:text-[#33251e] transition-colors cursor-default">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-label-caps text-[11px] uppercase tracking-widest font-bold">NOUVELLE HERBE</span>
        </div>

        <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-[#33251e]/20"></span>

        <div className="hidden md:flex items-center gap-2 hover:text-[#33251e] transition-colors cursor-default">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="font-label-caps text-[11px] uppercase tracking-widest font-bold">BOTANICA MARE</span>
        </div>
      </div>

    </section>
  );
};
