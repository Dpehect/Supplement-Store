"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CreditCard, Truck, User, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If cart is empty, redirect to home
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  const subtotal = items.reduce((sum, item) => {
    const priceStr = item.price.replace(" TL", "").replace(".", "");
    const priceNum = parseInt(priceStr, 10);
    return sum + priceNum * item.quantity;
  }, 0);
  const shipping = subtotal > 1000 ? 0 : 49.90;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/success");
  };

  if (!mounted || items.length === 0) return null;

  return (
    <div className="min-h-screen bg-comicBlack py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          ALIŞVERİŞE DÖN
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Shipping Information */}
              <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-comic relative">
                <div className="absolute -top-4 -left-4 bg-comicYellow border-2 border-black rounded-xl px-4 py-1 -skew-x-6 transform -rotate-2 shadow-comic">
                  <span className="font-comic text-xl uppercase font-black text-black">TESLİMAT BİLGİLERİ</span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wide">AD SOYAD</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input required type="text" className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-10 py-3 font-sans font-bold text-sm text-black focus:border-black focus:bg-white outline-none transition-all" placeholder="Adınız Soyadınız" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wide">TELEFON</label>
                      <input required type="tel" className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-sans font-bold text-sm text-black focus:border-black focus:bg-white outline-none transition-all" placeholder="0 (5XX) XXX XX XX" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wide">AÇIK ADRES</label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <textarea required rows={3} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-10 py-3 font-sans font-bold text-sm text-black focus:border-black focus:bg-white outline-none transition-all resize-none" placeholder="Mahalle, Sokak, No, İlçe/İl"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-comic relative">
                <div className="absolute -top-4 -left-4 bg-comicOrange border-2 border-black rounded-xl px-4 py-1 -skew-x-6 transform -rotate-2 shadow-comic">
                  <span className="font-comic text-xl uppercase font-black text-black">ÖDEME BİLGİLERİ</span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wide">KART NUMARASI</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input required type="text" maxLength={19} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-10 py-3 font-sans font-bold text-sm text-black tracking-widest focus:border-black focus:bg-white outline-none transition-all" placeholder="XXXX XXXX XXXX XXXX" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wide">SON KULLANMA</label>
                      <input required type="text" maxLength={5} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-sans font-bold text-sm text-black focus:border-black focus:bg-white outline-none transition-all text-center" placeholder="AA/YY" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wide">CVV</label>
                      <input required type="text" maxLength={3} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-sans font-bold text-sm text-black focus:border-black focus:bg-white outline-none transition-all text-center" placeholder="XXX" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-sans font-bold text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>256-BIT SSL İLE GÜVENLİ ÖDEME</span>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-zinc-100 border-4 border-black rounded-2xl p-6 shadow-comic sticky top-24">
            <h3 className="font-comic text-2xl uppercase font-black text-black mb-6">SİPARİŞ ÖZETİ</h3>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4">
                  <div className="relative w-16 h-16 bg-white border-2 border-black rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-comic text-sm uppercase text-black leading-tight mb-1">{item.name}</h4>
                    <span className="font-sans text-xs font-bold text-gray-500">{item.quantity} ADET</span>
                  </div>
                  <span className="font-comic text-lg uppercase font-black text-comicOrange">
                    {(parseInt(item.price.replace(" TL", "").replace(".", ""), 10) * item.quantity).toLocaleString("tr-TR")} TL
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 font-sans font-bold text-sm border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>ARA TOPLAM</span>
                <span>{subtotal.toLocaleString("tr-TR")} TL</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>KARGO</span>
                <span>{shipping === 0 ? "ÜCRETSİZ" : `${shipping.toLocaleString("tr-TR")} TL`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-comic text-xl uppercase font-black text-black">TOPLAM</span>
              <span className="font-comic text-3xl uppercase font-black text-black">{total.toLocaleString("tr-TR")} TL</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full flex items-center justify-center gap-2 bg-comicYellow hover:bg-comicOrange text-black font-comic text-2xl px-6 py-4 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase animate-pulse-slow"
            >
              <Zap className="w-6 h-6 fill-black" />
              SİPARİŞİ ONAYLA
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
