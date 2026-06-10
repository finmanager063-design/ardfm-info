export type NavItem = { href: string; label: string; highlight?: boolean };
export type NavGroup = { id: string; label: string; items: NavItem[] };

export const ACTION_NAV: NavItem[] = [
  { href: "/client-payouts", label: "Проверить выплаты", highlight: true },
  { href: "/about", label: "О сервисе" },
  { href: "/contacts", label: "Контакты" },
];

export const NAV_GROUPS: NavGroup[] = [];

export const ROUTE_REDIRECTS: Record<string, string> = {};

export function getRedirectTarget(pathname: string): string | null {
  return null;
}

export function sitemapPriority(pathname: string): number {
  const norm = pathname.replace(/\/$/, "") || "/";
  if (norm === "/client-payouts" || norm === "/contacts") return 1;
  if (norm.startsWith("/about")) return 0.8;
  return 0.5;
}

export type NextStepLink = { href: string; label: string; primary?: boolean };

export const NEXT_STEPS_BY_PATH: Record<string, NextStepLink[]> = {
  "/client-payouts": [
    { href: "/client-payouts", label: "Проверить статус по делу", primary: true },
    { href: "/contacts", label: "Связаться с поддержкой" },
  ],
  "/contacts": [
    { href: "/client-payouts", label: "Проверить выплаты", primary: true },
    { href: "/about", label: "О сервисе" },
  ],
};
