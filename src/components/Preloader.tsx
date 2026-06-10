"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scoopRef = useRef<SVGSVGElement>(null);
  const shakerRef = useRef<SVGSVGElement>(null);
  const powderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    completedRef.current = false;
    document.body.style.overflow = "hidden";

    const finishPreload = (immediate = false) => {
      if (completedRef.current) return;
      completedRef.current = true;

      if (immediate) {
        document.body.style.overflow = "";
        onComplete();
        return;
      }

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete();
        },
      });
    };

    const finishIfHidden = () => {
      if (document.visibilityState === "hidden") {
        setProgress(100);
        finishPreload(true);
      }
    };

    document.addEventListener("visibilitychange", finishIfHidden);
    const hiddenCheck = window.setInterval(finishIfHidden, 250);
    finishIfHidden();
    if (completedRef.current) {
      return () => {
        document.removeEventListener("visibilitychange", finishIfHidden);
        window.clearInterval(hiddenCheck);
        document.body.style.overflow = "";
      };
    }

    const progressObj = { value: 0 };
    const progressTween = gsap.to(progressObj, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.floor(progressObj.value)),
      onComplete: () => setProgress(100),
    });

    const makePowder = () => {
      const layer = powderRef.current;
      if (!layer) return;

      for (let i = 0; i < 190; i += 1) {
        const particle = document.createElement("span");
        const size = 4 + Math.random() * 8;
        const drift = (Math.random() - 0.5) * 260;
        const startX = 50 + (Math.random() - 0.5) * 18;
        const startY = -18 - Math.random() * 20;

        particle.className = "absolute block rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.opacity = "0";
        layer.appendChild(particle);

        gsap.to(particle, {
          opacity: 0.95,
          duration: 0.12,
          delay: i * 0.008,
          ease: "power1.out",
        });

        gsap.to(particle, {
          y: window.innerHeight * (0.72 + Math.random() * 0.28),
          x: drift,
          scale: 0.55 + Math.random() * 0.6,
          opacity: 0,
          duration: 1.25 + Math.random() * 0.55,
          delay: i * 0.008,
          ease: "power2.in",
          onComplete: () => particle.remove(),
        });
      }
    };

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => finishPreload(),
    });

    gsap.set(stageRef.current, { opacity: 0, scale: 0.98 });
    gsap.set(scoopRef.current, { y: "-38vh", x: "18vw", rotate: -18, opacity: 0 });
    gsap.set(shakerRef.current, { y: "16vh", scale: 0.92, opacity: 0 });
    gsap.set(titleRef.current, { y: 18, opacity: 0 });

    tl.to(stageRef.current, { opacity: 1, scale: 1, duration: 0.35 })
      .to(titleRef.current, { y: 0, opacity: 1, duration: 0.35 }, "-=0.1")
      .to(shakerRef.current, { y: 0, scale: 1, opacity: 1, duration: 0.55 }, "-=0.2")
      .to(scoopRef.current, { y: "-8vh", x: "7vw", rotate: -8, opacity: 1, duration: 0.65 }, "-=0.35")
      .to(scoopRef.current, { rotate: -34, x: "2vw", duration: 0.35, ease: "power2.inOut" })
      .add(makePowder, "-=0.08")
      .to(scoopRef.current, { y: "-11vh", x: "-1vw", rotate: -38, duration: 1.1, ease: "sine.inOut" }, "-=0.05")
      .to(shakerRef.current, { y: -6, duration: 0.18, yoyo: true, repeat: 3, ease: "power1.inOut" }, "-=0.7")
      .to({}, { duration: 0.55 });

    const safetyTimeout = window.setTimeout(() => finishPreload(), 5000);

    return () => {
      window.clearTimeout(safetyTimeout);
      window.clearInterval(hiddenCheck);
      document.removeEventListener("visibilitychange", finishIfHidden);
      progressTween.kill();
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#111216] text-white"
    >
      <div className="absolute inset-0 bg-halftone-orange opacity-10" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-comicOrange/25 to-transparent" />

      <div ref={stageRef} className="relative flex h-full w-full flex-col items-center justify-center px-6">
        <div ref={powderRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />

        <svg
          ref={scoopRef}
          className="absolute left-1/2 top-[12vh] z-30 h-44 w-72 -translate-x-1/2 drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] md:h-56 md:w-96"
          viewBox="0 0 360 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M158 100 L334 67 L327 33 L151 69 Z" fill="#FFD35C" stroke="#050505" strokeWidth="10" />
          <path d="M31 66 C31 19 170 15 181 62 L159 175 C153 204 55 204 48 175 Z" fill="#FF7A1A" stroke="#050505" strokeWidth="12" />
          <ellipse cx="105" cy="65" rx="73" ry="35" fill="#FFF7E1" stroke="#050505" strokeWidth="8" />
          <path d="M56 67 C80 48 130 46 156 65" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
        </svg>

        <svg
          ref={shakerRef}
          className="relative z-10 mt-16 h-72 w-56 drop-shadow-[0_22px_34px_rgba(0,0,0,0.75)] md:h-96 md:w-72"
          viewBox="0 0 220 330"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="48" y="18" width="124" height="34" rx="8" fill="#F2F2F2" stroke="#050505" strokeWidth="9" />
          <path d="M36 55 H184 L171 300 C170 313 159 323 146 323 H74 C61 323 50 313 49 300 Z" fill="#20242C" stroke="#050505" strokeWidth="10" />
          <path d="M48 170 H172 L166 300 C165 309 157 316 148 316 H72 C63 316 55 309 54 300 Z" fill="#FFF7E1" opacity="0.92" />
          <rect x="63" y="102" width="94" height="74" rx="13" fill="#FF5F1F" stroke="#050505" strokeWidth="8" />
          <path d="M110 119 L93 147 H111 L104 166 L130 136 H112 Z" fill="#FFD700" stroke="#050505" strokeWidth="4" />
          <path d="M61 206 H159" stroke="#050505" strokeWidth="5" strokeDasharray="10 10" opacity="0.45" />
        </svg>

        <div
          ref={titleRef}
          className="relative z-40 mt-8 flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border-4 border-black bg-white px-5 py-4 text-center shadow-comic"
        >
          <div className="font-sans text-2xl font-black uppercase tracking-[0.14em] text-[#111216] md:text-4xl">
            PROTEIN TOZU DOKULUYOR
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border-2 border-black bg-[#E8E8E8]">
            <div
              className="h-full rounded-full bg-comicOrange transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-sans text-sm font-black uppercase tracking-[0.26em] text-comicGrayLight">
            FORMUL HAZIRLANIYOR - {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
