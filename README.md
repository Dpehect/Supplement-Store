# Supplement Store

A comic-inspired supplement landing page featuring premium interactive animations. Designed to look clean, natural, and editorial.

## Stack
- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 3.4
- GSAP 3.15
- WebGL with GLSL custom shaders

## How It Works

### Particle Preloader
The entrance animation is a minimal, warm-white screen. Thousands of tiny powder particles float in from random directions, mimicking the movement of actual supplement powder with turbulence, drag, and gravity. They converge at the center to form the title "SOFTBRIDGE Supplements" using a clean editorial font. After a short hold, the particles drift away and the preloader fades out. This animation runs only once per session.

### Parallax and Physics
The hero section uses GSAP ScrollTrigger to move product bottles and capsules at varying speeds relative to the scroll. Background speed lines spin continuously to maintain a dynamic feel.

### WebGL Hover Waves
Hovering over product images triggers a custom WebGL fragment shader. It calculates the pointer distance and generates a physical wave distortion effect that ripples across the image. The displacement vector smoothly follows the cursor velocity.

### Custom Cursor
A responsive mouse follower features trailing circles and orbiting product thumbnail cards. It pulls data-cursor attributes from active page elements to display clean, context-sensitive text overlays.

### Interactive Comic Accordion
A step-by-step comic strip tells the brand story. Users tap through panels sequentially, triggering custom layout animations.

## Structure
- src/app/layout.tsx: Entry point, typography imports, and metadata.
- src/app/page.tsx: Page layout, GSAP triggers, filters, and modals.
- src/components/Preloader.tsx: Canvas particle simulation.
- src/components/HoverWaveImage.tsx: WebGL shader setups.
- src/components/MouseFollower.tsx: Cursor loop.
- src/components/ComicStory.tsx: Brand sequence.
