import "./globals.css";

import { htmlLang, type Locale } from "@/content/copy";

import { barlow, barlowSemiCondensed } from "./fonts";

export function RootDocument({
  locale,
  head,
  children,
}: Readonly<{
  locale: Locale;
  head?: React.ReactNode;
  children: React.ReactNode;
}>) {
  const fonts = `${barlow.variable} ${barlowSemiCondensed.variable}`;
  return (
    <html lang={htmlLang[locale]} className={`${fonts} antialiased`}>
      {head ? <head>{head}</head> : null}
      <body>{children}</body>
    </html>
  );
}
