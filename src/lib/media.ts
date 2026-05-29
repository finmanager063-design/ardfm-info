import { assetPath } from "./base-path";
import { govMediaUrl, localMediaUrl } from "./format";

/** Лёгкая заглушка, если локальный и gov.kz файл недоступны. */
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

export function resolveMediaUrl(src: string | null | undefined, stage: 0 | 1 | 2): string {
  const mediaPath = extractMediaPath(src);
  if (!mediaPath && !src) return IMAGE_PLACEHOLDER;

  if (mediaPath?.startsWith("/images/")) {
    return stage === 2 ? IMAGE_PLACEHOLDER : assetPath(mediaPath);
  }

  if (stage === 0) {
    return mediaPath ? localMediaUrl(mediaPath) : localMediaUrl(src) || IMAGE_PLACEHOLDER;
  }
  if (stage === 1 && mediaPath) {
    return govMediaUrl(mediaPath);
  }
  return IMAGE_PLACEHOLDER;
}

/** Fallback для &lt;img&gt; внутри HTML-тел статей и новостей. */
export function attachImageFallbacks(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  root.querySelectorAll("img").forEach((img) => {
    const initial = img.getAttribute("src") || "";
    const mediaPath = extractMediaPath(initial);
    let stage: 0 | 1 | 2 = 0;

    const onError = () => {
      if (mediaPath?.startsWith("/images/")) {
        stage = 2;
        img.src = IMAGE_PLACEHOLDER;
        return;
      }
      if (stage === 0 && mediaPath) {
        stage = 1;
        img.src = govMediaUrl(mediaPath);
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
