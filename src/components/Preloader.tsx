"use client";

import { useEffect, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  ox: number;
  oy: number;
  size: number;
  alpha: number;
  depth: number;
  phase: number;
  delay: number;
  isDust: boolean;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function sampleTextPositions(w: number, h: number) {
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return [];

  const font =
    '"Inter", "SF Pro Display", "Segoe UI", "Helvetica Neue", system-ui, sans-serif';
  const mainSize = Math.round(Math.min(w * 0.13, 150));
  const subSize = Math.round(Math.min(w * 0.035, 28));
  const centerY = h * 0.47;

  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = `800 ${mainSize}px ${font}`;
  ctx.fillText("SOFTBRIDGE", w / 2, centerY);

  const subText = "Supplements";
  ctx.font = `300 ${subSize}px ${font}`;
  const letterSpacing = subSize * 0.4;
  let totalW = 0;
  for (const c of subText) totalW += ctx.measureText(c).width + letterSpacing;
  totalW -= letterSpacing;

  let cursorX = w / 2 - totalW / 2;
  const subY = centerY + mainSize * 0.7;
  for (const c of subText) {
    const cw = ctx.measureText(c).width;
    ctx.fillText(c, cursorX + cw / 2, subY);
    cursorX += cw + letterSpacing;
  }

  const imgData = ctx.getImageData(0, 0, w, h).data;
  const points: { x: number; y: number }[] = [];
  const step = Math.max(2, Math.round(w / 800));

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (imgData[(y * w + x) * 4 + 3] > 80) {
        points.push({ x, y });
      }
    }
  }

  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  return points;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      onComplete();
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const targets = sampleTextPositions(W, H);
    if (targets.length === 0) {
      document.body.style.overflow = "";
      onComplete();
      return;
    }

    const isMobile = W < 768;
    const PARTICLE_CAP = isMobile ? 4000 : 8000;
    const COUNT = Math.min(targets.length, PARTICLE_CAP);
    const DUST = isMobile ? 100 : 220;
    const particles: Particle[] = [];

    for (let i = 0; i < COUNT; i++) {
      const t = targets[i];
      const angle = Math.random() * Math.PI * 2;
      const dist = 150 + Math.random() * Math.max(W, H) * 0.6;
      const depth = 0.3 + Math.random() * 0.7;

      particles.push({
        x: t.x + Math.cos(angle) * dist,
        y: t.y + Math.sin(angle) * dist,
        tx: t.x,
        ty: t.y,
        ox: t.x + Math.cos(angle) * dist,
        oy: t.y + Math.sin(angle) * dist,
        size: (0.7 + Math.random() * 1.5) * depth,
        alpha: 0,
        depth,
        phase: Math.random() * 6283,
        delay: Math.random() * 0.35,
        isDust: false,
      });
    }

    for (let i = 0; i < DUST; i++) {
      const x = W / 2 + (Math.random() - 0.5) * W * 0.6;
      const y = H / 2 + (Math.random() - 0.5) * H * 0.35;
      particles.push({
        x,
        y,
        tx: x,
        ty: y,
        ox: x,
        oy: y,
        size: 0.3 + Math.random() * 0.8,
        alpha: 0,
        depth: 0.2 + Math.random() * 0.3,
        phase: Math.random() * 6283,
        delay: 0.5 + Math.random() * 0.4,
        isDust: true,
      });
    }

    const CONVERGE = 1500;
    const HOLD = 800;
    const DISSOLVE = 700;
    const TOTAL = CONVERGE + HOLD + DISSOLVE;

    const font =
      '"Inter", "SF Pro Display", "Segoe UI", "Helvetica Neue", system-ui, sans-serif';
    const mainSize = Math.round(Math.min(W * 0.13, 150));
    const subSize = Math.round(Math.min(W * 0.035, 28));
    const centerY = H * 0.47;
    const subText = "Supplements";

    let t0 = 0;
    let raf = 0;
    let finished = false;

    const tick = (now: number) => {
      if (finished) return;
      if (!t0) t0 = now;
      const elapsed = now - t0;
      const sec = elapsed * 0.001;

      ctx.fillStyle = "#F8F7F4";
      ctx.fillRect(0, 0, W, H);

      const cP = Math.min(elapsed / CONVERGE, 1);
      const holding = elapsed > CONVERGE && elapsed <= CONVERGE + HOLD;
      const dP =
        elapsed > CONVERGE + HOLD
          ? Math.min((elapsed - CONVERGE - HOLD) / DISSOLVE, 1)
          : 0;

      // Draw faint, soft guide text to guarantee perfect legibility
      const opacityFactor = dP > 0 ? Math.max(0, 1 - dP * 1.5) : easeOutQuart(cP);
      if (opacityFactor > 0.02) {
        ctx.fillStyle = "#1C1C1C";
        ctx.globalAlpha = 0.08 * opacityFactor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `800 ${mainSize}px ${font}`;
        ctx.fillText("SOFTBRIDGE", W / 2, centerY);

        const letterSpacing = subSize * 0.4;
        ctx.font = `300 ${subSize}px ${font}`;
        let totalW = 0;
        for (const c of subText) totalW += ctx.measureText(c).width + letterSpacing;
        totalW -= letterSpacing;

        let cursorX = W / 2 - totalW / 2;
        const subY = centerY + mainSize * 0.7;
        for (const c of subText) {
          const cw = ctx.measureText(c).width;
          ctx.fillText(c, cursorX + cw / 2, subY);
          cursorX += cw + letterSpacing;
        }
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "#1C1C1C";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isDust) {
          const fadeIn = Math.max(0, cP - p.delay) / (1 - p.delay);
          p.alpha = Math.min(fadeIn * 0.5, 0.25) * Math.max(0, 1 - dP * 2);
          p.x =
            p.tx +
            Math.sin(sec * 0.4 + p.phase) * 25 +
            Math.sin(sec * 0.9 + p.phase * 0.3) * 8;
          p.y =
            p.ty +
            Math.cos(sec * 0.35 + p.phase * 1.2) * 18 +
            Math.cos(sec * 0.7 + p.phase * 0.5) * 5;
        } else if (dP > 0) {
          const drift =
            Math.atan2(p.ty - H / 2, p.tx - W / 2) +
            Math.sin(p.phase) * 0.8;
          const spd = (1.5 + p.depth * 3) * dP;
          p.x += Math.cos(drift) * spd;
          p.y += Math.sin(drift) * spd + dP * 0.4;
          p.alpha = Math.max(0, (1 - dP * 1.4) * (p.depth * 0.3 + 0.7));
        } else if (holding) {
          p.x =
            p.tx +
            Math.sin(sec * 0.6 + p.phase) * 1 +
            Math.sin(sec * 1.3 + p.phase * 0.7) * 0.5;
          p.y =
            p.ty +
            Math.cos(sec * 0.5 + p.phase * 1.2) * 1 +
            Math.cos(sec * 1.1 + p.phase * 0.4) * 0.5;
          p.alpha = p.depth * 0.3 + 0.7;
        } else {
          const raw = Math.max(0, cP - p.delay) / (1 - p.delay);
          const e = easeOutQuart(Math.min(raw, 1));
          p.x = p.ox + (p.tx - p.ox) * e;
          p.y = p.oy + (p.ty - p.oy) * e;
          const turb = (1 - e) * 10 * p.depth;
          p.x +=
            Math.sin(sec * 2.2 + p.phase) * turb +
            Math.sin(sec * 4.1 + p.phase * 0.6) * turb * 0.3;
          p.y +=
            Math.cos(sec * 1.8 + p.phase * 0.8) * turb +
            Math.cos(sec * 3.3 + p.phase * 0.4) * turb * 0.3;
          p.y += (1 - e) * 0.15;
          p.alpha = Math.min(raw * 3, p.depth * 0.3 + 0.7);
        }

        if (p.alpha > 0.008) {
          ctx.globalAlpha = p.alpha;
          const hs = p.size * 0.5;
          ctx.fillRect(p.x - hs, p.y - hs, p.size, p.size);
        }
      }

      ctx.globalAlpha = 1;

      if (elapsed >= TOTAL) {
        finished = true;
        wrap.style.transition = "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)";
        wrap.style.opacity = "0";
        setTimeout(() => {
          document.body.style.overflow = "";
          onComplete();
        }, 520);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const safety = setTimeout(() => {
      if (!finished) {
        finished = true;
        document.body.style.overflow = "";
        onComplete();
      }
    }, 6000);

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: "#F8F7F4" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
