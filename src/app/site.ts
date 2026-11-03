import type { Metadata } from "next";

import { copy, localePath, locales, ogLocale, type Locale } from "@/content/copy";

// Public origin of the deployed site, including its base path.
export const siteUrl = (process.env.SITE_URL ?? "https://kageryo.coderyo.com/watermirror").replace(/\/$/, "");

export function pageMetadata(locale: Locale): Metadata {
  const t = copy[locale];
  const url = `${siteUrl}${localePath[locale]}`;
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath[l]}`])),
        "x-default": `${siteUrl}${localePath.en}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "WaterMirror",
      title: t.meta.title,
      description: t.meta.description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
  };
}
