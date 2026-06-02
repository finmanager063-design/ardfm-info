#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { collectAllUploadPaths } from "./collect-upload-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const EXCLUDE = "/uploads/2025/10/8/86e8caa3c4cf52cddf8953304f3a9c7c_original.4113520.jpg";

const paths = (await collectAllUploadPaths())
  .filter((p) => p !== EXCLUDE)
  .sort();

await fs.writeFile(
  path.join(ROOT, "data/photo-pool.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), paths }, null, 0),
);
console.log("photo-pool.json:", paths.length, "paths");
