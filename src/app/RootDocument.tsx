import "./globals.css";

import { htmlLang, type Locale } from "@/content/copy";

import { barlow, barlowSemiCondensed } from "./fonts";

export function RootDocument({
  locale,
  cjkFont,
  head,
  children,
}: {
  locale: Locale;
  cjkFont?: string;
  head?: React.ReactNode;
  children: React.ReactNode;
}) {
  const fonts = [barlow.variable, barlowSemiCondensed.variable, cjkFont].filter(Boolean).join(" ");
  return (
    <html lang={htmlLang[locale]} className={`${fonts} antialiased`}>
      {head ? <head>{head}</head> : null}
      <body>{children}</body>
    </html>
  );
}
