#!/usr/bin/env node
/** Индекс для клиентского поиска (GitHub Pages / static export). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(__dirname, "../data/content.json");
const outPath = path.join(__dirname, "../public/search-index.json");

if (!fs.existsSync(contentPath)) {
  fs.writeFileSync(outPath, JSON.stringify({ news: [], documents: [], pages: [] }));
  console.log("search-index: empty (no content.json)");
  process.exit(0);
}

const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));

function dedupeArticles(articles) {
  const byId = new Map();
  for (const a of articles) {
    const id = String(a.id);
    const prev = byId.get(id);
    if (!prev || (a.content?.length ?? 0) > (prev.content?.length ?? 0)) {
      byId.set(id, a);
    }
  }
  return [...byId.values()];
}

const uniqueArticles = dedupeArticles(content.articles || []);

const index = {
  news: (content.news || []).map((n) => ({
    id: n.id,
    title: n.title,
    short_description: n.short_description,
    href: `/press/news/details/${n.id}`,
  })),
  documents: (content.documents || []).map((d) => ({
    id: d.id,
    title: d.title,
    href: `/documents/item/${d.id}`,
  })),
  pages: (content.pages || []).map((p) => ({
    title: p.title,
    href: p.internal_link || `/${p.slug}`,
  })),
  articles: [
    {
      title:
        "Благодарность Президента Республики Казахстан: награда Сергею Макарову за вклад в защиту прав на финансовом рынке",
      href: "/article/details/featured-makarov-award-2025",
      short_description:
        "Официальная благодарность за возврат средств гражданам и сотрудничество с АРРФР.",
    },
    ...uniqueArticles.map((a) => ({
      title: a.title,
      href: `/article/details/${a.id}`,
      short_description: a.short_description,
    })),
  ],
};

fs.writeFileSync(outPath, JSON.stringify(index));
console.log(
  "search-index:",
  index.news.length,
  "news,",
  index.documents.length,
  "docs,",
  index.articles.length,
  "articles",
);
