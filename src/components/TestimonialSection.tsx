import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const t = TESTIMONIALS[currentIndex];

  return (
    <section className="relative w-full py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto text-center">
      {/* Lateral Chevrons (Desktop) */}
      <button
        onClick={prev}
        aria-label="Previous Testimonial"
        className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#33251e]/20 items-center justify-center text-[#33251e]/70 hover:text-[#33251e] hover:border-[#33251e] transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <button
        onClick={next}
        aria-label="Next Testimonial"
        className="hidden md:flex absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#33251e]/20 items-center justify-center text-[#33251e]/70 hover:text-[#33251e] hover:border-[#33251e] transition-colors focus:outline-none"
      >
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Center Arch Bouquet Frame */}
      <div className="w-[200px] sm:w-[240px] md:w-[260px] h-[270px] sm:h-[310px] md:h-[340px] rounded-t-[110px] sm:rounded-t-[140px] rounded-b-2xl bg-[#ffdbc7]/70 mx-auto overflow-hidden p-2 flex items-center justify-center border border-[#33251e]/15 shadow-sm">
        <img
          src={t.image}
          alt="Fresh white tulips tied in rustic kraft paper"
          className="w-full h-full object-cover rounded-t-[100px] sm:rounded-t-[130px] rounded-b-xl transition-all duration-700"
        />
      </div>

      {/* Centered Editorial Quote */}
      <div className="max-w-2xl mx-auto mt-6 sm:mt-8 px-4">
        <div className="font-headline-sm text-[#8d4e20] text-3xl sm:text-4xl leading-none mb-2 sm:mb-3">
          “
        </div>
        <blockquote className="font-headline-md text-xl sm:text-2xl md:text-[26px] leading-[30px] sm:leading-[38px] font-bold text-[#33251e] transition-all duration-300">
          {t.quote}
        </blockquote>

        {/* Author Attribution */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center">
          <span className="font-body-md text-xs sm:text-[14px] font-bold tracking-widest uppercase text-[#33251e]">
            {t.author}
          </span>
          <span className="font-body-sm text-[11px] sm:text-[12px] text-[#4f4541] tracking-wide mt-0.5">
            {t.role}
          </span>
        </div>

        {/* Mobile controls & pagination dots (As seen in Image 1) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            aria-label="Previous Story"
            className="w-8 h-8 rounded-full border border-[#33251e]/25 flex items-center justify-center text-[#33251e]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all rounded-full ${
                  currentIndex === i ? 'w-5 h-1.5 bg-[#33251e]' : 'w-1.5 h-1.5 bg-[#33251e]/30'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next Story"
            className="w-8 h-8 rounded-full border border-[#33251e]/25 flex items-center justify-center text-[#33251e]"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
