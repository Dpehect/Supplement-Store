"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function CartSidebar() {
  const router = useRouter();
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const total = items.reduce((sum, item) => {
    // Fiyat formatı "3.799 TL" gibi. Bunu sayıya çevirelim.
    const priceStr = item.price.replace(" TL", "").replace(".", "");
    const priceNum = parseInt(priceStr, 10);
    return sum + priceNum * item.quantity;
  }, 0);

  const formattedTotal = total.toLocaleString("tr-TR") + " TL";

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-comicBlack border-l-4 border-black h-full flex flex-col shadow-[-8px_0_0_#000] animate-slide-in-right overflow-hidden">
        <div className="absolute inset-0 bg-halftone-orange opacity-10 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-comicYellow">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-black" />
            <h2 className="font-comic text-2xl uppercase tracking-wider text-black">SEPETİNİZ</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 border-2 border-black rounded-lg hover:bg-comicOrange transition-colors bg-white shadow-[2px_2px_0_#000]"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-white/50 font-sans italic mt-10">
              Sepetiniz şu an boş.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white border-2 border-black rounded-xl p-3 shadow-comic">
                <div className="w-20 h-20 bg-comicGrayLight border-2 border-black rounded-lg p-2 relative flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-comic text-sm uppercase text-black leading-tight">{item.name}</h3>
                    <p className="font-sans text-[10px] font-bold text-comicGrayLight">{item.flavor}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-comic text-sm text-comicYellow text-stroke-black tracking-wide">
                      {item.price}
                    </span>
                    <div className="flex items-center gap-2 border-2 border-black rounded-md bg-comicGray">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-comicRed hover:text-white text-black font-black transition-colors"
                      >
                        -
                      </button>
                      <span className="font-comic text-sm px-2 text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-green-500 hover:text-white text-black font-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-4 border-black bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="font-sans font-bold text-lg text-comicGray">ARA TOPLAM</span>
            <span className="font-comic text-2xl text-comicYellow text-stroke-black tracking-wider">
              {formattedTotal}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full py-4 bg-comicOrange border-4 border-black rounded-xl font-comic text-2xl uppercase tracking-widest text-black shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#000]"
          >
            SİPARİŞİ TAMAMLA
          </button>
        </div>
      </div>
    </div>
  );
}
