import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  onCompleteOrder: () => void;
  currency: 'USD' | 'INR';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  onCompleteOrder,
  currency,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [recipientName, setRecipientName] = useState('Abhay Sharma');
  const [address, setAddress] = useState('42 Bloom Valley, Marine Drive');
  const [city, setCity] = useState('Mumbai');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow Morning (9:00 AM - 12:00 PM)');
  const [orderId, setOrderId] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `FLORA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);
    setStep('success');
    onCompleteOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#fff8f6] rounded-3xl shadow-2xl border border-[#33251e]/15 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#33251e]/10 flex items-center justify-between bg-[#ffdbc7]/30">
          <div>
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#8d4e20] font-bold">
              Floral Sea Checkout
            </span>
            <h3 className="font-headline-sm text-xl font-bold text-[#33251e]">
              {step === 'form' ? 'Atelier Dispatch Details' : 'Botanical Order Confirmed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#33251e] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4f4541] mb-1">
                Recipient Full Name
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-white border border-[#33251e]/20 rounded-xl px-3.5 py-2 text-xs text-[#33251e] focus:outline-none focus:border-[#33251e]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4f4541] mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#33251e]/20 rounded-xl px-3.5 py-2 text-xs text-[#33251e] focus:outline-none focus:border-[#33251e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4f4541] mb-1">
                  City / Postal
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-[#33251e]/20 rounded-xl px-3.5 py-2 text-xs text-[#33251e] focus:outline-none focus:border-[#33251e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4f4541] mb-1">
                Hand-Delivery Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-[#33251e]/20 rounded-xl px-3.5 py-2 text-xs text-[#33251e] focus:outline-none focus:border-[#33251e]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4f4541] mb-1">
                Preferred Delivery Slot
              </label>
              <select
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-white border border-[#33251e]/20 rounded-xl px-3.5 py-2 text-xs text-[#33251e] focus:outline-none focus:border-[#33251e]"
              >
                <option value="Tomorrow Morning (9:00 AM - 12:00 PM)">Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                <option value="Tomorrow Afternoon (1:00 PM - 5:00 PM)">Tomorrow Afternoon (1:00 PM - 5:00 PM)</option>
                <option value="Same-Day Evening Rush (6:00 PM - 9:00 PM)">Same-Day Evening Rush (6:00 PM - 9:00 PM)</option>
              </select>
            </div>

            {/* Total summary */}
            <div className="p-3 bg-[#fceae2] rounded-xl text-xs space-y-1">
              <div className="flex justify-between text-[#4f4541]">
                <span>Items ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#CE2D4F] font-bold">
                  <span>Discount Applied ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#33251e] font-bold pt-1 border-t border-[#33251e]/10 text-sm">
                <span>Total Payment</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#33251e] hover:bg-[#8d4e20] text-white rounded-full font-label-sm text-xs uppercase tracking-widest font-bold shadow-md transition-all cursor-pointer"
            >
              Confirm &amp; Place Floral Order
            </button>
          </form>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="font-headline-sm text-2xl font-bold text-[#33251e]">
              Thank You for Celebrating!
            </h4>

            <p className="text-xs text-[#4f4541] max-w-sm mx-auto leading-relaxed">
              Your floral arrangement has been assigned to our master florist at Atelier Maritime. We will handpick your stems at dawn and deliver with quiet reverie.
            </p>

            <div className="p-4 bg-[#ffdbc7]/50 rounded-2xl border border-[#33251e]/10 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-[#4f4541]">Order Reference:</span>
                <span className="font-mono font-bold text-[#33251e]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#4f4541]">Recipient:</span>
                <span className="text-[#33251e]">{recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#4f4541]">Scheduled Window:</span>
                <span className="text-[#33251e]">{deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#4f4541]">Destination:</span>
                <span className="text-[#33251e]">{address}, {city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#33251e] text-white rounded-full text-xs uppercase font-bold tracking-wider hover:bg-[#8d4e20] transition-colors"
            >
              Return to Floral Sea
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
