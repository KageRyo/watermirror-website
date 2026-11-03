import type { StaticImageData } from "next/image";

import enInput from "@/assets/screenshots/en/input.png";
import enResult from "@/assets/screenshots/en/result.png";
import enSettings from "@/assets/screenshots/en/settings.png";
import jaInput from "@/assets/screenshots/ja/input.png";
import jaResult from "@/assets/screenshots/ja/result.png";
import jaSettings from "@/assets/screenshots/ja/settings.png";
import zhCNInput from "@/assets/screenshots/zh-CN/input.png";
import zhCNResult from "@/assets/screenshots/zh-CN/result.png";
import zhCNSettings from "@/assets/screenshots/zh-CN/settings.png";
import zhTWInput from "@/assets/screenshots/zh-TW/input.png";
import zhTWResult from "@/assets/screenshots/zh-TW/result.png";
import zhTWSettings from "@/assets/screenshots/zh-TW/settings.png";

import type { Locale } from "./copy";

type Shots = { result: StaticImageData; input: StaticImageData; settings: StaticImageData };

// Captured from the WaterMirror web build in each app language, against a
// live WQSurrogateModels 2.3.0 API, for the sample reading in facts.ts.
export const screenshots: Record<Locale, Shots> = {
  en: { result: enResult, input: enInput, settings: enSettings },
  "zh-TW": { result: zhTWResult, input: zhTWInput, settings: zhTWSettings },
  "zh-CN": { result: zhCNResult, input: zhCNInput, settings: zhCNSettings },
  ja: { result: jaResult, input: jaInput, settings: jaSettings },
};
