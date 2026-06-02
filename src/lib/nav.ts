/** Пути совпадают с gov.kz / content.json (pages.internal_link). */
export const MAIN_NAV = [
  { href: "/about", label: "Об Агентстве" },
  { href: "/activities/directions", label: "Деятельность" },
  { href: "/documents/1", label: "Документы" },
  { href: "/press/news", label: "Пресс-центр" },
  { href: "/client-payouts", label: "Выплаты клиентам" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const FOOTER_LINKS = [
  { href: "/about", label: "Об Агентстве" },
  { href: "/activities/directions", label: "Деятельность" },
  { href: "/documents/1", label: "Документы" },
  { href: "/press/news", label: "Пресс-центр" },
  { href: "https://www.akorda.kz/ru", label: "Сайт Президента РК" },
  { href: "https://primeminister.kz/ru", label: "Сайт Премьер-Министра РК" },
  { href: "https://www.gov.kz/article/41788?lang=ru", label: "Жизненные ситуации" },
] as const;
