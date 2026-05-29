#!/usr/bin/env node
/** Быстрая синхронизация для GitHub Actions (ограниченный объём). */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sync = path.join(__dirname, "sync.mjs");

process.env.SYNC_MAX_NEWS_PAGES = "30";
process.env.SYNC_MAX_DOC_PAGES = "6";
process.env.SYNC_MAX_ARTICLE_PAGES = "50";
process.env.SYNC_MAX_PRESS_PAGES = "10";
process.env.SYNC_SKIP_IMAGES = "1";

const child = spawn("node", [sync], { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 0));
