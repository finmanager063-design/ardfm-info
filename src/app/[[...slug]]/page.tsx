import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientPayoutsPage } from "@/components/ClientPayoutsPage";
import { HomePage } from "@/components/HomePage";
import { ContactsPage } from "@/components/ContactsPage";
import { AdminPayoutsPage } from "@/components/AdminPayoutsPage";
import { FaqPage } from "@/components/FaqPage";
import { collectStaticSlugs } from "@/lib/static-paths";
import { getI18n, getLocaleFromPath } from "@/lib/i18n";

type Props = { params: Promise<{ slug?: string[] }> };

function pathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/";
  return "/" + slug.join("/");
}

export async function generateStaticParams() {
  return collectStaticSlugs();
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
        <p className="text-premium-text-secondary">Используйте форму поиска в шапке сайта.</p>
      </div>
    );
  }

  // Locale prefixes — render home in each locale
  const locale = getLocaleFromPath(pathname);
  if (pathname === "/en" || pathname === "/kk") {
    return <HomePage />;
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
