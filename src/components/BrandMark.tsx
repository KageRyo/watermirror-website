// A single staff-gauge "E" above a waterline, with its reflection below.
export function BrandMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <g fill="var(--color-ink)">
        <rect x="9" y="2" width="3.2" height="13" />
        <rect x="9" y="2" width="14" height="3" />
        <rect x="9" y="7" width="11" height="3" />
        <rect x="9" y="12" width="14" height="3" />
      </g>
      <path d="M3 17.5 Q6.25 15.5 9.5 17.5 T16 17.5 T22.5 17.5 T29 17.5" fill="none" stroke="var(--color-river)" strokeWidth="2" strokeLinecap="round" />
      <g fill="var(--color-ink)" fillOpacity="0.3">
        <rect x="9" y="20" width="3.2" height="10" />
        <rect x="9" y="20" width="14" height="2.4" />
        <rect x="9" y="24" width="11" height="2.4" />
        <rect x="9" y="28" width="14" height="2" />
      </g>
    </svg>
  );
}
