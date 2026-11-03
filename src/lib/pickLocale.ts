export type SiteLocale = "en" | "zh-TW" | "zh-CN" | "ja";

/**
 * Picks the site locale for a browser's preferred languages, in order.
 * The first language the site supports wins; anything else falls back to
 * English.
 *
 * This function is also serialised into an inline script that runs before
 * the English home page paints, so it must stay self-contained: no imports,
 * no closures over module scope.
 */
export function pickLocale(languages: readonly string[]): SiteLocale {
  for (const raw of languages) {
    const tag = String(raw).toLowerCase();
    if (tag === "en" || tag.startsWith("en-")) return "en";
    if (tag === "ja" || tag.startsWith("ja-")) return "ja";
    if (tag === "zh" || tag.startsWith("zh-")) {
      const parts = tag.split("-");
      const traditional = ["hant", "tw", "hk", "mo"].some((subtag) => parts.includes(subtag));
      const simplified = parts.includes("hans");
      return traditional && !simplified ? "zh-TW" : "zh-CN";
    }
  }
  return "en";
}

/** localStorage key for a language the visitor picked by hand. */
export const LOCALE_STORAGE_KEY = "watermirror-locale";
