import { notoSansJP } from "../fonts";
import { RootDocument } from "../RootDocument";

export default function JapaneseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="ja" cjkFont={notoSansJP.variable}>
      {children}
    </RootDocument>
  );
}
