/** Блок «Важно» как на gov.kz/memleket/entities/ardfm */
export const HOME_IMPORTANT_LINKS = [
  {
    href: "https://t.me/finance_regulator_bot",
    label: "Бот обращений @finance_regulator_bot",
    external: true,
  },
  {
    href: "/article/details/featured-makarov-award-2025",
    label: "Благодарность Президента: награда Сергею Макарову",
  },
  { href: "/about/faq", label: "Часто задаваемые вопросы" },
  { href: "/activities/directions", label: "Повышение финансовой грамотности населения" },
  { href: "/articles", label: "Риск-ориентированный надзор" },
  {
    href: "/activities/789",
    label: "Основные приоритеты надзорной политики Банковского сектора на 2026 год",
  },
  {
    href: "/activities/847",
    label: "Основные приоритеты надзорной политики Страхового сектора на 2026 год",
  },
  {
    href: "/activities/788",
    label: "Основные приоритеты надзорной политики на рынке ценных бумаг на 2026 год",
  },
  {
    href: "https://www.gov.kz/article/41788?lang=ru",
    label: "Жизненные ситуации",
    external: true,
  },
  {
    href: "/activities/16487",
    label: "Основные приоритеты надзорной политики микрофинансового сектора на 2026 год",
  },
  { href: "/documents/1", label: "Государственные закупки" },
] as const;

export const HOME_PRESS_TABS = [
  { href: "/", label: "Главные новости", exact: true },
  { href: "/press/releases", label: "Пресс-релизы" },
  { href: "/press/news", label: "Интервью" },
  { href: "/press/news", label: "Выступления" },
  { href: "/press/news", label: "Разъяснения" },
] as const;

export const PRESS_TABS = [
  { href: "/press/news", label: "Все материалы", exact: true },
  { href: "/press/releases", label: "Пресс-релизы" },
  { href: "/press/events", label: "События" },
] as const;
