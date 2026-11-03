import type { BandId, Indicator } from "./facts";

export type Locale = "en" | "zh-TW";

type Item = { title: string; body: string };

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
    switchLanguage: string;
    switchLanguageLabel: string;
    github: string;
  };
  hero: {
    title: string;
    lede: string;
    download: string;
    source: string;
    facts: string[];
    figureCaption: string;
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
  scope: { title: string; items: Item[]; link: string };
  footer: { builtBy: string; repos: string; app: string; api: string; docs: string; docLinks: Record<"api" | "formula" | "modelCard" | "limitations" | "nano", string> };
};

const en: Copy = {
  meta: {
    title: "WaterMirror: WQI5 water quality assessment",
    description:
      "WaterMirror turns five water quality measurements into a WQI5 score, quality band and per-indicator status. Android app, open FastAPI service, and a tested Jetson Nano deployment.",
  },
  skip: "Skip to content",
  nav: {
    label: "Sections",
    features: "Features",
    howItWorks: "How it works",
    models: "Models",
    edge: "Edge device",
    getStarted: "Get started",
    switchLanguage: "中文",
    switchLanguageLabel: "閱讀繁體中文版",
    github: "GitHub",
  },
  hero: {
    title: "Read a river's water quality from five measurements.",
    lede: "WaterMirror turns dissolved oxygen, BOD, ammonia nitrogen, conductivity and suspended solids into a WQI5 score, a quality band and a status for each indicator. Use the Android app, call the open API, or run the whole service on a Jetson Nano.",
    download: "Download for Android",
    source: "View source on GitHub",
    facts: ["Android app {app}", "API {api} on PyPI", "Runs on x86 and ARM64"],
    figureCaption: "Result screen with sample data. The gauge marks the same score on the WQI5 scale.",
    shotAlt: "WaterMirror report screen: overall score 62.45, Fair, with a percentile chart and the share of each band in the reference data.",
    gaugeTitle: "WQI5 gauge showing a score of {score}, in the {band} band",
  },
  indicators: {
    label: "The five inputs",
    names: {
      DO: "Dissolved oxygen",
      BOD: "Biochemical oxygen demand",
      NH3N: "Ammonia nitrogen",
      EC: "Electrical conductivity",
      SS: "Suspended solids",
    },
    unitNotes: { DO: "saturation" },
  },
  features: {
    title: "What you can do with the app",
    items: [
      {
        title: "Enter a sample or upload a CSV",
        body: "Type five values by hand, or upload a CSV with the header `DO,BOD,NH3N,EC,SS` to assess a batch.",
      },
      {
        title: "Choose how the score is computed",
        body: "Use the direct WQI5 formula, or compare it with one of six trained models: linear, polynomial, SVM, random forest, XGBoost or LightGBM.",
      },
      {
        title: "See what the score means",
        body: "The report shows the score, its band and range, how each indicator rates, where the sample sits in the reference data, and any input warnings.",
      },
      {
        title: "Connect to your own server",
        body: "Enter a backend address in Backend settings and test its health and readiness before you send data. The address stays saved on the phone.",
      },
      {
        title: "Use it in your language",
        body: "English, Traditional Chinese, Simplified Chinese and Japanese.",
      },
    ],
    shots: {
      input: "Data entry with the model list open",
      settings: "Backend settings with a test connection",
    },
  },
  how: {
    title: "How a reading becomes a score",
    steps: [
      { title: "Measure", body: "Collect DO, BOD, NH₃-N, EC and SS at a sampling point." },
      { title: "Send", body: "The app posts the values to a WQSurrogateModels API at `/api/v2/assessment`." },
      { title: "Assess", body: "The API validates the input, then computes WQI5 with the formula or the model you picked." },
      { title: "Read", body: "The app shows the score, band, range, per-indicator status and warnings that the API returns." },
    ],
    formulaTitle: "The WQI5 formula",
    formulaBody: "Each indicator is converted to a sub-index between 0 and 100. WQI5 is the equal-weighted mean of the five, rounded to three decimals.",
    formulaLink: "Read the sub-index equations",
    sourceOfTruth: "The app never scores data on its own. The API is the single source of truth, so every client gets the same answer.",
    diagram: {
      title: "System overview",
      app: { title: "WaterMirror app", body: "Android app built with Expo and React Native" },
      api: { title: "WQSurrogateModels API", body: "FastAPI service with the formula and the trained models" },
      hosts: { title: "Where the API runs", server: "Any x86 server or PC", nano: "Jetson Nano 2GB in Docker (ARM64)" },
      appToApi: "HTTP, /api/v2",
      apiToHosts: "pip or Docker",
    },
  },
  bands: {
    title: "Six bands, each with a use",
    intro: "The API places every score in one of six bands. The app then explains what water in that band is suitable for.",
    tableLabel: "WQI5 bands, score ranges and suitable uses",
    names: { excellent: "Excellent", good: "Good", fair: "Fair", poor: "Poor", bad: "Bad", terrible: "Terrible" },
    uses: {
      excellent: "Suitable for all uses. Drinkable after chlorine disinfection.",
      good: "Suitable as a tap-water source and for aquaculture, industry, recreation and irrigation.",
      fair: "A tap-water source only after special treatment. Suitable for rough-fish farming, industry, recreation and irrigation.",
      poor: "Suitable only for irrigation or industrial cooling.",
      bad: "Not offensive, and usable for environmental conservation.",
      terrible: "May produce odours.",
    },
  },
  models: {
    title: "The formula is the reference. The models are for comparison.",
    intro: "With all five readings, the direct WQI5 formula is the default and the reference. Six regression models were trained to approximate it, so their accuracy and running cost can be compared, including in experiments where indicators are missing.",
    chartTitle: "Mean absolute error with all five inputs (lower is better)",
    columns: { model: "Model", mae: "MAE", r2: "R²" },
    caveat: "Averaged over five repeated splits. Error is measured against the dataset's Score column. The formula itself differs from that column (MAE {formulaMae}) and the cause is still under investigation, so a lower error does not make a model more correct than the formula.",
    artifacts: "The research dataset and trained model files are not distributed. The formula works out of the box; trained models must be supplied locally.",
    modelCard: "Read the model card",
  },
  edge: {
    title: "Tested on a 2 GB Jetson Nano",
    intro: "The same API runs in Docker on a Jetson Nano 2GB with four Cortex-A57 cores, using the CPU only. Training stays off the device.",
    chartTitle: "Response time per request on the Nano",
    columns: { path: "Scoring method", p95: "95th percentile", p50: "Median" },
    chartNote: "Warm one-row HTTP requests over the device's loopback, MAXN power mode, 300 requests per method. Cold model loading is measured separately.",
    parityFigure: "{matched} of {jobs}",
    parityTitle: "Replay jobs that match x86",
    parityBody: "The full experiment set was rerun on the Nano and compared with x86 within an absolute tolerance of {tolerance}. The {differing} that differ are missing-indicator reconstructions in linear and polynomial models, where ill-conditioned coefficients amplify tiny floating-point differences.",
    xgboostFigure: "2.1.4 → 3.2.0",
    xgboostTitle: "A wrong-score bug, caught",
    xgboostBody: "The first Nano deployment used XGBoost 2.1.4. It loaded the model without an error but returned wrong scores. Comparing against the x86 reference exposed it, and pinning 3.2.0 fixed it.",
    rfFigure: "{size} GB",
    rfTitle: "Random forest is the heavy one",
    rfBody: "That is the size of the production random forest file. It takes {cold} s to load cold and peaks at {peak} GiB of memory on a device with {ram} GiB. A 200-tree version is a third smaller for {mae}% more error; it stays a candidate until a full confirmation study.",
    readMore: "Read the benchmark report",
  },
  start: {
    title: "Get started",
    android: {
      title: "Install the app",
      body: "Download the APK, open Backend settings and enter the address of a running API, for example `http://192.168.1.20:8001`.",
      cta: "Download APK",
      notes: "Release notes",
    },
    server: {
      title: "Run the API",
      body: "Needs Python 3.10 or newer. The direct formula needs no model files.",
      pypi: "The runtime is also on PyPI as `wqsurrogatemodels`.",
    },
    api: {
      title: "Call it from anything",
      body: "Any HTTP client can use the endpoint the app uses.",
      docs: "Read the API reference",
    },
  },
  scope: {
    title: "What WaterMirror is not",
    items: [
      {
        title: "Not a forecast",
        body: "WQI5 describes the sample you measured. The data has no timestamps, and nothing in the system predicts future water quality.",
      },
      { title: "Not a sensor network", body: "Values are typed in or uploaded. The app does not read instruments." },
      {
        title: "Not a replacement for the formula",
        body: "With all five readings, use direct WQI5. The models are for comparison and for research on missing indicators.",
      },
      {
        title: "Not a field-validated alarm",
        body: "The 107-window stress test uses synthetic events, not observed pollution incidents.",
      },
    ],
    link: "Read the full list of limitations",
  },
  footer: {
    builtBy: "WaterMirror is built by",
    repos: "Repositories",
    app: "App",
    api: "API and research",
    docs: "Documentation",
    docLinks: {
      api: "API reference",
      formula: "WQI5 formula",
      modelCard: "Model card",
      limitations: "Limitations",
      nano: "Jetson Nano benchmark",
    },
  },
};

const zhTW: Copy = {
  meta: {
    title: "WaterMirror｜WQI5 水質評估",
    description:
      "WaterMirror 把五項水質數據換算成 WQI5 分數、水質等級與各指標狀態。提供 Android App、開放的 FastAPI 服務，並已在 Jetson Nano 上完成實測部署。",
  },
  skip: "跳到主要內容",
  nav: {
    label: "頁面區段",
    features: "功能",
    howItWorks: "運作方式",
    models: "模型",
    edge: "邊緣裝置",
    getStarted: "開始使用",
    switchLanguage: "English",
    switchLanguageLabel: "Read in English",
    github: "GitHub",
  },
  hero: {
    title: "用五項水質數據，讀懂一條河的水質。",
    lede: "WaterMirror 把溶氧、生化需氧量、氨氮、導電度與懸浮固體換算成 WQI5 分數、水質等級，以及每項指標的狀態。你可以使用 Android App、呼叫開放 API，或把整套服務跑在 Jetson Nano 上。",
    download: "下載 Android 版",
    source: "在 GitHub 查看原始碼",
    facts: ["Android App {app}", "API {api}（PyPI）", "支援 x86 與 ARM64"],
    figureCaption: "以範例資料產生的結果畫面。水尺標出同一個分數在 WQI5 上的位置。",
    shotAlt: "WaterMirror 報表畫面：綜合評分 62.45、中等，並附百分位圖與參考資料中各等級的比例。",
    gaugeTitle: "WQI5 水尺，分數 {score}，屬於「{band}」等級",
  },
  indicators: {
    label: "五項輸入指標",
    names: {
      DO: "溶氧",
      BOD: "生化需氧量",
      NH3N: "氨氮",
      EC: "導電度",
      SS: "懸浮固體",
    },
    unitNotes: { DO: "飽和度" },
  },
  features: {
    title: "App 能做什麼",
    items: [
      {
        title: "手動輸入或上傳 CSV",
        body: "逐筆輸入五項數值，或上傳表頭為 `DO,BOD,NH3N,EC,SS` 的 CSV，一次評估多筆資料。",
      },
      {
        title: "選擇計算方式",
        body: "直接用 WQI5 公式計算，或改用六種訓練好的模型比較：線性回歸、多項式回歸、SVM、隨機森林、XGBoost、LightGBM。",
      },
      {
        title: "看懂分數代表什麼",
        body: "報表列出分數、等級與分數區間、各指標的評等、這筆資料在參考資料中的百分位，以及輸入警示。",
      },
      {
        title: "連到自己的伺服器",
        body: "在「後端設定」輸入後端位址，送出資料前先測試健康與就緒狀態；位址會保存在手機上。",
      },
      {
        title: "支援四種語言",
        body: "英文、繁體中文、簡體中文與日文。",
      },
    ],
    shots: {
      input: "資料輸入畫面，展開模型清單",
      settings: "後端設定與連線測試",
    },
  },
  how: {
    title: "一筆數據如何變成分數",
    steps: [
      { title: "量測", body: "在採樣點取得 DO、BOD、NH₃-N、EC 與 SS。" },
      { title: "送出", body: "App 把數值送到 WQSurrogateModels API 的 `/api/v2/assessment`。" },
      { title: "評估", body: "API 檢查輸入後，用公式或你選的模型計算 WQI5。" },
      { title: "判讀", body: "App 顯示 API 回傳的分數、等級、分數區間、各指標狀態與警示。" },
    ],
    formulaTitle: "WQI5 公式",
    formulaBody: "每項指標先換算成 0 到 100 的子指數，WQI5 是五個子指數的等權平均，取到小數點後三位。",
    formulaLink: "查看子指數換算式",
    sourceOfTruth: "App 本身不計算分數，一律以 API 的結果為準，所以每個用戶端拿到的答案都一樣。",
    diagram: {
      title: "系統架構",
      app: { title: "WaterMirror App", body: "以 Expo 與 React Native 開發的 Android App" },
      api: { title: "WQSurrogateModels API", body: "FastAPI 服務，提供公式與訓練好的模型" },
      hosts: { title: "API 的執行環境", server: "一般 x86 伺服器或電腦", nano: "以 Docker 執行的 Jetson Nano 2GB（ARM64）" },
      appToApi: "HTTP，/api/v2",
      apiToHosts: "pip 或 Docker",
    },
  },
  bands: {
    title: "六個等級，各有適用用途",
    intro: "API 會把每個分數歸入六個等級之一，App 再說明該等級的水適合哪些用途。",
    tableLabel: "WQI5 等級、分數區間與適用用途",
    names: { excellent: "優良", good: "良好", fair: "中等", poor: "不良", bad: "糟糕", terrible: "惡劣" },
    uses: {
      excellent: "可做各種用途，加氯消毒後可直接飲用。",
      good: "可作為自來水水源，以及水產、工業、遊憩與灌溉用水。",
      fair: "經特別處理後可作為自來水水源；可養殖粗魚，並供工業、遊憩與灌溉用水。",
      poor: "僅適合灌溉或工業冷卻。",
      bad: "不會引起厭惡，可作環境保育用途。",
      terrible: "可能產生臭味。",
    },
  },
  models: {
    title: "公式是基準，模型用來比較",
    intro: "五項數據齊全時，預設且作為基準的是 WQI5 公式。另外訓練了六種回歸模型來近似公式，用來比較準確度與運算成本，也用在缺少指標的實驗情境。",
    chartTitle: "五項指標齊全時的平均絕對誤差（越低越好）",
    columns: { model: "模型", mae: "MAE", r2: "R²" },
    caveat: "為五次重複切分的平均。誤差是對資料集的 Score 欄位計算；公式本身與該欄位也有差距（MAE {formulaMae}），原因仍在調查，因此模型誤差較低不代表比公式更正確。",
    artifacts: "研究資料集與訓練好的模型檔不隨專案公開。公式可以直接使用；模型需自行在本機提供。",
    modelCard: "查看模型卡",
  },
  edge: {
    title: "在 2 GB 的 Jetson Nano 上實測",
    intro: "同一套 API 以 Docker 跑在 Jetson Nano 2GB（四核 Cortex-A57）上，只用 CPU 推論，模型訓練不在裝置上進行。",
    chartTitle: "Nano 上的單筆請求回應時間",
    columns: { path: "計算方式", p95: "第 95 百分位", p50: "中位數" },
    chartNote: "暖機後的單筆 HTTP 請求，走裝置本機迴路，MAXN 電源模式，每種方式 300 次。冷啟動載入另外量測。",
    parityFigure: "{jobs} 組中 {matched} 組",
    parityTitle: "重跑結果與 x86 一致",
    parityBody: "整套實驗在 Nano 上重跑，並以絕對誤差 {tolerance} 為門檻與 x86 比對。不一致的 {differing} 組都是缺指標重建情境下的線性與多項式模型，係數病態，會放大極小的浮點差異。",
    xgboostFigure: "2.1.4 → 3.2.0",
    xgboostTitle: "抓到分數錯誤",
    xgboostBody: "第一次部署到 Nano 時用的是 XGBoost 2.1.4，模型能正常載入，分數卻是錯的。與 x86 參考結果比對時發現問題，改為固定 3.2.0 後修正。",
    rfFigure: "{size} GB",
    rfTitle: "隨機森林最吃資源",
    rfBody: "這是正式版隨機森林的模型檔大小。冷啟動載入要 {cold} 秒，記憶體峰值 {peak} GiB，而裝置只有 {ram} GiB。200 棵樹的版本檔案小了三分之一，誤差只多 {mae}%，在完整確認實驗之前仍維持候選。",
    readMore: "查看完整實測報告",
  },
  start: {
    title: "開始使用",
    android: {
      title: "安裝 App",
      body: "下載 APK，打開「後端設定」，輸入正在運作的 API 位址，例如 `http://192.168.1.20:8001`。",
      cta: "下載 APK",
      notes: "版本說明",
    },
    server: {
      title: "架設 API",
      body: "需要 Python 3.10 以上。只用公式時不需要任何模型檔。",
      pypi: "執行套件也已發布到 PyPI：`wqsurrogatemodels`。",
    },
    api: {
      title: "從任何程式呼叫",
      body: "任何 HTTP 用戶端都能呼叫 App 使用的同一個端點。",
      docs: "查看 API 文件",
    },
  },
  scope: {
    title: "WaterMirror 不是什麼",
    items: [
      {
        title: "不是預測",
        body: "WQI5 描述的是你量到的這一筆樣本。資料沒有時間戳記，系統也沒有任何部分在預測未來水質。",
      },
      { title: "不是感測網路", body: "數值由使用者輸入或上傳，App 不會讀取儀器。" },
      { title: "不能取代公式", body: "五項數據齊全時請用 WQI5 公式；模型用於比較，以及缺少指標的研究。" },
      { title: "不是經實地驗證的警報", body: "107 視窗壓力測試使用合成事件，不是實際觀測到的污染事件。" },
    ],
    link: "查看完整研究限制",
  },
  footer: {
    builtBy: "WaterMirror 開發者",
    repos: "原始碼",
    app: "App",
    api: "API 與研究",
    docs: "文件",
    docLinks: {
      api: "API 文件",
      formula: "WQI5 公式",
      modelCard: "模型卡",
      limitations: "研究限制",
      nano: "Jetson Nano 實測",
    },
  },
};

export const copy: Record<Locale, Copy> = { en, "zh-TW": zhTW };

export const localePath: Record<Locale, string> = { en: "/", "zh-TW": "/zh-tw/" };

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
