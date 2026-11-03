"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Option = { locale: string; lang: string; href: string; name: string };

// A native <details> disclosure, so the menu also works before hydration.
// The effect only adds closing on Escape and on clicks outside the menu.
export function LanguageMenu({ label, current, options }: { label: string; current: string; options: Option[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const menu = ref.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const onKey = (event: KeyboardEvent) => {
      const menu = ref.current;
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const currentName = options.find((o) => o.locale === current)?.name ?? current;

  return (
    <details ref={ref} className="group relative">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 transition-colors hover:text-river [&::-webkit-details-marker]:hidden">
        <span className="sr-only">{label}: </span>
        {currentName}
        <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 transition-transform group-open:rotate-180">
          <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul className="absolute right-0 top-full z-20 mt-1 min-w-[11rem] rounded border border-ink bg-surface py-1">
        {options.map((o) => (
          <li key={o.locale}>
            <Link
              href={o.href}
              lang={o.lang}
              hrefLang={o.lang}
              aria-current={o.locale === current ? "page" : undefined}
              className="flex min-h-11 items-center px-4 transition-colors hover:bg-wash aria-[current=page]:font-semibold"
            >
              {o.name}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
