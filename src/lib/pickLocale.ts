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
    if (tag === "en" || tag.indexOf("en-") === 0) return "en";
    if (tag === "ja" || tag.indexOf("ja-") === 0) return "ja";
    if (tag === "zh" || tag.indexOf("zh-") === 0) {
      const parts = tag.split("-");
      const traditional = parts.indexOf("hant") > 0 || parts.indexOf("tw") > 0 || parts.indexOf("hk") > 0 || parts.indexOf("mo") > 0;
      const simplified = parts.indexOf("hans") > 0;
      return traditional && !simplified ? "zh-TW" : "zh-CN";
    }
  }
  return "en";
}

/** localStorage key for a language the visitor picked by hand. */
export const LOCALE_STORAGE_KEY = "watermirror-locale";
