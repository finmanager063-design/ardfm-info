"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ACTION_NAV } from "@/lib/ia-v2";

type SearchIndex = {
  news: { id: string; title: string; short_description?: string; href: string }[];
  documents: { id: string | number; title: string; href: string }[];
  pages: { title: string; href: string }[];
  articles?: { title: string; href: string; short_description?: string }[];
  actions?: { title: string; href: string; short_description?: string }[];
};

type Intent = "actions" | "documents" | "organizations" | "news";

const INTENTS: { id: Intent; label: string }[] = [
  { id: "actions", label: "Я хочу сделать" },
  { id: "documents", label: "Я ищу документ" },
  { id: "organizations", label: "Я ищу организацию" },
  { id: "news", label: "Я ищу новость" },
];

const ACTION_PATHS = new Set(ACTION_NAV.map((a) => a.href));

const ORG_PATH_PREFIXES = [
  "/financial-organizations",
  "/activities/banking-sector",
  "/activities/insurance-sector",
  "/activities/securities-market",
  "/activities/other-financial-organizations",
];

function matchesQuery(text: string | undefined, query: string) {
  return text?.toLowerCase().includes(query) ?? false;
}

function isOrganizationHit(
  href: string,
  title: string,
  query: string,
): boolean {
  if (ORG_PATH_PREFIXES.some((p) => href.startsWith(p))) return matchesQuery(title, query);
  const t = title.toLowerCase();
  return (
    matchesQuery(title, query)
    && (t.includes("организац")
      || t.includes("лиценз")
      || t.includes("банк")
      || t.includes("страхов")
      || t.includes("мфо")
      || href.includes("financial"))
  );
}

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const intentParam = searchParams.get("intent") as Intent | null;
  const query = q.trim().toLowerCase();
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [intent, setIntent] = useState<Intent>(intentParam && INTENTS.some((i) => i.id === intentParam) ? intentParam : "actions");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/search-index.json`)
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex({ news: [], documents: [], pages: [], articles: [], actions: [] }));
  }, []);

  useEffect(() => {
    if (intentParam && INTENTS.some((i) => i.id === intentParam)) {
      setIntent(intentParam);
    }
  }, [intentParam]);

  const results = useMemo(() => {
    if (!query || !index) return [];

    const staticActions =
      index.actions
        ?? ACTION_NAV.map((a) => ({ title: a.label, href: a.href, short_description: "" }));

    if (intent === "actions") {
      const fromActions = staticActions
        .filter((a) => matchesQuery(a.title, query) || matchesQuery(a.short_description, query))
        .map((a) => ({ href: a.href, title: a.title, type: "Действие" }));

      const fromPages = index.pages
        .filter(
          (p) =>
            (ACTION_PATHS.has(p.href)
              || p.href.includes("consumer")
              || p.href.includes("client-payouts")
              || p.href.includes("contacts"))
            && matchesQuery(p.title, query),
        )
        .map((p) => ({ href: p.href, title: p.title, type: "Страница" }));

      return [...fromActions, ...fromPages];
    }

    if (intent === "documents") {
      return index.documents
        .filter((d) => matchesQuery(d.title, query))
        .map((d) => ({ href: d.href, title: d.title, type: "Документ" }));
    }

    if (intent === "organizations") {
      const orgPages = index.pages
        .filter((p) => isOrganizationHit(p.href, p.title, query))
        .map((p) => ({ href: p.href, title: p.title, type: "Раздел" }));

      if (
        query.includes("финанс")
        || query.includes("организац")
        || query.includes("лиценз")
        || query.includes("банк")
        || query.includes("реестр")
      ) {
        const registry = {
          href: "/financial-organizations",
          title: "Реестр финансовых организаций",
          type: "Реестр",
        };
        if (!orgPages.some((p) => p.href === registry.href)) {
          orgPages.unshift(registry);
        }
      }

      return orgPages;
    }

    return [
      ...index.news
        .filter(
          (n) =>
            matchesQuery(n.title, query) || matchesQuery(n.short_description, query),
        )
        .map((n) => ({ href: n.href, title: n.title, type: "Новость" })),
      ...(index.articles || [])
        .filter(
          (a) =>
            matchesQuery(a.title, query) || matchesQuery(a.short_description, query),
        )
        .map((a) => ({ href: a.href, title: a.title, type: "Материал" })),
    ];
  }, [query, index, intent]);

  const uniqueResults = useMemo(() => {
    const seen = new Set<string>();
    return results.filter((r) => {
      const key = r.href + r.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [results]);

  return (
    <>
      <div className="pg-search-intent-tabs" role="tablist" aria-label="Тип поиска">
        {INTENTS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={intent === tab.id}
            className={`pg-search-intent-tab ${intent === tab.id ? "active" : ""}`}
            onClick={() => setIntent(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!query && (
        <p style={{ color: "var(--color-text-secondary)" }}>
          Введите запрос в форме поиска в шапке. Выберите вкладку — что вы хотите найти.
        </p>
      )}
      {query && !index && <p>Загрузка…</p>}
      {query && index && (
        <>
          <p>
            {INTENTS.find((i) => i.id === intent)?.label}: результаты по «<strong>{q}</strong>» —{" "}
            {uniqueResults.length}
          </p>
          <ul className="doc-list">
            {uniqueResults.map((r) => (
              <li key={r.href + r.title}>
                <span style={{ fontSize: "0.8rem", color: "#5c6370" }}>{r.type}</span>
                <br />
                <Link href={r.href}>{r.title}</Link>
              </li>
            ))}
          </ul>
          {uniqueResults.length === 0 && (
            <p>
              Ничего не найдено. Попробуйте другую вкладку или{" "}
              <Link href="/contacts">свяжитесь с Агентством</Link>.
            </p>
          )}
        </>
      )}
    </>
  );
}
