import React, { useState } from 'react';
import { Order, PlannedItem, Product } from '../types';

interface ProfileScreenProps {
  orders: Order[];
  savedLists: { name: string; items: PlannedItem[] }[];
  onReorder: (order: Order) => void;
  onLoadList: (items: PlannedItem[]) => void;
  location: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  orders,
  savedLists,
  onReorder,
  onLoadList,
  location,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'lists' | 'membership'>('orders');

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#bccbb9]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover shadow-sm ring-4 ring-[#22c55e]/20"
            alt="Ananya Sharma"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwJFX6b1UIpXU6aLFZyimqMMJdUNiIvmRVyjM5Ck-ncHoXR8Gt6PN3JE1Brf2pyNoetYGPD_uBsDgsTn9DRsRQ2Y7jiRcEYYxdsaTcjdaEfDwBrxDeBlvuekfgQ_WqaL8iyZ05KMgWSFZnyka6cHYG9E8gxFE-PB_pqYcHPKhfqdq3cv6F-muI5A-PkG5z_0psQ-X6OiQ4DVkAWD--ITUDn85ovYWFUxFQUgAMfN41ZglvWGLnYVTG"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#191c1e]">Ananya Sharma</h2>
              <span className="bg-[#22c55e] text-[#004b1e] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] fill">stars</span>
                <span>GOLD</span>
              </span>
            </div>
            <p className="text-xs text-[#555f6f]">ananya.sharma@example.com • +91 98201 45890</p>
            <p className="text-xs text-[#006e2f] font-semibold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {location} (Default Home)
            </p>
          </div>
        </div>

        {/* AI Stats */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-[#f2f4f6] px-4 py-2.5 rounded-xl border border-[#bccbb9]/30 text-center">
            <span className="text-[10px] text-[#555f6f] font-bold uppercase tracking-wider block">
              Total Saved
            </span>
            <span className="text-base font-extrabold text-[#006e2f]">₹2,450</span>
          </div>
          <div className="flex-1 md:flex-none bg-[#d8e2ff]/50 px-4 py-2.5 rounded-xl border border-[#82abff]/30 text-center">
            <span className="text-[10px] text-[#003d88] font-bold uppercase tracking-wider block">
              Smart Coins
            </span>
            <span className="text-base font-extrabold text-[#005ac2]">480 pts</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e0e3e5] pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#006e2f] text-white shadow-xs'
              : 'text-[#3d4a3d] hover:bg-[#f2f4f6]'
          }`}
        >
          Past Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('lists')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-colors cursor-pointer ${
            activeTab === 'lists'
              ? 'bg-[#006e2f] text-white shadow-xs'
              : 'text-[#3d4a3d] hover:bg-[#f2f4f6]'
          }`}
        >
          Saved Smart Lists ({savedLists.length})
        </button>
        <button
          onClick={() => setActiveTab('membership')}
          className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-colors cursor-pointer ${
            activeTab === 'membership'
              ? 'bg-[#006e2f] text-white shadow-xs'
              : 'text-[#3d4a3d] hover:bg-[#f2f4f6]'
          }`}
        >
          Gold Benefits
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-[#bccbb9]/30 flex flex-col md:flex-row justify-between md:items-center gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#191c1e]">{order.id}</span>
                  <span className="text-[10px] bg-[#22c55e]/20 text-[#004b1e] font-bold px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[#555f6f] mt-0.5">{order.date} • {order.itemsCount} items</p>
                <div className="flex gap-2 mt-2">
                  {order.items.map((i, idx) => (
                    <img
                      key={idx}
                      src={i.product.image}
                      alt={i.product.name}
                      className="w-8 h-8 rounded-lg object-contain bg-[#f2f4f6] p-0.5"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2 md:pt-0 border-[#e0e3e5]">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-[#555f6f] block">Total Amount</span>
                  <span className="text-sm font-extrabold text-[#191c1e]">₹{order.total}</span>
                </div>
                <button
                  onClick={() => onReorder(order)}
                  className="bg-[#22c55e] text-[#004b1e] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#4ae176] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'lists' && (
        <div className="flex flex-col gap-4">
          {savedLists.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#bccbb9]/30 text-xs text-[#555f6f]">
              No saved smart lists yet. Use the AI Grocery Planner to generate and save custom meal lists!
            </div>
          ) : (
            savedLists.map((list, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 shadow-xs border border-[#bccbb9]/30 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#191c1e]">{list.name}</h3>
                  <p className="text-xs text-[#555f6f]">{list.items.length} ingredients & staples</p>
                </div>
                <button
                  onClick={() => onLoadList(list.items)}
                  className="bg-[#006e2f] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#005321] transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span>Load into Planner</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'membership' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#bccbb9]/30 flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#006e2f] text-3xl">local_shipping</span>
            <h3 className="text-sm font-bold text-[#191c1e]">Unlimited Free Deliveries</h3>
            <p className="text-xs text-[#555f6f]">No minimum order value required for all orders across Mumbai.</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[#bccbb9]/30 flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#005ac2] text-3xl">trending_down</span>
            <h3 className="text-sm font-bold text-[#191c1e]">Exclusive AI Price Matching</h3>
            <p className="text-xs text-[#555f6f]">Automatic price matching against local supermarket rates with instant refund credits.</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[#bccbb9]/30 flex flex-col gap-2">
            <span className="material-symbols-outlined text-amber-500 text-3xl">support_agent</span>
            <h3 className="text-sm font-bold text-[#191c1e]">Priority 24/7 Concierge</h3>
            <p className="text-xs text-[#555f6f]">Direct line to dedicated grocery concierges for customized fresh produce selection.</p>
          </div>
        </div>
      )}
    </div>
  );
};
