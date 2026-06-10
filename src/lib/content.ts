import "server-only";
import fs from "fs";
import path from "path";
import { getSiteContacts } from "./contacts";
import type { GovNews, GovPage, SiteContent } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

const FALLBACK: SiteContent = {
  meta: {
    syncedAt: "",
    source: "https://payguard.kz",
    entityTitle: "PayGuard — Сервис проверки финансовых операций",
    entityShort: "PayGuard",
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
