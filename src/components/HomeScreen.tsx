import React, { useState } from 'react';
import { Product, TabType } from '../types';

interface HomeScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenAssistant: (initialPrompt?: string) => void;
  onNavigateTab: (tab: TabType) => void;
  onQuickRestock: () => void;
  onOrganizeList: (listText: string) => void;
  savedAmount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onAddToCart,
  onOpenAssistant,
  onNavigateTab,
  onQuickRestock,
  onOrganizeList,
  savedAmount = 450,
}) => {
  const [activeFilter, setActiveFilter] = useState('Smart Picks');
  const [smartListInput, setSmartListInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const filters = [
    'Smart Picks',
    'Fruits & Veg',
    'Dairy',
    'Snacks',
    'Personal Care',
    'Beverages',
  ];

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate speech-to-text
    setTimeout(() => {
      setSmartListInput('2L Whole Milk, 500g Paneer, 1 pack brown bread, 1kg bananas');
      setIsRecording(false);
      triggerToast('Voice converted: "2L Whole Milk, 500g Paneer..."');
    }, 1200);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSmartListInput('Basmati Rice 5kg, Toor Dal 1kg, Aashirvaad Atta 5kg, Saffola Oil 1L');
      triggerToast('Grocery receipt scanned & recognized!');
    }
  };

  const triggerToast = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const displayedDeals = React.useMemo(() => {
    if (activeFilter === 'Snacks') {
      return products.filter((p) => p.category === 'Snacks & Biscuits' || p.name.toLowerCase().includes('biscuit'));
    }
    if (activeFilter === 'Fruits & Veg') {
      return products.filter((p) => p.category === 'Fruits & Veg');
    }
    if (activeFilter === 'Dairy') {
      return products.filter((p) => p.category === 'Dairy' || p.category === 'Breakfast');
    }
    return products.filter((p) =>
      ['aashirvaad-atta-5kg', 'amul-butter-500g', 'india-gate-basmati-5kg', 'saffola-gold-oil-1l', 'britannia-bourbon-150g', 'dark-fantasy-choco-fills-75g'].includes(p.id)
    );
  }, [products, activeFilter]);

  const recommendedItems = products.filter((p) =>
    ['fresh-coriander-100g', 'robusta-bananas-1kg', 'britannia-good-day-butter-200g'].includes(p.id)
  );

  const handleCreateCart = () => {
    if (!smartListInput.trim()) {
      triggerToast('Please type or speak your grocery list first!');
      return;
    }
    onOrganizeList(smartListInput);
    setSmartListInput('');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 md:right-12 z-50 bg-[#006e2f] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{showNotification}</span>
        </div>
      )}

      {/* Hero Section (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Hero Banner */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-sm group min-h-[260px] md:min-h-[300px] flex flex-col justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyndRAmhIO0aXipDKg_6CEZlXo33rYxj0vXm8RknuPF3qsSXsfx0STJeNlYVS1rBm8aMuxHT1u-22QRgb4WMCu9pWDLwONzW2e0XnMP4eV8Ta9RAdbZZEHctyBBleVWriCR6VLxzVCUUI1VrdttCR6EKvj29g772BQXXRl2MVfEDcPItqE5JRqSR6G5HLWu_Lzx1md1iqWWvpYWe6aSsi3GaeYWEy3Ky3nsQxLlt9AegZ0wRFyQMV6')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb]/95 via-[#f7f9fb]/80 to-transparent" />
          <div className="relative h-full flex flex-col justify-center p-6 md:p-10 max-w-lg z-10">
            <span className="text-xs font-semibold text-[#006e2f] mb-2 flex items-center gap-1.5 uppercase tracking-wider bg-white/70 backdrop-blur-xs w-fit px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px] fill text-[#006e2f]" data-icon="auto_awesome">
                auto_awesome
              </span>
              AI-Powered Shopping
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#191c1e] mb-2 tracking-tight leading-tight">
              Shop Smarter with AI
            </h2>
            <p className="text-sm md:text-base text-[#3d4a3d] mb-6 leading-relaxed">
              Discover products, compare prices, and plan your groceries effortlessly.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                id="hero-start-shopping-btn"
                onClick={() => onNavigateTab('shop')}
                className="bg-[#006e2f] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#005321] transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Start Shopping</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                id="hero-ask-ai-btn"
                onClick={() => onOpenAssistant('Help me find the best weekly grocery deals and high-protein foods')}
                className="bg-white text-[#006e2f] border border-[#bccbb9] font-semibold text-sm px-5 py-3 rounded-full hover:bg-[#f2f4f6] transition-all flex items-center gap-2 active:scale-95 cursor-pointer shadow-2xs"
              >
                <span>Ask AI Assistant</span>
                <span className="material-symbols-outlined text-[18px] text-[#005ac2]" data-icon="chat_spark">
                  chat_spark
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side Bento column */}
        <div className="flex flex-col gap-4">
          {/* Quick Restock (Bento Box 2) */}
          <div className="bg-[#f2f4f6] rounded-2xl p-5 shadow-xs border border-[#bccbb9]/40 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <h3 className="text-base font-bold text-[#191c1e] mb-0.5">Quick Restock</h3>
                <p className="text-xs text-[#3d4a3d]">Based on your past orders</p>
              </div>
              <span
                className="material-symbols-outlined text-[#005ac2] bg-[#d8e2ff] w-8 h-8 flex items-center justify-center rounded-full text-[18px]"
                data-icon="history"
              >
                history
              </span>
            </div>

            {/* Overlapping Circles */}
            <div className="py-2 flex items-center justify-center relative z-10">
              <div className="flex -space-x-3 items-center">
                <img
                  className="w-13 h-13 rounded-full border-2 border-white object-cover shadow-xs bg-white"
                  alt="Amul Taaza Milk"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsN0aremtiHhIL_n_EPd9GMcm5-IyyCQo-XAFBaIiuaKX0OrOWAh6a1xbeP40GVHVx08TrgJt5CcgCKddyOfKqSybki6ae-EzKi9akxtGeWCkwX_Cn8oSmENugjFDv5qtHugp3ASnBNSQhftu12lTWVyDScaCF6HOtfiNekNX-UxwN7izgUWz4CZ17v_93CKV6ihUuGQULa6uOfWPCJPL2ZPxfLqYR9d9LLW9X4zOBr5Ya89c_vOId"
                />
                <img
                  className="w-13 h-13 rounded-full border-2 border-white object-cover shadow-xs bg-white"
                  alt="Brown Bread"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt_f3TzGCxlPVsLyz-2PyCugmPzAAFLy5dNjl0slNrwyb_dX9Zsq_2Ht2iSBD0Kn_oamBlkh7luyN7rRLWYNKELxwnXiLrIn5EqEQixZ-Np61M2-xxf99Sc4LkeuOi1HcKhlQZdiaK312-BO1L33L1IQ6XhnUZC_xyi8WE4oMrH55-L6F-lPSQFLNTd33IU77bOUr76GhC84oLTUhm3Z_-rtapdCcr_E4ZWNTd83jZA--KEKbSvs5-"
                />
                <img
                  className="w-13 h-13 rounded-full border-2 border-white object-cover shadow-xs bg-white"
                  alt="Eggs"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiSLX5GJ0mfqQ32mzcieaWuGrg0BORpMBJK1QAaLPgRPSHc-A-hb0D6ttOhsDeSIg70OT3fTNpbVSsALOndLiZr7M7VjqHW_xO9E-jPNlk7J4ttL_qFlJGayvtzwu4sL7TF8CmsktamzWuBKcr4nABWER2S3mzVYghcMqBi8wvgnuuEzdRk82ui0PLhfW7U338rv760nvqSARN1U-UvlE9X032B7tkrv00gst-jfUTzp6PG2RKJbf4"
                />
                <div className="w-13 h-13 rounded-full border-2 border-white bg-[#e0e3e5] flex items-center justify-center font-bold text-xs text-[#3d4a3d] shadow-xs z-10">
                  +3
                </div>
              </div>
            </div>

            <button
              id="reorder-cart-btn"
              onClick={onQuickRestock}
              className="mt-3 w-full bg-[#22c55e] text-[#004b1e] text-xs py-2.5 rounded-xl font-bold hover:bg-[#4ae176] transition-colors relative z-10 active:scale-95 cursor-pointer shadow-xs"
            >
              Reorder Cart
            </button>
            <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-[#006e2f]/10 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* AI Savings (Bento Box 3) */}
          <div className="bg-[#d6e0f3] text-[#121c2a] rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#005ac2] mb-1">
                <span className="material-symbols-outlined text-[18px]" data-icon="trending_down">
                  trending_down
                </span>
                <span>AI Price Drop</span>
              </div>
              <h3 className="text-3xl font-extrabold leading-tight text-[#191c1e]">₹{savedAmount}</h3>
              <p className="text-xs text-[#555f6f]">Saved this month using SmartKart</p>
            </div>

            <div
              onClick={() => onOpenAssistant('Show me which items in my cart have recent price drops')}
              className="relative z-10 flex items-center justify-between mt-3 bg-white/70 hover:bg-white p-2 rounded-xl backdrop-blur-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-7 h-7 rounded object-cover bg-white shrink-0"
                  alt="Aashirvaad Atta"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh8KEEM7b6QDeKMUCp4DxPkvRtQBZG1Y87hVscNqJli04vurhj4Q2uRvro5wZQdxu36j9I6EexhwO5k23RjRkUPk3d9tHdgLOSFp2ywBfEnQK8JOv8H0azwFJBWSD4spWpyxw-FdJN6JNLDlU_mgy2Bfzw4vIgYE56m4iCC40yjDkOU3GHrrLGp0Bra0Zyu2MAMNMS_oLO0zNgg9Mn2iSTtbLjCs7RBIRId8UpUhsHPeM84oHSOxMZ"
                />
                <span className="text-[11px] font-medium text-[#191c1e] truncate max-w-[130px]">
                  Aashirvaad Atta down by ₹20
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#005ac2]" data-icon="arrow_forward">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Filter Chips (Horizontal Scroll) */}
      <section className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        {filters.map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-[#d8e2ff] text-[#001a42] border border-[#82abff]'
                  : 'bg-white text-[#3d4a3d] border border-[#bccbb9]/40 hover:border-[#006e2f] hover:text-[#006e2f]'
              }`}
            >
              {filter === 'Smart Picks' && (
                <span className="material-symbols-outlined text-[15px] fill text-[#005ac2]">
                  auto_awesome
                </span>
              )}
              {filter}
            </button>
          );
        })}
      </section>

      {/* Today's Best Deals */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#191c1e]">Today's Best Deals</h2>
            <p className="text-xs text-[#3d4a3d] mt-0.5">Curated specially for you</p>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="text-xs font-bold text-[#006e2f] hover:underline flex items-center gap-1 cursor-pointer"
          >
            See All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-4">
          {displayedDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl p-3 shadow-xs border border-[#bccbb9]/30 flex flex-col gap-2 relative group hover:shadow-md transition-all"
            >
              {deal.discountPercent && (
                <div className="absolute top-2.5 left-2.5 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  -{deal.discountPercent}%
                </div>
              )}
              <div className="aspect-square bg-[#f2f4f6] rounded-xl overflow-hidden relative flex items-center justify-center p-2">
                <img
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  alt={deal.name}
                  src={deal.image}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-amber-500 fill">
                    star
                  </span>
                  <span className="text-[11px] text-[#3d4a3d] font-medium">
                    {deal.rating} ({deal.reviewsCount})
                  </span>
                </div>
                <h3 className="text-xs md:text-sm font-bold text-[#191c1e] line-clamp-2 leading-tight">
                  {deal.name}
                </h3>
                <p className="text-[10px] text-[#555f6f] mt-0.5">{deal.category}</p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e0e3e5]">
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-extrabold text-[#006e2f]">
                    ₹{deal.price}
                  </span>
                  {deal.originalPrice && (
                    <span className="text-[10px] text-[#6d7b6c] line-through">
                      ₹{deal.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  id={`add-deal-${deal.id}`}
                  onClick={() => {
                    onAddToCart(deal);
                    triggerToast(`Added ${deal.name} to Cart`);
                  }}
                  className="bg-[#e6e8ea] text-[#006e2f] hover:bg-[#006e2f] hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                  aria-label={`Add ${deal.name}`}
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendations (List View Style) */}
      <section className="bg-white rounded-2xl border border-[#bccbb9]/30 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#bccbb9]/20 flex items-center gap-2 bg-[#f2f4f6]">
          <span className="material-symbols-outlined text-[#005ac2] text-[20px]" data-icon="recommend">
            recommend
          </span>
          <h2 className="text-sm md:text-base font-bold text-[#191c1e]">Recommended for You</h2>
        </div>
        <div className="flex flex-col divide-y divide-[#e0e3e5]">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 hover:bg-[#f7f9fb] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f2f4f6] flex items-center justify-center shrink-0 overflow-hidden border border-[#bccbb9]/20">
                  <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs md:text-sm font-bold text-[#191c1e]">{item.name}</h4>
                  {item.tag && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.tagColor === 'tertiary-fixed'
                            ? 'bg-[#d8e2ff] text-[#001a42]'
                            : 'bg-[#d6e0f3] text-[#121c2a]'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-sm md:text-base font-extrabold text-[#006e2f]">
                  ₹{item.price}
                </span>
                <button
                  id={`add-rec-${item.id}`}
                  onClick={() => {
                    onAddToCart(item);
                    triggerToast(`Added ${item.name} to Cart`);
                  }}
                  className="text-[#006e2f] hover:bg-[#22c55e]/20 p-1.5 rounded-full transition-colors active:scale-90 cursor-pointer"
                  aria-label={`Add ${item.name}`}
                >
                  <span className="material-symbols-outlined text-[24px]">add_circle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => onNavigateTab('shop')}
          className="w-full py-3 text-center text-xs md:text-sm font-bold text-[#006e2f] hover:bg-[#f2f4f6] transition-colors border-t border-[#e0e3e5] cursor-pointer"
        >
          Show more recommendations
        </button>
      </section>

      {/* Smart Grocery Input / Smart List Organizer */}
      <section className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#006e2f]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#006e2f]/5 rounded-bl-full pointer-events-none" />
        <div className="flex items-start gap-3 relative z-10">
          <span className="material-symbols-outlined text-[#006e2f] text-[24px] mt-0.5" data-icon="edit_note">
            edit_note
          </span>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="smart-list-home" className="text-sm font-bold text-[#191c1e]">
                Smart List Organizer
              </label>
              <span className="text-[10px] text-[#005ac2] bg-[#d8e2ff] font-semibold px-2 py-0.5 rounded-full">
                AI Auto-categorize
              </span>
            </div>
            <textarea
              id="smart-list-home"
              value={smartListInput}
              onChange={(e) => setSmartListInput(e.target.value)}
              placeholder="Type your grocery list (e.g., Milk, bread, eggs) and let AI organize it into your cart..."
              rows={3}
              className="w-full bg-[#f2f4f6] border border-[#bccbb9]/40 rounded-xl p-3 text-xs md:text-sm text-[#191c1e] focus:bg-white focus:ring-2 focus:ring-[#006e2f] focus:border-[#006e2f] outline-none transition-all placeholder:text-[#555f6f]/70 resize-none shadow-inner"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-[#3d4a3d] hover:text-[#006e2f] hover:bg-[#f2f4f6]'
                  }`}
                  title="Speak list"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
                <label
                  className="p-2 rounded-full text-[#3d4a3d] hover:text-[#006e2f] hover:bg-[#f2f4f6] transition-colors cursor-pointer flex items-center justify-center"
                  title="Upload receipt or handwritten list"
                >
                  <span className="material-symbols-outlined text-[20px]">image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageInput}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                id="create-cart-btn"
                onClick={handleCreateCart}
                className="bg-[#006e2f] text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-full hover:bg-[#005321] transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Create Cart</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
