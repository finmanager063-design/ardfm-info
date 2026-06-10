import type { Metadata } from "next";
import { ShellWrapper } from "@/components/ShellWrapper";
import { basePath } from "@/lib/base-path";
import "./globals.css";
import "./premium.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://payguard.kz";

export const metadata: Metadata = {
  title: {
    default: "PayGuard — Проверка реквизитов и безопасный перевод",
    template: "%s | PayGuard",
  },
  description:
    "PayGuard — сервис проверки и безопасного сопровождения финансовых операций в Казахстане. Проверка ИИН, БИН, статуса выплат и верификация получателей.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "PayGuard",
    "проверка реквизитов",
    "безопасный перевод",
    "верификация получателя",
    "проверка ИИН",
    "проверка БИН",
    "финансовая безопасность Казахстан",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "PayGuard",
    title: "PayGuard — Проверка реквизитов и безопасный перевод",
    description:
      "Сервис проверки и безопасного сопровождения финансовых операций в Казахстане",
  },
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PayGuard",
  alternateName: "PayGuard.kz",
  description:
    "Сервис проверки и безопасного сопровождения финансовых операций в Казахстане",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KZ",
    addressLocality: "Алматы",
    streetAddress: "ул. Жибек Жолы, 135",
    postalCode: "050000",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://t.me/payguard_support_bot",
    availableLanguage: ["Russian", "Kazakh", "English"],
  },
  knowsAbout: [
    "Проверка реквизитов",
    "Верификация получателей",
    "Безопасные переводы",
    "Проверка ИИН/БИН",
    "Финансовая безопасность",
  ],
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
        <ShellWrapper>{children}</ShellWrapper>
      </body>
    </html>
  );
}
