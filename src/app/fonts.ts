import { Barlow, Barlow_Semi_Condensed, Noto_Sans_JP, Noto_Sans_SC, Noto_Sans_TC } from "next/font/google";

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow-sc",
  display: "swap",
});

// One CJK face per locale, each loaded only by its own layout. Google serves
// these in unicode-range slices, so a page downloads only the glyphs it uses.
// next/font needs literal options in every call, so they are not shared.
export const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cjk",
  display: "swap",
  preload: false,
});

export const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cjk",
  display: "swap",
  preload: false,
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cjk",
  display: "swap",
  preload: false,
});
