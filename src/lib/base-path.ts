/** Префикс для GitHub Pages: /ardfm-info */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return normalized;
  if (normalized.startsWith(basePath)) return normalized;
  return `${basePath}${normalized}`;
}
