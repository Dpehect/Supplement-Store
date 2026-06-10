"use client";

import React, { useState } from "react";
import { Zap, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { items, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b-4 border-black bg-comicBlack py-4 px-6 md:px-12 flex items-center justify-between select-none">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        data-cursor="HOME!"
      >
        <div className="bg-comicOrange border-2 border-black rounded-lg px-3 py-1 -skew-x-6 transform rotate-1 transition-transform group-hover:scale-110 shadow-comic duration-200">
          <span className="font-comic text-2xl md:text-3xl text-black font-black tracking-wide">
            WEIDER
          </span>
        </div>
        <div className="bg-comicRed border-2 border-black rounded-md px-2 py-0.5 -skew-x-6 transform -rotate-2 -translate-x-1 shadow-comic group-hover:scale-105 duration-200">
          <span className="font-sans text-[10px] md:text-xs text-white font-extrabold tracking-wider uppercase">
            Supps
          </span>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-8 font-sans font-bold text-sm tracking-wider uppercase">
        <button
          onClick={() => scrollToSection("products")}
          className="hover:text-comicOrange transition-colors py-2 rounded-md px-2"
          data-cursor="PARÇALA!"
        >
          ÜRÜNLER
        </button>

        <button
          onClick={() => scrollToSection("story")}
          className="hover:text-comicOrange transition-colors py-2 rounded-md px-2"
          data-cursor="HİKAYE!"
        >
          HİKAYEMİZ
        </button>

        <button
          onClick={() => scrollToSection("why-us")}
          className="hover:text-comicOrange transition-colors py-2 rounded-md px-2"
          data-cursor="NEDEN BİZ?"
        >
          BİLİMSEL YAPI
        </button>
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="lg:hidden relative flex items-center justify-center p-2 rounded-xl bg-white border-3 border-black shadow-[4px_4px_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center justify-center p-2 rounded-xl bg-white border-3 border-black shadow-[4px_4px_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
        >
          <ShoppingCart className="w-6 h-6 text-black" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-comicRed text-white font-black text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={() => scrollToSection("products")}
          className="group relative hidden lg:flex items-center gap-2 bg-comicYellow hover:bg-comicOrange text-black font-comic text-lg md:text-xl px-5 py-2 border-3 border-black rounded-xl shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          data-cursor="HEMEN AL!"
        >
          <Zap className="w-5 h-5 fill-black animate-pulse group-hover:rotate-12 duration-200" />
          <span>HEMEN SİPARİŞ VER</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-comicYellow border-b-4 border-black flex flex-col items-center py-6 gap-6 lg:hidden z-[90] shadow-comic-lg animate-slide-in-right">
          <button
            onClick={() => scrollToSection("products")}
            className="font-comic text-2xl uppercase text-black hover:text-white transition-colors"
          >
            ÜRÜNLER
          </button>
          <button
            onClick={() => scrollToSection("story")}
            className="font-comic text-2xl uppercase text-black hover:text-white transition-colors"
          >
            HİKAYEMİZ
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="font-comic text-2xl uppercase text-black hover:text-white transition-colors"
          >
            BİLİMSEL YAPI
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToSection("products");
            }}
            className="flex items-center gap-2 bg-comicOrange text-black font-comic text-xl px-6 py-3 border-3 border-black rounded-xl shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase"
          >
            <Zap className="w-5 h-5 fill-black" />
            <span>HEMEN SİPARİŞ VER</span>
          </button>
        </div>
      )}
    </header>
  );
}
