import React from 'react';

interface CtaSectionProps {
  onShopNow: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onShopNow }) => {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto text-center overflow-hidden">
      
      {/* Ghosted Giant Background Wordmark */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none flex justify-center">
        <span className="font-headline-lg text-6xl sm:text-9xl md:text-[140px] lg:text-[170px] font-bold text-[#ffdbc7]/45 leading-none whitespace-nowrap block tracking-tight">
          Floral Sea.
        </span>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        <span className="font-label-caps text-xs uppercase text-[#8d4e20] tracking-widest mb-3 font-semibold">
          Begin Your Bouquet
        </span>
        
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-[48px] leading-[1.15] font-bold text-[#33251e] mb-4 text-center">
          Ready to Experience <br /> the Beauty of Flowers?
        </h2>

        <p className="font-body-md text-sm sm:text-[15px] text-[#4f4541] text-center mb-8 max-w-md leading-relaxed">
          Get your flowers from Floral Sea and enjoy 10% off with promo code <span className="font-bold text-[#33251e] bg-[#ffdbc7] px-2 py-0.5 rounded">FLORALSEA10</span> at checkout.
        </p>

        <button
          onClick={onShopNow}
          className="inline-flex items-center justify-center bg-[#33251e] text-white px-9 py-3.5 rounded-full font-label-sm text-[13px] tracking-widest uppercase font-semibold hover:bg-[#8d4e20] transition-colors shadow-md cursor-pointer group"
        >
          Shop Now
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

    </section>
  );
};
