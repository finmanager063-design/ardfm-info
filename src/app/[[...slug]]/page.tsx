import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivitiesDirections } from "@/components/ActivitiesDirections";
import { ClientPayoutsPage } from "@/components/ClientPayoutsPage";
import { MarketChartsStrip } from "@/components/MarketChartsStrip";
import { ContactsPage } from "@/components/ContactsPage";
import { FaqPage } from "@/components/FaqPage";
import { HomePage } from "@/components/HomePage";
import { HtmlContent } from "@/components/HtmlContent";
import { NewsCard } from "@/components/NewsCard";
import { ArticlesList } from "@/components/ArticlesList";
import { DocumentsPage } from "@/components/DocumentsPage";
import { PressCenterPage } from "@/components/PressCenterPage";
import { SectionPage } from "@/components/SectionPage";
import { findArticleById, findNewsById, findPageByPath, getArticles, getContent } from "@/lib/content";
import { formatDate } from "@/lib/format";
import {
  filterSectionContent,
  getSectionConfig,
} from "@/lib/sections";
import { sortNewsByDate } from "@/lib/news-media";
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
    return <PressCenterPage news={sortNewsByDate(content.news)} activePath="/press/news" />;
  }

  if (pathname === "/press/releases") {
    const releases = [...content.pressReleases].sort((a, b) =>
      (b.created_date ?? "").localeCompare(a.created_date ?? ""),
    );
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / <Link href="/press/news">Пресс-центр</Link> / Пресс-релизы
        </nav>
        <h1 className="page-title">Пресс-релизы</h1>
        <nav className="home-press__tabs" aria-label="Разделы пресс-центра">
          <Link href="/press/news" className="home-press__tab">
            Все материалы
          </Link>
          <Link href="/press/releases" className="home-press__tab home-press__tab--active">
            Пресс-релизы
          </Link>
          <Link href="/press/events" className="home-press__tab">
            События
          </Link>
        </nav>
        <ul className="doc-list">
          {releases.map((r) => (
            <li key={r.id}>
              <Link href={`/press/releases/details/${r.id}`}>{r.title}</Link>
              <time>{formatDate(r.created_date)}</time>
            </li>
          ))}
        </ul>
      </>
    );
  }

  // Документы (список)
  if (pathname === "/documents/1" || pathname === "/documents") {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Документы
        </nav>
        <DocumentsPage documents={content.documents} />
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

  if (pathname === "/about/faq") {
    return <FaqPage />;
  }

  if (pathname === "/contacts") {
    return <ContactsPage />;
  }

  if (pathname === "/client-payouts") {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Выплата средств клиентам
        </nav>
        <ClientPayoutsPage />
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

  if (pathname === "/press/events") {
    const all = [...content.events.upcoming, ...content.events.past].sort((a, b) =>
      (b.event_date ?? "").localeCompare(a.event_date ?? ""),
    );
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / <Link href="/press/news">Пресс-центр</Link> / События
        </nav>
        <h1 className="page-title">Календарь событий</h1>
        <nav className="home-press__tabs" aria-label="Разделы пресс-центра">
          <Link href="/press/news" className="home-press__tab">
            Все материалы
          </Link>
          <Link href="/press/releases" className="home-press__tab">
            Пресс-релизы
          </Link>
          <Link href="/press/events" className="home-press__tab home-press__tab--active">
            События
          </Link>
        </nav>
        {all.length === 0 ? (
          <p>Запланированные мероприятия будут опубликованы в пресс-центре.</p>
        ) : (
          <ul className="event-list">
            {all.map((e) => (
              <li key={e.id}>
                <Link href={`/press/events/details/${e.id}`}>{e.title}</Link>
                <time>{formatDate(e.event_date)}</time>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  // Все статьи
  const articles = getArticles();

  if (pathname === "/articles") {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Статьи и материалы
        </nav>
        <h1 className="page-title">Статьи и материалы</h1>
        <p style={{ color: "#5c6370", marginBottom: "1.5rem" }}>
          Всего: {articles.length}
        </p>
        <ArticlesList articles={articles} />
      </>
    );
  }

  const articleMatch = pathname.match(/^\/article\/details\/([^/]+)$/);
  if (articleMatch) {
    const article = findArticleById(articleMatch[1]);
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
    const desc = (pr as { description?: string }).description;
    return (
      <article>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Проект
        </nav>
        <h1 className="page-title">{pr.title}</h1>
        {pr.short_description && <p className="section-lead">{pr.short_description}</p>}
        {desc && <HtmlContent html={desc} />}
      </article>
    );
  }

  // Разделы с уникальным контентом (об агентстве, деятельность, направления)
  if (pathname === "/finansovye-rynki" || pathname === "/financial-markets") {
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / Деятельность
        </nav>
        <p>
          <Link href="/activities/directions" className="btn">
            Перейти к разделу «Деятельность»
          </Link>
        </p>
      </>
    );
  }

  const sectionConfig = getSectionConfig(pathname);
  if (sectionConfig) {
    const filtered = filterSectionContent(sectionConfig, content, articles);
    const isDirections = pathname === "/activities/directions";
    return (
      <>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link>
          {pathname.startsWith("/activities") && pathname !== "/activities/directions" ? (
            <>
              {" "}
              / <Link href="/activities/directions">Деятельность</Link>
            </>
          ) : null}
          {pathname !== "/activities/directions" ? <> / {sectionConfig.title}</> : null}
          {pathname === "/activities/directions" ? <> / Деятельность</> : null}
        </nav>
        <SectionPage
          config={sectionConfig}
          news={filtered.news}
          articles={filtered.articles}
          documents={filtered.documents}
        >
          <MarketChartsStrip />
          {isDirections && <ActivitiesDirections />}
        </SectionPage>
      </>
    );
  }

  // CMS-страница (с текстом из API)
  const page = findPageByPath(pathname);
  if (page?.content) {
    return (
      <article>
        <nav className="breadcrumb">
          <Link href="/">Главная</Link> / {page.title}
        </nav>
        <h1 className="page-title">{page.title}</h1>
        <HtmlContent html={page.content} />
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
  if (pathname === "/about/faq") return { title: "Часто задаваемые вопросы" };
  if (pathname === "/client-payouts") return { title: "Выплата средств клиентам" };
  const sectionConfig = getSectionConfig(pathname);
  if (sectionConfig) return { title: sectionConfig.title };
  const page = findPageByPath(pathname);
  if (page) return { title: page.seo_title || page.title };
  const articleMatch = pathname.match(/^\/article\/details\/([^/]+)$/);
  if (articleMatch) {
    const article = findArticleById(articleMatch[1]);
    if (article) return { title: article.title };
  }
  return {};
}
