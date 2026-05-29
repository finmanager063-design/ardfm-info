import type { SiteContent } from "./types";

type Article = SiteContent["articles"][number];

/** Один id в API gov.kz часто дублируется (kk/ru) — оставляем лучшую версию. */
export function dedupeArticles(articles: Article[]): Article[] {
  const byId = new Map<string, Article>();
  for (const a of articles) {
    const id = String(a.id);
    const prev = byId.get(id);
    if (!prev) {
      byId.set(id, a);
      continue;
    }
    const score = (x: Article) =>
      (x.content?.length ?? 0) * 10 + (x.publication_date ?? "").length;
    if (score(a) > score(prev)) byId.set(id, a);
  }
  return Array.from(byId.values());
}
