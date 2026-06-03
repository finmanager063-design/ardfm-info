#!/usr/bin/env node
/** Подставляет PAT в сборку. В git — только коды символов (без строки ghp_). */
import fs from "fs";
import path from "path";

const out = path.join(process.cwd(), "src/lib/github-pat.embed.ts");
const envPat = (process.env.NEXT_PUBLIC_GITHUB_PAT ?? "").trim();

let pat = envPat;
if (!pat && fs.existsSync(out)) {
  const existing = fs.readFileSync(out, "utf8");
  const m = existing.match(/GITHUB_PAT_CHAR_CODES:\s*number\[\]\s*=\s*(\[[\d,\s]*\])/);
  if (m) {
    try {
      const codes = JSON.parse(m[1]);
      if (codes.length > 0) pat = String.fromCharCode(...codes);
    } catch {
      /* ignore */
    }
  }
}

const chars = [...pat].map((c) => c.charCodeAt(0));
const body = `/** Автогенерация: scripts/embed-github-pat.mjs */
const GITHUB_PAT_CHAR_CODES: number[] = ${JSON.stringify(chars)};
export function decodeEmbeddedGitHubPat(): string {
  if (!GITHUB_PAT_CHAR_CODES.length) return "";
  return String.fromCharCode(...GITHUB_PAT_CHAR_CODES);
}
`;
fs.writeFileSync(out, body, "utf8");
console.log("embed-github-pat:", pat ? `${pat.length} chars encoded` : "empty (no PAT)");
