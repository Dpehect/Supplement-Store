# 🧪 Supplement Store — Comic-Themed Sports Nutrition UI

A visually explosive, comic-book-inspired supplement e-commerce landing page built with **Next.js 15**, **GSAP**, **Tailwind CSS**, and **WebGL shaders**. Every section is designed to feel like flipping through a retro comic magazine — bold borders, halftone dots, floating elements, and interactive micro-animations.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19_RC-61DAFB?logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Preloader Animation** | SVG scoop pours protein powder into a shaker with 190 GSAP-animated particles + progress bar |
| **WebGL Hover Distortion** | Custom GLSL vertex/fragment shaders create a liquid ripple effect on product images |
| **Custom Cursor System** | Orbit ring with 5 product thumbnails, 6-node trail chain, and context-aware label (desktop only) |
| **Interactive Comic Story** | 4-panel accordion game — tap to reveal cards one by one with step-by-step progress tracking |
| **Split Text Animations** | Per-character/word GSAP ScrollTrigger animations (bounce, slide-up, pop, fade) |
| **Parallax Hero** | Multi-layer scroll parallax on bottle + capsules via GSAP ScrollTrigger `scrub` |
| **Infinite Marquee Tickers** | CSS-only auto-scrolling text banners with diagonal rotation and halftone overlays |
| **Filterable Product Grid** | Category filter (Bulk / Energy / Recovery / Daily) with scroll-reveal staggered entrance |
| **Product Detail Modal** | Full-screen overlay with stat bars, highlights, and animated badge |
| **Comparison Section** | Side-by-side "Rivals vs Weider" panels with slide-in + elastic badge animation |

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, `"use client"` components)
- **UI Library:** React 19 RC
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4 + custom CSS (halftone patterns, text strokes, floating keyframes)
- **Animations:** GSAP 3.15 + ScrollTrigger plugin
- **WebGL:** Raw WebGL with custom GLSL shaders (vertex + fragment) for image distortion
- **Icons:** Lucide React
- **Fonts:** Google Fonts — Bangers, Comic Neue, Lilita One

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Halftone patterns, float keyframes, marquee, scroll-reveal
│   ├── layout.tsx           # Root layout with Google Fonts + metadata
│   └── page.tsx             # Main page — Hero, Products, Comparison, Reviews, Footer
├── components/
│   ├── Preloader.tsx         # SVG scoop + shaker + particle explosion preloader
│   ├── MouseFollower.tsx     # Custom cursor with orbit images + trail chain
│   ├── HoverWaveImage.tsx    # WebGL liquid ripple distortion on hover
│   ├── Header.tsx            # Sticky comic-styled navigation bar
│   ├── ProductCard.tsx       # Product card with GSAP tilt + WebGL hover image
│   ├── ProductDetailModal.tsx# Full-screen product detail overlay
│   ├── ComicStory.tsx        # 4-panel interactive accordion game
│   ├── SplitText.tsx         # Per-char/word GSAP ScrollTrigger text animation
│   ├── ScrollReveal.tsx      # IntersectionObserver scroll-reveal wrapper
│   ├── Marquee.tsx           # Infinite CSS marquee ticker
│   ├── Magnetic.tsx          # Magnetic hover effect wrapper
│   └── FlyingImages.tsx      # Background flying supplement images
└── data/
    └── products.ts           # Product catalog with types, stats, and metadata
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `comicBlack` | `#FAF6EE` | Retro paper cream background |
| `comicRed` | `#D32F2F` | Badges, accents, danger states |
| `comicOrange` | `#FF5F1F` | Primary action color, CTA buttons |
| `comicYellow` | `#FFD700` | Highlights, prices, secondary accents |
| `comicGray` | `#1F2833` | Card image backgrounds, dark panels |

### Typography

| Font | Variable | Role |
|---|---|---|
| **Bangers** | `--font-bangers` | Headlines, badges, comic text |
| **Comic Neue** | `--font-comic-neue` | Body text, descriptions |
| **Lilita One** | `--font-lilita` | Section titles, display text |

### Visual Effects

- **Halftone dots:** `radial-gradient` patterns (orange, black, red) applied as overlays
- **Text strokes:** `-webkit-text-stroke` + `text-shadow` for comic book lettering
- **Comic shadows:** Flat `4px 4px 0 #000` box-shadows (small, large, colored variants)
- **Clip paths:** Polygon-based irregular comic panel shapes

---

## 🎬 Animations Breakdown

### 1. Preloader (`Preloader.tsx`)
A GSAP timeline orchestrates a scoop-pouring-into-shaker sequence:
- **Stage entrance** — container fades in + scales from 0.98
- **Shaker slides up** from `16vh` below
- **Scoop flies in** from top-right, rotates, tips over
- **190 powder particles** spawn and fall with gravity (`power2.in` ease), each with random drift/size
- **Shaker shakes** 3× on receiving powder (yoyo bounce)
- **Progress bar** animates 0→100% via GSAP tween

### 2. WebGL Liquid Hover (`HoverWaveImage.tsx`)
Custom GLSL shaders render a displacement effect:
- **Vertex shader:** Passes UV coordinates to fragment shader
- **Fragment shader:** Calculates distance from mouse, applies sinusoidal ripple (`sin(dist * 42 - time * 5.6)`) + secondary tangent ripple, displaced by velocity vector
- **Smooth lerp** on pointer position (0.12 factor) prevents jitter
- **Render loop** stops when hover ends (performance optimization)
- **Fallback:** Standard `next/image` when WebGL is unavailable

### 3. Custom Cursor (`MouseFollower.tsx`)
A multi-element cursor system:
- **Dot** — sharp 8px circle at exact mouse position
- **Follower ring** — 54px smoothed circle (0.13 lerp) with label text
- **Trail chain** — 6 circles with decreasing size (14→4px) and cascading lag
- **Orbit images** — 5 product thumbnails rotate around follower at 44px radius
- **Context detection** — reads `data-cursor` attributes for expanded labels

### 4. Hero Parallax (`page.tsx`)
GSAP ScrollTrigger with `scrub` creates depth:
- Bottle moves down 100px + rotates 15° on scroll
- Capsule 1 drifts up-left (−120px, −50px)
- Capsule 2 drifts down-right (+180px, +60px)
- Background speed-lines rotate 360° infinitely (80s duration)

### 5. Split Text (`SplitText.tsx`)
Characters are wrapped in individual `<span>` elements and animated via ScrollTrigger:
- **Bounce** — `y: 50px → 0`, `scaleY: 0.5 → 1` with `back.out(2)` ease
- **Slide-up** — `y: 110% → 0%` with `power3.out`
- **Pop** — `scale: 0 → 1` with `back.out(2.5)`

### 6. Micro-Motions (`globals.css`)
CSS keyframe animations applied globally:
- `float-slow/medium/fast` — gentle Y-axis bobbing (3–5s)
- `rect-drift-a/b/c` — subtle translate + rotate drift on all comic panels (7.5–9.5s)
- `product-card-drift` — cards gently sway independently
- All motion respects `prefers-reduced-motion: reduce`

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app runs on `http://localhost:3000` by default.

---

## 📜 License

This project is for educational and portfolio purposes.
