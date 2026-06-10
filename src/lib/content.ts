import "server-only";
import { getSiteContacts } from "./contacts";
import type { SiteContent } from "./types";

export function getContent(): SiteContent {
  return {
    meta: {
      syncedAt: new Date().toISOString(),
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
}
