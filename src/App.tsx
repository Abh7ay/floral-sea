/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FinestSelectionSection } from './components/FinestSelectionSection';
import { TestimonialSection } from './components/TestimonialSection';
import { FlowerVarietySection } from './components/FlowerVarietySection';
import { CtaSection } from './components/CtaSection';
import { InstagramSection } from './components/InstagramSection';
import { CollectionsView } from './components/CollectionsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CatalogFilterCategory, FlowerVarietyCategory } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<CatalogFilterCategory>('All');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial cart with 1 curated item to match the mockup header badge '1'
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Blush Tulip Elegance ($52.00)
      quantity: 1,
      selectedSize: 'Grand Classic',
      giftMessage: 'With heartfelt affection, happy anniversary!',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    size: 'Signature Petite' | 'Grand Classic' | 'Haute Couture Deluxe' = 'Grand Classic',
    giftMessage: string = ''
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        if (giftMessage) copy[existingIdx].giftMessage = giftMessage;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize: size,
          giftMessage,
        },
      ];
    });

    showToast(`Added ${quantity}× "${product.name}" to your bag`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleNavigateToCatalog = (category: CatalogFilterCategory = 'All') => {
    setCatalogCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChooseFlowersFromVariety = (varietyCat: FlowerVarietyCategory) => {
    // Map variety to matching catalog category
    const map: Record<FlowerVarietyCategory, CatalogFilterCategory> = {
      'Flower Bouquets': 'Bouquets',
      'Flower Pots': 'Pots',
      'Flower Boards': 'Vessels',
      'Flower Boxes': 'Boxes',
      'Flower Corsages': 'Corsages',
      'Flower Centerpieces': 'Centerpieces',
    };
    handleNavigateToCatalog(map[varietyCat] || 'All');
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'INR' : 'USD'));
    showToast(`Switched pricing display to ${currency === 'USD' ? 'INR (₹)' : 'USD ($)'}`);
  };

  const handleProceedToCheckout = (discount: number) => {
    setAppliedDiscount(discount);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#EBE7E2] selection:bg-[#feab75] selection:text-[#33251e]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#33251e] text-white px-5 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <Check className="w-4 h-4 text-[#feab75]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setCartOpen(true)}
            className="ml-2 underline text-[#feab75] hover:text-white"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Main Container Envelope */}
      <div className="w-full max-w-[1440px] bg-[#fff8f6] flex flex-col min-h-screen shadow-[0_12px_36px_-8px_rgba(74,58,51,0.08),0_2px_8px_0_rgba(247,165,111,0.06)] relative">
        
        {/* Navigation Bar */}
        <Header
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
          onOpenAbout={() => setAboutOpen(true)}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-18 md:pt-20 bg-[#fff8f6]">
          {currentView === 'home' ? (
            <div className="flex flex-col w-full overflow-hidden bg-[#fff8f6] text-[#33251e]">
              
              {/* SECTION 1: HERO (Image 1 Mobile / Image 3 Desktop) */}
              <HeroSection
                onShopNow={() => handleNavigateToCatalog('All')}
              />

              {/* SECTION 2: CURATED OFFERINGS / DISCOVER OUR FINEST SELECTION */}
              <FinestSelectionSection
                products={PRODUCTS}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onSeeAll={() => handleNavigateToCatalog('All')}
                currency={currency}
              />

              {/* SECTION 3: TESTIMONIAL (Miranda Dale) */}
              <TestimonialSection />

              {/* SECTION 4: EXPLORE OUR FLOWER VARIETY */}
              <FlowerVarietySection
                onChooseFlowers={handleChooseFlowersFromVariety}
                onQuickAdd={(p) => handleAddToCart(p, 1)}
                currency={currency}
              />

              {/* SECTION 5: CTA (Ready to Experience the Beauty of Flowers?) */}
              <CtaSection
                onShopNow={() => {
                  setAppliedDiscount(10);
                  handleNavigateToCatalog('All');
                  showToast('10% First Bouquet Discount code FLORASEA10 active!');
                }}
              />

              {/* INSTAGRAM SECTION (@florasea.co) */}
              <InstagramSection />

            </div>
          ) : (
            /* ALL COLLECTIONS & CATALOG VIEW (Image.png) */
            <CollectionsView
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, qty) => handleAddToCart(p, qty)}
              onClose={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              initialCategory={catalogCategory}
              currency={currency}
            />
          )}
        </main>

        {/* Site Footer */}
        <Footer
          onNavigateToCategory={handleNavigateToCatalog}
          onOpenAbout={() => setAboutOpen(true)}
        />

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, qty, size, giftMsg) => {
            handleAddToCart(product, qty, size, giftMsg);
          }}
          currency={currency}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
        currency={currency}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercent={appliedDiscount}
        onCompleteOrder={() => {
          setCartItems([]);
          setAppliedDiscount(0);
        }}
        currency={currency}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

    </div>
  );
}
