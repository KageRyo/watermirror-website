import { RootDocument } from "../RootDocument";

export default function TraditionalChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="zh-TW">
      {children}
    </RootDocument>
  );
}
