#!/usr/bin/env node
/**
 * Локальный деплой на GitHub Pages с вшитым PAT (из .env.local).
 * Использование: node scripts/deploy-local-pages.mjs
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("Нет .env.local с NEXT_PUBLIC_GITHUB_PAT");
  process.exit(1);
}

const env = fs.readFileSync(envPath, "utf8");
const m = env.match(/^NEXT_PUBLIC_GITHUB_PAT=(.+)$/m);
if (!m?.[1]?.trim()) {
  console.error("NEXT_PUBLIC_GITHUB_PAT пуст в .env.local");
  process.exit(1);
}

process.env.NEXT_PUBLIC_GITHUB_PAT = m[1].trim();
process.env.NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://govkz.online";

console.log("→ embed PAT + build:pages");
execSync("npm run build:pages", { cwd: root, stdio: "inherit", env: process.env });

const out = path.join(root, "out");
if (!fs.existsSync(out)) {
  console.error("Нет каталога out/");
  process.exit(1);
}

const token = m[1].trim();
const remote = `https://finmanager063-design:${token}@github.com/finmanager063-design/regylz.git`;

console.log("→ deploy out/ → ветка gh-pages");
execSync("npx --yes gh-pages@6.3.0 -d out -b gh-pages -r " + JSON.stringify(remote), {
  cwd: root,
  stdio: "inherit",
});

console.log("Готово. Подождите 1–2 мин: https://govkz.online");
