import { bands, type BandId } from "@/content/facts";

// A river staff gauge (水尺) recast as the WQI5 scale: E-shaped graduations
// every 10 points, the six bands on a strip beside it, and a waterline at the
// sample score. Graduations below the waterline are drawn faded, like their
// reflection in the water.

const PAD = 20;
const UNIT = 5;
const WIDTH = 224;
const HEIGHT = PAD * 2 + 100 * UNIT;
const y = (v: number) => PAD + (100 - v) * UNIT;

const STRIP = { x: 38, w: 8 };
const PLATE = { x: 54, w: 60 };
const LABEL_X = 126;
const BOUNDARIES = [100, 85, 70, 50, 30, 15, 0];

function graduations() {
  const rects: { x: number; y: number; width: number; height: number }[] = [];
  for (let d = 0; d < 10; d++) {
    const base = d * 10;
    const left = d % 2 === 0;
    const spineX = left ? PLATE.x + 5 : PLATE.x + PLATE.w - 10;
    const barX = left ? PLATE.x + 5 : PLATE.x + PLATE.w - 30;
    rects.push({ x: spineX, y: y(base + 10), width: 5, height: 5 * UNIT });
    for (const top of [10, 8, 6]) {
      rects.push({ x: barX, y: y(base + top), width: 25, height: UNIT });
    }
  }
  return rects;
}

function wavePath(atY: number, x0: number, x1: number) {
  const step = 9.5;
  let d = `M${x0} ${atY}`;
  for (let x = x0, i = 0; x < x1; x += step, i++) {
    const nx = Math.min(x + step, x1);
    const cy = atY + (i % 2 === 0 ? -2.2 : 2.2);
    d += ` Q${(x + nx) / 2} ${cy} ${nx} ${atY}`;
  }
  return d;
}

export function StaffGauge({
  score,
  band,
  bandNames,
  title,
  id,
}: Readonly<{
  score: number;
  band: BandId;
  bandNames: Record<BandId, string>;
  title: string;
  id: string;
}>) {
  const water = y(score);
  const marks = graduations();
  const clipAbove = `${id}-above`;
  const clipBelow = `${id}-below`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-labelledby={`${id}-title`}
      className="block h-auto w-full overflow-visible"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <clipPath id={clipAbove}>
          <rect x="0" y="0" width={WIDTH} height={water} />
        </clipPath>
        <clipPath id={clipBelow}>
          <rect x="0" y={water} width={WIDTH} height={HEIGHT - water} />
        </clipPath>
      </defs>

      {BOUNDARIES.map((v) => (
        <g key={v}>
          <line x1={STRIP.x - 6} x2={STRIP.x - 1} y1={y(v)} y2={y(v)} stroke="var(--color-muted)" strokeWidth="1" />
          <text
            x={STRIP.x - 9}
            y={y(v)}
            textAnchor="end"
            dominantBaseline="middle"
            fill="var(--color-muted)"
            className="gauge-num tabular"
          >
            {v}
          </text>
        </g>
      ))}

      {bands.map((b) => (
        <rect
          key={b.id}
          x={STRIP.x}
          y={y(b.max) + 1}
          width={STRIP.w}
          height={(b.max - b.min) * UNIT - 2}
          rx="2"
          fill={b.color}
        />
      ))}

      <rect x={PLATE.x} y={y(100)} width={PLATE.w} height={100 * UNIT} fill="var(--color-surface)" stroke="var(--color-rule)" />

      <g clipPath={`url(#${clipAbove})`} fill="var(--color-ink)">
        {marks.map((r) => (
          <rect key={`${r.x}-${r.y}-${r.width}`} {...r} />
        ))}
      </g>

      {bands
        .filter((b) => b.id !== band)
        .map((b) => (
          <text key={b.id} x={LABEL_X} y={y((b.min + b.max) / 2)} dominantBaseline="middle" fill="var(--color-muted)" className="gauge-label">
            {bandNames[b.id]}
          </text>
        ))}

      <g className="waterline">
        <rect x={PLATE.x} y={water} width={PLATE.w} height={y(0) - water} fill="var(--color-river)" fillOpacity="0.12" />
        <g clipPath={`url(#${clipBelow})`} fill="var(--color-ink)" fillOpacity="0.35">
          {marks.map((r) => (
            <rect key={`${r.x}-${r.y}-${r.width}`} {...r} />
          ))}
        </g>
        <path d={wavePath(water, STRIP.x - 4, PLATE.x + PLATE.w + 6)} fill="none" stroke="var(--color-river)" strokeWidth="2" strokeLinecap="round" />
        <text x={LABEL_X} y={water - 4} fontWeight="600" fill="var(--color-ink)" className="gauge-score tabular">
          {score.toFixed(2)}
        </text>
        <text x={LABEL_X} y={water + 6} dominantBaseline="hanging" fontWeight="600" fill="var(--color-ink)" className="gauge-label">
          {bandNames[band]}
        </text>
      </g>
    </svg>
  );
}
