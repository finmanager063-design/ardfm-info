import Link from "next/link";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { HtmlContent } from "@/components/HtmlContent";
import { NewsCard } from "@/components/NewsCard";
import { ArticlesList } from "@/components/ArticlesList";
import { findNewsById, findPageByPath, getContent } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { collectStaticSlugs } from "@/lib/static-paths";

type Props = { params: Promise<{ slug?: string[] }> };

function pathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/";
  return "/" + slug.join("/");
}

export async function generateStaticParams() {
  return collectStaticSlugs(getContent());
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const pathname = pathFromSlug(slug);
  const content = getContent();

  if (pathname === "/") {
    return <HomePage />;
  }

  // Новость
  const newsMatch = pathname.match(/^\/press\/news\/details\/(\d+)$/);
  if (newsMatch) {
    const item = findNewsById(newsMatch[1]);
    if (!item) notFound();
    return (
      <article>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / <Link href="/press/news">Пресс-центр</Link> / Новость
        </nav>
        <h1 className="page-title">{item.title}</h1>
        <time dateTime={item.created_date}>{formatDate(item.created_date)}</time>
        {item.short_description && <p style={{ fontSize: "1.1rem", color: "#5c6370" }}>{item.short_description}</p>}
        <HtmlContent html={item.body || ""} />
      </article>
    );
  }

  // Список новостей
  if (pathname === "/press/news" || pathname === "/press" || pathname === "/press/") {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Пресс-центр
        </nav>
        <h1 className="page-title">Все материалы</h1>
        {content.news.map((n) => (
          <NewsCard key={n.id} item={n} />
        ))}
      </>
    );
  }

  // Документы
  if (pathname.startsWith("/documents")) {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Документы
        </nav>
        <h1 className="page-title">Документы</h1>
        <ul className="doc-list">
          {content.documents.map((d) => (
            <li key={d.id}>
              <Link href={`/documents/item/${d.id}`}>{d.title}</Link>
              <time>{formatDate(d.created_date)}</time>
              {d.type?.title && <span> — {d.type.title}</span>}
            </li>
          ))}
        </ul>
      </>
    );
  }

  const docItem = pathname.match(/^\/documents\/item\/(\d+)$/);
  if (docItem) {
    const doc = content.documents.find((d) => String(d.id) === docItem[1]);
    if (!doc) notFound();
    return (
      <article>
        <nav className="breadcrumb">
          <Link href="/documents/1">Документы</Link> / {doc.title.slice(0, 40)}…
        </nav>
        <h1 className="page-title">{doc.title}</h1>
        <time>{formatDate(doc.created_date)}</time>
        {typeof doc.content === "string" && <HtmlContent html={doc.content} />}
      </article>
    );
  }

  // Контакты
  if (pathname === "/contacts") {
    const { contacts: c } = content.meta;
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Контакты
        </nav>
        <h1 className="page-title">Контакты</h1>
        <div className="contacts-grid">
          <div>
            <h2>Адрес</h2>
            <p>{c.address}</p>
            <h2>Телефоны</h2>
            <ul>
              {c.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
                </li>
              ))}
            </ul>
            <h2>Электронная почта</h2>
            <ul>
              {c.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`}>{e}</a>
                </li>
              ))}
            </ul>
            <p>
              <a href="https://eotinish.kz" className="btn" target="_blank" rel="noreferrer">
                Онлайн-приемная e-Otinish
              </a>
            </p>
          </div>
          <div>
            <div className="map-placeholder">
              <a href={c.mapUrl} target="_blank" rel="noreferrer">
                Открыть на Яндекс.Картах
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Поиск
  if (pathname === "/search") {
    return (
      <>
        <h1 className="page-title">Поиск</h1>
        <p>Используйте форму поиска в шапке сайта.</p>
      </>
    );
  }

  // События
  if (pathname === "/press/events") {
    const all = [...content.events.upcoming, ...content.events.past];
    return (
      <>
        <h1 className="page-title">Календарь событий</h1>
        <ul className="event-list">
          {all.map((e) => (
            <li key={e.id}>
              <Link href={`/press/events/details/${e.id}`}>{e.title}</Link>
              <time>{formatDate(e.event_date)}</time>
            </li>
          ))}
        </ul>
      </>
    );
  }

  // Все статьи
  if (pathname === "/articles") {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Статьи и материалы
        </nav>
        <h1 className="page-title">Статьи и материалы</h1>
        <p style={{ color: "#5c6370", marginBottom: "1.5rem" }}>
          Всего: {content.articles.length}
        </p>
        <ArticlesList articles={content.articles} />
      </>
    );
  }

  const articleMatch = pathname.match(/^\/article\/details\/([^/]+)$/);
  if (articleMatch) {
    const article = content.articles.find((a) => String(a.id) === articleMatch[1]);
    if (!article) notFound();
    return (
      <article>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / <Link href="/articles">Статьи</Link> /{" "}
          {article.title.slice(0, 50)}…
        </nav>
        <h1 className="page-title">{article.title}</h1>
        {article.publication_date && (
          <time dateTime={article.publication_date}>
            {formatDate(article.publication_date)}
          </time>
        )}
        {article.content ? (
          <HtmlContent html={article.content} />
        ) : (
          <p>Текст материала недоступен.</p>
        )}
      </article>
    );
  }

  const releaseMatch = pathname.match(/^\/press\/releases\/details\/(\d+)$/);
  if (releaseMatch) {
    const item = content.pressReleases.find((r) => String(r.id) === releaseMatch[1]);
    if (!item) notFound();
    return (
      <article>
        <h1 className="page-title">{item.title}</h1>
        <time>{formatDate(item.created_date)}</time>
        <HtmlContent html={(item as { body?: string }).body || ""} />
      </article>
    );
  }

  const eventMatch = pathname.match(/^\/press\/events\/details\/(\d+)$/);
  if (eventMatch) {
    const all = [...content.events.upcoming, ...content.events.past];
    const ev = all.find((e) => String(e.id) === eventMatch[1]);
    if (!ev) notFound();
    return (
      <article>
        <h1 className="page-title">{ev.title}</h1>
        <time>{formatDate(ev.event_date || ev.event_date_end)}</time>
        {ev.short_description && <p>{ev.short_description}</p>}
      </article>
    );
  }

  const projectMatch = pathname.match(/^\/projects\/details\/(\d+)$/);
  if (projectMatch) {
    const pr = content.projects.find((p) => String(p.id) === projectMatch[1]);
    if (!pr) notFound();
    return (
      <article>
        <h1 className="page-title">{pr.title}</h1>
        {pr.short_description && <p>{pr.short_description}</p>}
      </article>
    );
  }

  // CMS-страница (в т.ч. без HTML — показываем заголовок)
  const page = findPageByPath(pathname);
  if (page) {
    return (
      <article>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / {page.title}
        </nav>
        <h1 className="page-title">{page.title}</h1>
        {page.content ? (
          <HtmlContent html={page.content} />
        ) : (
          <>
            <p>Раздел: {page.title}</p>
            <p>
              <Link href="/articles" className="btn">
                Все статьи и материалы
              </Link>
            </p>
          </>
        )}
      </article>
    );
  }

  // Fallback: about-like static for /about
  if (pathname === "/about") {
    return (
      <article>
        <h1 className="page-title">Об Агентстве</h1>
        <section className="ardfm-section">
          <h2>Общая информация</h2>
          <p>
            Указом Президента Республики Казахстан от 11 ноября 2019 года №203 с 1 января
            2020 года функционирует Агентство Республики Казахстан по регулированию и
            развитию финансового рынка.
          </p>
          <p>
            Агентство является государственным органом, обеспечивающим надлежащий уровень
            защиты прав и законных интересов потребителей финансовых услуг, содействующим
            обеспечению стабильности финансовой системы Республики Казахстан.
          </p>
          <p>
            <Link href="/about/structure">Структура</Link> ·{" "}
            <a href="https://eotinish.kz" target="_blank" rel="noreferrer">
              Написать обращение
            </a>
          </p>
        </section>
      </article>
    );
  }

  notFound();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pathname = pathFromSlug(slug);
  const newsMatch = pathname.match(/^\/press\/news\/details\/(\d+)$/);
  if (newsMatch) {
    const item = findNewsById(newsMatch[1]);
    if (item) return { title: item.title };
  }
  const page = findPageByPath(pathname);
  if (page) return { title: page.seo_title || page.title };
  const articleMatch = pathname.match(/^\/article\/details\/([^/]+)$/);
  if (articleMatch) {
    const article = getContent().articles.find((a) => String(a.id) === articleMatch[1]);
    if (article) return { title: article.title };
  }
  return {};
}
