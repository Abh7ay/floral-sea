import React, { useState } from 'react';
import { X, Star, Heart, ShieldCheck, Clock, Sparkles, Plus, Minus, Calendar, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    size: 'Signature Petite' | 'Grand Classic' | 'Haute Couture Deluxe',
    giftMessage: string
  ) => void;
  currency: 'USD' | 'INR';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'Signature Petite' | 'Grand Classic' | 'Haute Couture Deluxe'>('Grand Classic');
  const [giftMessage, setGiftMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<'today' | 'tomorrow' | 'scheduled'>('tomorrow');
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'delivery'>('details');
  const [isLiked, setIsLiked] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Size multipliers
  const sizeMultiplier =
    selectedSize === 'Signature Petite' ? 0.85 : selectedSize === 'Haute Couture Deluxe' ? 1.35 : 1.0;

  const currentPriceUsd = product.priceUsd * sizeMultiplier;
  const currentPriceInr = product.priceInr * sizeMultiplier;

  const formattedPrice =
    currency === 'USD'
      ? `$${currentPriceUsd.toFixed(2)}`
      : `₹${Math.round(currentPriceInr).toLocaleString()}`;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, giftMessage);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#fff8f6] rounded-3xl shadow-2xl border border-[#33251e]/15 overflow-hidden my-auto animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Product Details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-[#33251e] border border-[#33251e]/15 flex items-center justify-center hover:bg-[#33251e] hover:text-white transition-colors shadow-sm focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-4 sm:p-6 bg-[#ffdbc7]/30 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#33251e]/10">
            <div>
              {/* Main Image with Arch Frame */}
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-t-[120px] rounded-b-2xl overflow-hidden bg-[#ffdbc7]/70 border border-[#33251e]/15 shadow-inner flex items-center justify-center p-2">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-[110px] rounded-b-xl transition-all duration-300"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-6 bg-white/95 text-[#33251e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-6 w-9 h-9 rounded-full bg-white/90 text-[#33251e] flex items-center justify-center hover:scale-105 transition-transform shadow-sm"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#CE2D4F] text-[#CE2D4F]' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 mt-4 justify-center">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? 'border-[#33251e] scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Atelier Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 pt-6 mt-4 border-t border-[#33251e]/10 text-center text-[#4f4541]">
              <div className="flex flex-col items-center">
                <Clock className="w-4 h-4 text-[#8d4e20] mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Hand-Tied</span>
                <span className="text-[10px] text-[#4f4541]/80">At dawn daily</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#8d4e20] mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-wider">7-Day Bloom</span>
                <span className="text-[10px] text-[#4f4541]/80">Freshness pledge</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-4 h-4 text-[#8d4e20] mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Eco-Craft</span>
                <span className="text-[10px] text-[#4f4541]/80">Organic wrapping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Size, Gift Note, Purchase Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#8d4e20] font-semibold uppercase tracking-widest mb-1">
                <span>{product.category} • {product.varietyCategory || 'Atelier Selection'}</span>
                <div className="flex items-center gap-1 text-[#33251e]">
                  <Star className="w-3.5 h-3.5 fill-[#eab308] text-[#eab308]" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-[#4f4541]">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#33251e]">
                {product.name}
              </h2>
              <p className="text-xs text-[#4f4541] italic mt-0.5">{product.subtitle}</p>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-title-editorial text-2xl sm:text-3xl font-bold text-[#33251e]">
                  {formattedPrice}
                </span>
                <span className="text-xs text-[#4f4541]/70 line-through">
                  {currency === 'USD'
                    ? `$${(currentPriceUsd * 1.3).toFixed(2)}`
                    : `₹${Math.round(currentPriceInr * 1.3).toLocaleString()}`}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#CE2D4F] bg-[#CE2D4F]/10 px-2 py-0.5 rounded-full">
                  Save 25%
                </span>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4f4541] block mb-2">
                  Select Arrangement Scale
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Signature Petite', 'Grand Classic', 'Haute Couture Deluxe'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedSize === sz
                          ? 'bg-[#33251e] text-white border-[#33251e] shadow-sm font-semibold'
                          : 'bg-white text-[#4f4541] border-[#33251e]/15 hover:border-[#33251e]'
                      }`}
                    >
                      {sz.split(' ')[0]}
                      <span className="block text-[10px] opacity-75">{sz.split(' ').slice(1).join(' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stems & Fragrance Pill */}
              {product.stems && (
                <div className="mt-4 p-3 bg-[#ffdbc7]/30 rounded-xl border border-[#33251e]/10">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#33251e]">Featured Flora:</span>
                    <span className="text-[#8d4e20] font-medium">{product.fragranceProfile}</span>
                  </div>
                  <p className="text-xs text-[#4f4541]">
                    {product.stems.join(' • ')}
                  </p>
                </div>
              )}

              {/* Delivery Timing Options */}
              <div className="mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4f4541] block mb-1.5">
                  Earliest Hand-Delivery
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeliveryDate('today')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                      deliveryDate === 'today'
                        ? 'border-[#33251e] bg-[#fceae2] text-[#33251e] font-bold'
                        : 'border-[#33251e]/15 text-[#4f4541]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Today (Express)
                  </button>
                  <button
                    onClick={() => setDeliveryDate('tomorrow')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                      deliveryDate === 'tomorrow'
                        ? 'border-[#33251e] bg-[#fceae2] text-[#33251e] font-bold'
                        : 'border-[#33251e]/15 text-[#4f4541]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Tomorrow (Standard)
                  </button>
                </div>
              </div>

              {/* Personalized Gift Message */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#33251e]">Complimentary Gift Note:</span>
                  <span className="text-[#4f4541]/70 text-[11px]">(Wax-sealed parchment)</span>
                </div>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write a heartfelt note to accompany these blooms..."
                  rows={2}
                  maxLength={180}
                  className="w-full bg-white border border-[#33251e]/20 rounded-xl p-2.5 text-xs text-[#33251e] placeholder-[#4f4541]/50 focus:outline-none focus:border-[#33251e]"
                />
              </div>

              {/* Accordion Tabs */}
              <div className="mt-4 pt-3 border-t border-[#33251e]/10">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider border-b border-[#33251e]/10 pb-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={activeTab === 'details' ? 'text-[#33251e] border-b-2 border-[#8d4e20]' : 'text-[#4f4541]/60'}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={activeTab === 'care' ? 'text-[#33251e] border-b-2 border-[#8d4e20]' : 'text-[#4f4541]/60'}
                  >
                    Care Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={activeTab === 'delivery' ? 'text-[#33251e] border-b-2 border-[#8d4e20]' : 'text-[#4f4541]/60'}
                  >
                    Dispatch Notes
                  </button>
                </div>

                <div className="pt-2 text-xs text-[#4f4541] leading-relaxed">
                  {activeTab === 'details' && <p>{product.description}</p>}
                  {activeTab === 'care' && (
                    <p>
                      Trim stems 1–2 inches diagonally at a 45° angle under cool running water. Place in a clean vase filled with lukewarm water and flower food. Change water every 48 hours for 7–10 days of vivid display.
                    </p>
                  )}
                  {activeTab === 'delivery' && (
                    <p>
                      Hand-delivered in temperature-stabilized artisanal carriers. Includes biodegradable water pouch keeping stems hydrated in transit.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Stepper + Add to Bag */}
            <div className="pt-4 border-t border-[#33251e]/15 flex items-center gap-3">
              <div className="flex items-center bg-[#fceae2] rounded-full px-3 py-2 border border-[#33251e]/15 text-[#33251e]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center hover:text-[#8d4e20]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center hover:text-[#8d4e20]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-[#33251e] hover:bg-[#8d4e20] text-white rounded-full font-label-sm text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#feab75]" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag • {formattedPrice}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
