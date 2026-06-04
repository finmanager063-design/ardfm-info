import { MAKAROV_ARTICLE_HREF, MAKAROV_ARTICLE_TITLE_SHORT } from "@/lib/makarov-media";

/** Блок «Важно» как на gov.kz/memleket/entities/ardfm */
export const HOME_IMPORTANT_LINKS = [
  {
    href: "https://t.me/finance_regulator_bot",
    label: "Бот обращений @finance_regulator_bot",
    external: true,
  },
  {
    href: MAKAROV_ARTICLE_HREF,
    label: MAKAROV_ARTICLE_TITLE_SHORT,
  },
  { href: "/about/faq", label: "Часто задаваемые вопросы" },
  { href: "/activities/directions", label: "Повышение финансовой грамотности населения" },
  { href: "/articles", label: "Риск-ориентированный надзор" },
  {
    href: "/activities/banking-sector",
    label: "Основные приоритеты надзорной политики Банковского сектора на 2026 год",
  },
  {
    href: "/activities/insurance-sector",
    label: "Основные приоритеты надзорной политики Страхового сектора на 2026 год",
  },
  {
    href: "/activities/securities-market",
    label: "Основные приоритеты надзорной политики на рынке ценных бумаг на 2026 год",
  },
  {
    href: "https://www.gov.kz/article/41788?lang=ru",
    label: "Жизненные ситуации",
    external: true,
  },
  {
    href: "/activities/other-financial-organizations",
    label: "Основные приоритеты надзорной политики микрофинансового сектора на 2026 год",
  },
  { href: "/documents/1", label: "Государственные закупки" },
] as const;

export const HOME_PRESS_TABS = [
  { href: "/", label: "Главные новости", exact: true },
  { href: "/media/press", label: "Пресс-релизы" },
  { href: "/media/news", label: "Интервью" },
  { href: "/media/news", label: "Выступления" },
  { href: "/media/news", label: "Разъяснения" },
] as const;

export const PRESS_TABS = [
  { href: "/media", label: "Все материалы", exact: true },
  { href: "/media/press", label: "Пресс-релизы" },
  { href: "/media/events", label: "События" },
] as const;
