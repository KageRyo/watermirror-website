import "../globals.css";

import { barlow, barlowSemiCondensed } from "../fonts";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowSemiCondensed.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
