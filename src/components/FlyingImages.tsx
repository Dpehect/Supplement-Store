"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Flight {
  id: number;
  src: string;
  size: number;        // px
  top: string;         // fixed Y position (% string or px)
  animation: string;   // CSS animation value
  zIndex: number;
  filter: string;
}

const IMAGES = [
  "/images/protein_powder.png",
  "/images/flying_capsule.png",
  "/images/creatine.png",
  "/images/bcaa.png",
  "/images/pre_workout.png",
  "/images/multivitamin.png",
  "/images/hero_supplement.png",
  "/images/collagen.png",
];

const ANIMS = [
  "fly-lr",
  "fly-rl",
  "fly-diag-tl",
  "fly-diag-tr",
  "fly-bt",
  "fly-spin-lr",
];

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function buildFlights(): Flight[] {
  const flights: Flight[] = [];
  for (let i = 0; i < 12; i++) {
    const r1 = seededRand(i * 3);
    const r2 = seededRand(i * 3 + 1);
    const r3 = seededRand(i * 3 + 2);
    const r4 = seededRand(i * 3 + 3);
    const r5 = seededRand(i * 3 + 4);
    const r6 = seededRand(i * 3 + 5);

    const src   = IMAGES[Math.floor(r1 * IMAGES.length)];
    const anim  = ANIMS[Math.floor(r2 * ANIMS.length)];
    const size  = 48 + Math.floor(r3 * 64);        // 48–112px
    const top   = `${5 + r4 * 85}%`;               // 5%–90% from top
    const dur   = 5 + r5 * 12;                     // 5–17s
    const delay = -(r6 * dur);                     // negative = start mid-animation

    flights.push({
      id: i,
      src,
      size,
      top,
      zIndex: 50 + i,
      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.7))",
      animation: `${anim} ${dur.toFixed(1)}s linear ${delay.toFixed(1)}s infinite`,
    });
  }
  return flights;
}

const FLIGHTS = buildFlights();

export default function FlyingImages() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  if (!ready) return null;   // avoid hydration mismatch for fixed elements

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 40 }}
    >
      {FLIGHTS.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            top: f.top,
            left: 0,
            width: f.size,
            height: f.size,
            animation: f.animation,
            willChange: "transform",
            zIndex: f.zIndex,
            filter: f.filter,
          }}
        >
          <Image
            src={f.src}
            alt=""
            fill
            sizes={`${f.size}px`}
            className="object-contain select-none"
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}
