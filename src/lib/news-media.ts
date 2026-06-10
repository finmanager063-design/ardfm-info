import type { GovNews } from "./types";

export function sortNewsByDate(news: GovNews[]): GovNews[] {
  return [...news].sort((a, b) => {
    const da = a.created_date || a.publication_date || "";
    const db = b.created_date || b.publication_date || "";
    return db.localeCompare(da);
  });
}
