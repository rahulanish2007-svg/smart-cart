import React from 'react';
import { Product } from '../types';

interface WishlistScreenProps {
  items: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  items,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-24 md:pb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1e]">Your Wishlist</h2>
          <p className="text-xs text-[#3d4a3d]">Saved items & price drop alerts</p>
        </div>
        <span className="text-xs font-semibold bg-[#d8e2ff] text-[#001a42] px-3 py-1 rounded-full">
          {items.length} items saved
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#bccbb9]/30 flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-5xl text-[#bccbb9]">favorite_border</span>
          <h3 className="text-base font-bold text-[#191c1e]">No items saved yet</h3>
          <p className="text-xs text-[#555f6f]">
            Save products you like to track price reductions and quick-restock.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#bccbb9]/30 flex flex-col gap-2 relative group hover:shadow-md transition-all"
            >
              <button
                onClick={() => onRemoveFromWishlist(product.id)}
                className="absolute top-2.5 right-2.5 p-1 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-full transition-colors z-10 cursor-pointer"
                title="Remove"
              >
                <span className="material-symbols-outlined text-[18px] fill">favorite</span>
              </button>

              <div className="aspect-square bg-[#f2f4f6] rounded-xl overflow-hidden relative flex items-center justify-center p-2">
                <img
                  className="w-full h-full object-contain mix-blend-multiply"
                  alt={product.name}
                  src={product.image}
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-xs md:text-sm font-bold text-[#191c1e] line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-[10px] text-[#555f6f] mt-0.5">{product.category}</p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e0e3e5]">
                <span className="text-sm md:text-base font-extrabold text-[#006e2f]">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-[#006e2f] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#005321] transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                  <span>Move</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
