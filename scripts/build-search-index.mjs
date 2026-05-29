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
};

fs.writeFileSync(outPath, JSON.stringify(index));
console.log("search-index:", index.news.length, "news,", index.documents.length, "docs");
