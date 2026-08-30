import React, { useState, useMemo } from 'react';
import { PlannedItem, PlannerSettings, Product } from '../types';
import { INITIAL_PLANNED_ITEMS } from '../data/mockData';

interface AIPlannerScreenProps {
  onAddAllToCart: (items: PlannedItem[]) => void;
  onSaveList: (name: string, items: PlannedItem[]) => void;
  allProducts: Product[];
}

export const AIPlannerScreen: React.FC<AIPlannerScreenProps> = ({
  onAddAllToCart,
  onSaveList,
  allProducts,
}) => {
  const [settings, setSettings] = useState<PlannerSettings>({
    people: 4,
    days: 7,
    diet: 'Vegetarian',
    budget: 3000,
    tags: ['High Protein'],
  });

  const [plannedItems, setPlannedItems] = useState<PlannedItem[]>(INITIAL_PLANNED_ITEMS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableTags = [
    { label: 'High Protein', icon: 'local_fire_department' },
    { label: 'Under 30 Mins Prep', icon: 'timer' },
    { label: 'Heart Healthy', icon: 'favorite' },
    { label: 'Budget Friendly', icon: 'savings' },
    { label: 'Kid Friendly', icon: 'child_care' },
  ];

  const toggleTag = (tag: string) => {
    setSettings((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Dynamic meal generation based on settings
    setTimeout(() => {
      let baseItems: PlannedItem[] = [];

      if (settings.diet === 'Vegetarian') {
        baseItems = [
          {
            id: 'plan-1',
            name: 'Organic Spinach',
            brand: 'Fresh Farms',
            category: 'Produce & Fresh',
            quantity: `${Math.max(1, Math.round(settings.people / 2))} Bunches`,
            price: 60 * Math.max(1, Math.round(settings.people / 2)),
            icon: 'nutrition',
            checked: true,
            productId: 'organic-spinach-2-bunches',
          },
          {
            id: 'plan-2',
            name: 'Paneer (Cottage Cheese)',
            brand: 'Dairy Best',
            category: 'Produce & Fresh',
            quantity: `${settings.people * 125}g`,
            price: 120 * Math.max(1, Math.round(settings.people / 2)),
            icon: 'egg',
            checked: true,
            productId: 'premium-malai-paneer-200g',
          },
          {
            id: 'plan-3',
            name: 'Basmati Rice',
            brand: 'Premium Long Grain',
            category: 'Pantry Staples',
            quantity: `${Math.min(5, Math.max(2, Math.round(settings.days * settings.people * 0.15)))} kg`,
            price: 350,
            icon: 'grain',
            checked: true,
            productId: 'india-gate-basmati-5kg',
          },
          {
            id: 'plan-4',
            name: 'Toor Dal (Yellow Lentils)',
            brand: 'Unpolished',
            category: 'Pantry Staples',
            quantity: `${Math.max(1, Math.round(settings.people * 0.35))} kg`,
            price: 180,
            icon: 'soup_kitchen',
            checked: true,
            productId: 'toor-dal-1kg',
          },
          {
            id: 'plan-5',
            name: 'Fresh Farm Whole Milk',
            brand: 'SmartKart Dairy',
            category: 'Produce & Fresh',
            quantity: `${settings.days * 1}L`,
            price: 68 * Math.min(5, settings.days),
            icon: 'local_drink',
            checked: true,
            productId: 'fresh-whole-milk-1l',
          },
        ];
      } else if (settings.diet === 'Vegan') {
        baseItems = [
          {
            id: 'plan-v1',
            name: 'Organic Spinach & Kale',
            brand: 'Fresh Farms',
            category: 'Produce & Fresh',
            quantity: '3 Bunches',
            price: 180,
            icon: 'nutrition',
            checked: true,
          },
          {
            id: 'plan-v2',
            name: 'Organic Soya Tofu (500g)',
            brand: 'Green Life',
            category: 'Produce & Fresh',
            quantity: '2 packs',
            price: 220,
            icon: 'eco',
            checked: true,
          },
          {
            id: 'plan-v3',
            name: 'India Gate Basmati Rice (5kg)',
            brand: 'India Gate',
            category: 'Pantry Staples',
            quantity: '5 kg',
            price: 799,
            icon: 'grain',
            checked: true,
            productId: 'india-gate-basmati-5kg',
          },
          {
            id: 'plan-v4',
            name: 'Organic Moong Dal (1kg)',
            brand: 'Tata Sampann',
            category: 'Pantry Staples',
            quantity: '1 kg',
            price: 165,
            icon: 'soup_kitchen',
            checked: true,
          },
        ];
      } else if (settings.diet === 'Keto') {
        baseItems = [
          {
            id: 'plan-k1',
            name: 'Farm Fresh Brown Eggs (12 pcs)',
            brand: 'Country Farms',
            category: 'Produce & Fresh',
            quantity: '2 Cartons',
            price: 130,
            icon: 'egg',
            checked: true,
            productId: 'farm-fresh-brown-eggs-6',
          },
          {
            id: 'plan-k2',
            name: 'Amul Butter & Cream Cheese',
            brand: 'Amul',
            category: 'Produce & Fresh',
            quantity: '500g',
            price: 270,
            icon: 'breakfast_dining',
            checked: true,
            productId: 'amul-butter-500g',
          },
          {
            id: 'plan-k3',
            name: 'Almond Flour (500g)',
            brand: 'NutriChoice',
            category: 'Pantry Staples',
            quantity: '1 pack',
            price: 420,
            icon: 'grain',
            checked: true,
          },
          {
            id: 'plan-k4',
            name: 'Cold Pressed Olive Oil (1L)',
            brand: 'Borges',
            category: 'Pantry Staples',
            quantity: '1 bottle',
            price: 650,
            icon: 'liquor',
            checked: true,
          },
        ];
      } else {
        baseItems = [...INITIAL_PLANNED_ITEMS];
      }

      if (settings.tags.includes('High Protein')) {
        baseItems.push({
          id: 'plan-hp',
          name: 'Greek Yogurt 400g (High Protein)',
          brand: 'Epigamia',
          category: 'Produce & Fresh',
          quantity: '2 tubs',
          price: 160,
          icon: 'nutrition',
          checked: true,
        });
      }

      setPlannedItems(baseItems);
      setIsGenerating(false);
    }, 600);
  };

  const toggleItemCheck = (id: string) => {
    setPlannedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedItems = useMemo(
    () => plannedItems.filter((i) => i.checked),
    [plannedItems]
  );

  const estimatedTotal = useMemo(
    () => checkedItems.reduce((acc, curr) => acc + curr.price, 0),
    [checkedItems]
  );

  const produceItems = useMemo(
    () => plannedItems.filter((i) => i.category === 'Produce & Fresh'),
    [plannedItems]
  );

  const pantryItems = useMemo(
    () => plannedItems.filter((i) => i.category === 'Pantry Staples'),
    [plannedItems]
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      {/* Toast */}
      {savedSuccess && (
        <div className="fixed top-20 right-4 md:right-12 z-50 bg-[#006e2f] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[18px]">bookmark_added</span>
          <span>Smart List saved to your profile!</span>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
          Smart Grocery Planner
        </h2>
        <p className="text-sm text-[#3d4a3d]">
          Let AI build your perfect weekly shopping list based on your dietary needs and budget.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form (Bento Style) */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xs p-5 flex flex-col gap-4 border border-[#bccbb9]/30">
            <div className="flex items-center gap-2 text-[#006e2f]">
              <span className="material-symbols-outlined text-[20px] fill" data-icon="tune">
                tune
              </span>
              <h3 className="text-base font-bold text-[#191c1e]">Planner Settings</h3>
            </div>

            {/* Form Fields: People & Days */}
            <div className="grid grid-cols-2 gap-3">
              {/* People */}
              <div className="glass-input flex flex-col gap-1 bg-[#f2f4f6] rounded-xl p-3 border border-[#bccbb9]/30 transition-all">
                <label className="text-[10px] font-bold text-[#555f6f] uppercase tracking-wider">
                  People
                </label>
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-[#555f6f] text-[18px]">
                    group
                  </span>
                  <input
                    aria-label="Number of people"
                    type="number"
                    min={1}
                    max={20}
                    value={settings.people}
                    onChange={(e) =>
                      setSettings({ ...settings, people: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-transparent border-none text-right text-sm font-bold text-[#191c1e] focus:ring-0 p-0 outline-none"
                  />
                </div>
              </div>

              {/* Days */}
              <div className="glass-input flex flex-col gap-1 bg-[#f2f4f6] rounded-xl p-3 border border-[#bccbb9]/30 transition-all">
                <label className="text-[10px] font-bold text-[#555f6f] uppercase tracking-wider">
                  Days
                </label>
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-[#555f6f] text-[18px]">
                    calendar_today
                  </span>
                  <input
                    aria-label="Number of days"
                    type="number"
                    min={1}
                    max={30}
                    value={settings.days}
                    onChange={(e) =>
                      setSettings({ ...settings, days: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-transparent border-none text-right text-sm font-bold text-[#191c1e] focus:ring-0 p-0 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Diet Preferences */}
            <div className="glass-input flex flex-col gap-1 bg-[#f2f4f6] rounded-xl p-3 border border-[#bccbb9]/30 transition-all">
              <label className="text-[10px] font-bold text-[#555f6f] uppercase tracking-wider">
                Diet Preferences
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006e2f] text-[18px]">eco</span>
                <select
                  aria-label="Diet Preferences"
                  value={settings.diet}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      diet: e.target.value as PlannerSettings['diet'],
                    })
                  }
                  className="w-full bg-transparent border-none text-xs md:text-sm font-semibold text-[#191c1e] focus:ring-0 p-0 cursor-pointer outline-none"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Keto">Keto</option>
                  <option value="Everything">Everything</option>
                </select>
              </div>
            </div>

            {/* Weekly Budget */}
            <div className="glass-input flex flex-col gap-1 bg-[#f2f4f6] rounded-xl p-3 border border-[#bccbb9]/30 transition-all">
              <label className="text-[10px] font-bold text-[#555f6f] uppercase tracking-wider">
                Weekly Budget
              </label>
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#006e2f]">₹</span>
                <input
                  aria-label="Budget Amount"
                  type="number"
                  step={100}
                  min={1000}
                  max={10000}
                  value={settings.budget}
                  onChange={(e) =>
                    setSettings({ ...settings, budget: parseInt(e.target.value) || 1000 })
                  }
                  className="w-full bg-transparent border-none text-right text-base font-extrabold text-[#191c1e] focus:ring-0 p-0 outline-none"
                />
              </div>
              <input
                type="range"
                min={1000}
                max={10000}
                step={250}
                value={settings.budget}
                onChange={(e) =>
                  setSettings({ ...settings, budget: parseInt(e.target.value) })
                }
                className="w-full accent-[#006e2f] mt-2 cursor-pointer"
              />
            </div>

            {/* Generate Button */}
            <button
              id="generate-smart-list-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-2 bg-[#006e2f] text-white font-bold text-sm py-3 rounded-full shadow-sm hover:bg-[#005321] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[18px] ${isGenerating ? 'animate-spin' : ''}`}>
                {isGenerating ? 'refresh' : 'auto_awesome'}
              </span>
              <span>{isGenerating ? 'Analyzing Nutrients & Prices...' : 'Generate Smart List'}</span>
            </button>
          </div>

          {/* AI Suggestion Chips */}
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = settings.tags.includes(tag.label);
              return (
                <button
                  key={tag.label}
                  onClick={() => toggleTag(tag.label)}
                  className={`text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#d8e2ff] text-[#001a42] border-[#82abff] font-semibold'
                      : 'bg-[#d8e2ff]/30 text-[#003d88] border-[#82abff]/40 hover:bg-[#d8e2ff]/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{tag.icon}</span>
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Right Column: Generated List & Actions */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xs border border-[#bccbb9]/30 overflow-hidden flex flex-col h-full">
            {/* List Header */}
            <div className="bg-[#f2f4f6] p-4 border-b border-[#bccbb9]/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006e2f] text-[20px]">
                  receipt_long
                </span>
                <h3 className="text-sm md:text-base font-bold text-[#191c1e]">
                  AI Recommended Groceries
                </h3>
              </div>
              <span className="bg-[#22c55e] text-[#004b1e] text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] fill">check_circle</span>
                <span>Budget Optimized</span>
              </span>
            </div>

            {/* List Content */}
            <div className="flex-grow overflow-y-auto max-h-[420px] divide-y divide-[#e0e3e5]/60">
              {/* Category: Produce & Fresh */}
              {produceItems.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-[#ffffff] border-b border-[#e0e3e5]/60 text-[10px] font-bold text-[#555f6f] uppercase tracking-wider sticky top-0 backdrop-blur-xs">
                    Produce & Fresh
                  </div>
                  {produceItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItemCheck(item.id)}
                      className={`flex items-center justify-between p-3 px-4 hover:bg-[#f7f9fb] transition-colors cursor-pointer ${
                        !item.checked ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItemCheck(item.id)}
                          className="w-4 h-4 text-[#006e2f] rounded border-[#bccbb9] focus:ring-[#006e2f] cursor-pointer"
                        />
                        <div className="w-9 h-9 rounded-full bg-[#eceef0] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#555f6f] text-[18px]">
                            {item.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs md:text-sm font-bold text-[#191c1e]">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#555f6f]">{item.brand}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#555f6f] font-medium">
                          {item.quantity}
                        </span>
                        <span className="text-xs md:text-sm font-extrabold text-[#006e2f] w-14 text-right">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Category: Pantry Staples */}
              {pantryItems.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-[#ffffff] border-b border-[#e0e3e5]/60 text-[10px] font-bold text-[#555f6f] uppercase tracking-wider sticky top-0 backdrop-blur-xs">
                    Pantry Staples
                  </div>
                  {pantryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItemCheck(item.id)}
                      className={`flex items-center justify-between p-3 px-4 hover:bg-[#f7f9fb] transition-colors cursor-pointer ${
                        !item.checked ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItemCheck(item.id)}
                          className="w-4 h-4 text-[#006e2f] rounded border-[#bccbb9] focus:ring-[#006e2f] cursor-pointer"
                        />
                        <div className="w-9 h-9 rounded-full bg-[#eceef0] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#555f6f] text-[18px]">
                            {item.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs md:text-sm font-bold text-[#191c1e]">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#555f6f]">{item.brand}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#555f6f] font-medium">
                          {item.quantity}
                        </span>
                        <span className="text-xs md:text-sm font-extrabold text-[#006e2f] w-14 text-right">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* List Footer / Summary */}
            <div className="bg-[#f2f4f6] p-4 border-t border-[#bccbb9]/20 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#555f6f] font-medium">Estimated Total</span>
                <span className="text-lg md:text-xl font-extrabold text-[#191c1e]">
                  ₹{estimatedTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onSaveList(`Weekly ${settings.diet} Plan (${settings.people}P)`, checkedItems);
                    setSavedSuccess(true);
                    setTimeout(() => setSavedSuccess(false), 2500);
                  }}
                  className="bg-white text-[#006e2f] border border-[#006e2f] text-xs font-bold px-3.5 py-2 rounded-full hover:bg-[#f2f4f6] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                  <span className="hidden sm:inline">Save List</span>
                </button>
                <button
                  id="planner-add-all-btn"
                  onClick={() => onAddAllToCart(checkedItems)}
                  className="bg-[#006e2f] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-[#005321] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span>
                  <span>Add All to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Feature Grid (Bottom Section) */}
      <section className="mt-4 flex flex-col gap-4">
        <h3 className="text-base md:text-lg font-bold text-[#191c1e] text-center">
          Powered by SmartKart Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl shadow-xs p-5 flex flex-col items-center text-center gap-2 border border-[#bccbb9]/30 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#d6e0f3] text-[#005ac2] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[24px] fill" data-icon="search_insights">
                search_insights
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#191c1e]">AI Product Finder</h4>
            <p className="text-xs text-[#555f6f] leading-relaxed">
              Locates exactly what you need based on nutritional goals and past preferences.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl shadow-xs p-5 flex flex-col items-center text-center gap-2 border border-[#bccbb9]/30 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#82abff]/30 text-[#003d88] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[24px] fill" data-icon="shopping_basket">
                shopping_basket
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#191c1e]">Smart Cart Optimizer</h4>
            <p className="text-xs text-[#555f6f] leading-relaxed">
              Suggests complementary items and flags forgotten staples automatically.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl shadow-xs p-5 flex flex-col items-center text-center gap-2 border border-[#bccbb9]/30 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/20 text-[#006e2f] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[24px] fill" data-icon="price_check">
                price_check
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#191c1e]">AI Price Comparison</h4>
            <p className="text-xs text-[#555f6f] leading-relaxed">
              Real-time budget tracking and alternative suggestions to save money.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
