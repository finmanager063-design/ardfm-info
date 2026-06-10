function addSlug(set: Set<string>, parts: string[]) {
  const clean = parts.filter(Boolean);
  set.add(JSON.stringify(clean));
}

/** Все пути для static export (GitHub Pages). */
export function collectStaticSlugs(): { slug: string[] }[] {
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

  return Array.from(seen).map((s) => ({ slug: JSON.parse(s) as string[] }));
}
