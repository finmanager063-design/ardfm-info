import { assetPath } from "./base-path";

/** Локальные иллюстрации (SVG) + фото с gov.kz для галерей. */
export const KZ_IMAGES = {
  flagBanner: "/images/kz/flag-banner.svg",
  chartSectors: "/images/kz/chart-sectors.svg",
  chartGrowth: "/images/kz/chart-growth.svg",
  presidentAward: "/images/kz/president-award.svg",
} as const;

export function mediaSrc(path: string): string {
  return assetPath(path);
}

/** Фото для галерей: локальные SVG + типовые кадры с портала gov.kz. */
export const GALLERY_PHOTOS = [
  { src: KZ_IMAGES.flagBanner, alt: "Символика Казахстана", caption: "АРРФР" },
  { src: KZ_IMAGES.chartSectors, alt: "Секторы финансового рынка", caption: "Надзор по секторам" },
  { src: KZ_IMAGES.chartGrowth, alt: "Динамика защиты прав", caption: "Потребители финуслуг" },
  {
    src: "/uploads/2021/10/13/2b63dabccf4bafbe1b966396949da2ce_original.50693.jpg",
    alt: "Банковский сектор",
    caption: "Пресс-центр АРРФР",
  },
  {
    src: "/uploads/2021/10/13/7e73745d65aa7f88224ce3d918088a66_original.19003.jpg",
    alt: "Ипотечное кредитование",
    caption: "Аналитика рынка",
  },
  {
    src: "/uploads/2021/4/6/50c82849ba801dd17fe5fe27ce7f48dc_original.111750.jpg",
    alt: "Защита потребителей",
    caption: "Финансовая грамотность",
  },
  {
    src: "/uploads/2020/12/11/2e5403d397682e4c5711c65f9368282a_original.220048.jpg",
    alt: "Поддержка МСБ",
    caption: "Государственные программы",
  },
  {
    src: KZ_IMAGES.presidentAward,
    alt: "Благодарность Президента РК, 2025",
    caption: "Материалы 2025",
  },
] as const;
