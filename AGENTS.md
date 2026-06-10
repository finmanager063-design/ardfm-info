<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ardfm Info — контекст для агентов

## Назначение

Статический клон/информационный портал АРРФР (gov.kz/ardfm). Продакшен: **govkz.online** (корень сайта, `NEXT_PUBLIC_BASE_PATH` пустой). Запасной хост: `finmanager063-design.github.io/ardfm-info`.

## Архитектура

- **Роутинг:** `src/app/[[...slug]]/page.tsx` — catch-all для CMS-страниц, новостей, документов; отдельные `src/app/*/page.tsx` для about, en, kk, privacy и т.д.
- **Статический export:** `collectStaticSlugs()` в `src/lib/static-paths.ts` — обязательно добавлять новые служебные пути (`admin`, `client-payouts`, …), иначе 404 на GitHub Pages.
- **Контент:** `getContent()` из `src/lib/content.ts` — только server/build time; в client-компонентах не импортировать `content.ts` напрямую. Для фото — `data/photo-pool.json` + `src/lib/photo-pool.ts`.
- **Оболочка:** `GovShell` + `src/lib/i18n.ts` (ru/kk/en), стили `regylz.css`, `ardfm.css`, `motion.css`.

## Выплаты клиентам

- Данные клиентов: `public/data.json` (источник правды на GitHub Pages). Админка `/admin` коммитит через GitHub API (`src/lib/github-sync.ts`); PAT только в `localStorage` браузера.
- Реестр выплат `/client-payouts`: загрузка `data.json` + поиск по ИИН/делу/ФИО (`src/lib/clients-data.ts`). Синтетический реестр — `src/lib/client-payouts.ts`.
- UI: `ClientPayoutsPage.tsx` — поиск по FCA или ФИО; маскирование телефона `maskPhone`.
- Админка: `/admin` → `AdminPayoutsPage.tsx`, пароль `1304`, `localStorage` ключ `regylz-payout-records` (перекрывает базовые записи по `caseNumber`).

## Деплой

**После любого изменения кода, влияющего на сайт:** закоммитить в `main` и `git push` — деплой на **govkz.online** запускается автоматически (workflow `deploy-pages.yml`). Не ждать отдельной просьбы «деплойт».

1. При сомнениях: `npm run build` или `npm run build:pages`; для админки проверить `out/admin/index.html`.
2. Push в `main` → GitHub Actions; дождаться `success` на run.
3. Сервер `161.35.146.240` (`/opt/lichka-crm`) — **другой проект**; хеш там не обязан совпадать с ardfm-info Pages.

## UX-правила (из истории проекта)

- Не показывать счётчики материалов («300 новостей») на публичных страницах.
- Не писать «копия gov.kz» и не ссылаться на исходный портал в футере как на «копию».
- Mobile-first: формы и таблицы выплат — колонка на узких экранах, горизонтальный скролл таблиц.
- `prefers-reduced-motion` в `motion.css`.

## Команды

```bash
npm run dev
npm run build:pages
npm run sync
```

Подробнее: [README.md](README.md).
