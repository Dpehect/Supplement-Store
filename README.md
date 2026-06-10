# Supplement Store

A comic-book-themed supplement e-commerce landing page. The whole thing is designed to feel like flipping through a retro comic magazine — bold borders, halftone dot patterns, floating product bottles, and a lot of interactive animations layered on top.

Built with Next.js 15 (App Router), React 19 RC, TypeScript, Tailwind CSS 3.4, GSAP 3.15, and raw WebGL shaders.

---

## What it does

The site is a single-page storefront for Weider supplements. It opens with an animated preloader where a protein scoop pours powder into a shaker bottle, complete with particle effects. After that, you land on a full hero section with parallax-scrolling product bottles and floating capsules.

Below that there's a filterable product grid (Bulk, Energy, Recovery, Daily categories), an interactive 4-panel comic story section where you tap to reveal content step by step, a side-by-side comparison strip (generic brands vs Weider), customer reviews, and a newsletter footer.

On desktop, the default cursor is replaced with a custom one — a ring with orbiting product thumbnails, a trailing dot chain, and context-sensitive labels that change based on what you hover over.

---

## Tech stack

- **Next.js 15** with App Router and client components
- **React 19 RC** for the UI layer
- **TypeScript 5** across the whole project
- **Tailwind CSS 3.4** for utility styling, extended with custom colors, fonts, and shadows
- **GSAP 3.15** with ScrollTrigger for scroll-based and timeline animations
- **WebGL** with hand-written GLSL vertex and fragment shaders for image hover effects
- **Lucide React** for icons
- **Google Fonts** — Bangers (headlines), Comic Neue (body), Lilita One (display titles)

---

## Project structure

```
src/
  app/
    globals.css           -- halftone patterns, float keyframes, marquee, scroll-reveal styles
    layout.tsx            -- root layout, font loading, metadata
    page.tsx              -- main page with all sections wired together
  components/
    Preloader.tsx         -- SVG scoop + shaker + particle burst loading screen
    MouseFollower.tsx     -- custom cursor with orbit images and trail chain
    HoverWaveImage.tsx    -- WebGL liquid ripple distortion on image hover
    Header.tsx            -- sticky navigation bar
    ProductCard.tsx       -- product card with tilt tracking and WebGL hover
    ProductDetailModal.tsx -- full-screen product detail overlay
    ComicStory.tsx        -- 4-panel interactive accordion with step-by-step reveal
    SplitText.tsx         -- per-character GSAP ScrollTrigger text animations
    ScrollReveal.tsx      -- IntersectionObserver fade-in wrapper
    Marquee.tsx           -- infinite scrolling text ticker
    Magnetic.tsx          -- magnetic hover pull effect
    FlyingImages.tsx      -- background flying supplement images
  data/
    products.ts           -- product catalog with types, stats, pricing, and metadata
```

---

## Design system

The color palette leans into a retro comic aesthetic. The background is a warm paper cream (`#FAF6EE`) instead of plain white. Primary action color is a punchy orange (`#FF5F1F`), accented with comic red (`#D32F2F`) and golden yellow (`#FFD700`). Dark panels use a deep gray (`#1F2833`).

Typography uses three fonts: Bangers for all the comic-style headlines and badges, Comic Neue for body text and descriptions, Lilita One for big section titles.

Visual effects include radial-gradient halftone dot overlays (in orange, black, and red variants), `-webkit-text-stroke` outlines for comic lettering, flat box-shadows offset at 4px or 8px for that hand-drawn panel look, and polygon clip-paths for irregular comic shapes.

---

## How the animations work

**Preloader** — A GSAP timeline runs a staged sequence: the container fades in, a shaker bottle slides up from below, a scoop flies in from the top-right corner and tips over, 190 individual powder particles spawn and fall with randomized drift and gravity easing, and the shaker shakes three times on impact. A progress bar tween runs simultaneously from 0 to 100%.

**WebGL image hover** — The HoverWaveImage component sets up a WebGL context with custom GLSL shaders. The fragment shader calculates the distance from the mouse position, applies a sinusoidal ripple displacement (`sin(dist * 42 - time * 5.6)`) combined with a secondary tangent ripple, and offsets the texture UVs by the mouse velocity. Pointer position is smoothed with a 0.12 lerp factor. The render loop only runs while the user is hovering, so it doesn't burn GPU cycles at rest. Falls back to a regular Next.js Image when WebGL isn't available.

**Custom cursor** — The MouseFollower component renders multiple layers: a sharp 8px dot at the exact mouse position, a 54px smoothed follower ring (0.13 lerp), six trailing circles with cascading lag and decreasing sizes from 14px down to 4px, and five product thumbnail images orbiting the follower at a 44px radius. It reads `data-cursor` attributes from hovered elements to show contextual labels like "CLICK!" or product names.

**Hero parallax** — GSAP ScrollTrigger with `scrub` creates depth as you scroll. The main bottle drifts down 100px and rotates 15 degrees, one capsule moves up and to the left, the other moves down and to the right. The speed-lines background rotates continuously at one full turn per 80 seconds.

**Split text** — Each character gets wrapped in its own span element and animated individually via ScrollTrigger. The bounce preset moves characters from 50px below with a squashed scaleY and springs them into place with a `back.out(2)` ease. Other presets include slide-up, pop, and fade.

**Micro-motions** — CSS keyframe animations give the whole page a subtle breathing quality. Comic panels drift gently with tiny translate and rotate offsets on 7-9 second cycles. Product cards sway independently. Floating elements bob up and down. Everything respects `prefers-reduced-motion` and stops when the user has that preference enabled.

---

## Running locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:3000`.

To build for production: `npm run build` then `npm start`.

---

## License

Educational and portfolio use.
