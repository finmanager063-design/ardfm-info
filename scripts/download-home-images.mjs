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

/** Те же пути, что в src/lib/site-media.ts GALLERY_PHOTOS */
const GALLERY_UPLOADS = [
  "/uploads/2021/10/13/2b63dabccf4bafbe1b966396949da2ce_original.50693.jpg",
  "/uploads/2021/10/13/7e73745d65aa7f88224ce3d918088a66_original.19003.jpg",
  "/uploads/2021/4/6/50c82849ba801dd17fe5fe27ce7f48dc_original.111750.jpg",
  "/uploads/2020/12/11/2e5403d397682e4c5711c65f9368282a_original.220048.jpg",
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

const paths = new Set(GALLERY_UPLOADS);

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

for (const pr of content.pressReleases || []) {
  if (pr.heropic) paths.add(normalizeUpload(pr.heropic));
  for (const m of (pr.body || "").matchAll(/src="(\/uploads\/[^"]+)"/g)) {
    paths.add(m[1]);
  }
}

const list = [...paths].filter(Boolean).slice(0, MAX);
let ok = 0;
for (const rel of list) {
  if (await downloadUpload(rel)) ok++;
  await new Promise((r) => setTimeout(r, 120));
}

console.log(`Done: ${ok}/${list.length} images (max ${MAX})`);
