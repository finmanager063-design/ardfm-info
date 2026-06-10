# Git: только finmanager063-design

Репозиторий: **https://github.com/finmanager063-design/ardfm-info**

## Не использовать

- SSH-ключ, привязанный к **vladymyrzaicenko1992-ai** (другой аккаунт, push будет отклонён).

## Как пушить

1. Создайте PAT в аккаунте **finmanager063-design** (обязательно scopes: **`repo`** и **`workflow`** — без `workflow` GitHub отклонит push файлов в `.github/workflows/`).
2. Один раз в терминале:

```bash
export GITHUB_TOKEN="ghp_ваш_токен_finmanager063-design"
cd "/home/vladymyr/Рабочий стол/regylz"
git push origin main
```

Локально для этого репозитория задан пользователь `finmanager063-design` для `github.com` (см. `git config --local --list`).

## Проверка

```bash
git remote -v
# origin  https://github.com/finmanager063-design/ardfm-info.git

git config --local credential.https://github.com.username
# finmanager063-design
```
