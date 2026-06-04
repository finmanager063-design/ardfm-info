"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ACTION_NAV, FOOTER_LINKS, FOOTER_OFFICIAL, NAV_GROUPS } from "@/lib/nav";
import { getI18n, getLocaleFromPath, type Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/types";

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function GovShell({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: SiteContent["meta"];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPath(pathname);
  const i18n = getI18n(locale);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        const searchPath = locale === "ru" ? `/search?q=${encodeURIComponent(query.trim())}` : `/${locale}/search?q=${encodeURIComponent(query.trim())}`;
        router.push(searchPath);
        setSearchOpen(false);
      }
    },
    [query, router, locale],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setExpandedGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const showHomeLayout = pathname === "/";

  const switchLocale = (l: Locale) => {
    if (l === locale) return;
    if (l === "ru") {
      router.push(pathname.replace(/^\/(en|kk)/, "") || "/");
    } else {
      router.push(`/${l}${pathname === "/" ? "" : pathname}`);
    }
  };

  return (
    <div className="regylz-root">
      <a href="#main" className="skip-link">
        {i18n.common.back}
      </a>

      <header className={`rz-header ${scrolled ? "rz-header--scrolled" : ""}`}>
        <div className="rz-header-top">
          <Link href="/" className="rz-header-brand">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1F3F'/%3E%3Ccircle cx='50' cy='50' r='44' fill='%23C9A84C'/%3E%3Ccircle cx='50' cy='50' r='38' fill='%230A1F3F'/%3E%3Cpath d='M50 20 L58 38 L78 38 L62 50 L68 70 L50 58 L32 70 L38 50 L22 38 L42 38 Z' fill='%23C9A84C'/%3E%3C/svg%3E"
              alt="Герб РК"
              className="rz-header-emblem"
            />
            <span className="rz-header-badge">{meta.entityShort}</span>
          </Link>

          <div className="rz-header-actions">
            <a
              href="https://t.me/finance_regulator_bot"
              target="_blank"
              rel="noreferrer"
              className="rz-hotline"
            >
              <span>✈️</span>
              @finance_regulator_bot
            </a>

            <div className="rz-lang-switch">
              {(["ru", "kk", "en"] as Locale[]).map((l) => (
                <button
                  key={l}
                  className={`rz-lang-btn ${l === locale ? "active" : ""}`}
                  onClick={() => switchLocale(l)}
                >
                  {l === "ru" ? "Рус" : l === "kk" ? "Қаз" : "Eng"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`rz-header-nav-row ${menuOpen ? "rz-header-nav-row--open" : ""}`}>
          <button
            type="button"
            className="rz-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="rz-primary-nav"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {menuOpen && (
            <button
              type="button"
              className="rz-nav-backdrop"
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <nav
            id="rz-primary-nav"
            className={`rz-nav ${menuOpen ? "rz-nav-open" : ""}`}
            aria-label="Основное меню"
          >
            <Link
              href="/"
              className={`rz-nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Главная
            </Link>

            <div className="rz-nav-actions" role="group" aria-label="Действия">
              {ACTION_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rz-nav-action ${isActive(item.href) ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {NAV_GROUPS.map((group) => (
              <div
                key={group.id}
                className={`rz-nav-item ${group.items.some((i) => isActive(i.href)) ? "active" : ""} ${
                  expandedGroup === group.id ? "rz-nav-group-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="rz-nav-link rz-nav-link--group"
                  aria-expanded={expandedGroup === group.id}
                  onClick={() =>
                    setExpandedGroup((id) => (id === group.id ? null : group.id))
                  }
                >
                  {group.label}
                  <ChevronDown />
                </button>
                <div
                  className={`rz-nav-mega ${
                    expandedGroup === group.id ? "rz-nav-mega--open" : ""
                  }`}
                >
                  {group.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="rz-nav-mega-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="rz-search-toggle"
              aria-label="Поиск"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              <SearchIcon />
            </button>
          </nav>
        </div>

        {searchOpen && (
          <div className="rz-search-overlay" onClick={() => setSearchOpen(false)}>
            <div
              className="rz-search-modal rz-animate-slide-down"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={onSearch}>
                <div className="rz-search-modal-header">
                  <SearchIcon />
                  <input
                    type="search"
                    className="rz-search-modal-input"
                    placeholder={i18n.search.placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="rz-search-modal-close"
                    onClick={() => setSearchOpen(false)}
                  >
                    ✕
                  </button>
                </div>
              </form>
              {query.trim() && (
                <div className="rz-search-suggestions">
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    className="rz-search-suggestion"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="rz-search-suggestion-type">
                      {i18n.search.search}
                    </span>{" "}
                    «{query.trim()}»
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main id="main" className="rz-main">
        {children}
      </main>

      <footer className="rz-footer">
        <div className="rz-footer-inner">
          <div className="rz-footer-grid">
            <div className="rz-footer-brand">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23C9A84C'/%3E%3Ccircle cx='50' cy='50' r='44' fill='%230A1F3F'/%3E%3Ccircle cx='50' cy='50' r='38' fill='%23C9A84C'/%3E%3Cpath d='M50 20 L58 38 L78 38 L62 50 L68 70 L50 58 L32 70 L38 50 L22 38 L42 38 Z' fill='%230A1F3F'/%3E%3C/svg%3E"
                alt="Герб РК"
                className="rz-footer-emblem"
              />
              <div className="rz-footer-org">{meta.entityTitle}</div>
            </div>

            <div>
              <h3 className="rz-footer-col-title">{i18n.footer.sections}</h3>
              <ul className="rz-footer-links">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="rz-footer-col-title">{i18n.footer.officialResources}</h3>
              <ul className="rz-footer-links">
                {FOOTER_OFFICIAL.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="rz-footer-col-title">{i18n.footer.appeals}</h3>
              <ul className="rz-footer-links">
                <li>
                  <a
                    href="https://t.me/finance_regulator_bot"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: "rgba(255, 197, 12, 0.15)",
                      border: "1px solid rgba(255, 197, 12, 0.25)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--color-gold-300)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    ✈️ @finance_regulator_bot
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="rz-footer-bot">
            <div>
              © {new Date().getFullYear()} {i18n.footer.allRights}.
            </div>
            <div className="rz-footer-bot-links">
              <a href="/privacy">{i18n.footer.privacy}</a>
              <a href="/accessibility">{i18n.footer.accessibility}</a>
            </div>
            <div className="rz-footer-updated">
              {i18n.footer.lastUpdate}:{" "}
              {new Date(meta.syncedAt || Date.now()).toLocaleDateString(locale === "en" ? "en-US" : locale === "kk" ? "kk-KZ" : "ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
