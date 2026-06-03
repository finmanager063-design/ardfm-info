import { getContent } from "@/lib/content";
import { VariantAClient } from "@/components/premium/VariantAClient";
import type { GovNews } from "@/lib/types";

export default function VariantAPage() {
  const { news, pressReleases, meta } = getContent();
  const allNews: GovNews[] = [...pressReleases, ...news].slice(0, 5);

  return <VariantAClient news={allNews} meta={meta} />;
}
