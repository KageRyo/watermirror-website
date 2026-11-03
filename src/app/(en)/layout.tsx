import { LocaleRedirect } from "@/components/LocaleRedirect";

import { RootDocument } from "../RootDocument";

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="en" head={<LocaleRedirect />}>
      {children}
    </RootDocument>
  );
}
