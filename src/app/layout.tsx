import type { Metadata } from "next";
import { GovShell } from "@/components/GovShell";
import { getContent } from "@/lib/content";
import "./ardfm.css";
import "./globals.css";

const content = getContent();

export const metadata: Metadata = {
  title: {
    default: content.meta.entityTitle,
    template: `%s | ${content.meta.entityShort}`,
  },
  description:
    "Агентство Республики Казахстан по регулированию и развитию финансового рынка (АРРФР) — копия официального портала gov.kz",
  metadataBase: new URL("https://www.gov.kz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="notranslate">
      <head>
        <link rel="stylesheet" href="/styles/gov-main.css" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <GovShell meta={content.meta}>{children}</GovShell>
      </body>
    </html>
  );
}
