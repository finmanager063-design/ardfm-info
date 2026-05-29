import Link from "next/link";
import { formatDate, mediaUrl } from "@/lib/format";
import type { GovNews } from "@/lib/types";

export function NewsCard({ item }: { item: GovNews }) {
  const img = mediaUrl(item.heropic);
  return (
    <article className="news-card">
      {img && (
        <Link href={`/press/news/details/${item.id}`} className="news-card__img">
          <img src={img} alt="" loading="lazy" />
        </Link>
      )}
      <div className="news-card__body">
        <time dateTime={item.created_date}>{formatDate(item.created_date)}</time>
        <h3>
          <Link href={`/press/news/details/${item.id}`}>{item.title}</Link>
        </h3>
        {item.short_description && <p>{item.short_description}</p>}
      </div>
    </article>
  );
}
