import { assetPath } from "./base-path";
import { govMediaUrl, localMediaUrl } from "./format";
import { getDiversePhoto } from "./photo-pool";

/** Лёгкая заглушка — только если gov.kz и локальная копия недоступны. */
export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4053d4"/>
        <stop offset="100%" style="stop-color:#1e2d6e"/>
      </linearGradient></defs>
      <rect width="800" height="500" fill="url(#g)"/>
      <text x="400" y="255" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="28" opacity="0.9">АРРФР</text>
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

/** Для /uploads/ сначала gov.kz (всегда актуально), затем локальная копия после CI. */
export function resolveMediaUrl(src: string | null | undefined, stage: 0 | 1 | 2 | 3): string {
  const mediaPath = extractMediaPath(src);
  if (!mediaPath && !src) return IMAGE_PLACEHOLDER;

  if (mediaPath?.startsWith("/images/")) {
    if (stage === 0) return assetPath(mediaPath);
    if (stage === 1) {
      const alt = getDiversePhoto(mediaPath, [mediaPath]);
      return alt.startsWith("/uploads/") ? localMediaUrl(alt) : assetPath(alt);
    }
    return IMAGE_PLACEHOLDER;
  }

  if (mediaPath?.startsWith("/uploads/")) {
    if (stage === 0) return govMediaUrl(mediaPath);
    if (stage === 1) return localMediaUrl(mediaPath);
    if (stage === 2) {
      const alt = getDiversePhoto(mediaPath, [mediaPath]);
      return localMediaUrl(alt);
    }
    return IMAGE_PLACEHOLDER;
  }

  if (stage === 0) {
    return mediaPath ? localMediaUrl(mediaPath) : localMediaUrl(src) || IMAGE_PLACEHOLDER;
  }
  if (stage === 1 && mediaPath) {
    return govMediaUrl(mediaPath);
  }
  if (stage === 2) {
    const alt = getDiversePhoto(mediaPath || src || "img", mediaPath ? [mediaPath] : undefined);
    if (alt.startsWith("/uploads/")) return localMediaUrl(alt);
    return assetPath(alt);
  }
  return IMAGE_PLACEHOLDER;
}

/** Fallback для img в HTML-телах статей и новостей. */
export function attachImageFallbacks(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  root.querySelectorAll("img").forEach((img) => {
    const initial = img.getAttribute("src") || "";
    const mediaPath = extractMediaPath(initial);
    let stage: 0 | 1 | 2 = 0;

    const onError = () => {
      if (mediaPath?.startsWith("/images/")) {
        if (stage === 0) {
          stage = 1;
          const alt = getDiversePhoto(initial || "html-img", [initial]);
          img.src = alt.startsWith("/uploads/") ? localMediaUrl(alt) : assetPath(alt);
          return;
        }
        stage = 2;
        img.src = IMAGE_PLACEHOLDER;
        return;
      }
      if (mediaPath?.startsWith("/uploads/")) {
        if (stage === 0) {
          stage = 1;
          img.src = localMediaUrl(mediaPath);
          return;
        }
        if (stage === 1) {
          stage = 2;
          const alt = getDiversePhoto(mediaPath, [mediaPath]);
          img.src = localMediaUrl(alt);
          return;
        }
        stage = 2;
        img.src = IMAGE_PLACEHOLDER;
        return;
      }
      if (stage === 0 && mediaPath) {
        stage = 1;
        img.src = govMediaUrl(mediaPath);
        return;
      }
      if (stage === 1) {
        stage = 2;
        const alt = getDiversePhoto(initial || "html-img");
        img.src = alt.startsWith("/uploads/") ? localMediaUrl(alt) : assetPath(alt);
        return;
      }
      stage = 2;
      img.src = IMAGE_PLACEHOLDER;
    };

    img.loading = img.loading || "lazy";
    img.decoding = "async";
    img.classList.add("gov-html-img");
    img.addEventListener("error", onError);
    cleanups.push(() => img.removeEventListener("error", onError));
  });

  return () => cleanups.forEach((fn) => fn());
}
