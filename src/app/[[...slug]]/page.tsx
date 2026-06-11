import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientPayoutsPage } from "@/components/ClientPayoutsPage";
import { HomePage } from "@/components/HomePage";
import { ContactsPage } from "@/components/ContactsPage";
import { AdminPayoutsPage } from "@/components/AdminPayoutsPage";
import { FaqPage } from "@/components/FaqPage";
import { HtmlContent } from "@/components/HtmlContent";
import { collectStaticSlugs } from "@/lib/static-paths";
import { getI18n, getLocaleFromPath } from "@/lib/i18n";
import { findNewsById, findPageByPath, getContent } from "@/lib/content";
import { formatDate, localMediaUrl, rewriteGovHtml } from "@/lib/format";

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

  if (pathname === "/") {
    return <HomePage />;
  }

  if (pathname === "/client-payouts") {
    return (
      <>
        <nav className="premium-container text-sm text-premium-text-secondary py-3">
          <Link href="/" className="hover:text-green-600">Главная</Link>
          <span className="mx-2">/</span>
          <span>Проверка выплат</span>
        </nav>
        <ClientPayoutsPage />
      </>
    );
  }

  if (pathname === "/admin") {
    return <AdminPayoutsPage />;
  }

  if (pathname === "/contacts") {
    return <ContactsPage />;
  }

  if (pathname === "/about/faq") {
    return <FaqPage />;
  }

  if (pathname === "/search") {
    return (
      <div className="premium-container py-10 text-center">
        <h1 className="text-2xl font-bold text-premium-navy-800 mb-3">Поиск</h1>
        <p className="premium-text-secondary">Используйте форму поиска в шапке сайта.</p>
      </div>
    );
  }

  const locale = getLocaleFromPath(pathname);
  if (pathname === "/en" || pathname === "/kk") {
    return <HomePage />;
  }

  // CMS news detail
  const mediaNewsMatch = pathname.match(/^\/media\/news\/details\/(\d+)$/);
  if (mediaNewsMatch) {
    const item = findNewsById(mediaNewsMatch[1]);
    if (!item) notFound();
    return (
      <article className="premium-container py-10">
        <nav className="text-sm text-premium-text-secondary mb-4">
          <Link href="/" className="hover:text-green-600">Главная</Link>
          <span className="mx-2">/</span>
          <span>Новости</span>
        </nav>
        {item.heropic && (
          <img src={localMediaUrl(item.heropic)} alt="" className="w-full max-h-96 object-cover rounded-xl mb-6" loading="lazy" />
        )}
        <h1 className="text-3xl font-bold text-premium-navy-800 mb-3">{item.title}</h1>
        <time className="text-sm text-premium-text-secondary block mb-4">{formatDate(item.created_date || item.publication_date)}</time>
        {item.short_description && (
          <p className="text-lg text-premium-text-secondary mb-6">{item.short_description}</p>
        )}
        <HtmlContent html={rewriteGovHtml(item.body || "")} />
      </article>
    );
  }

  // CMS article detail
  const articleMatch = pathname.match(/^\/article\/details\/(.+)$/);
  if (articleMatch) {
    const articles = getContent().articles;
    const item = articles.find(a => String(a.id) === articleMatch[1] || a.alias === articleMatch[1]);
    if (!item) notFound();
    return (
      <article className="premium-container py-10">
        <nav className="text-sm text-premium-text-secondary mb-4">
          <Link href="/" className="hover:text-green-600">Главная</Link>
          <span className="mx-2">/</span>
          <span>Статьи</span>
        </nav>
        {item.heropic && (
          <img src={localMediaUrl(item.heropic)} alt="" className="w-full max-h-96 object-cover rounded-xl mb-6" loading="lazy" />
        )}
        <h1 className="text-3xl font-bold text-premium-navy-800 mb-3">{item.title}</h1>
        {item.publication_date && (
          <time className="text-sm text-premium-text-secondary block mb-4">{formatDate(item.publication_date)}</time>
        )}
        <HtmlContent html={rewriteGovHtml(item.content || "")} />
      </article>
    );
  }

  // CMS page
  const page = findPageByPath(pathname);
  if (page) {
    return (
      <div className="premium-container py-10">
        <h1 className="text-3xl font-bold text-premium-navy-800 mb-6">{page.title}</h1>
        <HtmlContent html={rewriteGovHtml(page.content || "")} />
      </div>
    );
  }

  notFound();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pathname = pathFromSlug(slug);
  const locale = getLocaleFromPath(pathname);
  const i18n = getI18n(locale);

  const titles: Record<string, string> = {
    "/client-payouts": "Проверка выплат",
    "/contacts": "Контакты",
    "/about/faq": "Часто задаваемые вопросы",
    "/admin": "Служебный доступ",
  };

  if (pathname === "/") return {};
  const title = titles[pathname];
  if (title) return { title };
  return {};
}
