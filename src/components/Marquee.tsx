"use client";

import React from "react";

interface MarqueeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  direction?: "left" | "right";
  rotate?: string; // e.g. "-rotate-2" or "rotate-1"
}

export default function Marquee({
  text,
  bgColor = "bg-comicYellow",
  textColor = "text-black",
  direction = "left",
  rotate = "-rotate-1",
}: MarqueeProps) {
  // Repeat the text string so it overflows the viewport and scrolls seamlessly
  const repeatedText = Array(12).fill(text).join("  ·  ");

  return (
    <div className={`relative w-full overflow-hidden border-y-4 border-black py-3.5 z-30 select-none my-8 ${bgColor} ${rotate} transform scale-[1.03] shadow-comic`}>
      <div className="absolute inset-0 bg-halftone-black opacity-15 pointer-events-none" />
      <div className="relative flex whitespace-nowrap">
        <div
          className={
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          }
        >
          <span className={`font-comic text-2xl md:text-4xl tracking-wider uppercase ${textColor}`}>
            {repeatedText}
          </span>
          <span className={`font-comic text-2xl md:text-4xl tracking-wider uppercase ${textColor} ml-4`}>
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
}
