"use client";

import React, { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Dumbbell,
  FlaskConical,
  Gauge,
  Package,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { ProductType } from "@/data/products";
import HoverWaveImage from "@/components/HoverWaveImage";

interface ProductDetailModalProps {
  product: ProductType | null;
  onClose: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  BULK: "HACİM SİSTEMİ",
  ENERGY: "ENERJİ VE PUMP",
  RECOVERY: "KAS ONARIMI",
  DAILY: "GÜNLÜK DESTEK",
};

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    if (document.visibilityState === "hidden") {
      closingRef.current = false;
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        closingRef.current = false;
        onClose();
      },
    });

    tl.to(modalRef.current, {
      scale: 0.82,
      opacity: 0,
      rotate: 2,
      y: 18,
      duration: 0.22,
      ease: "power2.in",
    });

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.16,
        ease: "power2.in",
      },
      "-=0.14"
    );
  }, [onClose]);

  const handleImmediateClose = useCallback(() => {
    closingRef.current = false;
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!product) return;

    closingRef.current = false;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );

      gsap.fromTo(
        modalRef.current,
        { scale: 0.72, opacity: 0, rotate: -4, y: 24 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.35)",
        }
      );

      gsap.fromTo(
        ".comic-panel-left",
        { x: -70, opacity: 0, rotate: -2 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.44, delay: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".comic-panel-right",
        { x: 70, opacity: 0, rotate: 2 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.44, delay: 0.15, ease: "power3.out" }
      );

      gsap.fromTo(
        ".comic-detail-pop",
        { y: 18, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.34,
          delay: 0.24,
          stagger: 0.06,
          ease: "back.out(1.4)",
        }
      );

      gsap.fromTo(
        closeBtnRef.current,
        { scale: 0, rotate: -90 },
        { scale: 1, rotate: 0, duration: 0.4, delay: 0.28, ease: "back.out(1.5)" }
      );
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleImmediateClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [product, handleClose, handleImmediateClose]);

  if (!product) return null;

  return (
    <div
      ref={overlayRef}
      className="motion-field fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-sm md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-halftone-black opacity-30" />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} ürün detayları`}
        className="relative my-auto max-h-[calc(100vh-1.5rem)] w-full max-w-6xl overflow-y-auto rounded-2xl border-8 border-black bg-white p-4 shadow-comic-lg md:max-h-[calc(100vh-3rem)] md:p-7"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-halftone-orange opacity-[0.06]" />

        <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
          <div className="inline-flex rotate-[-1deg] items-center gap-2 border-4 border-black bg-comicYellow px-4 py-2 font-comic text-lg uppercase tracking-wide text-black shadow-comic md:text-2xl">
            <Sparkles className="h-5 w-5 text-comicRed" />
            <span>Ürün Dosyası</span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
              handleImmediateClose();
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleImmediateClose();
            }}
            aria-label="Ürün detayını kapat"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-comicRed text-white shadow-comic transition-all hover:bg-comicOrange active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            data-cursor="KAPAT!"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="comic-panel-left relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl border-4 border-black bg-comicOrange/15 p-6 md:min-h-[520px]">
            <div className="absolute inset-0 bg-halftone-orange opacity-35" />
            <div className="absolute h-64 w-64 rounded-full border-4 border-black bg-comicYellow shadow-comic md:h-96 md:w-96">
              <div className="absolute inset-0 bg-halftone-black opacity-15" />
            </div>

            <div className="relative z-10 h-72 w-72 float-slow md:h-[420px] md:w-[420px]">
              <HoverWaveImage
                src={product.image}
                alt={product.name}
                imageClassName="object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.75)]"
                sizes="(max-width: 1024px) 90vw, 440px"
                priority
                intensity={30}
              />
            </div>

            <div className="absolute bottom-4 left-4 z-20 max-w-[72%] rotate-[-7deg] rounded-xl border-4 border-black bg-comicYellow px-4 py-2 font-comic text-2xl font-black uppercase leading-none text-black shadow-comic md:text-4xl">
              {product.badge}
            </div>

            <div className="absolute right-4 top-4 z-20 rotate-6 rounded-xl border-4 border-black bg-black px-4 py-2 font-comic text-xl uppercase text-comicOrange shadow-comic md:text-3xl">
              POW!
            </div>
          </div>

          <div className="comic-panel-right flex flex-col justify-between text-black">
            <div>
              <div className="mb-4 inline-block rounded-lg border-2 border-comicOrange bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-comicOrange -skew-x-12">
                {CATEGORY_MAP[product.category] || product.category}
              </div>

              <h2 className="mb-3 font-comic text-4xl uppercase leading-none tracking-wide text-black md:text-6xl">
                {product.name}
              </h2>

              <p className="mb-4 rounded-xl border-4 border-black bg-comicYellow px-4 py-3 font-comic text-xl uppercase leading-tight text-black shadow-comic md:text-2xl">
                {product.detailPunch}
              </p>

              <p className="mb-5 font-sans text-sm font-bold leading-relaxed text-comicGray md:text-base">
                {product.description}
              </p>

              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="comic-detail-pop rounded-xl border-4 border-black bg-white p-3 shadow-comic">
                  <FlaskConical className="mb-2 h-5 w-5 text-comicRed" />
                  <span className="block text-[10px] font-black uppercase tracking-wider text-comicGrayLight">
                    Aroma
                  </span>
                  <span className="font-comic text-lg uppercase leading-none text-black">
                    {product.flavor}
                  </span>
                </div>
                <div className="comic-detail-pop rounded-xl border-4 border-black bg-comicOrange p-3 shadow-comic">
                  <Package className="mb-2 h-5 w-5 text-black" />
                  <span className="block text-[10px] font-black uppercase tracking-wider text-black/60">
                    Gramaj
                  </span>
                  <span className="font-comic text-lg uppercase leading-none text-black">
                    {product.size}
                  </span>
                </div>
                <div className="comic-detail-pop rounded-xl border-4 border-black bg-comicYellow p-3 shadow-comic">
                  <Gauge className="mb-2 h-5 w-5 text-comicRed" />
                  <span className="block text-[10px] font-black uppercase tracking-wider text-black/60">
                    Seviye
                  </span>
                  <span className="font-comic text-lg uppercase leading-none text-black">
                    {product.level}
                  </span>
                </div>
              </div>

              <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border-4 border-black bg-comicGray p-4 text-white shadow-comic">
                  <div className="mb-3 flex items-center gap-2 font-comic text-xl uppercase text-comicYellow">
                    <Zap className="h-5 w-5" />
                    <span>Panel Avantajları</span>
                  </div>
                  <ul className="space-y-2">
                    {product.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 font-sans text-xs font-black uppercase leading-snug tracking-wide"
                      >
                        <span className="mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full border-2 border-black bg-comicYellow" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border-4 border-black bg-white p-4 shadow-comic">
                  <div className="mb-3 flex items-center gap-2 font-comic text-xl uppercase text-black">
                    <Dumbbell className="h-5 w-5 text-comicRed" />
                    <span>Ürün Profili</span>
                  </div>
                  <div className="space-y-3">
                    {product.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="mb-1 flex justify-between text-xs font-black uppercase tracking-wider text-comicGrayLight">
                          <span>{stat.label}</span>
                          <span className="text-comicOrange">{stat.value}%</span>
                        </div>
                        <div className="relative h-[18px] overflow-hidden border-[3px] border-black bg-black">
                          <div
                            className={`h-full ${product.accent} border-r-[3px] border-black transition-all duration-700`}
                            style={{ width: `${stat.value}%` }}
                          >
                            <div className="absolute inset-0 bg-halftone-black opacity-20" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t-4 border-black pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="block text-[10px] font-black uppercase leading-none tracking-wider text-comicGrayLight">
                  FİYAT
                </span>
                <span className="mt-1 block font-comic text-4xl tracking-wide text-comicYellow text-stroke-black md:text-5xl">
                  {product.price}
                </span>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-comicOrange px-6 py-3 font-comic text-xl font-black uppercase text-black shadow-comic transition-all hover:bg-comicYellow hover:shadow-comic-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:text-2xl"
                data-cursor="SATIN AL!"
              >
                <ShoppingBag className="h-6 w-6 shrink-0" />
                <span>Hemen Satın Al</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
