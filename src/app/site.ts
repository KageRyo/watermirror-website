import type { Metadata } from "next";

import { copy, localePath, type Locale } from "@/content/copy";

// Public origin of the deployed site, including the GitHub Pages project path.
export const siteUrl = (process.env.SITE_URL ?? "https://kageryo.github.io/watermirror-website").replace(/\/$/, "");

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
        en: `${siteUrl}${localePath.en}`,
        "zh-TW": `${siteUrl}${localePath["zh-TW"]}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "WaterMirror",
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "en" ? "en_US" : "zh_TW",
    },
  };
}
