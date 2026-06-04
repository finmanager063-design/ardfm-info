/** IA v2: слои, slug-URL, редиректы, приоритеты sitemap */

export type NavItem = { href: string; label: string; highlight?: boolean };
export type NavGroup = { id: string; label: string; items: NavItem[] };

/** Слой 1 — действия (верхнее меню, визуально выделено) */
export const ACTION_NAV: NavItem[] = [
  { href: "/client-payouts", label: "Проверить выплаты", highlight: true },
  { href: "/consumer-protection", label: "Защита прав", highlight: true },
  { href: "/financial-organizations", label: "Финансовые организации", highlight: true },
  { href: "/contacts", label: "Контакты", highlight: true },
];

/** Слой 2 — понимание */
export const KNOWLEDGE_NAV: NavItem[] = [
  { href: "/knowledge/articles", label: "Статьи" },
  { href: "/about/faq", label: "FAQ" },
  { href: "/knowledge/guides", label: "Гайды и разборы" },
];

/** Слой 3 — медиа */
export const MEDIA_NAV: NavItem[] = [
  { href: "/media", label: "Медиацентр" },
  { href: "/media/news", label: "Новости" },
  { href: "/media/press", label: "Пресс-релизы" },
  { href: "/media/events", label: "События" },
];

/** Слой 4 — организация */
export const ORG_NAV: NavItem[] = [
  { href: "/about", label: "Об Агентстве" },
  { href: "/about/history", label: "История" },
  { href: "/about/leadership", label: "Руководство" },
  { href: "/about/structure", label: "Структура" },
  { href: "/documents", label: "Документы" },
  { href: "/activities/directions", label: "Деятельность" },
];

export const NAV_GROUPS: NavGroup[] = [
  { id: "org", label: "Организация", items: ORG_NAV },
  { id: "knowledge", label: "Понимание", items: KNOWLEDGE_NAV },
  { id: "media", label: "Медиа", items: MEDIA_NAV },
];

/** Публичный slug → legacy path (контент в sections.ts) */
export const ACTIVITY_SLUG_TO_LEGACY: Record<string, string> = {
  "/activities/banking-sector": "/activities/789",
  "/activities/insurance-sector": "/activities/847",
  "/activities/securities-market": "/activities/788",
  "/activities/other-financial-organizations": "/activities/16487",
  "/activities/appointments": "/activities/80952",
};

export const ACTIVITY_LEGACY_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(ACTIVITY_SLUG_TO_LEGACY).map(([slug, legacy]) => [legacy, slug]),
);

/** 301: старый URL → канонический (IA v2) */
export const ROUTE_REDIRECTS: Record<string, string> = {
  "/article/blagodarnost-prezidenta-makarov":
    "/article/details/featured-makarov-award-2025",
  "/article/details/blagodarnost-prezidenta-makarov":
    "/article/details/featured-makarov-award-2025",
  "/press": "/media",
  "/press/": "/media",
  "/press/news": "/media/news",
  "/press/releases": "/media/press",
  "/press/events": "/media/events",
  "/articles": "/knowledge/articles",
  "/documents/1": "/documents",
  "/documents": "/documents",
  "/activities/population": "/consumer-protection",
  ...ACTIVITY_LEGACY_TO_SLUG,
};

/** Нормализация пути: редирект + slug activities */
export function resolveCanonicalPath(pathname: string): string {
  const norm = pathname.replace(/\/$/, "") || "/";
  const redirected = ROUTE_REDIRECTS[norm];
  if (redirected) return redirected;
  if (ACTIVITY_SLUG_TO_LEGACY[norm]) return ACTIVITY_SLUG_TO_LEGACY[norm];
  return norm;
}

/** Нужен ли редирект с текущего URL */
export function getRedirectTarget(pathname: string): string | null {
  const norm = pathname.replace(/\/$/, "") || "/";
  const target = ROUTE_REDIRECTS[norm];
  return target && target !== norm ? target : null;
}

/** Приоритет sitemap: 1 = максимум */
export function sitemapPriority(pathname: string): number {
  const norm = pathname.replace(/\/$/, "") || "/";
  if (
    norm === "/client-payouts"
    || norm === "/consumer-protection"
    || norm === "/financial-organizations"
    || norm === "/contacts"
  ) {
    return 1;
  }
  if (norm.startsWith("/knowledge") || norm === "/about/faq") return 0.85;
  if (norm.startsWith("/media")) return 0.7;
  if (norm.startsWith("/about") || norm.startsWith("/documents")) return 0.6;
  if (norm.match(/^\/activities\/\d+$/)) return 0.4;
  return 0.5;
}

export type NextStepLink = { href: string; label: string; primary?: boolean };

export const NEXT_STEPS_BY_PATH: Record<string, NextStepLink[]> = {
  "/client-payouts": [
    { href: "/client-payouts", label: "Проверить статус по делу", primary: true },
    { href: "/consumer-protection", label: "Защита прав потребителей" },
    { href: "/contacts", label: "Контакты" },
  ],
  "/consumer-protection": [
    { href: "/consumer-protection", label: "Подать обращение", primary: true },
    { href: "/client-payouts", label: "Проверить выплаты" },
    { href: "/financial-organizations", label: "Найти организацию" },
    { href: "/contacts", label: "Связаться с Агентством" },
  ],
  "/financial-organizations": [
    { href: "/financial-organizations", label: "Поиск организации", primary: true },
    { href: "/documents", label: "Нормативные документы" },
    { href: "/activities/directions", label: "Регулирование и надзор" },
    { href: "/contacts", label: "Контакты" },
  ],
};
