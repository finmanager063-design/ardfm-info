# IA v2 — продакшн-пакет

Архитектура из четырёх слоёв: **Действия → Понимание → Медиа → Организация**.

## Меню (UI)

| Слой | Пункты |
|------|--------|
| Действия (кнопки в шапке) | `/client-payouts`, `/activities/population`, `/consumer-protection`, `/financial-organizations`, `/contacts` |
| Понимание | `/knowledge/articles`, `/about/faq`, `/knowledge/guides` |
| Медиа | `/media`, `/media/news`, `/media/press`, `/media/events` |
| Организация | `/about`, `/about/history`, `/about/leadership`, `/about/structure`, `/documents`, `/activities/directions` |

Источник правды: `src/lib/ia-v2.ts`.

## Slug activities (канонические URL)

| Slug | Legacy (контент CMS) |
|------|----------------------|
| `/activities/banking-sector` | `/activities/789` |
| `/activities/insurance-sector` | `/activities/847` |
| `/activities/securities-market` | `/activities/788` |
| `/activities/other-financial-organizations` | `/activities/16487` |
| `/activities/appointments` | `/activities/80952` |

Публично отдаётся slug; legacy ID → **301** на slug (`RouteRedirect` + `ROUTE_REDIRECTS`).

## Редиректы 301

| Старый URL | Новый URL |
|------------|-----------|
| `/press` | `/media` |
| `/press/news` | `/media/news` |
| `/press/releases` | `/media/press` |
| `/press/events` | `/media/events` |
| `/articles` | `/knowledge/articles` |
| `/documents/1` | `/documents` |
| `/activities/789` | `/activities/banking-sector` |
| `/activities/847` | `/activities/insurance-sector` |
| `/activities/788` | `/activities/securities-market` |
| `/activities/16487` | `/activities/other-financial-organizations` |
| `/activities/80952` | `/activities/appointments` |

Детали новостей: `/press/news/details/:id` остаётся рабочим; новые ссылки в индексе — `/media/news/details/:id`.

## Sitemap priority

1. **1.0** — action: payouts, population, consumer-protection, financial-organizations, contacts  
2. **0.85** — knowledge + FAQ  
3. **0.7** — `/media/*`  
4. **0.6** — about, documents  
5. **0.4** — legacy `/activities/:id` (не продвигать в SEO)

Функция: `sitemapPriority()` в `src/lib/ia-v2.ts`.

## Блок «Что дальше?»

Пути: `/client-payouts`, `/consumer-protection`, `/financial-organizations` — конфиг `NEXT_STEPS_BY_PATH`.

## Поиск по намерению

`/search` — вкладки: действия, документ, организация, новость. Индекс: `public/search-index.json` (генерация: `scripts/build-search-index.mjs`).

## JSON sitemap (для скриптов)

```json
{
  "layers": {
    "action": ["/", "/client-payouts", "/activities/population", "/consumer-protection", "/financial-organizations", "/contacts"],
    "knowledge": ["/knowledge/articles", "/about/faq", "/knowledge/guides"],
    "media": ["/media", "/media/news", "/media/press", "/media/events"],
    "trust": ["/about", "/about/history", "/about/leadership", "/about/structure", "/documents"]
  },
  "activitySlugs": {
    "banking-sector": 789,
    "insurance-sector": 847,
    "securities-market": 788,
    "other-financial-organizations": 16487,
    "appointments": 80952
  }
}
```
