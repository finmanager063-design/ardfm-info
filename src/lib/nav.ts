import {
  ACTION_NAV,
  KNOWLEDGE_NAV,
  MEDIA_NAV,
  ORG_NAV,
  NAV_GROUPS,
  type NavItem,
} from "./ia-v2";

export { ACTION_NAV, KNOWLEDGE_NAV, MEDIA_NAV, ORG_NAV, NAV_GROUPS };
export type { NavItem };

/** Для обратной совместимости (footer и старые ссылки) */
export const MAIN_NAV = [
  { href: "/", label: "Главная" },
  ...ACTION_NAV.map((i) => ({ href: i.href, label: i.label })),
  { href: "/media", label: "Медиа", sub: MEDIA_NAV.filter((m) => m.href !== "/media").map((m) => ({ href: m.href, label: m.label })) },
  { href: "/knowledge/articles", label: "Понимание", sub: KNOWLEDGE_NAV.map((k) => ({ href: k.href, label: k.label })) },
  { href: "/about", label: "Организация", sub: ORG_NAV.map((o) => ({ href: o.href, label: o.label })) },
] as const;

export const FOOTER_LINKS = [
  { href: "/client-payouts", label: "Проверить выплаты" },
  { href: "/activities/population", label: "Онлайн-обращение" },
  { href: "/consumer-protection", label: "Защита прав" },
  { href: "/financial-organizations", label: "Финансовые организации" },
  { href: "/media", label: "Медиацентр" },
  { href: "/knowledge/articles", label: "Статьи" },
  { href: "/about", label: "Об Агентстве" },
  { href: "/documents", label: "Документы" },
  { href: "/contacts", label: "Контакты" },
  { href: "/en", label: "English" },
] as const;

export const FOOTER_OFFICIAL = [
  { href: "https://www.akorda.kz/ru", label: "Сайт Президента РК" },
  { href: "https://primeminister.kz/ru", label: "Сайт Премьер-Министра РК" },
  { href: "/", label: "Сайт Агентства" },
  { href: "https://www.gov.kz/article/41788?lang=ru", label: "Жизненные ситуации" },
] as const;
