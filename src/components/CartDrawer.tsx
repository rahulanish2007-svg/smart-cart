import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
  onCheckoutSuccess,
}) => {
  const [selectedSlot, setSelectedSlot] = useState('Express 15-Mins');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const originalSubtotal = items.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );
  const totalSavings = Math.max(0, originalSubtotal - subtotal) + (subtotal > 0 ? 30 : 0);
  const deliveryFee = 0; // Gold member free delivery
  const finalTotal = subtotal;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckoutSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 bg-[#f2f4f6] border-b border-[#bccbb9]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006e2f] text-[24px]">
                shopping_cart
              </span>
              <h2 className="text-base font-bold text-[#191c1e]">
                Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#e0e3e5] rounded-full text-[#3d4a3d] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Body */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
              <span className="material-symbols-outlined text-5xl text-[#bccbb9]">
                remove_shopping_cart
              </span>
              <h3 className="text-base font-bold text-[#191c1e]">Your cart is empty</h3>
              <p className="text-xs text-[#555f6f]">
                Explore deals or ask our AI assistant to add weekly essentials.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#006e2f] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#005321] transition-all cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Gold Delivery Badge */}
              <div className="bg-[#22c55e]/15 border border-[#22c55e]/30 rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#004b1e]">
                <span className="material-symbols-outlined text-[20px] text-[#006e2f]">verified</span>
                <div>
                  <span className="font-bold">SmartKart Gold Active:</span> Free Instant Delivery & 5% AI Cashback applied.
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col divide-y divide-[#e0e3e5]">
                {items.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain p-1 bg-[#f2f4f6] rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#191c1e] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#555f6f]">{item.product.unit || item.product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-extrabold text-[#006e2f]">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-[10px] text-[#6d7b6c] line-through">
                            ₹{item.product.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-[#f2f4f6] rounded-full border border-[#bccbb9]/40 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#191c1e] hover:bg-white transition-colors cursor-pointer text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#191c1e]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#006e2f] hover:bg-white transition-colors cursor-pointer text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Slot Selection */}
              <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#bccbb9]/30 flex flex-col gap-2">
                <span className="text-xs font-bold text-[#191c1e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006e2f]">schedule</span>
                  Delivery Time Slot
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {['Express 15-Mins', 'Evening 7-9 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`text-xs py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer font-medium ${
                        selectedSlot === slot
                          ? 'bg-[#006e2f] text-white border-[#006e2f] font-semibold'
                          : 'bg-white text-[#3d4a3d] border-[#bccbb9]/40 hover:bg-[#f2f4f6]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-[#f2f4f6] p-4 rounded-xl flex flex-col gap-2 text-xs border border-[#bccbb9]/20">
                <span className="font-bold text-[#191c1e] text-xs">Bill Details</span>
                <div className="flex justify-between text-[#555f6f]">
                  <span>Item Total</span>
                  <span>₹{subtotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#006e2f] font-semibold">
                    <span>AI Discount & Deals</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#555f6f]">
                  <span>Delivery Fee</span>
                  <span className="text-[#006e2f] font-bold">FREE (Gold)</span>
                </div>
                <div className="my-1 border-t border-[#bccbb9]/30" />
                <div className="flex justify-between text-sm font-extrabold text-[#191c1e]">
                  <span>To Pay</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-[#bccbb9]/30 flex flex-col gap-2">
              <button
                id="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[#006e2f] text-white font-bold text-sm py-3.5 rounded-full hover:bg-[#005321] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      refresh
                    </span>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay ₹{finalTotal}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
              <button
                onClick={onClearCart}
                className="text-[11px] text-[#ba1a1a] hover:underline text-center cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
