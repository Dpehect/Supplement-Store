"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Eye, ShoppingCart } from "lucide-react";
import { ProductType } from "@/data/products";
import HoverWaveImage from "@/components/HoverWaveImage";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ProductType;
  onSelect?: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  BULK: "HACİM",
  ENERGY: "ENERJİ",
  RECOVERY: "TOPARLANMA",
  DAILY: "GÜNLÜK",
};

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const card = cardRef.current;
    const image = imageRef.current;
    const badge = badgeRef.current;
    if (!card || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      gsap.to(image, {
        x: (x - centerX) * 0.025,
        y: (y - centerY) * 0.025,
        scale: 1.025,
        duration: 0.65,
        ease: "power3.out",
      });

      if (badge) {
        gsap.to(badge, {
          x: (x - centerX) * 0.035,
          y: (y - centerY) * 0.035,
          rotate: 10 + (x - centerX) * 0.01,
          duration: 0.65,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      if (badge) {
        gsap.to(badge, {
          x: 0,
          y: 0,
          rotate: 12,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      className="motion-card relative flex h-full min-h-[650px] cursor-pointer select-none flex-col justify-between overflow-visible rounded-2xl border-4 border-black bg-white p-6 shadow-comic transition-all duration-300 group hover:-translate-y-1 hover:shadow-comic-lg"
      style={{ transformStyle: "preserve-3d" }}
      data-cursor={product.badge}
      data-product-card={product.id}
    >
      <div
        ref={badgeRef}
        className="motion-rect-c absolute -right-4 -top-4 z-20 rotate-12 border-2 border-black bg-black px-3.5 py-1.5 font-sans text-xs font-black uppercase text-comicYellow shadow-comic transition-transform duration-200 group-hover:scale-110 md:text-sm"
      >
        {product.badge}
      </div>

      <div className="motion-rect-b relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border-4 border-black bg-comicGray transition-colors group-hover:bg-opacity-80">
        <div className="absolute inset-0 z-0 bg-halftone-orange opacity-40" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/65 to-transparent" />

        <div ref={imageRef} className="relative z-10 h-52 w-52">
          <HoverWaveImage
            src={product.image}
            alt={product.name}
            imageClassName="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
            sizes="(max-width: 768px) 80vw, 220px"
            intensity={7}
          />
        </div>

        <div className="motion-rect-c absolute bottom-2 left-2 z-10 rounded border border-comicOrange bg-black px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-comicOrange -skew-x-12">
          {CATEGORY_MAP[product.category] || product.category}
        </div>
      </div>

      <div className="mt-4 flex flex-grow flex-col justify-between">
        <div>
          <h3 className="mb-1 font-comic text-2xl uppercase leading-none tracking-wide text-black transition-colors group-hover:text-comicOrange">
            {product.name}
          </h3>
          <p className="mb-3 font-sans text-xs font-bold italic text-comicGrayLight">
            &ldquo;{product.tagline}&rdquo;
          </p>

          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg border-2 border-black bg-comicYellow px-3 py-2 shadow-comic">
              <span className="block text-[10px] font-black uppercase tracking-wider text-black/60">
                Aroma
              </span>
              <span className="block text-xs font-black uppercase text-black">
                {product.flavor}
              </span>
            </div>
            <div className="rounded-lg border-2 border-black bg-white px-3 py-2 shadow-comic">
              <span className="block text-[10px] font-black uppercase tracking-wider text-comicGrayLight">
                Gramaj
              </span>
              <span className="block text-xs font-black uppercase text-black">
                {product.size}
              </span>
            </div>
          </div>

          <p className="mb-4 font-sans text-sm font-semibold leading-snug text-comicGray">
            {product.description}
          </p>

          <div className="mb-6 space-y-2">
            {product.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <div className="mb-0.5 flex justify-between text-[10px] font-bold uppercase tracking-wider text-comicGrayLight">
                  <span>{stat.label}</span>
                  <span className="text-comicOrange">{stat.value}%</span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-none border-2 border-black bg-black">
                  <div
                    className={`h-full ${product.accent} border-r-2 border-black transition-all duration-500`}
                    style={{ width: `${stat.value}%` }}
                  >
                    <div className="absolute inset-0 bg-halftone-black opacity-30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t-[3px] border-black pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase leading-none tracking-wider text-comicGrayLight">
              FİYAT
            </span>
            <span className="font-comic text-2xl tracking-wide text-comicYellow text-stroke-black">
              {product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                addToCart(product);
              }}
              className="flex items-center gap-1 border-2 border-black bg-comicYellow px-2 md:px-3 py-1.5 font-comic text-sm text-black shadow-[2px_2px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-comicOrange"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">SEPETE EKLE</span>
              <span className="sm:hidden">EKLE</span>
            </button>

            <button
              type="button"
              aria-label={`${product.name} detayını aç`}
              onClick={(event) => {
                event.stopPropagation();
                onSelect?.();
              }}
              className="flex items-center gap-1 border-2 border-black bg-white px-2 md:px-3 py-1.5 font-comic text-sm text-black shadow-[2px_2px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-gray-100"
            >
              <Eye className="h-4 w-4" />
              <span>DETAY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
