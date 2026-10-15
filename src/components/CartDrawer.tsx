import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (appliedDiscount: number) => void;
  currency: 'USD' | 'INR';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [ecoWrap, setEcoWrap] = useState(true);

  if (!isOpen) return null;

  const getPrice = (item: CartItem) => {
    const sizeMultiplier =
      item.selectedSize === 'Signature Petite'
        ? 0.85
        : item.selectedSize === 'Haute Couture Deluxe'
        ? 1.35
        : 1.0;
    return currency === 'USD'
      ? item.product.priceUsd * sizeMultiplier
      : item.product.priceInr * sizeMultiplier;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + getPrice(item) * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const formatPrice = (val: number) => {
    return currency === 'USD' ? `$${val.toFixed(2)}` : `₹${Math.round(val).toLocaleString()}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FLORASEA10') {
      setDiscountPercent(10);
      setPromoSuccess(true);
      setPromoError('');
    } else if (clean === 'WONDERLAND20') {
      setDiscountPercent(20);
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code. Try FLORASEA10 for 10% off.');
      setPromoSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#fff8f6] h-full shadow-2xl flex flex-col justify-between border-l border-[#33251e]/15 animate-slide-left">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#33251e]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#33251e]" />
            <h2 className="font-headline-sm text-xl font-bold text-[#33251e]">
              Your Botanical Bag
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ffdbc7] text-[#33251e]">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Bag"
            className="p-1 rounded-full text-[#33251e] hover:bg-[#fceae2] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#ffdbc7]/70 flex items-center justify-center text-[#33251e] mb-4">
                <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="font-headline-sm text-lg text-[#33251e] mb-1">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#4f4541] max-w-[240px] mb-6">
                Explore our curated wonderland of farm-fresh bouquets and artisanal boxes.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#33251e] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#8d4e20] transition-colors"
              >
                Browse Stems
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const unitPrice = getPrice(item);
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="p-3 bg-white rounded-2xl border border-[#33251e]/10 flex gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail with Arch Top */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-t-xl rounded-b-md bg-[#f7e5dd] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-body-md text-sm font-semibold text-[#33251e] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label="Remove item"
                          className="text-[#4f4541]/50 hover:text-[#CE2D4F] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedSize && (
                        <span className="text-[10px] uppercase font-bold text-[#8d4e20] tracking-wider block">
                          {item.selectedSize}
                        </span>
                      )}

                      {item.giftMessage && (
                        <p className="text-[10px] text-[#4f4541] italic line-clamp-1 mt-0.5">
                          Note: "{item.giftMessage}"
                        </p>
                      )}
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-title-editorial text-sm font-bold text-[#33251e]">
                        {formatPrice(unitPrice * item.quantity)}
                      </span>

                      <div className="flex items-center bg-[#fceae2] rounded-full px-2 py-0.5 border border-[#33251e]/10 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center hover:text-[#8d4e20]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-xs select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center hover:text-[#8d4e20]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Eco-Friendly Packaging Toggle */}
          {cartItems.length > 0 && (
            <div className="p-3 bg-[#ffdbc7]/40 rounded-xl border border-[#33251e]/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8d4e20]" />
                <div>
                  <span className="font-bold text-[#33251e] block">Organic Seed-Paper Wrap</span>
                  <span className="text-[10px] text-[#4f4541]">Plantable wildflower tag included</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={ecoWrap}
                onChange={() => setEcoWrap(!ecoWrap)}
                className="w-4 h-4 accent-[#33251e] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#fceae2]/70 border-t border-[#33251e]/10 space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#4f4541]/60" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code: FLORASEA10"
                  className="w-full bg-white border border-[#33251e]/20 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#33251e] uppercase tracking-wider focus:outline-none focus:border-[#33251e]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#33251e] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#8d4e20] transition-colors"
              >
                Apply
              </button>
            </form>

            {promoSuccess && (
              <p className="text-[11px] text-emerald-800 font-bold">
                ✓ {discountPercent}% discount applied successfully!
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-[#CE2D4F] font-medium">{promoError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#4f4541]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#33251e]">{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#CE2D4F] font-semibold">
                  <span>Promotion ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Atelier Hand-Delivery</span>
                <span className="text-emerald-800 font-bold uppercase tracking-wider text-[11px]">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#33251e] pt-2 border-t border-[#33251e]/10">
                <span>Total Due</span>
                <span className="font-title-editorial text-base">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onCheckout(discountPercent)}
              className="w-full py-3.5 bg-[#33251e] hover:bg-[#8d4e20] text-white rounded-full font-label-sm text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-[#4f4541]/70">
              Guaranteed Fresh • Climate-Controlled Delivery • Atelier Care
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
