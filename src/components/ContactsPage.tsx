import Link from "next/link";
import { CONTACTS_EXTRA } from "@/lib/ardfm-content";
import type { SiteContent } from "@/lib/types";

export function ContactsPage({ contacts }: { contacts: SiteContent["meta"]["contacts"] }) {
  return (
    <>
      <nav className="breadcrumb">
        <Link href="/">Главная</Link> / Контакты
      </nav>
      <h1 className="page-title">Контакты</h1>
      <div className="contacts-grid">
        <div>
          <section className="ardfm-section">
            <h2>Адрес</h2>
            <p>{contacts.address}</p>
            <h2>Телефоны</h2>
            <ul className="contacts-list">
              {contacts.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
                  {p === "1459" && (
                    <span className="contacts-hint"> — горячая линия (бесплатно с мобильных в РК)</span>
                  )}
                </li>
              ))}
            </ul>
            <h2>Электронная почта</h2>
            <ul className="contacts-list">
              {contacts.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`}>{e}</a>
                </li>
              ))}
            </ul>
            <p className="contacts-emails-note">
              <strong>info@finreg.kz</strong> — общие обращения; <strong>press@finreg.kz</strong> — СМИ;{" "}
              <strong>antifraud@finreg.kz</strong> — сообщения о мошенничестве и пирамидах.
            </p>
          </section>
          <section className="ardfm-section gov-html">
            <div dangerouslySetInnerHTML={{ __html: CONTACTS_EXTRA }} />
          </section>
        </div>
        <div>
          <div className="map-placeholder">
            <p>АРРФР, г. Алматы</p>
            <a href={contacts.mapUrl} target="_blank" rel="noreferrer" className="btn">
              Открыть на Яндекс.Картах
            </a>
          </div>
          <section className="ardfm-section">
            <h2>Полезно</h2>
            <ul className="doc-list">
              <li>
                <Link href="/about/faq">Часто задаваемые вопросы</Link>
              </li>
              <li>
                <Link href="/documents/1">Документы Агентства</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
