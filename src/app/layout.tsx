import type { Metadata } from "next";
import { Bangers, Comic_Neue, Lilita_One } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-bangers",
  display: "swap",
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  display: "swap",
});

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-lilita",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Softbridge Supplements | Premium Athletic Supplements",
  description: "Comic book inspired premium athletic supplements by Softbridge. High energy, clinical dosages, aggressive performance gains. Protein, Creatine, Pre-Workout, and recovery formulas.",
  keywords: "Softbridge, Softbridge Supplements, sports supplements, pre-workout, protein powder, creatine, BCAA, comic styled supplements, workout boosters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${bangers.variable} ${comicNeue.variable} ${lilitaOne.variable} font-sans antialiased text-black bg-comicBlack`}
      >
        {children}
      </body>
    </html>
  );
}
