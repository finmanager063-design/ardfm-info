import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { formatDate } from "@/lib/format";
import { resolveItemImage } from "@/lib/news-media";
import type { GovNews } from "@/lib/types";

export function NewsCard({
  item,
  detailsBase = "/press/news/details",
}: {
  item: GovNews;
  detailsBase?: string;
}) {
  const img = resolveItemImage(item, item.id);
  const href = `${detailsBase}/${item.id}`;
  return (
    <article className="news-card">
      <Link href={href} className="news-card__img">
        <GovImage src={img} alt="" />
      </Link>
      <div className="news-card__body">
        <time dateTime={item.created_date}>{formatDate(item.created_date)}</time>
        <h3>
          <Link href={href}>{item.title}</Link>
        </h3>
        {item.short_description && <p>{item.short_description}</p>}
      </div>
    </article>
  );
}
