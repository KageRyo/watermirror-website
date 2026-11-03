import { Landing } from "@/components/Landing";

import { pageMetadata } from "../../site";

export const metadata = pageMetadata("ja");

export default function Page() {
  return <Landing locale="ja" />;
}
