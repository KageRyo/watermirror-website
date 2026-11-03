import { localePath, locales } from "@/content/copy";
import { LOCALE_STORAGE_KEY, pickLocale } from "@/lib/pickLocale";

const basePath = process.env.PAGES_BASE_PATH ?? "";

// Static hosting cannot negotiate Accept-Language, so the English home page
// decides in the browser, before first paint: a language the visitor picked
// by hand wins, otherwise the browser's preferred languages do. Only the
// root URL redirects; a direct link to a language page is always respected.
export function LocaleRedirect() {
  const paths = Object.fromEntries(locales.map((l) => [l, `${basePath}${localePath[l]}`]));
  const script = `(function (pick, paths, key) {
  try {
    var here = location.pathname;
    if (here !== paths.en && here !== paths.en + "index.html") return;
    var saved = null;
    try { saved = localStorage.getItem(key); } catch (e) {}
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    var target = saved && paths[saved] ? saved : pick(prefs);
    if (target !== "en") location.replace(paths[target] + location.search + location.hash);
  } catch (e) {}
})(${pickLocale.toString()}, ${JSON.stringify(paths)}, ${JSON.stringify(LOCALE_STORAGE_KEY)});`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
