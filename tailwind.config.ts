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
        comicBlack: "#FAF6EE",
        comicRed: "#D32F2F",
        comicRedDark: "#8B0000",
        comicOrange: "#FF5F1F",
        comicYellow: "#FFD700",
        comicGray: "#1F2833",
        comicGrayLight: "#4A5568",
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
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;

