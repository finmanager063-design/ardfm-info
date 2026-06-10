"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ACTION_NAV } from "@/lib/nav";
import { getI18n, getLocaleFromPath, type Locale } from "@/lib/i18n";
import { FOOTER_LINKS } from "@/lib/nav";

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l7 4v5c0 5-3.5 9.7-7 11-3.5-1.3-7-6-7-11V6l7-4z" />
      <path d="M9 12l2 2 4-4" />
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

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const i18n = getI18n(locale);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  const switchLocale = (l: Locale) => {
    if (l === locale) return;
    const router = (window as any).__NEXT_ROUTER?.router;
    if (!router) return;
    if (l === "ru") {
      router.push(pathname.replace(/^\/(en|kk)/, "") || "/");
    } else {
      router.push(`/${l}${pathname === "/" ? "" : pathname}`);
    }
  };

  const navLinks = [
    { href: "/", label: i18n.nav.home },
    { href: "/client-payouts", label: i18n.nav.payouts },
    { href: "/about", label: i18n.nav.about },
    { href: "/contacts", label: i18n.nav.contacts },
  ];

  return (
    <div className="pg-root">
      <header className={`pg-header ${scrolled ? "pg-header--scrolled" : ""}`}>
        <div className="pg-header-inner">
          <Link href="/" className="pg-logo">
            <ShieldIcon />
            <span className="pg-logo-text">PayGuard</span>
            <span className="pg-logo-dot" />
          </Link>

          <nav className="pg-nav-desktop" aria-label="Основное меню">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`pg-nav-link ${isActive(link.href === "/" ? "/" : link.href) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pg-header-actions">
            <div className="pg-lang-switch">
              {(["ru", "kk", "en"] as Locale[]).map((l) => (
                <button
                  key={l}
                  className={`pg-lang-btn ${l === locale ? "active" : ""}`}
                  onClick={() => switchLocale(l)}
                >
                  {l === "ru" ? "Рус" : l === "kk" ? "Қаз" : "Eng"}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pg-menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="pg-mobile-menu">
            <nav className="pg-mobile-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`pg-mobile-link ${isActive(link.href === "/" ? "/" : link.href) ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="pg-main">
        {children}
      </main>

      <footer className="pg-footer">
        <div className="pg-footer-inner">
          <div className="pg-footer-grid">
            <div className="pg-footer-brand">
              <ShieldIcon />
              <div>
                <div className="pg-footer-name">PayGuard</div>
                <div className="pg-footer-desc">{i18n.footer.description}</div>
              </div>
            </div>

            <div>
              <h3 className="pg-footer-title">{i18n.footer.sections}</h3>
              <ul className="pg-footer-links">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="pg-footer-title">{i18n.footer.contacts}</h3>
              <ul className="pg-footer-links">
                <li><a href="https://t.me/payguard_support_bot" target="_blank" rel="noreferrer">✈️ @payguard_support_bot</a></li>
                <li><a href="mailto:support@payguard.kz">support@payguard.kz</a></li>
              </ul>
            </div>
          </div>

          <div className="pg-footer-bot">
            <span>© {new Date().getFullYear()} PayGuard. {i18n.footer.allRights}.</span>
            <Link href="/privacy" className="pg-footer-bot-link">{i18n.footer.privacy}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
