#!/usr/bin/env node
/** Копирует разные реальные фото gov.kz в public/images/kz/ вместо SVG. */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { collectAllUploadPaths } from "./collect-upload-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public/images/kz");

const TARGETS = [
  { name: "flag-banner.jpg", pick: (paths) => paths.find((p) => p.includes("/2026/")) || paths[0] },
  { name: "finance-forum.jpg", pick: (paths) => paths[Math.floor(paths.length * 0.2)] },
  { name: "regulators-meeting.jpg", pick: (paths) => paths[Math.floor(paths.length * 0.45)] },
  { name: "press-conference.jpg", pick: (paths) => paths[Math.floor(paths.length * 0.7)] },
];

async function copy(srcRel, destName) {
  const src = path.join(ROOT, "public", srcRel);
  const dest = path.join(OUT, destName);
  await fs.copyFile(src, dest);
  const st = await fs.stat(dest);
  console.log("ok", destName, "←", srcRel, st.size);
}

const paths = (await collectAllUploadPaths()).sort();
if (!paths.length) {
  console.error("no upload paths");
  process.exit(1);
}

await fs.mkdir(OUT, { recursive: true });

for (const t of TARGETS) {
  const rel = t.pick(paths);
  await copy(rel, t.name);
}

console.log("astana-skyline.jpg kept as-is");
