import type { CSSProperties } from "react";
import Link from "next/link";
import { KzSiteBanner } from "@/components/KzSiteBanner";
import { Reveal } from "@/components/motion/Reveal";
import {
  AGENCY_ADDRESS,
  AGENCY_SCHEDULE,
  CONTACT_CHANNELS,
  CONTACT_SERVICES,
  CONTACT_STEPS,
  MAP_EMBED,
} from "@/lib/contacts-data";
import { getSiteContacts } from "@/lib/contacts";
import { mediaSrc, KZ_IMAGES } from "@/lib/site-media";
import { GovImage } from "@/components/GovImage";

export function ContactsPage() {
  const { telegram } = getSiteContacts();

  return (
    <div className="contacts-page">
      <KzSiteBanner />

      <nav className="breadcrumb">
        <Link href="/">Главная</Link> / Контакты
      </nav>

      <Reveal direction="up">
      <header className="contacts-hero motion-gradient-bg">
        <div className="contacts-hero__text">
          <p className="contacts-hero__badge">Государственные услуги · АРРФР</p>
          <h1 className="contacts-hero__title">Контакты и обращения</h1>
          <p className="contacts-hero__lead">
            Агентство Республики Казахстан по регулированию и развитию финансового рынка.
            Приём обращений граждан и организаций — через официальный Telegram-бот в формате
            электронной приёмной.
          </p>
          <div className="contacts-hero__actions">
            <a
              href={telegram.url}
              className="btn contacts-hero__btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Написать в {telegram.handle}
            </a>
            <Link href="/about/faq" className="btn btn--outline contacts-hero__btn-secondary">
              Частые вопросы
            </Link>
          </div>
        </div>
        <div className="contacts-hero__visual" aria-hidden="true">
          <GovImage
            src={mediaSrc(KZ_IMAGES.astanaBanner)}
            alt=""
            className="contacts-hero__img"
            loading="eager"
          />
        </div>
      </header>
      </Reveal>

      <Reveal direction="up" delay={80}>
      <section className="contacts-services" aria-label="Виды обращений">
        <h2 className="contacts-section-title">Электронные услуги и темы обращений</h2>
        <Reveal stagger className="contacts-services__grid" delay={100}>
          {CONTACT_SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="contacts-service-card"
              style={{ "--stagger-i": i } as CSSProperties}
            >
              <span className="contacts-service-card__icon" aria-hidden="true">
                {s.icon}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {"internal" in s && s.internal ? (
                <Link href={s.href} className="contacts-service-card__link">
                  Перейти →
                </Link>
              ) : (
                <a
                  href={s.href}
                  className="contacts-service-card__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Через бот →
                </a>
              )}
            </article>
          ))}
        </Reveal>
      </section>
      </Reveal>

      <Reveal direction="up" delay={100}>
      <div className="contacts-main-grid">
        <section className="contacts-panel contacts-panel--primary">
          <h2 className="contacts-panel__title">Онлайн-приёмная</h2>
          <p className="contacts-panel__subtitle">
            Единый канал для обращений — государственный бот{" "}
            <strong>{telegram.handle}</strong>
          </p>
          <div className="contacts-bot-card">
            <div className="contacts-bot-card__icon" aria-hidden="true">
              <span>Telegram</span>
            </div>
            <ul className="contacts-bot-card__features">
              <li>Приём обращений 24/7</li>
              <li>Жалобы на банки, страховщиков, МФО</li>
              <li>Сообщения о мошенничестве</li>
              <li>Запросы разъяснений и статуса рассмотрения</li>
            </ul>
            <a
              href={telegram.url}
              className="btn contacts-bot-card__btn"
              target="_blank"
              rel="noreferrer"
            >
              Открыть {telegram.handle}
            </a>
            <p className="contacts-bot-card__url">
              <a href={telegram.url} target="_blank" rel="noreferrer">
                {telegram.url}
              </a>
            </p>
          </div>
        </section>

        <aside className="contacts-aside">
          <section className="contacts-panel">
            <h2 className="contacts-panel__title">Каналы связи</h2>
            <ul className="contacts-channels">
              {CONTACT_CHANNELS.map((ch) => (
                <li
                  key={ch.id}
                  className={"primary" in ch && ch.primary ? "contacts-channels__item--primary" : ""}
                >
                  <span className="contacts-channels__icon" aria-hidden="true">
                    {ch.icon}
                  </span>
                  <div>
                    <span className="contacts-channels__label">{ch.title}</span>
                    <a
                      href={ch.href}
                      className="contacts-channels__value"
target={ch.id === "telegram" || ch.id === "web" ? "_blank" : undefined}
              rel={ch.id === "telegram" || ch.id === "web" ? "noreferrer" : undefined}
                    >
                      {ch.value}
                    </a>
                    <span className="contacts-channels__note">{ch.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="contacts-panel">
            <h2 className="contacts-panel__title">Адрес</h2>
            <address className="contacts-address">
              <strong>АРРФР</strong>
              <br />
              {AGENCY_ADDRESS.zip}, {AGENCY_ADDRESS.city}
              <br />
              {AGENCY_ADDRESS.street}
              <br />
              {AGENCY_ADDRESS.country}
            </address>
            <div className="contacts-map">
              <iframe
                title="Карта — г. Астана, район расположения АРРФР"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <section className="contacts-panel">
            <h2 className="contacts-panel__title">Режим работы</h2>
            <table className="ardfm-table contacts-schedule">
              <tbody>
                <tr>
                  <th scope="row">Приём документов</th>
                  <td>{AGENCY_SCHEDULE.reception}</td>
                </tr>
                <tr>
                  <th scope="row">Обед</th>
                  <td>{AGENCY_SCHEDULE.break}</td>
                </tr>
                <tr>
                  <th scope="row">Онлайн-обращения</th>
                  <td>
                    <a href={telegram.url} target="_blank" rel="noreferrer">
                      {AGENCY_SCHEDULE.online}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </aside>
      </div>
      </Reveal>

      <Reveal direction="up" delay={120}>
      <section className="contacts-steps-section" aria-label="Как подать обращение">
        <h2 className="contacts-section-title">Как направить обращение через бот</h2>
        <Reveal as="ol" stagger className="contacts-steps-cards" delay={140}>
          {CONTACT_STEPS.map((step, i) => (
            <li
              key={step.num}
              className="contacts-step-card"
              style={{ "--stagger-i": i } as CSSProperties}
            >
              <span className="contacts-step-card__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </Reveal>
      </section>
      </Reveal>

      <Reveal direction="up">
      <section className="ardfm-section contacts-links-block">
        <h2>Полезные разделы</h2>
        <ul className="ardfm-quick-links">
          <li>
            <Link href="/about">Об Агентстве</Link>
          </li>
          <li>
            <Link href="/about/faq">Часто задаваемые вопросы</Link>
          </li>
          <li>
            <Link href="/documents/1">Нормативные документы</Link>
          </li>
          <li>
            <Link href="/activities/directions">Направления деятельности</Link>
          </li>
          <li>
            <Link href="/press/news">Пресс-центр</Link>
          </li>
          <li>
            <Link href="/">Официальный сайт Агентства</Link>
          </li>
        </ul>
      </section>
      </Reveal>
    </div>
  );
}
