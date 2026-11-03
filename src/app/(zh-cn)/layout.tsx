import { RootDocument } from "../RootDocument";

export default function SimplifiedChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument locale="zh-CN">
      {children}
    </RootDocument>
  );
}
