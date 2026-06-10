import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        comicBlack: "#FAF6EE", // Changed from #0B0C10 to retro paper cream
        comicRed: "#D32F2F",
        comicRedDark: "#8B0000",
        comicOrange: "#FF5F1F",
        comicYellow: "#FFD700",
        comicGray: "#1F2833",
        comicGrayLight: "#4A5568", // Darkened for better contrast on light background
      },
      fontFamily: {
        comic: ["var(--font-bangers)", "sans-serif"],
        sans: ["var(--font-comic-neue)", "sans-serif"],
        lilita: ["var(--font-lilita)", "sans-serif"],
      },
      boxShadow: {
        comic: "4px 4px 0px 0px #000000",
        "comic-lg": "8px 8px 0px 0px #000000",
        "comic-orange": "4px 4px 0px 0px #FF5F1F",
        "comic-red": "4px 4px 0px 0px #D32F2F",
        "comic-white": "4px 4px 0px 0px #FFFFFF",
      },
      clipPath: {
        comic1: "polygon(0 0, 100% 4%, 98% 95%, 2% 100%)",
        comic2: "polygon(2% 2%, 98% 0, 100% 98%, 0 96%)",
        speech: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
      },
    },
  },
  plugins: [],
};
export default config;

