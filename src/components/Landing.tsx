import Link from "next/link";
import type { ReactNode } from "react";

import resultShot from "@/assets/screenshots/assessment-result.png";
import inputShot from "@/assets/screenshots/model-options.png";
import settingsShot from "@/assets/screenshots/backend-settings.png";
import { BrandMark } from "@/components/BrandMark";
import { PhoneShot } from "@/components/PhoneShot";
import { Rich } from "@/components/Rich";
import { StaffGauge } from "@/components/StaffGauge";
import { copy, fill, localePath, type Copy, type Locale } from "@/content/copy";
import {
  bands,
  completeInput,
  formulaMaeVsScore,
  indicators,
  indicatorUnits,
  links,
  nanoDevice,
  nanoLatency,
  parity,
  rfCompression,
  sampleReading,
  versions,
} from "@/content/facts";

const container = "mx-auto w-full max-w-[72rem] px-6 md:px-10";
const sectionTitle = "font-display text-[2.125rem] font-semibold leading-[1.1] tracking-[-0.01em] md:text-[2.75rem]";
const buttonBase =
  "inline-flex min-h-12 items-center justify-center rounded-md px-5 py-2.5 text-[1.0625rem] font-semibold transition-colors";
const primaryButton = `${buttonBase} bg-ink text-paper hover:bg-river`;
const secondaryButton = `${buttonBase} border border-ink text-ink hover:bg-surface`;
const textLink =
  "inline-flex min-h-11 items-center font-semibold text-river underline decoration-1 underline-offset-4 transition-colors hover:text-ink";

function External({ href, className, children, label }: { href: string; className?: string; children: ReactNode; label?: string }) {
  return (
    <a href={href} className={className} aria-label={label} rel="noopener noreferrer">
      {children}
    </a>
  );
}

function SiteHeader({ t, locale }: { t: Copy; locale: Locale }) {
  const other: Locale = locale === "en" ? "zh-TW" : "en";
  const nav = [
    ["#features", t.nav.features],
    ["#how-it-works", t.nav.howItWorks],
    ["#models", t.nav.models],
    ["#edge", t.nav.edge],
    ["#get-started", t.nav.getStarted],
  ] as const;
  return (
    <header className={`${container} flex items-center justify-between gap-6 py-5`}>
      <Link href={localePath[locale]} className="flex items-center gap-2.5 font-display text-[1.375rem] font-semibold">
        <BrandMark />
        WaterMirror
      </Link>
      <nav aria-label={t.nav.label} className="hidden lg:block">
        <ul className="flex gap-7 text-[1rem] text-muted">
          {nav.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-5 text-[1rem]">
        <Link href={localePath[other]} hrefLang={other} lang={other} aria-label={t.nav.switchLanguageLabel} className="inline-flex min-h-11 items-center transition-colors hover:text-river">
          {t.nav.switchLanguage}
        </Link>
        <External href={links.watermirror} className="inline-flex min-h-11 items-center transition-colors hover:text-river">
          {t.nav.github}
        </External>
      </div>
    </header>
  );
}

function Hero({ t, locale }: { t: Copy; locale: Locale }) {
  const bandName = t.bands.names[sampleReading.band];
  const titleSize = locale === "en" ? "text-[2.625rem] md:text-[3.5rem] lg:text-[4rem]" : "text-[2.375rem] md:text-[3.125rem] lg:text-[3.5rem]";
  return (
    <section className={`${container} grid gap-12 pb-16 pt-8 md:grid-cols-12 md:items-center md:gap-8 md:pb-24 md:pt-14`}>
      <div className="md:col-span-7 lg:col-span-6">
        <h1 className={`font-display font-semibold leading-[1.08] tracking-[-0.015em] ${titleSize}`}>
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-[1.1875rem] text-muted">{t.hero.lede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <External href={links.apk} className={primaryButton}>
            {t.hero.download}
          </External>
          <External href={links.watermirror} className={secondaryButton}>
            {t.hero.source}
          </External>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.9375rem] text-muted">
          {t.hero.facts.map((f) => (
            <li key={f} className="tabular">
              {fill(f, versions)}
            </li>
          ))}
        </ul>
      </div>
      <figure className="md:col-span-5 lg:col-span-6">
        <div className="flex items-stretch justify-center gap-3 sm:gap-5 md:justify-end">
          <div className="w-[140px] shrink-0 sm:w-[195px] lg:w-[223px]">
            <StaffGauge
              id="hero-gauge"
              score={sampleReading.score}
              band={sampleReading.band}
              bandNames={t.bands.names}
              title={fill(t.hero.gaugeTitle, { score: sampleReading.score, band: bandName })}
            />
          </div>
          <PhoneShot src={resultShot} alt={t.hero.shotAlt} priority className="w-[10.5rem] shrink-0 sm:w-[14rem] lg:w-[16rem]" />
        </div>
        <figcaption className="mt-4 text-center text-[0.875rem] text-muted md:text-right">{t.hero.figureCaption}</figcaption>
      </figure>
    </section>
  );
}

function Indicators({ t }: { t: Copy }) {
  return (
    <section aria-label={t.indicators.label} className="border-y border-rule bg-surface">
      <dl className={`${container} grid grid-cols-2 gap-x-6 gap-y-6 py-7 sm:grid-cols-3 md:grid-cols-5`}>
        {indicators.map((key) => {
          const note = t.indicators.unitNotes[key];
          return (
            <div key={key}>
              <dt className="font-display text-[1.5rem] font-semibold leading-tight">{key === "NH3N" ? "NH₃-N" : key}</dt>
              <dd className="text-[1rem]">{t.indicators.names[key]}</dd>
              <dd className="text-[0.9375rem] text-muted">
                {indicatorUnits[key]}
                {note ? ` ${note}` : ""}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

function Features({ t }: { t: Copy }) {
  return (
    <section id="features" className={`${container} scroll-mt-6 py-20 md:py-28`}>
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <h2 className={sectionTitle}>{t.features.title}</h2>
          <ul className="mt-10 space-y-8">
            {t.features.items.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-[1.3125rem] font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1.5 text-muted">
                  <Rich text={item.body} />
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-start justify-center gap-4 sm:gap-6 md:col-span-6 md:justify-end">
          <figure className="w-[46%] max-w-[15rem]">
            <PhoneShot src={inputShot} alt={t.features.shots.input} />
            <figcaption className="mt-3 text-[0.875rem] text-muted">{t.features.shots.input}</figcaption>
          </figure>
          <figure className="mt-16 w-[46%] max-w-[15rem]">
            <PhoneShot src={settingsShot} alt={t.features.shots.settings} />
            <figcaption className="mt-3 text-[0.875rem] text-muted">{t.features.shots.settings}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function DiagramNode({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded border border-ink bg-surface px-4 py-3">
      <p className="font-display text-[1.125rem] font-semibold leading-snug">{title}</p>
      <p className="text-[0.9375rem] text-muted">{body}</p>
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1 pl-6" aria-hidden="false">
      <svg width="12" height="36" viewBox="0 0 12 36" aria-hidden="true" className="shrink-0">
        <line x1="6" y1="0" x2="6" y2="30" stroke="var(--color-ink)" strokeWidth="1.5" />
        <path d="M1 28 L6 35 L11 28" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
      </svg>
      <span className="text-[0.875rem] text-muted">{label}</span>
    </div>
  );
}

function HowItWorks({ t }: { t: Copy }) {
  const d = t.how.diagram;
  return (
    <section id="how-it-works" className="scroll-mt-6 border-t border-rule py-20 md:py-28">
      <div className={container}>
        <h2 className={sectionTitle}>{t.how.title}</h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-4">
              <span className="font-display text-[1rem] font-semibold text-muted tabular">{i + 1}</span>
              <h3 className="font-display text-[1.375rem] font-semibold leading-snug">{step.title}</h3>
              <p className="mt-1.5 text-[1.0625rem] text-muted">
                <Rich text={step.body} />
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <h3 className="font-display text-[1.5rem] font-semibold">{t.how.formulaTitle}</h3>
            <p className="mt-2 text-muted">{t.how.formulaBody}</p>
            <p className="mt-5 overflow-x-auto rounded border border-rule bg-surface px-4 py-4 font-display text-[1.25rem] leading-relaxed whitespace-nowrap">
              <span className="font-semibold">WQI5</span> = (Q<sub>DO</sub> + Q<sub>BOD</sub> + Q<sub>NH₃-N</sub> + Q<sub>EC</sub> + Q<sub>SS</sub>) ÷ 5
            </p>
            <p className="mt-4">
              <External href={links.formula} className={textLink}>
                {t.how.formulaLink}
              </External>
            </p>
            <p className="mt-8 border-l-2 border-river pl-4 text-[1.0625rem]">{t.how.sourceOfTruth}</p>
          </div>
          <figure className="md:col-span-6 lg:col-span-6 lg:col-start-7" aria-label={d.title}>
            <figcaption className="sr-only">{d.title}</figcaption>
            <DiagramNode {...d.app} />
            <Connector label={d.appToApi} />
            <DiagramNode {...d.api} />
            <Connector label={d.apiToHosts} />
            <div className="rounded border border-dashed border-muted px-4 pb-4 pt-3">
              <p className="text-[0.9375rem] text-muted">{d.hosts.title}</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <p className="rounded border border-ink bg-surface px-3 py-2.5 text-[1rem] font-semibold leading-snug">{d.hosts.server}</p>
                <p className="rounded border border-ink bg-surface px-3 py-2.5 text-[1rem] font-semibold leading-snug">{d.hosts.nano}</p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Bands({ t }: { t: Copy }) {
  return (
    <section className={`${container} py-20 md:py-28`} aria-labelledby="bands-title">
      <div className="max-w-[44rem]">
        <h2 id="bands-title" className={sectionTitle}>
          {t.bands.title}
        </h2>
        <p className="mt-5 text-muted">{t.bands.intro}</p>
      </div>
      <table className="mt-10 w-full border-collapse text-left">
        <caption className="sr-only">{t.bands.tableLabel}</caption>
        <tbody>
          {bands.map((b) => (
            <tr key={b.id} className="border-t border-rule last:border-b">
              <th scope="row" className="w-[38%] py-4 pr-4 align-top font-normal sm:w-[30%]">
                <span className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1 h-9 w-2.5 shrink-0 rounded-sm" style={{ background: b.color }} />
                  <span>
                    <span className="block font-display text-[1.25rem] font-semibold leading-snug">{t.bands.names[b.id]}</span>
                    <span className="block text-[0.9375rem] text-muted tabular">
                      {b.min === 0 ? `0 ≤ WQI5 ≤ ${b.max}` : `${b.min} < WQI5 ≤ ${b.max}`}
                    </span>
                  </span>
                </span>
              </th>
              <td className="py-4 align-top text-[1.0625rem]">{t.bands.uses[b.id]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Models({ t }: { t: Copy }) {
  const max = Math.max(...completeInput.map((m) => m.mae));
  return (
    <section id="models" className="scroll-mt-6 border-t border-rule py-20 md:py-28">
      <div className={container}>
        <div className="max-w-[44rem]">
          <h2 className={sectionTitle}>{t.models.title}</h2>
          <p className="mt-5 text-muted">{t.models.intro}</p>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="pb-4 text-left font-display text-[1.25rem] font-semibold">{t.models.chartTitle}</caption>
              <thead>
                <tr className="text-[0.875rem] text-muted">
                  <th scope="col" className="pb-2 pr-4 font-normal">
                    {t.models.columns.model}
                  </th>
                  <th scope="col" className="pb-2 pr-4 font-normal">
                    {t.models.columns.mae}
                  </th>
                  <th scope="col" className="pb-2 text-right font-normal">
                    {t.models.columns.r2}
                  </th>
                </tr>
              </thead>
              <tbody>
                {completeInput.map((m) => (
                  <tr key={m.id} className="border-t border-rule">
                    <th scope="row" className="w-[34%] py-3 pr-4 text-[1rem] font-semibold">
                      {m.name}
                    </th>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-3 rounded-r-[4px] bg-river"
                          style={{ width: `${Math.max((m.mae / max) * 72, 1.5)}%` }}
                        />
                        <span className="text-[1rem] tabular">{m.mae.toFixed(3)}</span>
                      </span>
                    </td>
                    <td className="py-3 text-right text-[1rem] text-muted tabular">{m.r2.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-5 text-[1rem] text-muted lg:col-span-4 lg:pt-12">
            <p>{fill(t.models.caveat, { formulaMae: formulaMaeVsScore.toFixed(2) })}</p>
            <p>{t.models.artifacts}</p>
            <p>
              <External href={links.modelCard} className={textLink}>
                {t.models.modelCard}
              </External>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Edge({ t }: { t: Copy }) {
  const max = Math.max(...nanoLatency.map((m) => m.p95));
  const rf = nanoLatency.find((m) => m.id === "rf")!;
  const figures = [
    {
      figure: fill(t.edge.parityFigure, parity),
      title: t.edge.parityTitle,
      body: fill(t.edge.parityBody, parity),
    },
    { figure: t.edge.xgboostFigure, title: t.edge.xgboostTitle, body: t.edge.xgboostBody },
    {
      figure: fill(t.edge.rfFigure, { size: rfCompression.rfArtifactGB.toFixed(2) }),
      title: t.edge.rfTitle,
      body: fill(t.edge.rfBody, {
        cold: Math.round(rf.coldLoadS ?? 0),
        peak: (rf.peakMiB / 1024).toFixed(1),
        ram: (nanoDevice.ramMiB / 1024).toFixed(1),
        mae: rfCompression.maeIncreasePct.toFixed(2),
      }),
    },
  ];
  return (
    <section id="edge" className="scroll-mt-6 border-y border-rule bg-surface py-20 md:py-28">
      <div className={container}>
        <div className="max-w-[44rem]">
          <h2 className={sectionTitle}>{t.edge.title}</h2>
          <p className="mt-5 text-muted">{t.edge.intro}</p>
        </div>

        <div className="mt-12 max-w-[52rem]">
          <table className="w-full border-collapse text-left">
            <caption className="pb-4 text-left font-display text-[1.25rem] font-semibold">{t.edge.chartTitle}</caption>
            <thead>
              <tr className="text-[0.875rem] text-muted">
                <th scope="col" className="pb-2 pr-4 font-normal">
                  {t.edge.columns.path}
                </th>
                <th scope="col" className="pb-2 pr-4 font-normal">
                  {t.edge.columns.p95}
                </th>
                <th scope="col" className="pb-2 text-right font-normal">
                  {t.edge.columns.p50}
                </th>
              </tr>
            </thead>
            <tbody>
              {nanoLatency.map((m) => (
                <tr key={m.id} className="border-t border-rule">
                  <th scope="row" className="w-[30%] py-3 pr-4 text-[1rem] font-semibold">
                    {m.name}
                  </th>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-3 rounded-r-[4px] bg-river"
                        style={{ width: `${Math.max((m.p95 / max) * 72, 1.5)}%` }}
                      />
                      <span className="whitespace-nowrap text-[1rem] tabular">{m.p95.toFixed(2)} ms</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 text-right text-[1rem] text-muted tabular">{m.p50.toFixed(2)} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[0.9375rem] text-muted">{t.edge.chartNote}</p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {figures.map((f, i) => (
            <div key={f.title} className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-rule"} ${i === 2 ? "md:pr-0" : ""}`}>
              <p className="font-display text-[2rem] font-semibold leading-tight tabular">{f.figure}</p>
              <h3 className="mt-2 font-display text-[1.25rem] font-semibold">{f.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10">
          <External href={links.nanoBenchmark} className={textLink}>
            {t.edge.readMore}
          </External>
        </p>
      </div>
    </section>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <pre aria-label={label} tabIndex={0} className="mt-4 overflow-x-auto rounded border border-rule bg-surface px-4 py-3.5 text-[0.8125rem] leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

const serverCode = `git clone https://github.com/KageRyo/WQSurrogateModels.git
cd WQSurrogateModels
uv sync
uv run python main.py`;

const curlCode = `curl -X POST http://localhost:8001/api/v2/assessment \\
  -H "Content-Type: application/json" \\
  -d '{"DO":70,"BOD":2,"NH3N":0.3,"EC":400,"SS":10,
       "model_type":"direct_wqi5"}'

{"score": 75.685, "category": "Good",
 "rating_range": "70 < WQI5 ≤ 85", ...}`;

const startRow = "grid gap-4 border-t border-rule py-8 md:grid-cols-12 md:gap-10";
const startTitle = "font-display text-[1.5rem] font-semibold leading-snug md:col-span-4";

function GetStarted({ t }: { t: Copy }) {
  return (
    <section id="get-started" className={`${container} scroll-mt-6 py-20 md:py-28`}>
      <h2 className={sectionTitle}>{t.start.title}</h2>
      <div className="mt-12">
        <div className={startRow}>
          <h3 className={startTitle}>{t.start.android.title}</h3>
          <div className="min-w-0 md:col-span-8">
            <p className="text-muted">
              <Rich text={t.start.android.body} />
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <External href={links.apk} className={primaryButton}>
                {t.start.android.cta} <span className="ml-1.5 font-normal tabular">v{versions.app}</span>
              </External>
              <External href={links.appReleases} className={textLink}>
                {t.start.android.notes}
              </External>
            </div>
          </div>
        </div>
        <div className={startRow}>
          <h3 className={startTitle}>{t.start.server.title}</h3>
          <div className="min-w-0 md:col-span-8">
            <p className="text-muted">{t.start.server.body}</p>
            <CodeBlock code={serverCode} label={t.start.server.title} />
            <p className="mt-3 text-[1rem] text-muted">
              <Rich text={t.start.server.pypi} />
            </p>
          </div>
        </div>
        <div className={`${startRow} border-b`}>
          <h3 className={startTitle}>{t.start.api.title}</h3>
          <div className="min-w-0 md:col-span-8">
            <p className="text-muted">{t.start.api.body}</p>
            <CodeBlock code={curlCode} label={t.start.api.title} />
            <p className="mt-3">
              <External href={links.apiReference} className={textLink}>
                {t.start.api.docs}
              </External>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Scope({ t }: { t: Copy }) {
  return (
    <section className="border-t border-rule py-20 md:py-28" aria-labelledby="scope-title">
      <div className={container}>
        <h2 id="scope-title" className={sectionTitle}>
          {t.scope.title}
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {t.scope.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-[1.3125rem] font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <External href={links.limitations} className={textLink}>
            {t.scope.link}
          </External>
        </p>
      </div>
    </section>
  );
}

function SiteFooter({ t, locale }: { t: Copy; locale: Locale }) {
  const other: Locale = locale === "en" ? "zh-TW" : "en";
  const docs = [
    [links.apiReference, t.footer.docLinks.api],
    [links.formula, t.footer.docLinks.formula],
    [links.modelCard, t.footer.docLinks.modelCard],
    [links.limitations, t.footer.docLinks.limitations],
    [links.nanoBenchmark, t.footer.docLinks.nano],
  ] as const;
  return (
    <footer className="bg-ink text-paper">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <p className="flex items-center gap-2.5 font-display text-[1.375rem] font-semibold">
            <span className="rounded bg-paper p-1">
              <BrandMark className="h-6 w-6" />
            </span>
            WaterMirror
          </p>
          <p className="mt-4 text-[1rem] text-paper/75">
            {t.footer.builtBy}{" "}
            <External href={links.author} className="font-semibold text-paper underline underline-offset-4">
              KageRyo
            </External>
          </p>
          <p className="mt-2 text-[1rem]">
            <Link href={localePath[other]} hrefLang={other} lang={other} className="inline-flex min-h-10 items-center underline underline-offset-4">
              {t.nav.switchLanguage}
            </Link>
          </p>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-[0.9375rem] font-semibold text-paper/75">{t.footer.repos}</h2>
          <ul className="mt-2 space-y-1 text-[1rem]">
            <li>
              <External href={links.watermirror} className="inline-flex min-h-10 items-center hover:underline">
                WaterMirror
              </External>
              <span className="block text-[0.9375rem] text-paper/60">{t.footer.app}</span>
            </li>
            <li>
              <External href={links.wqsurrogate} className="inline-flex min-h-10 items-center hover:underline">
                WQSurrogateModels
              </External>
              <span className="block text-[0.9375rem] text-paper/60">{t.footer.api}</span>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="text-[0.9375rem] font-semibold text-paper/75">{t.footer.docs}</h2>
          <ul className="mt-2 text-[1rem]">
            {docs.map(([href, label]) => (
              <li key={href}>
                <External href={href} className="inline-flex min-h-10 items-center hover:underline">
                  {label}
                </External>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Landing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.skip}
      </a>
      <SiteHeader t={t} locale={locale} />
      <main id="main">
        <Hero t={t} locale={locale} />
        <Indicators t={t} />
        <Features t={t} />
        <HowItWorks t={t} />
        <Bands t={t} />
        <Models t={t} />
        <Edge t={t} />
        <GetStarted t={t} />
        <Scope t={t} />
      </main>
      <SiteFooter t={t} locale={locale} />
    </>
  );
}
