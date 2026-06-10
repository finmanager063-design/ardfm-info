import { assetPath } from "./base-path";

function normalizeUpload(src: string): string {
  if (src.startsWith("http")) {
    const m = src.match(/(\/uploads\/[^\s"']+)/);
    return m ? m[1] : src;
  }
  if (src.startsWith("uploads/")) return `/${src}`;
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

export function localMediaUrl(src?: string | null): string {
  if (!src) return "";
  if (src.startsWith("http")) {
    const m = src.match(/(\/uploads\/[^\s"']+)/);
    return m ? assetPath(m[1]) : src;
  }
  return assetPath(normalizeUpload(src));
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function rewriteGovHtml(html: string): string {
  const localUploads = assetPath("/uploads/");
  return html
    .replace(/src="https:\/\/www\.gov\.kz\/uploads\//g, `src="${localUploads}`)
    .replace(/src="\/uploads\//g, `src="${localUploads}`)
    .replace(/href="https:\/\/www\.gov\.kz\/uploads\//g, `href="${localUploads}`)
    .replace(/href="\/uploads\//g, `href="${localUploads}`)
    .replace(
      /<img(?![^>]*\bloading=)/gi,
      '<img loading="lazy" decoding="async" ',
    );
}
