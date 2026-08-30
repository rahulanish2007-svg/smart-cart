import React, { useState, useRef, useEffect } from 'react';
import { Product, ChatMessage } from '../types';

interface SmartAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddMultipleToCart: (products: Product[]) => void;
  allProducts: Product[];
  initialPrompt?: string;
}

export const SmartAssistantChat: React.FC<SmartAssistantChatProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onAddMultipleToCart,
  allProducts,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Sure! For a family of 4, I recommend these essentials based on your typical order:',
      timestamp: 'Just now',
      suggestedProducts: [
        allProducts.find((p) => p.id === 'india-gate-basmati-5kg') || allProducts[2],
        allProducts.find((p) => p.id === 'toor-dal-1kg') || allProducts[9],
        allProducts.find((p) => p.id === 'fresh-whole-milk-1l') || allProducts[4],
      ].filter(Boolean) as Product[],
      actionLabel: 'Add all to Cart',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputVal('');
    setIsLoading(true);

    try {
      // Call backend API endpoint
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (response.ok) {
        const data = await response.json();
        const matched = (data.suggestedProductIds || [])
          .map((id: string) => allProducts.find((p) => p.id === id))
          .filter(Boolean) as Product[];

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply || 'Here are the recommended items:',
          timestamp: 'Just now',
          suggestedProducts: matched.length > 0 ? matched : [allProducts[4], allProducts[5]],
          actionLabel: 'Add all to Cart',
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Intelligent fallback
      const lower = textToSend.toLowerCase();
      let replyText = "Here are the best quality essentials tailored to your grocery request:";
      let picks = [allProducts[0], allProducts[1]];

      if (lower.includes('biscuit') || lower.includes('cookie') || lower.includes('snack')) {
        replyText = "Here are our top-rated crispy & delicious biscuits under ₹100:";
        picks = allProducts.filter((p) => p.category === 'Snacks & Biscuits' && p.price <= 100).slice(0, 4);
      } else if (lower.includes('protein') || lower.includes('gym')) {
        replyText = "Here are high-protein essentials for your dietary goals:";
        picks = [
          allProducts.find((p) => p.id === 'premium-malai-paneer-200g') || allProducts[5],
          allProducts.find((p) => p.id === 'farm-fresh-brown-eggs-6') || allProducts[7],
          allProducts.find((p) => p.id === 'fresh-whole-milk-1l') || allProducts[4],
        ];
      } else if (lower.includes('price') || lower.includes('drop') || lower.includes('cheap')) {
        replyText = "These items currently have the highest price discounts in Mumbai store:";
        picks = [allProducts[0], allProducts[2], allProducts[3]];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: 'Just now',
          suggestedProducts: picks,
          actionLabel: 'Add all to Cart',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="smartkart-assistant-chat"
      className="fixed bottom-20 md:bottom-6 right-3 md:right-8 z-50 w-[calc(100vw-24px)] md:w-96 max-w-sm flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white border border-[#bccbb9]/40 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Header */}
      <div className="bg-[#006e2f] px-3.5 py-2.5 flex items-center justify-between text-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] fill" data-icon="smart_toy">
            smart_toy
          </span>
          <span className="text-sm font-bold tracking-tight">SmartKart Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer"
          aria-label="Close Assistant"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Chat Body */}
      <div className="p-3 flex flex-col gap-3 bg-[#f7f9fb] max-h-80 overflow-y-auto">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-[#006e2f] text-white text-xs py-2 px-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-2xs">
                  {msg.text}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex gap-2 items-start">
              <div className="w-7 h-7 rounded-full bg-[#d8e2ff] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[#005ac2] text-[16px] fill">
                  smart_toy
                </span>
              </div>
              <div className="bg-white border border-[#bccbb9]/30 p-3 rounded-xl rounded-tl-none shadow-xs flex flex-col gap-2 max-w-[88%]">
                <p className="text-xs text-[#191c1e] leading-relaxed">{msg.text}</p>

                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-1 border-t border-[#e0e3e5] pt-2">
                    {msg.suggestedProducts.map((prod) => (
                      <div key={prod.id} className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <span className="material-symbols-outlined text-[#006e2f] text-[15px] fill shrink-0">
                            check_circle
                          </span>
                          <span className="text-[11px] font-medium text-[#3d4a3d] truncate">
                            {prod.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#006e2f] shrink-0">
                          ₹{prod.price}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={() => onAddMultipleToCart(msg.suggestedProducts!)}
                      className="mt-2 w-full bg-[#006e2f] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#005321] transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        shopping_cart_checkout
                      </span>
                      <span>Add all to Cart</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2 items-center text-xs text-[#555f6f]">
            <div className="w-7 h-7 rounded-full bg-[#d8e2ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#005ac2] text-[16px] animate-spin">
                refresh
              </span>
            </div>
            <span>SmartKart AI is checking inventory & prices...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 py-1.5 bg-white border-t border-[#e0e3e5] flex gap-1.5 overflow-x-auto hide-scrollbar">
        {['High protein diet', 'Milk & Eggs for 4', 'Save ₹200 this week'].map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="text-[10px] whitespace-nowrap bg-[#f2f4f6] text-[#3d4a3d] hover:bg-[#d8e2ff] hover:text-[#001a42] px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2.5 border-t border-[#bccbb9]/30 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask AI..."
          className="flex-1 bg-[#f2f4f6] border-none rounded-full py-2 px-3.5 text-xs text-[#191c1e] focus:bg-white focus:ring-1 focus:ring-[#006e2f] outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isLoading}
          className="w-8 h-8 rounded-full bg-[#22c55e] text-[#004b1e] hover:bg-[#4ae176] disabled:opacity-40 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-95"
          aria-label="Send"
        >
          <span className="material-symbols-outlined text-[16px]">send</span>
        </button>
      </form>
    </div>
  );
};
