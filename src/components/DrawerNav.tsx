import React from 'react';
import { TabType } from '../types';

interface DrawerNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  openOrdersModal: () => void;
  openSmartListsModal: () => void;
  openAddressModal: () => void;
  openPaymentModal: () => void;
  openHelpModal: () => void;
}

export const DrawerNav: React.FC<DrawerNavProps> = ({
  activeTab,
  setActiveTab,
  openOrdersModal,
  openSmartListsModal,
  openAddressModal,
  openPaymentModal,
  openHelpModal,
}) => {
  return (
    <aside className="hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16 left-0 w-72 bg-[#f2f4f6] z-30 rounded-r-2xl p-5 border-r border-[#bccbb9]/30 shadow-sm shrink-0">
      {/* Profile Header */}
      <div
        onClick={() => setActiveTab('profile')}
        className="flex items-center gap-3 mb-6 p-2 rounded-xl hover:bg-white/60 cursor-pointer transition-colors"
      >
        <img
          className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#006e2f]/20"
          alt="Ananya Sharma"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwJFX6b1UIpXU6aLFZyimqMMJdUNiIvmRVyjM5Ck-ncHoXR8Gt6PN3JE1Brf2pyNoetYGPD_uBsDgsTn9DRsRQ2Y7jiRcEYYxdsaTcjdaEfDwBrxDeBlvuekfgQ_WqaL8iyZ05KMgWSFZnyka6cHYG9E8gxFE-PB_pqYcHPKhfqdq3cv6F-muI5A-PkG5z_0psQ-X6OiQ4DVkAWD--ITUDn85ovYWFUxFQUgAMfN41ZglvWGLnYVTG"
        />
        <div className="overflow-hidden">
          <h2 className="text-base font-bold text-[#006e2f] truncate">Ananya Sharma</h2>
          <div className="flex items-center gap-1 text-xs text-[#3d4a3d] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
            <span>SmartKart Gold Member</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1.5 flex-grow">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#d6e0f3] text-[#006e2f] font-bold shadow-xs'
              : 'text-[#3d4a3d] hover:bg-white/80'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeTab === 'home' ? 'fill' : ''}`} data-icon="home">
            home
          </span>
          Home Feed
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
            activeTab === 'shop'
              ? 'bg-[#d6e0f3] text-[#006e2f] font-bold shadow-xs'
              : 'text-[#3d4a3d] hover:bg-white/80'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeTab === 'shop' ? 'fill' : ''}`} data-icon="storefront">
            storefront
          </span>
          Explore Shop
        </button>

        <button
          onClick={() => setActiveTab('planner')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
            activeTab === 'planner'
              ? 'bg-[#006e2f] text-white font-bold shadow-sm'
              : 'text-[#006e2f] hover:bg-white/80 font-semibold'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="smart_toy">
            smart_toy
          </span>
          AI Grocery Planner
        </button>

        <div className="my-2 border-t border-[#bccbb9]/30"></div>

        <button
          onClick={openOrdersModal}
          className="flex items-center gap-3 px-3.5 py-2.5 text-[#3d4a3d] hover:bg-white/80 rounded-xl transition-colors text-sm text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="package_2">
            package_2
          </span>
          My Orders
        </button>

        <button
          onClick={openSmartListsModal}
          className="flex items-center gap-3 px-3.5 py-2.5 text-[#3d4a3d] hover:bg-white/80 rounded-xl transition-colors text-sm text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="format_list_bulleted">
            format_list_bulleted
          </span>
          Smart Lists
        </button>

        <button
          onClick={openAddressModal}
          className="flex items-center gap-3 px-3.5 py-2.5 text-[#3d4a3d] hover:bg-white/80 rounded-xl transition-colors text-sm text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="location_home">
            location_home
          </span>
          Address Book
        </button>

        <button
          onClick={openPaymentModal}
          className="flex items-center gap-3 px-3.5 py-2.5 text-[#3d4a3d] hover:bg-white/80 rounded-xl transition-colors text-sm text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="payments">
            payments
          </span>
          Payment Methods
        </button>

        <button
          onClick={openHelpModal}
          className="flex items-center gap-3 px-3.5 py-2.5 text-[#3d4a3d] hover:bg-white/80 rounded-xl transition-colors text-sm text-left mt-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="help">
            help
          </span>
          Help Center
        </button>
      </nav>
    </aside>
  );
};
