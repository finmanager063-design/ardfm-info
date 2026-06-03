import type { Metadata } from "next";
import { GovShell } from "@/components/GovShell";
import { basePath } from "@/lib/base-path";
import { getContent } from "@/lib/content";
import "./globals.css";
import "./regylz.css";

const content = getContent();

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.NEXT_PUBLIC_BASE_PATH === "/regylz"
    ? "https://finmanager063-design.github.io/regylz"
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: {
    default: `${content.meta.entityTitle} | Официальный информационный ресурс`,
    template: `%s | ${content.meta.entityShort}`,
  },
  description:
    "Агентство Республики Казахстан по регулированию и развитию финансового рынка (АРРФР): новости, документы, реестры лицензий, защита прав потребителей финансовых услуг и онлайн-обращения",
  metadataBase: new URL(siteUrl),
  keywords: [
    "АРРФР",
    "финансовый регулятор Казахстан",
    "лицензии финансовых организаций",
    "защита прав потребителей финансовых услуг",
    "Агентство финансового рынка",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: content.meta.entityShort,
    title: content.meta.entityTitle,
    description:
      "Агентство Республики Казахстан по регулированию и развитию финансового рынка",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: content.meta.entityTitle,
  alternateName: content.meta.entityShort,
  description:
    "Агентство Республики Казахстан по регулированию и развитию финансового рынка — государственный орган, осуществляющий регулирование и надзор на финансовом рынке",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KZ",
    addressLocality: "Астана",
    streetAddress: "проспект Мәңгілік Ел, 20а",
    postalCode: "010000",
  },
  telephone: "+7-7172-79-00-00",
  image: `${siteUrl}/images/og-image.jpg`,
  knowsAbout: [
    "Регулирование финансового рынка",
    "Банковский надзор",
    "Страховой надзор",
    "Рынок ценных бумаг",
    "Микрофинансовые организации",
    "Защита прав потребителей финансовых услуг",
  ],
  parentOrganization: {
    "@type": "GovernmentOrganization",
    name: "Правительство Республики Казахстан",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="notranslate">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GovShell meta={content.meta}>{children}</GovShell>
      </body>
    </html>
  );
}
