import {
  ACTION_NAV,
  NAV_GROUPS,
  type NavItem,
} from "./ia-v2";

export { ACTION_NAV, NAV_GROUPS };
export type { NavItem };

export const FOOTER_LINKS = [
  { href: "/client-payouts", label: "Проверить выплаты" },
  { href: "/about", label: "О сервисе" },
  { href: "/contacts", label: "Контакты" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/en", label: "English" },
] as const;

export const ACTIONS_NAV = [
  { href: "/client-payouts", label: "Проверить выплаты" },
  { href: "/contacts", label: "Связаться с нами" },
] as const;
