import { RootDocument } from "../RootDocument";

export default function JapaneseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="ja">
      {children}
    </RootDocument>
  );
}
