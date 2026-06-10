# Деплой только на GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions  
2. Добавьте файл `.github/workflows/deploy-pages.yml` (см. репозиторий локально).  
   При push через PAT нужен scope **`workflow`**.
3. После успешного workflow сайт:  
   **https://finmanager063-design.github.io/ardfm-info/**

Серверы не используются.
