import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { formatDate } from "@/lib/format";
import { resolveItemImage } from "@/lib/news-media";
import type { SiteContent } from "@/lib/types";

export function ArticlesList({
  articles,
  articleHrefBase = "/article/details",
}: {
  articles: SiteContent["articles"];
  articleHrefBase?: string;
}) {
  if (!articles.length) {
    return <p>Статьи не загружены. Запустите <code>npm run sync</code>.</p>;
  }

  const sorted = [...articles].sort((a, b) =>
    (b.publication_date || "").localeCompare(a.publication_date || ""),
  );

  return (
    <ul className="articles-list">
      {sorted.map((a) => {
        const img = resolveItemImage(
          { body: a.content, heropic: a.heropic, title: a.title },
          `article-list-${a.id}`,
        );
        return (
          <li key={`${a.id}-${a.alias}`} className="articles-list__item">
            <Link href={`${articleHrefBase}/${a.id}`} className="articles-list__thumb">
              <GovImage src={img} alt="" />
            </Link>
            <div className="articles-list__body">
              <Link href={`${articleHrefBase}/${a.id}`}>{a.title}</Link>
              {a.publication_date && <time>{formatDate(a.publication_date)}</time>}
              {a.short_description && <p>{a.short_description}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
