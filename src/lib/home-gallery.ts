import { getContent, getArticles } from "@/lib/content";
import {
  MAKAROV_ARTICLE_ID,
  MAKAROV_AWARD_IMAGE,
  MAKAROV_GOV_UPLOAD,
} from "@/lib/makarov-media";
import { HOME_RIBBON_IMAGE } from "@/lib/site-media";
import { extractNewsImage, resolveItemImage, sortNewsByDate } from "@/lib/news-media";

export type HomeGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  href: string;
};

function normalizeSrc(src: string): string {
  return src.split("?")[0].toLowerCase();
}

/** Не показывать на главной: фото награды / рукопожатия (только в статье Макарова). */
const EXCLUDED_ON_HOME = new Set([
  normalizeSrc(MAKAROV_AWARD_IMAGE),
  normalizeSrc(MAKAROV_GOV_UPLOAD),
]);

function addUnique(
  items: HomeGalleryItem[],
  seen: Set<string>,
  item: HomeGalleryItem,
  limit: number,
) {
  const key = normalizeSrc(item.src);
  if (!item.src || seen.has(key) || EXCLUDED_ON_HOME.has(key) || items.length >= limit) return;
  seen.add(key);
  items.push({
    ...item,
    caption: item.caption.length > 96 ? `${item.caption.slice(0, 93)}…` : item.caption,
  });
}

/** Кандидаты: пресс-релизы → новости → статьи (без Макарова). */
function collectPressAndNewsPool(limit: number): HomeGalleryItem[] {
  const { news, pressReleases } = getContent();
  const articles = getArticles();
  const pool: HomeGalleryItem[] = [];
  const seen = new Set<string>();

  for (const pr of sortNewsByDate(pressReleases)) {
    const src = resolveItemImage(pr, `pr-${pr.id}`);
    if (src) {
      addUnique(
        pool,
        seen,
        { src, alt: pr.title, caption: pr.title, href: `/press/releases/details/${pr.id}` },
        limit,
      );
    }
  }

  const sortedNews = sortNewsByDate(news);
  for (const n of sortedNews) {
    const src = resolveItemImage(n, `news-${n.id}`);
    if (src) {
      addUnique(
        pool,
        seen,
        { src, alt: n.title, caption: n.title, href: `/press/news/details/${n.id}` },
        limit,
      );
    }
  }

  for (const a of articles) {
    if (a.id === MAKAROV_ARTICLE_ID) continue;
    const src = resolveItemImage(
      { body: a.content, heropic: a.heropic, title: a.title },
      `article-${a.id}`,
    );
    if (src) {
      addUnique(
        pool,
        seen,
        { src, alt: a.title, caption: a.title, href: `/article/details/${a.id}` },
        limit,
      );
    }
  }

  return pool;
}

const astanaRibbonItem = (): HomeGalleryItem => ({
  src: HOME_RIBBON_IMAGE,
  alt: "Астана — столица Казахстана",
  caption: "Астана",
  href: "/about",
});

type HomeVisualPlan = {
  ribbon: HomeGalleryItem;
  charts: HomeGalleryItem[];
  gallery: HomeGalleryItem[];
};

let cachedPlan: HomeVisualPlan | undefined;

/** Один план на главную: лента — Астана; без фото Макарова; без повторов. */
function getHomeVisualPlan(): HomeVisualPlan {
  if (cachedPlan) return cachedPlan;

  const pool = collectPressAndNewsPool(40);
  const used = new Set<string>();
  const ribbon = astanaRibbonItem();
  used.add(normalizeSrc(ribbon.src));

  const charts: HomeGalleryItem[] = [];
  for (const item of pool) {
    if (charts.length >= 2) break;
    const key = normalizeSrc(item.src);
    if (!used.has(key)) {
      used.add(key);
      charts.push(item);
    }
  }

  const gallery: HomeGalleryItem[] = [];
  for (const item of pool) {
    addUnique(gallery, used, item, 8);
  }

  cachedPlan = { ribbon, charts, gallery };
  return cachedPlan;
}

export function getHomeRibbonItem(): HomeGalleryItem {
  return getHomeVisualPlan().ribbon;
}

export function getChartsStripItems(): HomeGalleryItem[] {
  return getHomeVisualPlan().charts;
}

export function getHomeGalleryItems(limit = 8): HomeGalleryItem[] {
  return getHomeVisualPlan().gallery.slice(0, limit);
}

/** Src уже на главной — не дублировать в пресс-блоке. */
export function getUsedHomeImageSrcs(): Set<string> {
  const plan = getHomeVisualPlan();
  const used = new Set<string>();
  for (const item of [plan.ribbon, ...plan.charts, ...plan.gallery]) {
    used.add(normalizeSrc(item.src));
  }
  return used;
}

export function isSrcUsedOnHome(src: string): boolean {
  return getUsedHomeImageSrcs().has(normalizeSrc(src));
}

export function collectGalleryUploadPaths(limit = 80): string[] {
  const plan = getHomeVisualPlan();
  const paths = new Set<string>();
  for (const item of [...plan.charts, ...plan.gallery]) {
    if (item.src.startsWith("/uploads/")) paths.add(item.src);
    if (paths.size >= limit) break;
  }
  return [...paths];
}
