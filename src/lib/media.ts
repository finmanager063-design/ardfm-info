import { assetPath } from "./base-path";
import { localMediaUrl } from "./format";

/** Лёгкая заглушка для изображений. */
export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00A86B"/>
        <stop offset="100%" style="stop-color:#001128"/>
      </linearGradient></defs>
      <rect width="800" height="500" fill="url(#g)"/>
      <text x="400" y="255" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="28" opacity="0.9">PayGuard</text>
    </svg>`,
  );

/** Нормализует путь к /uploads/… или /images/… */
export function extractMediaPath(src?: string | null): string | null {
  if (!src || src.startsWith("data:")) return null;

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  let path = src.trim();
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    const m = path.match(/(\/(?:uploads|images)\/[^\s"'?#]+)/);
    return m ? m[1] : null;
  }
  if (path.startsWith("uploads/")) return `/${path}`;
  if (path.startsWith("/uploads/") || path.startsWith("/images/")) return path;
  return null;
}

/** Для /uploads/ сначала gov.kz, затем локальная копия. */
export function resolveMediaUrl(src: string | null | undefined, _stage: 0 | 1 | 2 | 3): string {
  const mediaPath = extractMediaPath(src);
  if (!mediaPath && !src) return IMAGE_PLACEHOLDER;

  if (mediaPath?.startsWith("/uploads/")) {
    return localMediaUrl(mediaPath);
  }

  if (mediaPath?.startsWith("/images/")) {
    return assetPath(mediaPath);
  }

  return IMAGE_PLACEHOLDER;
}

/** Fallback для img в HTML-телах. */
export function attachImageFallbacks(root: HTMLElement): () => void {
  return () => {};
}
