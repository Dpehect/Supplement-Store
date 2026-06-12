https://supplement-store-alpha.vercel.app/

# SoftBridge Supplements - Project Documentation

This project is a highly performant, fully interactive premium supplement storefront designed with a comic-book aesthetic. No generic icons or emojis were used in the design; the entire look and feel is constructed through typography, dynamic color transitions, and custom animations. The goal was to build a production-ready e-commerce platform with a natural, handmade, yet highly professional interface.

## Tech Stack & Architecture

The project was built using the latest modern web standards. At its core, it runs on Next.js 15 and React 19. We used TypeScript for robust type safety and Tailwind CSS (v3.4) for the styling and design system.

Animations and interactions are the beating heart of this project. Instead of relying on basic CSS transitions, we implemented the industry-standard GSAP (GreenSock) alongside its ScrollTrigger plugin. For the fluid ripple effects on the product cards, we wrote custom WebGL and GLSL fragment shaders from scratch. A global state management system was established using the React Context API to handle the shopping cart and order flow.

## Technical Details & Features

### Particle-Based Preloader
When users enter the site, they aren't greeted by a boring loading bar. Instead, a custom particle simulation built on HTML Canvas takes over. Thousands of tiny dust particles, behaving much like actual supplement powder subject to physics (gravity, wind resistance, turbulence), scatter across the screen before converging in the center to form the "SoftBridge Supplements" text. We use session storage to ensure this animation only plays once per session, preventing user fatigue.

### Icon-Free Dynamic Typography
There isn't a single SVG, PNG, or emoji icon used throughout the layout. Instead, the text itself serves as a design object. Exclamation marks, question marks, and expressions like "YES!" or "NO!" are styled with varying colors, large font sizes, asymmetric rotation angles, and thick text shadows to perfectly match the comic-book concept.

### Scroll-Responsive Dynamic Background
The site doesn't just sit still. As the user scrolls down the page, GSAP ScrollTrigger kicks in. The primary off-white background color smoothly interpolates through subtle shades of pale yellow and beige based on the scroll progress. These transitions are intentionally kept very soft, ensuring readability while making the site feel alive and organic.

### WebGL and Physics-Based Interactions
Hovering over the product images on the homepage doesn't just scale them up. Instead, it triggers custom WebGL fragment shaders. Liquid ripples propagate across the image depending on the speed and direction of the mouse cursor. Simultaneously, a custom Cursor (MouseFollower) adapts its shape and displays context-sensitive text based on the user's movements across the page.

### Mobile Compatibility & Touch Support
While many modern projects disable complex animations on mobile devices, this architecture was overhauled with a mobile-first approach. The 3D GSAP hover effects on product cards (mousemove) were fully integrated with touch screens (touchmove). The top navigation bar elegantly transforms into a professional hamburger menu on tablets and phones. Every single animation runs just as fluidly on mobile devices as it does on desktop.

### Full E-Commerce Flow
The process of adding items to the cart (CartContext), adjusting quantities, and completing an order is backed by a secure, production-ready e-commerce structure. When the "Complete Order" button is clicked, users are routed to a custom-designed `/checkout` page featuring address, personal info, and credit card forms. Upon payment confirmation, they are redirected to a `/success` screen containing their order confirmation details.

## Directory Structure

- `src/app/layout.tsx`: Global settings, font loading, and metadata definitions.
- `src/app/page.tsx`: Main page layout, core GSAP scroll triggers, and dynamic background logic.
- `src/app/checkout/page.tsx`: The checkout page containing form validations and the order summary.
- `src/app/success/page.tsx`: The order success and confirmation screen.
- `src/components/Preloader.tsx`: The Canvas-based particle/dust simulation engine.
- `src/components/HoverWaveImage.tsx`: WebGL shader configurations and GLSL code.
- `src/components/ComicStory.tsx`: An interactive brand story component functioning like a comic strip.
- `src/components/CartSidebar.tsx`: A side panel that visually reflects the global cart state.
- `src/context/CartContext.tsx`: The React Context structure keeping the e-commerce state in memory.

This project was carefully engineered to maximize User Experience (UX) and User Interface (UI) design without compromising on performance. It responds and feels less like a standard website and more like a modern, highly polished Web App.
