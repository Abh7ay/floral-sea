import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, Instagram } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'catalog';
  onNavigate: (view: 'home' | 'catalog') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAbout: () => void;
  currency: 'USD' | 'INR';
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenAbout,
  currency,
  onToggleCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-[#fff8f6]/90 backdrop-blur-xl border-b border-[#33251e]/10">
        <div className="w-full max-w-[1440px] h-18 md:h-20 px-4 md:px-10 lg:px-14 flex items-center justify-between">
          
          {/* Mobile Left: Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-1.5 text-[#33251e] hover:text-[#8d4e20] transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          {/* Desktop Left: Logo + Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left focus:outline-none"
              title="Floral Sea Atelier"
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1UrzJkGuELRtcnOegGU-qdJFZueHTEEClrWdSQdjWayDUL0u34WCsL5zKfAWsHYnpVpnvs6mGsA5DLw8FVLHRmBHItvIR3mVtXLIYRMtkrAYxyd0qkvGiJdQx8fqmgDWgQYWLBFQ6TuBARWlFAdOkwRKdA2EHQGUa6F1M6mMsTVnt3phpZ53WXhZiwbIEVZr0VlgFXUgLZpKP4CuReEfzUz7_373D7vIVyXAGanmivCyxqy7gl_z4wJUA"
                alt="Floral Sea Wordmark"
                className="h-7 w-auto object-contain transition-opacity group-hover:opacity-80"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </button>

            <nav className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('home')}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors ${
                  currentView === 'home'
                    ? 'text-[#33251e] border-b-2 border-[#8d4e20] pb-0.5'
                    : 'text-[#4f4541] hover:text-[#33251e]'
                }`}
              >
                Flowers
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors ${
                  currentView === 'catalog'
                    ? 'text-[#33251e] border-b-2 border-[#8d4e20] pb-0.5'
                    : 'text-[#4f4541] hover:text-[#33251e]'
                }`}
              >
                Catalog
              </button>
            </nav>
          </div>

          {/* Center: Delicate Floral Sea. Serif wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center gap-2 sm:gap-4 group focus:outline-none"
          >
            <span className="w-4 sm:w-8 h-[1px] bg-[#33251e]/20 transition-all group-hover:w-10"></span>
            <span className="font-headline-sm text-xl sm:text-2xl font-bold text-[#33251e] tracking-tight group-hover:text-[#8d4e20] transition-colors">
              Floral Sea.
            </span>
            <span className="w-4 sm:w-8 h-[1px] bg-[#33251e]/20 transition-all group-hover:w-10"></span>
          </button>

          {/* Right Area: About, Instagram, Currency, Cart, Account */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              title={`Switch Currency (Currently ${currency})`}
              className="text-[11px] font-semibold tracking-wider uppercase px-2 py-1 rounded-full border border-[#33251e]/15 text-[#4f4541] hover:border-[#33251e] hover:text-[#33251e] transition-all"
            >
              {currency === 'USD' ? '$ USD' : '₹ INR'}
            </button>

            {/* Desktop About link */}
            <button
              onClick={onOpenAbout}
              className="hidden md:inline-block text-xs uppercase tracking-widest font-semibold text-[#4f4541] hover:text-[#33251e] transition-colors"
            >
              About
            </button>

            {/* Instagram Link to @florasea.co */}
            <a
              href="https://www.instagram.com/florasea.co/"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow @florasea.co on Instagram"
              aria-label="Floral Sea Instagram"
              className="hidden sm:flex p-1.5 text-[#33251e] hover:text-[#CE2D4F] transition-colors"
            >
              <Instagram className="w-5 h-5 stroke-[1.8]" />
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="relative p-1.5 text-[#33251e] hover:text-[#8d4e20] transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 md:w-[22px] md:h-[22px] stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#8d4e20] text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenAbout}
              aria-label="User Atelier Account"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#33251e] text-white flex items-center justify-center hover:bg-[#8d4e20] transition-colors shadow-sm"
              title="Atelier Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 left-0 w-[82%] max-w-sm bg-[#fff8f6] shadow-2xl p-6 flex flex-col justify-between border-r border-[#33251e]/15">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#33251e]/10">
                <span className="font-headline-sm text-2xl font-bold text-[#33251e]">Floral Sea.</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#33251e] hover:bg-[#fceae2]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-headline-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                    currentView === 'home' ? 'bg-[#ffdbc7] text-[#33251e]' : 'text-[#4f4541] hover:bg-[#fceae2]'
                  }`}
                >
                  Flowers (Home Showcase)
                </button>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-headline-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                    currentView === 'catalog' ? 'bg-[#ffdbc7] text-[#33251e]' : 'text-[#4f4541] hover:bg-[#fceae2]'
                  }`}
                >
                  All Collections &amp; Catalog
                </button>
                <button
                  onClick={() => {
                    onOpenAbout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-lg font-headline-sm font-semibold py-2 px-3 text-[#4f4541] hover:bg-[#fceae2] rounded-lg transition-colors"
                >
                  About the Atelier
                </button>
                <a
                  href="https://www.instagram.com/florasea.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-base font-medium py-2 px-3 text-[#CE2D4F] hover:bg-[#fceae2] rounded-lg transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@florasea.co Instagram</span>
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#33251e]/10 space-y-3">
              <div className="flex items-center justify-between text-sm text-[#4f4541]">
                <span>Active Currency:</span>
                <button
                  onClick={onToggleCurrency}
                  className="px-3 py-1 bg-[#fceae2] text-[#33251e] font-bold rounded-full border border-[#33251e]/15 text-xs"
                >
                  {currency === 'USD' ? '$ USD ($)' : '₹ INR (₹)'}
                </button>
              </div>
              <p className="text-[11px] text-[#4f4541]/70">
                Studio No. 41 • Atelier Maritime • Hand-tied fresh daily
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
