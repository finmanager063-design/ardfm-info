export const MAIN_NAV = [
  { href: "/", label: "Главная" },
  {
    href: "/about",
    label: "Об Агентстве",
    sub: [
      { href: "/about", label: "Общая информация" },
      { href: "/about/history", label: "История" },
      { href: "/about/leadership", label: "Руководство" },
      { href: "/about/structure", label: "Структура" },
    ],
  },
  {
    href: "/activities/directions",
    label: "Деятельность",
    sub: [
      { href: "/activities/directions", label: "Направления деятельности" },
      { href: "/activities/regulation", label: "Регулирование" },
      { href: "/activities/supervision", label: "Надзор" },
      { href: "/activities/licensing", label: "Лицензирование" },
    ],
  },
  { href: "/documents/1", label: "Документы" },
  {
    href: "/press/news",
    label: "Пресс-центр",
    sub: [
      { href: "/press/news", label: "Новости" },
      { href: "/press/releases", label: "Пресс-релизы" },
      { href: "/press/events", label: "События" },
    ],
  },
  { href: "/financial-organizations", label: "Финансовые организации" },
  { href: "/consumer-protection", label: "Защита прав потребителей" },
  { href: "/client-payouts", label: "Выплаты клиентам" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const FOOTER_LINKS = [
  { href: "/about", label: "Об Агентстве" },
  { href: "/activities/directions", label: "Деятельность" },
  { href: "/documents/1", label: "Документы" },
  { href: "/press/news", label: "Пресс-центр" },
  { href: "/financial-organizations", label: "Финансовые организации" },
  { href: "/consumer-protection", label: "Защита прав потребителей" },
  { href: "/contacts", label: "Контакты" },
  { href: "/en", label: "English" },
] as const;

export const FOOTER_OFFICIAL = [
  { href: "https://www.akorda.kz/ru", label: "Сайт Президента РК" },
  { href: "https://primeminister.kz/ru", label: "Сайт Премьер-Министра РК" },
  { href: "/", label: "Сайт Агентства" },
  { href: "https://www.gov.kz/article/41788?lang=ru", label: "Жизненные ситуации" },
] as const;
