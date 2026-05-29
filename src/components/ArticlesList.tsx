import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { SiteContent } from "@/lib/types";

export function ArticlesList({ articles }: { articles: SiteContent["articles"] }) {
  if (!articles.length) {
    return <p>Статьи не загружены. Запустите <code>npm run sync</code>.</p>;
  }

  const sorted = [...articles].sort((a, b) =>
    (b.publication_date || "").localeCompare(a.publication_date || ""),
  );

  return (
    <ul className="doc-list">
      {sorted.map((a) => (
        <li key={`${a.id}-${a.alias}`}>
          <Link href={`/article/details/${a.id}`}>{a.title}</Link>
          {a.publication_date && <time>{formatDate(a.publication_date)}</time>}
          {a.short_description && <p style={{ margin: "0.25rem 0 0" }}>{a.short_description}</p>}
        </li>
      ))}
    </ul>
  );
}
