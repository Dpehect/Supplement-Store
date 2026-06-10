"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  // Generate a random order number for the demo
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-comicBlack flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full bg-white border-4 border-black rounded-3xl p-8 md:p-12 shadow-comic-lg text-center relative animate-float">
        
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 border-4 border-black rounded-full p-4 shadow-comic">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>

        <h1 className="font-comic text-4xl md:text-5xl uppercase font-black text-black mt-8 mb-4">
          SİPARİŞİNİZ ALINDI!
        </h1>
        
        <p className="font-sans text-gray-500 font-bold text-sm md:text-base leading-relaxed mb-8">
          Tebrikler! Siparişinizi başarıyla aldık. Dönüşüm serüveninize başlamak için ilk adımı attınız.
        </p>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-gray-500">
            <Package className="w-6 h-6" />
            <span className="font-sans font-bold text-sm uppercase">SİPARİŞ NO:</span>
          </div>
          <span className="font-comic text-xl font-black text-black">#{orderNumber}</span>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center justify-center gap-2 bg-comicOrange hover:bg-comicRed text-black hover:text-white font-comic text-xl px-6 py-4 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase"
        >
          ANA SAYFAYA DÖN
          <ArrowRight className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
}
