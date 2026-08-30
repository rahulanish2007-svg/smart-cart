import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: 'home' },
    { id: 'shop' as TabType, label: 'Shop', icon: 'storefront' },
    { id: 'planner' as TabType, label: 'AI Planner', icon: 'smart_toy' },
    { id: 'wishlist' as TabType, label: 'Wishlist', icon: 'favorite' },
    { id: 'profile' as TabType, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      id="bottom-nav-bar"
      className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 pb-3 pt-2 bg-[#f7f9fb]/95 backdrop-blur-lg border-t border-[#bccbb9]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-t-2xl"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`bottom-nav-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 transition-all duration-150 active:scale-90 cursor-pointer ${
              isActive
                ? 'bg-[#d6e0f3] text-[#191c1e] px-4 rounded-full font-semibold shadow-xs'
                : 'text-[#555f6f] hover:text-[#006e2f] px-3'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                isActive ? 'fill text-[#006e2f]' : ''
              }`}
              data-icon={tab.icon}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-medium tracking-tight mt-0.5">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
