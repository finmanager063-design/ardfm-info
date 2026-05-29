import { getContent, getArticles } from "@/lib/content";
import { FEATURED_ARTICLES } from "@/lib/featured-articles";
import { extractNewsImage, newsWithImages, sortNewsByDate } from "@/lib/news-media";
export type HomeGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  href: string;
};

function addUnique(
  items: HomeGalleryItem[],
  seen: Set<string>,
  src: string,
  alt: string,
  caption: string,
  href: string,
  limit: number,
) {
  if (!src || seen.has(src) || items.length >= limit) return;
  seen.add(src);
  items.push({
    src,
    alt,
    caption: caption.length > 96 ? `${caption.slice(0, 93)}…` : caption,
    href,
  });
}

/** Галерея и полоса графиков: фото из пресс-релизов, новостей и статей с ссылками на материалы. */
export function getHomeGalleryItems(limit = 8): HomeGalleryItem[] {
  const { news, pressReleases } = getContent();
  const articles = getArticles();
  const items: HomeGalleryItem[] = [];
  const seen = new Set<string>();

  const makarov = FEATURED_ARTICLES[0];
  const makarovImg =
    extractNewsImage(makarov) ||
    extractNewsImage(sortNewsByDate(pressReleases)[0] ?? {}) ||
    extractNewsImage(newsWithImages(news, 1)[0] ?? {});
  if (makarovImg) {
    addUnique(
      items,
      seen,
      makarovImg,
      makarov.title,
      "Благодарность Президента · 2025",
      `/article/details/${makarov.id}`,
      limit,
    );
  }

  for (const pr of sortNewsByDate(pressReleases)) {
    const src = extractNewsImage(pr);
    if (src) {
      addUnique(items, seen, src, pr.title, pr.title, `/press/releases/details/${pr.id}`, limit);
    }
  }

  for (const n of newsWithImages(news, 30)) {
    const src = extractNewsImage(n);
    if (src) {
      addUnique(items, seen, src, n.title, n.title, `/press/news/details/${n.id}`, limit);
    }
  }

  for (const a of articles) {
    if (a.id === makarov.id) continue;
    const src = extractNewsImage({ body: a.content, heropic: a.heropic });
    if (src) {
      addUnique(items, seen, src, a.title, a.title, `/article/details/${a.id}`, limit);
    }
  }

  return items;
}

export function getChartsStripItems(): HomeGalleryItem[] {
  return getHomeGalleryItems(12).slice(0, 2);
}

/** Пути /uploads/ для CI-скачивания */
export function collectGalleryUploadPaths(limit = 80): string[] {
  return getHomeGalleryItems(limit).map((i) => i.src);
}
