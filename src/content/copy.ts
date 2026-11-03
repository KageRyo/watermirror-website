import type { BandId, Indicator } from "./facts";
import { en } from "./locales/en";
import { ja } from "./locales/ja";
import { zhCN } from "./locales/zh-CN";
import { zhTW } from "./locales/zh-TW";

export const locales = ["en", "zh-TW", "zh-CN", "ja"] as const;
export type Locale = (typeof locales)[number];

export const localePath: Record<Locale, string> = { en: "/", "zh-TW": "/zh-tw/", "zh-CN": "/zh-cn/", ja: "/ja/" };
export const localeName: Record<Locale, string> = { en: "English", "zh-TW": "繁體中文", "zh-CN": "简体中文", ja: "日本語" };
export const htmlLang: Record<Locale, string> = { en: "en", "zh-TW": "zh-Hant-TW", "zh-CN": "zh-Hans-CN", ja: "ja" };
export const ogLocale: Record<Locale, string> = { en: "en_US", "zh-TW": "zh_TW", "zh-CN": "zh_CN", ja: "ja_JP" };

type Item = { title: string; body: string };

// Each locale is written for its readers rather than converted from another
// locale: Simplified Chinese uses mainland terms (数据, 保存, 服务器, 电导率),
// Traditional Chinese uses Taiwan terms (資料, 儲存, 伺服器, 導電度).
// Text wrapped in backticks is rendered as inline code.
export type Copy = {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    label: string;
    features: string;
    howItWorks: string;
    models: string;
    edge: string;
    getStarted: string;
    language: string;
    github: string;
  };
  hero: {
    title: string;
    lede: string;
    download: string;
    source: string;
    facts: string[];
    shotAlt: string;
    gaugeTitle: string;
  };
  indicators: { label: string; names: Record<Indicator, string>; unitNotes: Partial<Record<Indicator, string>> };
  features: { title: string; items: Item[]; shots: { input: string; settings: string } };
  how: {
    title: string;
    steps: Item[];
    formulaTitle: string;
    formulaBody: string;
    formulaLink: string;
    sourceOfTruth: string;
    diagram: {
      title: string;
      app: Item;
      api: Item;
      hosts: { title: string; server: string; nano: string };
      appToApi: string;
      apiToHosts: string;
    };
  };
  bands: { title: string; intro: string; names: Record<BandId, string>; uses: Record<BandId, string>; tableLabel: string };
  models: {
    title: string;
    intro: string;
    chartTitle: string;
    columns: { model: string; mae: string; r2: string };
    caveat: string;
    artifacts: string;
    modelCard: string;
  };
  missing: {
    title: string;
    intro: string;
    scenario: string;
    uses: string;
    /** Joins indicator names in a list, and before the last of two or more. */
    listSeparator: string;
    listAnd: string;
    retrain: string;
    fillIn: string;
    usable: string;
    unreliable: string;
    metricNote: string;
    takeaway: string;
    scopeNote: string;
    readMore: string;
  };
  edge: {
    title: string;
    intro: string;
    chartTitle: string;
    columns: { path: string; p95: string; p50: string };
    chartNote: string;
    parityFigure: string;
    parityTitle: string;
    parityBody: string;
    xgboostFigure: string;
    xgboostTitle: string;
    xgboostBody: string;
    rfFigure: string;
    rfTitle: string;
    rfBody: string;
    readMore: string;
  };
  start: {
    title: string;
    android: { title: string; body: string; cta: string; notes: string };
    server: { title: string; body: string; pypi: string };
    api: { title: string; body: string; docs: string };
  };
  footer: {
    builtBy: string;
    repos: string;
    app: string;
    api: string;
    website: string;
    docs: string;
    languages: string;
    license: string;
    docLinks: Record<"api" | "formula" | "modelCard" | "limitations" | "nano", string>;
  };
};

export const copy: Record<Locale, Copy> = { en, "zh-TW": zhTW, "zh-CN": zhCN, ja };

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
