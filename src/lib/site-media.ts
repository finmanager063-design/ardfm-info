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

