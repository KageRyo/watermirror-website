// Every number on the site comes from this file. Each block names the document
// it was copied from so a later release can update the figures in one place.

const WATERMIRROR = "https://github.com/KageRyo/WaterMirror";
const WQSURROGATE = "https://github.com/KageRyo/WQSurrogateModels";
const wqDoc = (name: string) => `${WQSURROGATE}/blob/main/docs/${name}.md`;

export const links = {
  watermirror: WATERMIRROR,
  wqsurrogate: WQSURROGATE,
  apk: `${WATERMIRROR}/releases/latest/download/WaterMirror.apk`,
  appReleases: `${WATERMIRROR}/releases/latest`,
  pypi: "https://pypi.org/project/wqsurrogatemodels/",
  apiReference: wqDoc("api-reference"),
  formula: wqDoc("wqi5-formula"),
  modelCard: wqDoc("model_card"),
  limitations: wqDoc("limitations"),
  dataAvailability: wqDoc("data-availability"),
  nanoBenchmark: wqDoc("jetson-nano-benchmark"),
  nanoDeployment: wqDoc("jetson-nano"),
  edgeOptimization: wqDoc("edge-optimization-results"),
  fullstackRun: wqDoc("fullstack-local-run"),
  csvFormat: `${WATERMIRROR}/blob/main/docs/csv-format.md`,
  website: "https://github.com/KageRyo/watermirror-website",
  missingIndicator: wqDoc("missing-indicator-robustness-experiments"),
  author: "https://github.com/KageRyo",
} as const;

// GitHub releases WaterMirror-v2.3.7 (2026-11-03) and WQSurrogateModels-v2.3.0
// (2026-10-31).
export const versions = {
  app: "2.3.7",
  api: "2.3.0",
} as const;

// WQSurrogateModels src/wqsurrogatemodels/settings.py CATEGORY_BANDS.
// Colors: two single-hue ramps (teal for the upper three bands, rust for the
// lower three), each checked for monotone lightness and colour-vision
// separation. Band names always appear next to the colour.
export const bands = [
  { id: "excellent", min: 85, max: 100, color: "#0E5A5E" },
  { id: "good", min: 70, max: 85, color: "#2E8F86" },
  { id: "fair", min: 50, max: 70, color: "#7CC3B8" },
  { id: "poor", min: 30, max: 50, color: "#E8A773" },
  { id: "bad", min: 15, max: 30, color: "#C9622F" },
  { id: "terrible", min: 0, max: 15, color: "#8A321F" },
] as const;

export type BandId = (typeof bands)[number]["id"];

// The app screenshots show this sample reading (DO 72 %, BOD 4.1, NH3-N 0.85,
// EC 410, SS 26) scored by WQSurrogateModels 2.3.0 with direct_wqi5: 61.483,
// shown as 61.48 in the app.
export const sampleReading = { score: 61.48, band: "fair" as BandId };

export const indicators = ["DO", "BOD", "NH3N", "EC", "SS"] as const;
export type Indicator = (typeof indicators)[number];

// docs/api-reference.md and WaterMirror i18n parameter labels.
export const indicatorUnits: Record<Indicator, string> = {
  DO: "%",
  BOD: "mg/L",
  NH3N: "mg/L",
  EC: "µS/cm",
  SS: "mg/L",
};

// statistics/outputs/complete_input_performance.csv: complete-input
// repeated-split results, five seeds, error measured against the dataset Score.
export const completeInput = [
  { id: "xgboost", name: "XGBoost", mae: 0.264, r2: 0.9996 },
  { id: "lightgbm", name: "LightGBM", mae: 0.288, r2: 0.9995 },
  { id: "rf", name: "Random Forest", mae: 0.338, r2: 0.999 },
  { id: "svm", name: "SVM", mae: 1.916, r2: 0.9813 },
  { id: "mpr", name: "Polynomial regression", mae: 5.16, r2: 0.8995 },
  { id: "lr", name: "Linear regression", mae: 7.556, r2: 0.7803 },
] as const;

// docs/jetson-nano-benchmark.md: complete-input test MAE of the direct formula
// against the same Score column.
export const formulaMaeVsScore = 6.071;

// docs/jetson-nano-benchmark.md, production API on Jetson Nano 2GB,
// MAXN mode 0, 300 warm one-row requests per model over Nano loopback.
export const nanoLatency = [
  { id: "direct_wqi5", name: "Direct WQI5", p50: 6.41, p95: 7.42, coldLoadS: null, peakMiB: 28.35 },
  { id: "xgboost", name: "XGBoost", p50: 15.52, p95: 17.42, coldLoadS: 10.29, peakMiB: 191.52 },
  { id: "lightgbm", name: "LightGBM", p50: 15.67, p95: 17.57, coldLoadS: 10.51, peakMiB: 174.84 },
  { id: "rf", name: "Random Forest", p50: 146.9, p95: 163.81, coldLoadS: 167.78, peakMiB: 1228.46 },
] as const;

export const nanoDevice = {
  ramMiB: 1971,
  cores: 4,
};

// docs/jetson-nano-benchmark.md: full experiment replay on ARM64 vs x86.
export const parity = {
  jobs: 610,
  conditions: 730,
  matched: 597,
  differing: 13,
  tolerance: "1e-6",
};

// docs/jetson-nano-benchmark.md: 30-minute sequential RF soak.
export const rfSoak = { requests: 11897, minutes: 30, p95: 179.69 };

// docs/edge-optimization-results.md: RF200 vs production RF300.
export const rfCompression = { maeIncreasePct: 0.33, sizeReductionPct: 33, rfArtifactGB: 1.05 };

// statistics/outputs/missing_indicator_robustness.csv (summarised in
// statistics/outputs/statistical_summary.md and docs/limitations.md):
// best model per approach, evaluated on the 10,714-row external hold-out.
// "retrain": model trained on the remaining indicators only.
// "fillIn": the missing indicator is reconstructed from the others first,
// then a full-input surrogate scores the record.
export const missingIndicatorHoldoutRows = 10714;

export const missingIndicator = [
  {
    id: "nh3n",
    missing: ["NH3N"],
    available: ["DO", "BOD", "EC", "SS"],
    retrain: { mae: 2.369, r2: 0.9494 },
    fillIn: { mae: 2.397, r2: 0.9467 },
    usable: true,
  },
  {
    id: "bod",
    missing: ["BOD"],
    available: ["DO", "NH3N", "EC", "SS"],
    retrain: { mae: 14.115, r2: -0.0235 },
    fillIn: { mae: 12.14, r2: 0.1014 },
    usable: false,
  },
  {
    id: "bod_nh3n",
    missing: ["BOD", "NH3N"],
    available: ["DO", "EC", "SS"],
    retrain: { mae: 14.725, r2: -0.1401 },
    fillIn: { mae: 12.891, r2: -0.0079 },
    usable: false,
  },
] as const satisfies readonly {
  id: string;
  missing: readonly Indicator[];
  available: readonly Indicator[];
  retrain: { mae: number; r2: number };
  fillIn: { mae: number; r2: number };
  usable: boolean;
}[];
