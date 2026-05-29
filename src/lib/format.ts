export function mediaUrl(src?: string | null): string {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return src;
  if (src.startsWith("uploads/")) return `/${src}`;
  return src;
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
  return html
    .replace(/src="\/uploads\//g, 'src="/uploads/')
    .replace(/href="\/uploads\//g, 'href="/uploads/')
    .replace(/src="https:\/\/www\.gov\.kz\/uploads\//g, 'src="/uploads/');
}
