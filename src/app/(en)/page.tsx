import { Landing } from "@/components/Landing";

import { pageMetadata } from "../site";

export const metadata = pageMetadata("en");

export default function Page() {
  return <Landing locale="en" />;
}
