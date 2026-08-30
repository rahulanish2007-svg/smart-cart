import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 border border-[#bccbb9]/30 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e3e5] mb-4">
          <h3 className="text-base font-bold text-[#191c1e]">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#f2f4f6] rounded-full text-[#555f6f] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
