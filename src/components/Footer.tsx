import React, { useState } from 'react';
import { CatalogFilterCategory } from '../types';

interface FooterProps {
  onNavigateToCategory: (category: CatalogFilterCategory) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCategory, onOpenAbout }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#fff1eb] border-t border-[#33251e]/10 pt-12 md:pt-16 pb-8 md:pb-12 text-[#231a15]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#33251e]/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 pr-4 sm:pr-8">
            <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-[#33251e] mb-2">
              Flora Sea.
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#4f4541] max-w-sm mb-4 leading-relaxed">
              An artisanal botanical atelier weaving haute-couture floral poetry for refined spaces, intimate occasions, and mindful daily ritual.
            </p>
            <span className="font-label-caps text-[11px] text-[#33251e]/70 uppercase tracking-widest font-semibold block">
              Studio No. 41 • Atelier Maritime
            </span>
          </div>

          {/* Curations Links Col */}
          <div className="md:col-span-3">
            <h4 className="font-label-caps text-xs uppercase text-[#33251e] tracking-widest font-bold mb-4">
              Atelier Curations
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4f4541]">
              <li>
                <button
                  onClick={() => onNavigateToCategory('Bouquets')}
                  className="hover:text-[#33251e] transition-colors text-left"
                >
                  Seasonal Stems
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToCategory('Vessels')}
                  className="hover:text-[#33251e] transition-colors text-left"
                >
                  Vessel Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToCategory('Boxes')}
                  className="hover:text-[#33251e] transition-colors text-left"
                >
                  Botanical Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#33251e] transition-colors text-left"
                >
                  Stem Care &amp; Longevity
                </button>
              </li>
            </ul>
          </div>

          {/* Floral Gazette Newsletter Col */}
          <div className="md:col-span-4">
            <h4 className="font-label-caps text-xs uppercase text-[#33251e] tracking-widest font-bold mb-2">
              Floral Gazette
            </h4>
            <p className="font-body-sm text-xs text-[#4f4541] mb-3 leading-relaxed">
              Receive our bi-weekly dispatch of seasonal market harvests, botanical musings, and private previews.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white border border-[#33251e]/20 px-4 py-2.5 rounded-full font-body-sm text-xs text-[#33251e] placeholder-[#4f4541]/60 focus:outline-none focus:border-[#33251e]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#33251e] text-white font-label-sm text-xs uppercase tracking-wider font-bold hover:bg-[#8d4e20] transition-colors shrink-0"
              >
                Join
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-800 font-semibold mt-2">
                ✓ Welcome to the Floral Gazette. Please check your inbox for our seasonal lookbook.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Sub-strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-label-caps text-[11px] text-[#4f4541]">
          <p>© 2025 Flora Sea Atelier. Crafted with quiet botanical reverence.</p>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={onOpenAbout} className="hover:text-[#33251e] transition-colors">
              Privacy Policy
            </button>
            <button onClick={onOpenAbout} className="hover:text-[#33251e] transition-colors">
              Terms of Dispatch
            </button>
            <a
              href="https://www.instagram.com/florasea.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#33251e] transition-colors"
            >
              Lookbook Archive
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
