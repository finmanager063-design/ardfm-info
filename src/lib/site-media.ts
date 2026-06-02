import { assetPath } from "./base-path";

/** Локальные фото (реальные кадры, не SVG-заглушки). */
export const KZ_IMAGES = {
  flagBanner: "/images/kz/flag-banner.jpg",
  astanaBanner: "/images/kz/astana-skyline.jpg",
  financeForum: "/images/kz/finance-forum.jpg",
  regulatorsMeeting: "/images/kz/regulators-meeting.jpg",
  pressConference: "/images/kz/press-conference.jpg",
} as const;

/** Верхняя лента на главной — панорама Астаны (не статья Макарова). */
export const HOME_RIBBON_IMAGE = KZ_IMAGES.astanaBanner;

export function mediaSrc(path: string): string {
  return assetPath(path);
}

