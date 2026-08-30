import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface ShopScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenAssistant: (prompt?: string) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  products,
  onAddToCart,
  onOpenAssistant,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Dairy & Breakfast');
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const smartChips = [
    'Biscuits under ₹100',
    'High-protein snacks',
    'Weekly essentials',
    'Under ₹50',
    'Fresh Today',
  ];

  const categories = [
    'Dairy & Breakfast',
    'Snacks & Biscuits',
    'Staples',
    'Fruits & Veg',
    'Cooking Essentials',
    'All Items',
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleChipClick = (chip: string) => {
    if (activeChip === chip) {
      setActiveChip(null);
      setSearchQuery('');
      return;
    }
    setActiveChip(chip);

    if (chip === 'Biscuits under ₹100') {
      setSelectedCategory('All Items');
      setSearchQuery('biscuit');
    } else if (chip === 'High-protein snacks') {
      setSelectedCategory('All Items');
      setSearchQuery('paneer eggs milk');
    } else if (chip === 'Weekly essentials') {
      setSelectedCategory('All Items');
      setSearchQuery('atta rice dal oil');
    } else if (chip === 'Fresh Today') {
      setSelectedCategory('All Items');
      setSearchQuery('fresh');
    } else if (chip === 'Under ₹50') {
      setSelectedCategory('All Items');
      setSearchQuery('50');
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All Items') {
      if (selectedCategory === 'Dairy & Breakfast') {
        list = list.filter((p) => p.category === 'Dairy' || p.category === 'Breakfast' || p.category === 'Dairy & Breakfast');
      } else if (selectedCategory === 'Snacks & Biscuits') {
        list = list.filter((p) => p.category === 'Snacks & Biscuits' || p.name.toLowerCase().includes('biscuit') || p.name.toLowerCase().includes('cookie'));
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (q === '50') {
        list = list.filter((p) => p.price <= 50);
      } else if (q === 'biscuit') {
        list = list.filter((p) => (p.category === 'Snacks & Biscuits' || p.name.toLowerCase().includes('biscuit') || p.name.toLowerCase().includes('cookie')) && p.price <= 100);
      } else {
        const terms = q.split(' ').filter(Boolean);
        list = list.filter((p) =>
          terms.some(
            (t) =>
              p.name.toLowerCase().includes(t) ||
              p.category.toLowerCase().includes(t) ||
              (p.brand && p.brand.toLowerCase().includes(t)) ||
              (p.description && p.description.toLowerCase().includes(t))
          )
        );
      }
    }

    return list;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 md:right-12 z-50 bg-[#006e2f] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search & Smart Suggestions Section */}
      <section className="w-full flex flex-col gap-2.5">
        <div className="relative w-full shadow-xs rounded-xl overflow-hidden group bg-white border border-[#bccbb9]/40">
          <input
            id="shop-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries, staples..."
            className="w-full bg-white py-3 pl-11 pr-12 text-sm text-[#191c1e] outline-none placeholder:text-[#555f6f]/70"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555f6f] group-focus-within:text-[#006e2f] transition-colors text-[20px]">
            search
          </span>
          <button
            onClick={() => {
              setSearchQuery('Whole Milk Paneer Curd');
              triggerToast('Voice recognition: "Whole Milk Paneer Curd"');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#006e2f] p-1.5 bg-[#22c55e]/15 rounded-full hover:bg-[#22c55e]/30 transition-colors cursor-pointer active:scale-90"
            title="Voice search"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>

        {/* Smart Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
          <span className="material-symbols-outlined text-[#006e2f] text-[18px] shrink-0 fill">
            auto_awesome
          </span>
          {smartChips.map((chip) => {
            const isSelected = activeChip === chip;
            return (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className={`text-xs px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-[#005ac2] text-white shadow-xs'
                    : 'bg-[#d8e2ff]/50 text-[#003d88] hover:bg-[#d8e2ff]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Pills Switcher */}
      <section className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveChip(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#006e2f] text-white shadow-xs'
                : 'bg-white text-[#3d4a3d] border border-[#bccbb9]/40 hover:bg-[#f2f4f6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Category Title & View All */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#191c1e]">
            {selectedCategory === 'All Items' ? 'All Groceries' : selectedCategory}
          </h2>
          <p className="text-xs text-[#3d4a3d] mt-0.5">
            {filteredProducts.length} items available in Mumbai store
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCategory('All Items');
            setSearchQuery('');
          }}
          className="text-xs font-bold text-[#006e2f] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* Product Grid matching Screen 2 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-4 w-full">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xs border border-[#bccbb9]/30 flex flex-col overflow-hidden hover:shadow-md transition-all relative group"
          >
            {/* Tag Badge */}
            {product.isFreshToday && (
              <div className="absolute top-2.5 left-2.5 bg-[#22c55e] text-[#004b1e] text-[10px] font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1 shadow-2xs">
                <span className="material-symbols-outlined text-[12px]">eco</span>
                <span>Fresh Today</span>
              </div>
            )}
            {product.discountPercent && !product.isFreshToday && (
              <div className="absolute top-2.5 left-2.5 bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                {product.discountPercent}% OFF
              </div>
            )}

            {/* Image Box */}
            <div className="h-36 bg-[#f2f4f6] w-full relative flex items-center justify-center p-2 overflow-hidden">
              <img
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                alt={product.name}
                src={product.image}
              />
            </div>

            {/* Content */}
            <div className="p-3 md:p-3.5 flex flex-col flex-1 gap-1">
              <p className="text-[11px] font-medium text-[#555f6f]">{product.category}</p>
              <h3 className="text-xs md:text-sm font-bold text-[#191c1e] line-clamp-2 leading-tight">
                {product.name}
              </h3>
              {product.unit && (
                <span className="text-[10px] text-[#555f6f]">{product.unit}</span>
              )}

              <div className="mt-auto pt-2 flex justify-between items-center border-t border-[#e0e3e5]/60">
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-extrabold text-[#006e2f]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-[#6d7b6c] line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  id={`shop-add-${product.id}`}
                  onClick={() => {
                    onAddToCart(product);
                    triggerToast(`Added ${product.name} to Cart`);
                  }}
                  className="bg-[#006e2f]/10 text-[#006e2f] hover:bg-[#006e2f] hover:text-white p-2 rounded-full transition-all active:scale-90 cursor-pointer"
                  aria-label={`Add ${product.name}`}
                >
                  <span className="material-symbols-outlined text-[18px] font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#bccbb9]/30 flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-[#555f6f]">search_off</span>
          <h3 className="text-base font-bold text-[#191c1e]">No groceries matched "{searchQuery}"</h3>
          <p className="text-xs text-[#555f6f]">Try searching for milk, atta, paneer, bread, or fruits.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Items');
            }}
            className="mt-2 bg-[#006e2f] text-white text-xs font-semibold px-4 py-2 rounded-full cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
