#!/usr/bin/env node
/**
 * Синхронизация контента ARDFM с gov.kz (API + GraphQL).
 * Запуск: npm run sync
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const UPLOADS_DIR = path.join(ROOT, "public", "uploads");

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const PROJECT = "ardfm";
const LANG = "ru";
const MAX_NEWS_PAGES = Number(process.env.SYNC_MAX_NEWS_PAGES || 80);
const MAX_DOC_PAGES = Number(process.env.SYNC_MAX_DOC_PAGES || 10);
const MAX_ARTICLE_PAGES = Number(process.env.SYNC_MAX_ARTICLE_PAGES || 80);
const MAX_PRESS_PAGES = Number(process.env.SYNC_MAX_PRESS_PAGES || 30);
const SKIP_IMAGES = process.env.SYNC_SKIP_IMAGES === "1";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      "User-Agent": UA,
      "Accept-Language": "ru-RU,ru;q=0.9",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${url}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function gql(query, variables = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch("https://www.gov.kz/graphql", {
      method: "POST",
      headers: {
        "User-Agent": UA,
        "Content-Type": "application/json",
        "Accept-Language": "ru",
      },
      body: JSON.stringify({ query, variables }),
    });
    const text = await res.text();
    if (!text.startsWith("{")) {
      if (attempt < retries) {
        await sleep(2000 * attempt);
        continue;
      }
      throw new Error(`GraphQL non-JSON (${res.status}): ${text.slice(0, 120)}`);
    }
    const json = JSON.parse(text);
    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join("; "));
    }
    return json.data;
  }
}

async function gqlPaginated(field, fragment, pageSize = 15, maxPages = 80) {
  const all = [];
  for (let page = 1; page <= maxPages; page++) {
    try {
      const q = `query($page: Int!) {
        ${field}(
          projects: "contains:${PROJECT}",
          _size: ${pageSize},
          _page: $page,
          _sort: "created_date:DESC",
          _lang: "${LANG}"
        ) { ${fragment} }
      }`;
      const data = await gql(q, { page });
      const batch = data[field];
      if (!batch?.length) break;
      all.push(...batch);
      process.stdout.write(`  ${field} page ${page}: +${batch.length} (total ${all.length})\n`);
      if (batch.length < pageSize) break;
      await sleep(800);
    } catch (e) {
      console.warn(`  ${field} page ${page} failed: ${e.message}`);
      break;
    }
  }
  return all;
}

async function downloadUploadsFromHtml(html) {
  const urls = [
    ...html.matchAll(/(?:src|href)="(\/uploads\/[^"]+)"/g),
  ].map((m) => m[1]);
  for (const rel of [...new Set(urls)]) {
    const local = path.join(ROOT, "public", rel);
    await fs.mkdir(path.dirname(local), { recursive: true });
    try {
      await fs.access(local);
      continue;
    } catch {
      /* download */
    }
    const res = await fetch(`https://www.gov.kz${rel}`, { headers: { "User-Agent": UA } });
    if (res.ok) {
      await fs.writeFile(local, Buffer.from(await res.arrayBuffer()));
    }
  }
}

async function main() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  console.log("→ Меню и страницы (REST)…");
  const menuPages = await fetchJson(
    `https://www.gov.kz/api/v1/public/content-manager/pages?projects=contains:${PROJECT}&sort-by=order&size=1000`,
  );

  console.log("→ Страницы (GraphQL)…");
  const pagesData = await gql(`{
    pages(projects: "contains:${PROJECT}", _size: 500, _lang: "${LANG}") {
      id slug title content internal_link is_menu_item order description_seo seo_title
    }
  }`);
  const pages = pagesData.pages || [];

  console.log("→ Новости…");
  const news = await gqlPaginated(
    "news",
    "id title slug created_date short_description body heropic",
    10,
    MAX_NEWS_PAGES,
  );

  console.log("→ Документы (REST)…");
  const documents = [];
  for (let page = 1; page <= MAX_DOC_PAGES; page++) {
    const batch = await fetchJson(
      `https://www.gov.kz/api/v1/public/content-manager/documents?sort-by=created_date:DESC&projects=${PROJECT}&page=${page}&size=50`,
    );
    if (!batch?.length) break;
    documents.push(...batch);
    process.stdout.write(`  documents page ${page}: +${batch.length}\n`);
    if (batch.length < 50) break;
    await sleep(200);
  }

  console.log("→ События, проекты, пресс-релизы…");
  const [eventsUpcoming, eventsPast, projects, pressReleases] = await Promise.all([
    fetchJson(
      `https://www.gov.kz/api/v1/public/content-manager/events?size=50&projects=${PROJECT}&sort-by=event_date:ASC&event_date_end=gte:${new Date().toISOString()}`,
    ).catch(() => []),
    fetchJson(
      `https://www.gov.kz/api/v1/public/content-manager/events?size=50&projects=${PROJECT}&sort-by=event_date_end:DESC&event_date_end=lt:${new Date().toISOString()}`,
    ).catch(() => []),
    fetchJson(
      `https://www.gov.kz/api/v1/public/content-manager/ongoing_projects?projects=${PROJECT}&sort-by=order:ASC&page=1&size=50`,
    ).catch(() => []),
    gqlPaginated("press_releases", "id title body created_date heropic", 20, MAX_PRESS_PAGES).catch(() => []),
  ]);

  console.log("→ Контакты…");
  let contacts = [];
  try {
    const c = await gql(`{
      contacts_page(projects: "contains:${PROJECT}", _lang: "${LANG}") {
        id organisations
      }
    }`);
    contacts = c.contacts_page || [];
  } catch (e) {
    console.warn("  contacts:", e.message);
  }

  console.log("→ Дочерние страницы (article)…");
  let articles = [];
  try {
    articles = await gqlPaginated(
      "article",
      "id title alias content short_description heropic publication_date",
      15,
      MAX_ARTICLE_PAGES,
    );
  } catch (e) {
    console.warn("  articles:", e.message);
  }

  const meta = {
    syncedAt: new Date().toISOString(),
    source: "https://www.gov.kz/memleket/entities/ardfm",
    entityTitle:
      "Агентство Республики Казахстан по регулированию и развитию финансового рынка",
    entityShort: "АРРФР",
    contacts: {
      address: "050059, г. Алматы, мкр. «Коктем-3», д. 21",
      phones: ["1459", "+7 (727) 237-10-00"],
      emails: ["info@finreg.kz", "press@finreg.kz", "antifraud@finreg.kz"],
      mapUrl: "https://yandex.ru/maps/-/CHv7AYmz",
    },
  };

  const payload = {
    meta,
    menuPages,
    pages,
    news,
    documents,
    events: { upcoming: eventsUpcoming, past: eventsPast },
    projects,
    pressReleases,
    contacts,
    articles,
  };

  await fs.writeFile(
    path.join(DATA_DIR, "content.json"),
    JSON.stringify(payload, null, 0),
  );

  if (!SKIP_IMAGES) {
    console.log("→ Загрузка изображений из контента…");
    const htmlBlob = [
      ...pages.map((p) => p.content || ""),
      ...news.map((n) => (n.body || "") + (n.short_description || "")),
      ...articles.map((a) => a.content || ""),
    ].join("");
    await downloadUploadsFromHtml(htmlBlob);
  }

  console.log("\n✓ Готово:");
  console.log(`  страниц: ${pages.length}`);
  console.log(`  новостей: ${news.length}`);
  console.log(`  документов: ${documents.length}`);
  console.log(`  статей: ${articles.length}`);
  console.log(`  → data/content.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
