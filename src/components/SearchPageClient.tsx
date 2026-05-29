"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchIndex = {
  news: { id: string; title: string; short_description?: string; href: string }[];
  documents: { id: string | number; title: string; href: string }[];
  pages: { title: string; href: string }[];
  articles?: { title: string; href: string; short_description?: string }[];
};

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const query = q.trim().toLowerCase();
  const [index, setIndex] = useState<SearchIndex | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/search-index.json`)
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex({ news: [], documents: [], pages: [], articles: [] }));
  }, []);

  const results =
    query && index
      ? [
          ...index.news
            .filter(
              (n) =>
                n.title?.toLowerCase().includes(query) ||
                n.short_description?.toLowerCase().includes(query),
            )
            .map((n) => ({ href: n.href, title: n.title, type: "Новость" })),
          ...index.documents
            .filter((d) => d.title?.toLowerCase().includes(query))
            .map((d) => ({ href: d.href, title: d.title, type: "Документ" })),
          ...index.pages
            .filter((p) => p.title?.toLowerCase().includes(query))
            .map((p) => ({ href: p.href, title: p.title, type: "Страница" })),
          ...(index.articles || [])
            .filter(
              (a) =>
                a.title?.toLowerCase().includes(query) ||
                a.short_description?.toLowerCase().includes(query),
            )
            .map((a) => ({ href: a.href, title: a.title, type: "Статья" })),
        ]
      : [];

  return (
    <>
      <h1 className="page-title">Поиск</h1>
      {!query && <p>Введите запрос в форме поиска в шапке сайта.</p>}
      {query && !index && <p>Загрузка…</p>}
      {query && index && (
        <>
          <p>
            Результаты по запросу «<strong>{q}</strong>»: {results.length}
          </p>
          <ul className="doc-list">
            {results.map((r) => (
              <li key={r.href + r.title}>
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
