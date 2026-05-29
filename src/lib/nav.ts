/** Пути совпадают с gov.kz / content.json (pages.internal_link). */
export const MAIN_NAV = [
  { href: "/about", label: "Об Агентстве" },
  { href: "/activities/directions", label: "Деятельность" },
  {
    href: "#",
    label: "Финансовые рынки",
    children: [
      { href: "/activities/789", label: "Банковский сектор" },
      { href: "/activities/847", label: "Страховой сектор" },
      {
        href: "/activities/788",
        label: "Рынок ценных бумаг и управление пенсионными активами",
      },
      { href: "/activities/16487", label: "Иные финансовые организации" },
    ],
  },
  { href: "/documents/1", label: "Документы" },
  { href: "/press/news", label: "Пресс-центр" },
  { href: "/contacts", label: "Контакты" },
  { href: "https://eotinish.kz", label: "Онлайн-приемная", external: true },
] as const;

export const FOOTER_LINKS = [
  { href: "https://www.akorda.kz/ru", label: "Сайт Президента РК" },
  { href: "https://primeminister.kz/ru", label: "Сайт Премьер-Министра РК" },
  { href: "https://www.gov.kz/article/41788?lang=ru", label: "Жизненные ситуации" },
  {
    href: "https://egov.kz/cms/ru/articles/Politika-konfidencialnosti",
    label: "Политика конфиденциальности",
  },
] as const;
