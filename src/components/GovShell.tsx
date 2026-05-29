"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { KzSiteBanner } from "@/components/KzSiteBanner";
import { TelegramBotCta } from "@/components/TelegramBotCta";
import { FOOTER_LINKS, MAIN_NAV } from "@/lib/nav";
import type { SiteContent } from "@/lib/types";

export function GovShell({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: SiteContent["meta"];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="ardfm-root">
      <a href="#main" className="skip-link">
        Перейти на основной контент
      </a>

      <header className="ardfm-header">
        <div className="ardfm-header__top">
          <Link href="/" className="ardfm-logo">
            <span className="ardfm-logo-text">GOV.KZ</span>
          </Link>
          <div className="ardfm-header__actions">
            <button type="button" className="ardfm-btn-icon" aria-label="Государственные органы">
              ☰
            </button>
            <div className="ardfm-lang">
              <button type="button" className="ardfm-btn-text">
                ru ▾
              </button>
            </div>
          </div>
        </div>

        <div className="ardfm-header__org">
          <Link href="/" className="ardfm-org-title">
            {meta.entityTitle}
          </Link>
          <button
            type="button"
            className="ardfm-btn-icon ardfm-burger"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>
        </div>

        <nav
          className={`ardfm-nav ardfm-nav--entity ${menuOpen ? "ardfm-nav--open" : ""}`}
          aria-label="Основное меню"
        >
          <ul className="ardfm-nav__list">
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="ardfm-nav__item">
                <Link
                  href={item.href}
                  className={`ardfm-nav__link ${isActive(item.href) ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="ardfm-search-toggle"
            aria-label="Поиск"
            onClick={() => setSearchOpen((v) => !v)}
          >
            🔍
          </button>
        </nav>

        {searchOpen && (
          <form className="ardfm-search" onSubmit={onSearch}>
            <input
              type="search"
              placeholder="Поиск по сайту…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">Найти</button>
          </form>
        )}
      </header>

      {pathname !== "/" && pathname !== "" && <KzSiteBanner />}

      <main
        id="main"
        className={`ardfm-main${pathname === "/" || pathname === "" ? " ardfm-main--home" : ""}`}
      >
        {children}
      </main>

      <footer className="ardfm-footer">
        <div className="ardfm-footer__grid">
          <div>
            <p className="ardfm-footer__title">{meta.entityShort}</p>
            <TelegramBotCta variant="footer" />
          </div>
          <div>
            <p className="ardfm-footer__title">Разделы сайта</p>
            <ul>
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
            <p className="ardfm-footer__title">Обращения</p>
            <div className="ardfm-social">
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer">
                @finance_regulator_bot
              </a>
            </div>
          </div>
        </div>
        <p className="ardfm-footer__copy">
          2026 © Все права защищены. Копия портала{" "}
          <a href={meta.source} target="_blank" rel="noreferrer">
            gov.kz/ardfm
          </a>
        </p>
      </footer>
    </div>
  );
}
