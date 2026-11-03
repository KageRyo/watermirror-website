import localFont from "next/font/local";

// Barlow's latin subset, as Google Fonts serves it, kept in the repository so
// the build needs no network access. Licensed under the SIL Open Font License
// 1.1 (fonts/OFL.txt). Chinese and Japanese text uses the system fonts listed
// in globals.css.
export const barlow = localFont({
  src: [
    { path: "./fonts/barlow-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

export const barlowSemiCondensed = localFont({
  src: "./fonts/barlow-semi-condensed-600.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-barlow-sc",
  display: "swap",
});
