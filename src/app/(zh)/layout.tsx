import "../globals.css";

import { barlow, barlowSemiCondensed, notoSansTC } from "../fonts";

export default function TraditionalChineseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={`${barlow.variable} ${barlowSemiCondensed.variable} ${notoSansTC.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
