# Regylz — копия портала АРРФР (gov.kz/ardfm)

Локальная копия сайта [Агентства по регулированию и развитию финансового рынка](https://www.gov.kz/memleket/entities/ardfm).

## Сайт (GitHub Pages)

После push в `main` деплой идёт автоматически:

**https://finmanager063-design.github.io/regylz/**

Включите Pages в репозитории, если ещё не включены: *Settings → Pages → Source: GitHub Actions*.

## Локальная разработка

```bash
npm run sync          # загрузить контент с gov.kz
npm run dev           # http://localhost:3000
```

## Сборка как на GitHub Pages

```bash
npm run build:pages   # статический экспорт в out/
npx serve out -p 3000 # проверка локально (корень — /regylz/)
```

## Синхронизация

`npm run sync` — полная загрузка в `data/content.json`.  
В CI используется укороченный `scripts/sync-ci.mjs` (без скачивания картинок).

## Примечание

Независимая копия для архива/разработки. Официальный источник: [gov.kz/memleket/entities/ardfm](https://www.gov.kz/memleket/entities/ardfm).

Деплой **только через GitHub** — без сторонних серверов.
