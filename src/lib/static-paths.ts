import type { SiteContent } from "./types";

function addSlug(set: Set<string>, parts: string[]) {
  const clean = parts.filter(Boolean);
  set.add(JSON.stringify(clean));
}

export function collectStaticSlugs(content?: SiteContent): { slug: string[] }[] {
  const seen = new Set<string>();

  addSlug(seen, []);

  const extraRoutes = [
    ["client-payouts"],
    ["admin"],
    ["contacts"],
    ["about"],
    ["about", "faq"],
    ["privacy"],
    ["en"],
    ["kk"],
    ["premium"],
    ["search"],
  ];
  for (const r of extraRoutes) addSlug(seen, r);

  if (content) {
    for (const p of content.pages) {
      const link = p.internal_link?.replace(/^\//, "").replace(/\/$/, "");
      if (!link || link === "") continue;
      addSlug(seen, link.split("/"));
    }
    for (const n of [...content.news, ...content.pressReleases]) {
      addSlug(seen, ["media", "news", "details", String(n.id)]);
    }
    for (const a of content.articles) {
      if (a.id) addSlug(seen, ["article", "details", String(a.id)]);
      if (a.alias) addSlug(seen, ["article", "details", String(a.alias)]);
    }
    for (const d of content.documents) {
      addSlug(seen, ["documents", "item", String(d.id)]);
    }
    for (const e of [...content.events.upcoming, ...content.events.past]) {
      addSlug(seen, ["media", "events", "details", String(e.id)]);
    }
  }

  return Array.from(seen).map((s) => ({ slug: JSON.parse(s) as string[] }));
}
