import React from 'react';
import { X, Instagram, Heart, Compass, Sparkles } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#fff8f6] rounded-3xl shadow-2xl border border-[#33251e]/15 overflow-hidden my-auto p-6 sm:p-10">
        
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full text-[#33251e] hover:bg-[#fceae2] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-lg mx-auto">
          <span className="font-label-caps text-xs uppercase tracking-widest text-[#8d4e20] font-bold block mb-2">
            The Atelier Story
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl font-bold text-[#33251e] mb-4">
            Floral Sea.
          </h2>
          <p className="font-body-md text-sm text-[#4f4541] leading-relaxed mb-6">
            An artisanal botanical atelier weaving haute-couture floral poetry for refined spaces, intimate occasions, and mindful daily rituals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 text-left">
            <div className="p-4 rounded-2xl bg-[#ffdbc7]/40 border border-[#33251e]/10">
              <Compass className="w-5 h-5 text-[#8d4e20] mb-2" />
              <h4 className="font-body-md text-xs font-bold text-[#33251e] mb-1">Slow Floristry</h4>
              <p className="text-[11px] text-[#4f4541] leading-snug">
                Sourced directly from generational growers with zero floral foam.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#ffdbc7]/40 border border-[#33251e]/10">
              <Sparkles className="w-5 h-5 text-[#8d4e20] mb-2" />
              <h4 className="font-body-md text-xs font-bold text-[#33251e] mb-1">Bespoke Design</h4>
              <p className="text-[11px] text-[#4f4541] leading-snug">
                Each bouquet is sculpted individually with seasonal rare stems.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#ffdbc7]/40 border border-[#33251e]/10">
              <Heart className="w-5 h-5 text-[#8d4e20] mb-2" />
              <h4 className="font-body-md text-xs font-bold text-[#33251e] mb-1">Ritual &amp; Care</h4>
              <p className="text-[11px] text-[#4f4541] leading-snug">
                Accompanied by custom handwritten wax-sealed notes.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#33251e]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left text-xs text-[#4f4541]">
              <span className="font-bold text-[#33251e] block">Studio No. 41 • Atelier Maritime</span>
              <span>Open Monday – Saturday 8:00 AM – 7:00 PM</span>
            </div>

            <a
              href="https://www.instagram.com/florasea.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#33251e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8d4e20] transition-colors shadow-sm"
            >
              <Instagram className="w-4 h-4 text-[#feab75]" />
              <span>@florasea.co</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
