import { Barlow, Barlow_Semi_Condensed, Noto_Sans_TC } from "next/font/google";

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

// Loaded only by the Traditional Chinese layout. Google serves CJK fonts in
// unicode-range slices, so a page downloads only the slices it uses.
export const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-tc",
  display: "swap",
  preload: false,
});
