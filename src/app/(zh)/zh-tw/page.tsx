import { Landing } from "@/components/Landing";

import { pageMetadata } from "../../site";

export const metadata = pageMetadata("zh-TW");

export default function Page() {
  return <Landing locale="zh-TW" />;
}
