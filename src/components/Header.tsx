import React, { useState } from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  openCart: () => void;
  location: string;
  setLocation: (loc: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  location,
  setLocation,
}) => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const locations = [
    { name: 'Mumbai, MH', desc: 'Bandra West, 400050' },
    { name: 'Andheri East, MH', desc: 'MIDC Industry Area, 400093' },
    { name: 'Powai, MH', desc: 'Hiranandani Gardens, 400076' },
    { name: 'South Mumbai, MH', desc: 'Colaba Causeway, 400005' },
    { name: 'Bengaluru, KA', desc: 'Indiranagar 100ft Rd, 560038' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f7f9fb]/95 backdrop-blur-md shadow-sm border-b border-[#bccbb9]/20 transition-all">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-2 max-w-7xl mx-auto h-16 relative">
        {/* Delivery Location */}
        <div className="relative">
          <button
            id="location-picker-btn"
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#e0e3e5]/60 transition-all rounded-full px-3 py-1.5 active:scale-95 text-left"
          >
            <span className="material-symbols-outlined text-[#006e2f] text-[22px]" data-icon="location_on">
              location_on
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-[#3d4a3d]">Delivering to</span>
              <span className="text-[13px] font-bold text-[#191c1e] leading-tight flex items-center gap-1">
                {location}
                <span className="material-symbols-outlined text-[#3d4a3d] text-[16px]">
                  expand_more
                </span>
              </span>
            </div>
          </button>

          {/* Location dropdown */}
          {showLocationPicker && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#bccbb9]/30 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-[#555f6f] px-3 py-1 uppercase tracking-wider">
                Select Delivery Location
              </div>
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setLocation(loc.name);
                    setShowLocationPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex flex-col transition-colors ${
                    location === loc.name
                      ? 'bg-[#d8e2ff] text-[#001a42] font-semibold'
                      : 'hover:bg-[#f2f4f6] text-[#191c1e]'
                  }`}
                >
                  <span className="font-medium text-xs">{loc.name}</span>
                  <span className="text-[10px] text-[#555f6f]">{loc.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand Name Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="cursor-pointer absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        >
          <span className="text-xl md:text-2xl font-bold text-[#006e2f] tracking-tight">
            SmartKart AI
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#22c55e]/15 text-[#006e2f]">
            Express
          </span>
        </button>

        {/* Right side - Desktop nav links & Cart */}
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-[#d6e0f3] text-[#191c1e] font-semibold'
                  : 'text-[#3d4a3d] hover:bg-[#e0e3e5]/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'shop'
                  ? 'bg-[#d6e0f3] text-[#191c1e] font-semibold'
                  : 'text-[#3d4a3d] hover:bg-[#e0e3e5]/60'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'planner'
                  ? 'bg-[#006e2f] text-white font-semibold'
                  : 'text-[#006e2f] hover:bg-[#e0e3e5]/60 font-semibold'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              AI Planner
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-[#d6e0f3] text-[#191c1e] font-semibold'
                  : 'text-[#3d4a3d] hover:bg-[#e0e3e5]/60'
              }`}
            >
              Wishlist
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#d6e0f3] text-[#191c1e] font-semibold'
                  : 'text-[#3d4a3d] hover:bg-[#e0e3e5]/60'
              }`}
            >
              Profile
            </button>
          </nav>

          {/* Cart Button */}
          <button
            id="cart-toggle-btn"
            onClick={openCart}
            className="relative p-2.5 hover:bg-[#e0e3e5]/60 transition-all rounded-full active:scale-90 text-[#006e2f] flex items-center justify-center cursor-pointer"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="shopping_cart">
              shopping_cart
            </span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#ba1a1a] text-white text-[11px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in duration-200">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
