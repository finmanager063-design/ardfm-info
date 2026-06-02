import type { Metadata } from "next";
import { GovShell } from "@/components/GovShell";
import { basePath } from "@/lib/base-path";
import { getContent } from "@/lib/content";
import "./ardfm.css";
import "./globals.css";
import "./motion.css";

const content = getContent();

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_PATH === "/regylz"
    ? "https://finmanager063-design.github.io/regylz"
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: content.meta.entityTitle,
    template: `%s | ${content.meta.entityShort}`,
  },
  description:
    "Агентство Республики Казахстан по регулированию и развитию финансового рынка (АРРФР): новости, документы, сервисы и обращения",
  metadataBase: new URL(siteUrl),
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
      </head>
      <body>
        <GovShell meta={content.meta}>{children}</GovShell>
      </body>
    </html>
  );
}
