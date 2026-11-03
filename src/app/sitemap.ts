import type { MetadataRoute } from "next";

import { localePath, locales } from "@/content/copy";

import { siteUrl } from "./site";

// Listed from robots.txt on kageryo.coderyo.com. Each entry names the other
// language versions so search engines show the reader's language.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath[l]}`]));
  return locales.map((l) => ({ url: `${siteUrl}${localePath[l]}`, alternates: { languages } }));
}
