import Link from "next/link";
import { getContent } from "@/lib/content";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim().toLowerCase();
  const { news, documents, pages } = getContent();

  const results = query
    ? [
        ...news
          .filter(
            (n) =>
              n.title?.toLowerCase().includes(query) ||
              n.short_description?.toLowerCase().includes(query),
          )
          .map((n) => ({
            href: `/press/news/details/${n.id}`,
            title: n.title,
            type: "Новость",
          })),
        ...documents
          .filter((d) => d.title?.toLowerCase().includes(query))
          .map((d) => ({
            href: `/documents/item/${d.id}`,
            title: d.title,
            type: "Документ",
          })),
        ...pages
          .filter((p) => p.title?.toLowerCase().includes(query))
          .map((p) => ({
            href: p.internal_link || `/${p.slug}`,
            title: p.title,
            type: "Страница",
          })),
      ]
    : [];

  return (
    <>
      <h1 className="page-title">Поиск</h1>
      {!query && <p>Введите запрос в форме поиска в шапке сайта.</p>}
      {query && (
        <>
          <p>
            Результаты по запросу «<strong>{q}</strong>»: {results.length}
          </p>
          <ul className="doc-list">
            {results.map((r) => (
              <li key={r.href}>
                <span style={{ fontSize: "0.8rem", color: "#5c6370" }}>{r.type}</span>
                <br />
                <Link href={r.href}>{r.title}</Link>
              </li>
            ))}
          </ul>
          {results.length === 0 && <p>Ничего не найдено.</p>}
        </>
      )}
    </>
  );
}
