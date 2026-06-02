import poolData from "../../data/photo-pool.json";
import { assetPath } from "./base-path";

/** Реальные /uploads/ с gov.kz (генерируется scripts/generate-photo-pool.mjs). */
export function getPhotoPool(): string[] {
  return poolData.paths;
}

/** Стабильно выбирает разное фото по id/пути. */
export function getDiversePhoto(seed: string, exclude?: Iterable<string>): string {
  const pool = getPhotoPool();
  if (!pool.length) return "/images/kz/astana-skyline.jpg";

  const skip = new Set(exclude ? [...exclude].map((s) => s.split("?")[0].toLowerCase()) : []);
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  const start = Math.abs(h) % pool.length;
  for (let i = 0; i < pool.length; i++) {
    const candidate = pool[(start + i) % pool.length];
    if (!skip.has(candidate.toLowerCase())) return candidate;
  }

  return pool[start];
}

export function diversePhotoUrl(seed: string, exclude?: Iterable<string>): string {
  const path = getDiversePhoto(seed, exclude);
  if (path.startsWith("/uploads/")) {
    return assetPath(path);
  }
  return assetPath(path);
}
