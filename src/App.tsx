import React, { useState } from 'react';
import { TabType, CartItem, Product, PlannedItem, Order } from './types';
import { PRODUCTS, INITIAL_PAST_ORDERS, INITIAL_PLANNED_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { DrawerNav } from './components/DrawerNav';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ShopScreen } from './components/ShopScreen';
import { AIPlannerScreen } from './components/AIPlannerScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SmartAssistantChat } from './components/SmartAssistantChat';
import { CartDrawer } from './components/CartDrawer';
import { Modal } from './components/InfoModals';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [products] = useState<Product[]>(PRODUCTS);
  const [location, setLocation] = useState('Mumbai, MH');

  // Initial cart with 2 items matching mockup badge count "2"
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[4], quantity: 1 }, // Fresh Farm Whole Milk 1L
    { product: PRODUCTS[1], quantity: 1 }, // Amul Butter 500g
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([
    PRODUCTS[0], // Aashirvaad Atta 5kg
    PRODUCTS[2], // India Gate Basmati 5kg
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_PAST_ORDERS);
  const [savedLists, setSavedLists] = useState<{ name: string; items: PlannedItem[] }[]>([
    { name: 'Weekly Vegetarian Plan (4P)', items: INITIAL_PLANNED_ITEMS },
  ]);

  // AI Assistant Drawer / Widget
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState('');

  // Cart Drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Global Toast
  const [toast, setToast] = useState<string | null>(null);

  // Sidebar info modals
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddMultipleToCart = (productsToAdd: Product[]) => {
    productsToAdd.forEach((p) => handleAddToCart(p, 1));
    showToast(`Added ${productsToAdd.length} items to your cart!`);
    setIsAssistantOpen(false);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleQuickRestock = () => {
    // Reorders Taaza Milk, Brown Bread, Eggs, Atta
    const restockItems = [PRODUCTS[8], PRODUCTS[9], PRODUCTS[7], PRODUCTS[0]];
    restockItems.forEach((p) => {
      if (p) handleAddToCart(p, 1);
    });
    showToast('Reordered 4 items from your last delivery!');
    setIsCartOpen(true);
  };

  const handleOrganizeList = (listText: string) => {
    // Intelligent smart list parser
    const lower = listText.toLowerCase();
    const matchedProducts: Product[] = [];

    products.forEach((p) => {
      const nameTerms = p.name.toLowerCase().split(' ');
      if (nameTerms.some((t) => t.length > 2 && lower.includes(t))) {
        if (!matchedProducts.includes(p)) {
          matchedProducts.push(p);
        }
      }
    });

    if (matchedProducts.length === 0) {
      matchedProducts.push(PRODUCTS[4], PRODUCTS[1], PRODUCTS[9]);
    }

    matchedProducts.forEach((p) => handleAddToCart(p, 1));
    showToast(`AI organized ${matchedProducts.length} items into your cart!`);
    setIsCartOpen(true);
  };

  const handleAddAllPlannedToCart = (items: PlannedItem[]) => {
    items.forEach((item) => {
      const prod =
        products.find((p) => p.id === item.productId) ||
        products.find((p) => p.name.toLowerCase().includes(item.name.toLowerCase().slice(0, 4))) ||
        PRODUCTS[4];
      handleAddToCart(prod, 1);
    });
    showToast(`Added ${items.length} planner items to cart!`);
    setIsCartOpen(true);
  };

  const handleSaveList = (name: string, items: PlannedItem[]) => {
    setSavedLists((prev) => [...prev, { name, items }]);
  };

  const handleCheckoutSuccess = () => {
    const newOrder: Order = {
      id: `SK-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Today, Just now',
      itemsCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
      total: cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
      status: 'Preparing',
      items: [...cartItems],
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    showToast('Order confirmed! Tracking delivery in Profile.');
    setActiveTab('profile');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 md:right-12 z-50 bg-[#006e2f] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        location={location}
        setLocation={setLocation}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Left Drawer */}
        <DrawerNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openOrdersModal={() => setActiveTab('profile')}
          openSmartListsModal={() => setActiveTab('planner')}
          openAddressModal={() => setActiveModal('address')}
          openPaymentModal={() => setActiveModal('payment')}
          openHelpModal={() => setActiveModal('help')}
        />

        {/* Dynamic Center Canvas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeScreen
              products={products}
              onAddToCart={handleAddToCart}
              onOpenAssistant={(prompt) => {
                if (prompt) setAssistantPrompt(prompt);
                setIsAssistantOpen(true);
              }}
              onNavigateTab={setActiveTab}
              onQuickRestock={handleQuickRestock}
              onOrganizeList={handleOrganizeList}
              savedAmount={450}
            />
          )}

          {activeTab === 'shop' && (
            <ShopScreen
              products={products}
              onAddToCart={handleAddToCart}
              onOpenAssistant={(prompt) => {
                if (prompt) setAssistantPrompt(prompt);
                setIsAssistantOpen(true);
              }}
            />
          )}

          {activeTab === 'planner' && (
            <AIPlannerScreen
              onAddAllToCart={handleAddAllPlannedToCart}
              onSaveList={handleSaveList}
              allProducts={products}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistScreen
              items={wishlist}
              onAddToCart={handleAddToCart}
              onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              orders={orders}
              savedLists={savedLists}
              onReorder={(order) => {
                order.items.forEach((i) => handleAddToCart(i.product, i.quantity));
                showToast(`Reordered ${order.itemsCount} items from order ${order.id}!`);
                setIsCartOpen(true);
              }}
              onLoadList={(items) => {
                setActiveTab('planner');
                showToast('Loaded saved list into AI Planner!');
              }}
              location={location}
            />
          )}
        </main>
      </div>

      {/* Floating Action Button (FAB) - AI Assistant */}
      {!isAssistantOpen && (
        <button
          id="fab-ai-assistant"
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 bg-gradient-to-br from-[#006e2f] to-[#005321] text-white p-3.5 md:p-4 rounded-full shadow-[0px_20px_25px_-5px_rgba(31,41,55,0.25)] hover:scale-105 active:scale-95 transition-transform z-40 flex items-center justify-center group border border-[#6bff8f]/30 cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <span className="material-symbols-outlined text-[26px] md:text-[28px]" data-icon="smart_toy">
            smart_toy
          </span>
          <span className="absolute -top-1.5 -right-1.5 bg-[#ba1a1a] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse shadow-xs">
            1
          </span>
        </button>
      )}

      {/* SmartKart Assistant Chat Widget */}
      <SmartAssistantChat
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onAddToCart={handleAddToCart}
        onAddMultipleToCart={handleAddMultipleToCart}
        allProducts={products}
        initialPrompt={assistantPrompt}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCartItems([])}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sidebar Modals */}
      <Modal
        isOpen={activeModal === 'address'}
        onClose={() => setActiveModal(null)}
        title="Saved Addresses"
      >
        <div className="flex flex-col gap-3 text-xs">
          <div className="p-3 bg-[#f2f4f6] rounded-xl border border-[#006e2f]/30 flex justify-between items-start">
            <div>
              <span className="font-bold text-sm text-[#191c1e] block">Home (Primary)</span>
              <p className="text-[#555f6f] mt-0.5">Flat 402, Greenfield Apts, Bandra West, Mumbai 400050</p>
              <span className="text-[#006e2f] font-semibold mt-1 inline-block">Default for 15-min delivery</span>
            </div>
            <span className="material-symbols-outlined text-[#006e2f]">check_circle</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#bccbb9]/40 flex justify-between items-start">
            <div>
              <span className="font-bold text-sm text-[#191c1e] block">Work Office</span>
              <p className="text-[#555f6f] mt-0.5">Floor 9, Tower B, Bandra Kurla Complex, Mumbai 400051</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'payment'}
        onClose={() => setActiveModal(null)}
        title="Payment Methods"
      >
        <div className="flex flex-col gap-3 text-xs">
          <div className="p-3 bg-[#f2f4f6] rounded-xl border border-[#bccbb9]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#005ac2] text-[24px]">credit_card</span>
              <div>
                <span className="font-bold text-sm text-[#191c1e] block">HDFC Bank Millennia</span>
                <span className="text-[#555f6f]">•••• 4892 (5% Cashback on SmartKart)</span>
              </div>
            </div>
            <span className="text-[#006e2f] font-bold">Primary</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#bccbb9]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#006e2f] text-[24px]">account_balance_wallet</span>
              <div>
                <span className="font-bold text-sm text-[#191c1e] block">UPI / Google Pay</span>
                <span className="text-[#555f6f]">ananya@okhdfcbank</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'help'}
        onClose={() => setActiveModal(null)}
        title="SmartKart Help & Support"
      >
        <div className="flex flex-col gap-3 text-xs text-[#3d4a3d]">
          <p>Need assistance with your grocery order, missing item, or refund?</p>
          <div className="p-3 bg-[#d8e2ff]/40 rounded-xl border border-[#82abff]/40 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#005ac2]">support_agent</span>
            <div>
              <span className="font-bold text-[#001a42] block">Gold Priority Concierge Active</span>
              <span>Instant WhatsApp support at +91 98200 11223</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
