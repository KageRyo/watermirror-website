"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { LOCALE_STORAGE_KEY } from "@/lib/pickLocale";

// A language link that remembers the choice, so the home page stops
// following the browser language once the visitor has picked one.
export function LocaleLink({ locale, onClick, ...props }: ComponentProps<typeof Link> & { locale: string }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, locale);
        } catch {
          // Storage can be unavailable (private mode); the link still works.
        }
        onClick?.(event);
      }}
    />
  );
}
