# Regylz — портал АРРФР

Статический сайт [Агентства Республики Казахстан по регулированию и развитию финансового рынка](https://www.gov.kz/memleket/entities/ardfm): контент с gov.kz, выплаты клиентам, мобильная вёрстка, i18n (ru/kk/en).

## Продакшен

| URL | Назначение |
|-----|------------|
| **https://govkz.online** | Основной домен (GitHub Pages + `public/CNAME`) |
| https://finmanager063-design.github.io/regylz/ | Запасной URL GitHub Pages |

Деплой: push в `main` → workflow [Deploy to GitHub Pages](.github/workflows/deploy-pages.yml).

В репозитории: *Settings → Pages → Source: GitHub Actions*, для `govkz.online` — HTTPS и custom domain.

## Основные разделы

- `/` — главная (пресс-центр, проекты, галерея)
- `/about`, `/about/history`, `/about/leadership`, `/about/structure` — об Агентстве
- `/activities/*` — деятельность (из CMS)
- `/documents/1` — документы
- `/press/news`, `/press/releases`, `/press/events` — пресс-центр
- `/financial-organizations`, `/consumer-protection` — реестры и защита прав
- `/client-payouts` — реестр выплат, поиск по номеру дела (FCA-…) или ФИО
- `/admin` — служебная панель добавления/обновления записей выплат (пароль в коде `AdminPayoutsPage`)
- `/en`, `/kk` — языковые версии интерфейса
- `/privacy`, `/accessibility` — политика и доступность
- `/search` — поиск по индексу

## Стек

- **Next.js 16** — App Router, `output: 'export'` для GitHub Pages
- **React 19**, TypeScript, CSS (`regylz.css`, `ardfm.css`, `motion.css`)
- Данные: `data/content.json` (sync с gov.kz), `data/photo-pool.json`, `public/search-index.json`
- Выплаты: `src/lib/client-payouts.ts` (1200+ записей + фиксированные дела), `localStorage` для записей из админки

## Локальная разработка

```bash
npm ci
npm run sync          # полная синхронизация content.json с gov.kz
npm run dev           # http://localhost:3000
```

Сборка как на Pages:

```bash
npm run build:pages   # out/ — статический экспорт
npx serve out -p 3000
```

Переменные для домена:

```bash
NEXT_PUBLIC_SITE_URL=https://govkz.online NEXT_PUBLIC_BASE_PATH= npm run build:pages
```

Для подкаталога GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/regylz`.

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run sync` | Загрузка контента в `data/content.json` |
| `npm run build:pages` | Индекс поиска, photo-pool, изображения, static export |
| `npm run setup:kz-photos` | Локальные JPG вместо SVG-заглушек |
| `npm run download-images` | Скачивание uploads с gov.kz |

## Git

Только аккаунт [finmanager063-design](https://github.com/finmanager063-design) — см. [docs/GIT-ACCOUNTS.md](docs/GIT-ACCOUNTS.md).

## Примечание

Информационный ресурс на базе открытых данных gov.kz. Официальный источник: [gov.kz/memleket/entities/ardfm](https://www.gov.kz/memleket/entities/ardfm).
