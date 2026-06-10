"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ORBIT_IMGS = [
  "/images/protein_powder.png",
  "/images/flying_capsule.png",
  "/images/creatine.png",
  "/images/bcaa.png",
  "/images/pre_workout.png",
];

const TRAIL_COUNT = 6;

export default function MouseFollower() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const trailEls    = useRef<HTMLDivElement[]>([]);
  const orbitEls    = useRef<HTMLDivElement[]>([]);

  const mouse = useRef({ x: -300, y: -300 });
  const fPos   = useRef({ x: -300, y: -300 });
  const tPos   = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -300, y: -300 }))
  );
  const rafId = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const LF = 0.13;

      fPos.current.x += (mx - fPos.current.x) * LF;
      fPos.current.y += (my - fPos.current.y) * LF;

      const f = followerRef.current;
      if (f) f.style.transform = `translate(${fPos.current.x}px,${fPos.current.y}px) translate(-50%,-50%)`;

      const d = dotRef.current;
      if (d) d.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;

      let tx = mx, ty = my;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const lag = 0.18 - i * 0.02;
        tPos.current[i].x += (tx - tPos.current[i].x) * Math.max(lag, 0.04);
        tPos.current[i].y += (ty - tPos.current[i].y) * Math.max(lag, 0.04);
        const el = trailEls.current[i];
        if (el) el.style.transform = `translate(${tPos.current[i].x}px,${tPos.current[i].y}px) translate(-50%,-50%)`;
        tx = tPos.current[i].x;
        ty = tPos.current[i].y;
      }

      const now = performance.now() / 1000;
      const ORBIT_R = 44;
      orbitEls.current.forEach((el, i) => {
        if (!el) return;
        const angle = now * 0.9 + (i * Math.PI * 2) / ORBIT_IMGS.length;
        const ox = fPos.current.x + Math.cos(angle) * ORBIT_R;
        const oy = fPos.current.y + Math.sin(angle) * ORBIT_R;
        el.style.transform = `translate(${ox}px,${oy}px) translate(-50%,-50%)`;
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const setLabel = (text: string) => {
      if (labelRef.current) labelRef.current.textContent = text;
    };
    const setExpanded = (on: boolean, label?: string) => {
      followerRef.current?.classList.toggle("is-expanded", on);
      dotRef.current?.classList.toggle("is-hidden", on);
      trailEls.current.forEach(el => el?.classList.toggle("is-dim", on));
      if (label) setLabel(label);
    };
    const setHover = (on: boolean) => {
      followerRef.current?.classList.toggle("is-hover", on);
      if (!on) setLabel("SOFTBRIDGE");
    };

    let lastTarget: Element | null = null;
    const onPointerMove = (e: PointerEvent) => {
      const t = document.elementFromPoint(e.clientX, e.clientY);
      if (t === lastTarget) return;
      lastTarget = t;

      followerRef.current?.classList.remove("is-expanded", "is-hover");
      dotRef.current?.classList.remove("is-hidden");
      trailEls.current.forEach(el => el?.classList.remove("is-dim"));
      setLabel("SOFTBRIDGE");

      if (!t) return;
      const dc = t.closest("[data-cursor]") as HTMLElement | null;
      if (dc) {
        setExpanded(true, dc.dataset.cursor ?? "");
        return;
      }
      if (t.closest("a,button,[role='button'],input,select,textarea,[tabindex]")) {
        setHover(true);
        setLabel("CLICK!");
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  if (!mounted) return null;

  const trailSizes  = [14, 12, 10, 8, 6, 4];
  const trailAlphas = [0.85, 0.65, 0.5, 0.35, 0.22, 0.12];
  const trailColors = ["#FF5F1F","#FF5F1F","#D32F2F","#D32F2F","#FFD700","#FF5F1F"];

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          *, *::before, *::after { cursor: none !important; }
        }
        .c-follower {
          position: fixed; top:0; left:0; pointer-events:none; z-index:9998;
          width:54px; height:54px; border-radius:50%;
          border: 2.5px solid #FF5F1F;
          background: rgba(255,95,31,0.2);
          display:flex; align-items:center; justify-content:center;
          font-family: var(--font-bangers, sans-serif);
          font-size:9px; letter-spacing:.08em; color:#fff; font-weight:900;
          text-transform:uppercase; white-space:nowrap;
          transition: width .2s, height .2s, background .2s, border-color .2s, rotate .2s;
          will-change:transform;
        }
        .c-follower.is-expanded {
          width:76px; height:76px;
          background:#FF5F1F; border-color:#000; color:#000;
          rotate:12deg;
          box-shadow:3px 3px 0 #000;
        }
        .c-follower.is-hover {
          width:64px; height:64px;
          background:rgba(211,47,47,.45);
          border-color:#D32F2F;
        }
        .c-dot {
          position:fixed; top:0; left:0; pointer-events:none; z-index:9999;
          width:8px; height:8px; border-radius:50%;
          background:#FF5F1F; border:1.5px solid #000;
          transition: opacity .18s, width .18s, height .18s;
          will-change:transform;
        }
        .c-dot.is-hidden { opacity:0; }
        .c-trail {
          position:fixed; top:0; left:0; pointer-events:none; z-index:9996;
          border-radius:50%;
          transition: opacity .15s;
          will-change:transform;
        }
        .c-trail.is-dim { opacity:.12 !important; }
        .c-orbit {
          position:fixed; top:0; left:0; pointer-events:none; z-index:9997;
          width:18px; height:18px; border-radius:50%;
          overflow:hidden;
          border:1.5px solid rgba(255,95,31,.7);
          background:#0B0C10;
          box-shadow:0 0 4px rgba(255,95,31,.4);
          will-change:transform;
        }
      `}</style>

      <div ref={rootRef}>
        {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
          <div
            key={`tr-${i}`}
            ref={el => { if (el) trailEls.current[i] = el; }}
            className="c-trail"
            style={{ width: trailSizes[i], height: trailSizes[i], background: trailColors[i], opacity: trailAlphas[i] }}
          />
        ))}

        {ORBIT_IMGS.map((src, i) => (
          <div key={`orb-${i}`} ref={el => { if (el) orbitEls.current[i] = el; }} className="c-orbit">
            <Image src={src} alt="" fill sizes="18px" className="object-contain p-[2px]" />
          </div>
        ))}

        <div ref={followerRef} className="c-follower">
          <span ref={labelRef}>SOFTBRIDGE</span>
        </div>

        <div ref={dotRef} className="c-dot" />
      </div>
    </>
  );
}
