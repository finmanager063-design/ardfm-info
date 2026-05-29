import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/format";

const QUICK_LINKS = [
  { href: "/articles", label: "Все статьи и материалы" },
  { href: "/about", label: "Часто задаваемые вопросы" },
  { href: "/activities/directions", label: "Повышение финансовой грамотности населения" },
  { href: "/activities/directions", label: "Риск-ориентированный надзор" },
  { href: "/documents/1", label: "Государственные закупки" },
  { href: "/documents/1", label: "Санкции и меры воздействия" },
  {
    href: "/activities/directions",
    label: "Список организаций с признаками нелицензированной деятельности",
  },
];

const DIRECTIONS = [
  { href: "/activities/directions", label: "Регулирование и развитие финансового рынка" },
  { href: "/activities/directions", label: "Защита прав потребителей финансовых услуг" },
  { href: "/activities/directions", label: "Картограмма коррупции" },
  { href: "/activities/directions", label: "Информационная безопасность" },
  { href: "/activities/directions", label: "Государственные услуги" },
  { href: "/activities/directions", label: "ПОД/ФТ" },
];

export function HomePage() {
  const { news, documents, events, projects, meta } = getContent();
  const latestNews = news.slice(0, 6);
  const latestDocs = documents.slice(0, 8);
  const calendarEvents = [...(events.upcoming || []), ...(events.past || [])].slice(0, 4);

  return (
    <>
      {meta.syncedAt && (
        <span className="sync-badge">
          Данные синхронизированы: {formatDate(meta.syncedAt)}
        </span>
      )}

      <section className="ardfm-hero">
        <h1>{meta.entityTitle}</h1>
        <p>
          Государственный орган по регулированию и развитию финансового рынка,
          надзору за банками, страховыми и микрофинансовыми организациями, защите
          прав потребителей финансовых услуг.
        </p>
      </section>

      <div className="ardfm-grid ardfm-grid--2">
        <div>
          <section className="ardfm-section">
            <h2>Пресс-центр</h2>
            {latestNews.length === 0 ? (
              <p>
                Запустите <code>npm run sync</code> для загрузки новостей с gov.kz.
              </p>
            ) : (
              latestNews.map((n) => <NewsCard key={n.id} item={n} />)
            )}
            <p style={{ marginTop: "1rem" }}>
              <Link href="/press/news" className="btn">
                Все новости
              </Link>
            </p>
          </section>

          <section className="ardfm-section">
            <h2>Документы</h2>
            <ul className="doc-list">
              {latestDocs.map((d) => (
                <li key={d.id}>
                  <Link href={`/documents/item/${d.id}`}>{d.title}</Link>
                  <time>{formatDate(d.created_date)}</time>
                </li>
              ))}
            </ul>
            <Link href="/documents/1" className="btn" style={{ marginTop: "1rem" }}>
              Все документы
            </Link>
          </section>

          <section className="ardfm-section">
            <h2>Календарь событий</h2>
            <ul className="event-list">
              {calendarEvents.map((e) => (
                <li key={e.id}>
                  <strong>{formatDate(e.event_date || e.event_date_end)}</strong>
                  <br />
                  <Link href={`/press/events/details/${e.id}`}>{e.title}</Link>
                </li>
              ))}
            </ul>
            <Link href="/press/events" className="btn" style={{ marginTop: "1rem" }}>
              Все события
            </Link>
          </section>
        </div>

        <aside>
          <section className="ardfm-section">
            <h2>Важно</h2>
            <ul className="ardfm-quick-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="ardfm-section">
            <h2>Направления деятельности</h2>
            <ul className="ardfm-quick-links">
              {DIRECTIONS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="ardfm-section">
            <h2>Контакты</h2>
            <p>{meta.contacts.address}</p>
            <p>
              <strong>Тел.:</strong>{" "}
              {meta.contacts.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>
                  {p}
                </a>
              ))}
            </p>
            {meta.contacts.emails.map((e) => (
              <p key={e}>
                <a href={`mailto:${e}`}>{e}</a>
              </p>
            ))}
            <Link href="/contacts" className="btn">
              Все контакты
            </Link>
          </section>
        </aside>
      </div>

      {projects.length > 0 && (
        <section className="ardfm-section">
          <h2>Реализуемые проекты</h2>
          <div className="ardfm-banner-slider">
            {projects.slice(0, 6).map((p) => (
              <div key={p.id} className="ardfm-banner">
                <p>
                  <Link href={`/projects/details/${p.id}`}>{p.title}</Link>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
