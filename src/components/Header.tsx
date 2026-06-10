"use client";

import React from "react";
import { Zap } from "lucide-react";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b-4 border-black bg-comicBlack py-4 px-6 md:px-12 flex items-center justify-between select-none">
      {/* Brand Logo - Comic Explosion Panel */}
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

      {/* Navigation Links — plain buttons, no Magnetic, prevents cursor freeze */}
      <nav className="hidden md:flex items-center gap-8 font-sans font-bold text-sm tracking-wider uppercase">
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

      {/* CTA Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => scrollToSection("products")}
          className="group relative flex items-center gap-2 bg-comicYellow hover:bg-comicOrange text-black font-comic text-lg md:text-xl px-5 py-2 border-3 border-black rounded-xl shadow-comic active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          data-cursor="HEMEN AL!"
        >
          <Zap className="w-5 h-5 fill-black animate-pulse group-hover:rotate-12 duration-200" />
          <span>HEMEN SİPARİŞ VER</span>
        </button>
      </div>
    </header>
  );
}
