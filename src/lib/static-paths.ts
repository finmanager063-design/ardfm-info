import { dedupeArticles } from "./dedupe";
import { FEATURED_ARTICLES } from "./featured-articles";
import type { SiteContent } from "./types";

function addSlug(set: Set<string>, parts: string[]) {
  const clean = parts.filter(Boolean);
  set.add(JSON.stringify(clean));
}

/** Все пути для static export (GitHub Pages). */
export function collectStaticSlugs(content: SiteContent): { slug: string[] }[] {
  const seen = new Set<string>();

  addSlug(seen, []);

  const extraRoutes = [
    ["press", "news"],
    ["press", "releases"],
    ["press", "events"],
    ["client-payouts"],
    ["admin"],
    ["articles"],
    ["documents", "1"],
    ["about", "faq"],
    ["about", "structure"],
    ["about", "history"],
    ["about", "leadership"],
    ["financial-organizations"],
    ["consumer-protection"],
    ["privacy"],
    ["accessibility"],
    ["en"],
    ["kk"],
  ];
  for (const r of extraRoutes) addSlug(seen, r);

  for (const p of content.pages) {
    if (p.slug === "finansovye-rynki" || p.title === "Финансовые рынки") continue;
    const link = p.internal_link?.replace(/^\//, "").replace(/\/$/, "");
    if (!link || link === "") continue;
    addSlug(seen, link.split("/"));
  }

  for (const n of content.news) {
    addSlug(seen, ["press", "news", "details", String(n.id)]);
  }

  for (const d of content.documents) {
    addSlug(seen, ["documents", "item", String(d.id)]);
  }

  for (const a of [...FEATURED_ARTICLES, ...dedupeArticles(content.articles)]) {
    if (a.id) addSlug(seen, ["article", "details", String(a.id)]);
  }

  for (const e of [...content.events.upcoming, ...content.events.past]) {
    addSlug(seen, ["press", "events", "details", String(e.id)]);
  }

  for (const pr of content.pressReleases || []) {
  const id = (pr as { id?: string | number }).id;
    if (id) addSlug(seen, ["press", "releases", "details", String(id)]);
  }

  for (const p of content.projects || []) {
    const id = (p as { id?: string | number }).id;
    if (id) addSlug(seen, ["projects", "details", String(id)]);
  }

  return Array.from(seen).map((s) => ({ slug: JSON.parse(s) as string[] }));
}
