import "server-only";
import fs from "fs";
import path from "path";
import { getSiteContacts } from "./contacts";
import { dedupeArticles } from "./dedupe";
import { FEATURED_ARTICLES, isFeaturedArticleId } from "./featured-articles";
import type { GovNews, GovPage, SiteContent } from "./types";

export { dedupeArticles };

export function getArticles() {
  const merged = dedupeArticles([...FEATURED_ARTICLES, ...getContent().articles]);
  const sorted = merged.sort((a, b) =>
    (b.publication_date ?? "").localeCompare(a.publication_date ?? ""),
  );
  const pinned = sorted.find((a) => isFeaturedArticleId(String(a.id)));
  if (!pinned) return sorted;
  return [pinned, ...sorted.filter((a) => !isFeaturedArticleId(String(a.id)))];
}

export function findArticleById(idOrAlias: string) {
  const key = idOrAlias.trim();
  return getArticles().find(
    (a) => String(a.id) === key || (a.alias && a.alias === key),
  );
}

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

const FALLBACK: SiteContent = {
  meta: {
    syncedAt: "",
    source: "https://www.gov.kz/memleket/entities/ardfm",
    entityTitle:
      "Агентство Республики Казахстан по регулированию и развитию финансового рынка",
    entityShort: "АРРФР",
    contacts: getSiteContacts(),
  },
  menuPages: [],
  pages: [],
  news: [],
  documents: [],
  events: { upcoming: [], past: [] },
  projects: [],
  pressReleases: [],
  contacts: [],
  articles: [],
};

let cache: SiteContent | null = null;

export function getContent(): SiteContent {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw) as SiteContent;
    data.articles = dedupeArticles(data.articles);
    data.meta.contacts = getSiteContacts();
    cache = data;
    return cache;
  } catch {
    return FALLBACK;
  }
}

export function findPageByPath(pathname: string): GovPage | undefined {
  const content = getContent();
  const norm = pathname.replace(/\/$/, "") || "/";
  return content.pages.find((p) => {
    const link = p.internal_link?.replace(/\/$/, "") || "";
    if (link === norm) return true;
    if (norm === "/" && (link === "/" || p.slug === "glavnaya")) return true;
    return false;
  });
}

export function findNewsById(id: string): GovNews | undefined {
  return getContent().news.find((n) => String(n.id) === id);
}
