#!/usr/bin/env node
/** Быстрая синхронизация для GitHub Actions (ограниченный объём). */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sync = path.join(__dirname, "sync.mjs");

process.env.SYNC_MAX_NEWS_PAGES = "5";
process.env.SYNC_MAX_DOC_PAGES = "2";
process.env.SYNC_MAX_ARTICLE_PAGES = "3";
process.env.SYNC_MAX_PRESS_PAGES = "3";

const child = spawn("node", [sync], { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 0));
