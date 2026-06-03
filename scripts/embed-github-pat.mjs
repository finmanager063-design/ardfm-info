#!/usr/bin/env node
/** Подставляет PAT в сборку (из NEXT_PUBLIC_GITHUB_PAT). Файл в git не коммитится с токеном. */
import fs from "fs";
import path from "path";

const pat = (process.env.NEXT_PUBLIC_GITHUB_PAT ?? "").trim();
const out = path.join(process.cwd(), "src/lib/github-pat.embed.ts");
const body = `/** Автогенерация: scripts/embed-github-pat.mjs — не редактировать вручную */\nexport const EMBEDDED_GITHUB_PAT = ${JSON.stringify(pat)};\n`;
fs.writeFileSync(out, body, "utf8");
console.log("embed-github-pat:", pat ? "token set" : "empty (no PAT)");
