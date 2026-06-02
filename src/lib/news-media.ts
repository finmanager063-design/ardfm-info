import { getDiversePhoto } from "./photo-pool";
import type { GovNews } from "./types";

const IMG_RE = /src=["'](\/uploads\/[^"']+)["']/i;

/** Первое изображение из HTML-тела или heropic. */
export function extractNewsImage(item: { body?: string; heropic?: string }): string {
  if (item.heropic) return normalizeUploadPath(item.heropic);
  const body = item.body || "";
  const m = body.match(IMG_RE);
  return m ? normalizeUploadPath(m[1]) : "";
}

/** Реальное фото из материала или уникальный кадр из пула gov.kz. */
export function resolveItemImage(
  item: { body?: string; heropic?: string; title?: string },
  seed: string,
): string {
  return extractNewsImage(item) || getDiversePhoto(seed || item.title || "item");
}

function normalizeUploadPath(src: string): string {
  if (src.startsWith("http")) {
    const u = src.match(/\/uploads\/[^\s"']+/);
    return u ? u[0] : src;
  }
  return src.startsWith("/") ? src : `/${src}`;
}

export function sortNewsByDate(news: GovNews[]): GovNews[] {
  return [...news].sort((a, b) =>
    (b.created_date ?? "").localeCompare(a.created_date ?? ""),
  );
}

/** Новости с картинкой — для плиток и списков. */
export function newsWithImages(news: GovNews[], limit = 12): GovNews[] {
  const sorted = sortNewsByDate(news);
  const withImg: GovNews[] = [];
  const rest: GovNews[] = [];
  for (const n of sorted) {
    if (extractNewsImage(n)) withImg.push(n);
    else rest.push(n);
  }
  return [...withImg, ...rest].slice(0, limit);
}
