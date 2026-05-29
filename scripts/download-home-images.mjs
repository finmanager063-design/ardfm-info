#!/usr/bin/env node
/**
 * Скачивает фото для главной, галереи и ленты новостей (CI / перед build:pages).
 * Файлы попадают в public/uploads → out/uploads (не в git).
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const MAX = Number(process.env.SYNC_MAX_IMAGES || 80);

const FEATURED_UPLOADS = [
  "/uploads/2025/10/8/86e8caa3c4cf52cddf8953304f3a9c7c_original.4113520.jpg",
];

function normalizeUpload(rel) {
  if (!rel) return null;
  if (rel.startsWith("http")) {
    const m = rel.match(/(\/uploads\/[^\s"']+)/);
    return m ? m[1] : null;
  }
  return rel.startsWith("/") ? rel : `/${rel}`;
}

async function downloadUpload(rel) {
  const normalized = normalizeUpload(rel);
  if (!normalized?.startsWith("/uploads/")) return false;

  const local = path.join(ROOT, "public", normalized);
  await fs.mkdir(path.dirname(local), { recursive: true });
  try {
    await fs.access(local);
    return true;
  } catch {
    /* download */
  }

  const res = await fetch(`https://www.gov.kz${normalized}`, {
    headers: { "User-Agent": UA, "Accept-Language": "ru" },
  });
  if (!res.ok) {
    console.log("fail", normalized, res.status);
    return false;
  }
  await fs.writeFile(local, Buffer.from(await res.arrayBuffer()));
  console.log("ok", normalized);
  return true;
}

const contentPath = path.join(ROOT, "data/content.json");
let content;
try {
  content = JSON.parse(await fs.readFile(contentPath, "utf8"));
} catch {
  console.error("No data/content.json — run sync first or commit content.json");
  process.exit(1);
}

const paths = new Set(FEATURED_UPLOADS);

for (const n of content.news || []) {
  if (n.heropic) paths.add(normalizeUpload(n.heropic));
  for (const m of (n.body || "").matchAll(/src="(\/uploads\/[^"]+)"/g)) {
    paths.add(m[1]);
  }
}

for (const p of content.projects || []) {
  if (p.icon) paths.add(normalizeUpload(p.icon));
  if (p.heropic) paths.add(normalizeUpload(p.heropic));
}

const sortedPr = [...(content.pressReleases || [])].sort((a, b) =>
  (b.created_date || "").localeCompare(a.created_date || ""),
);
for (const pr of sortedPr) {
  if (pr.heropic) paths.add(normalizeUpload(pr.heropic));
  for (const m of (pr.body || "").matchAll(/src=["'](\/uploads\/[^"']+)["']/gi)) {
    paths.add(m[1]);
  }
  if (paths.size >= MAX) break;
}

const list = [...paths].filter(Boolean).slice(0, MAX);
let ok = 0;
for (const rel of list) {
  if (await downloadUpload(rel)) ok++;
  await new Promise((r) => setTimeout(r, 120));
}

console.log(`Done: ${ok}/${list.length} images (max ${MAX})`);
