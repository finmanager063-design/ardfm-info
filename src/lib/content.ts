import "server-only";
import fs from "fs";
import path from "path";
import { dedupeArticles } from "./dedupe";
import type { GovNews, GovPage, SiteContent } from "./types";

export { dedupeArticles };

export function getArticles() {
  return dedupeArticles(getContent().articles);
}

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

const FALLBACK: SiteContent = {
  meta: {
    syncedAt: "",
    source: "https://www.gov.kz/memleket/entities/ardfm",
    entityTitle:
      "Агентство Республики Казахстан по регулированию и развитию финансового рынка",
    entityShort: "АРРФР",
    contacts: {
      address: "050059, г. Алматы, мкр. «Коктем-3», д. 21",
      phones: ["1459", "+7 (727) 237-10-00"],
      emails: ["info@finreg.kz", "press@finreg.kz", "antifraud@finreg.kz"],
      mapUrl: "https://yandex.ru/maps/-/CHv7AYmz",
    },
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
