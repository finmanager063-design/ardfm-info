import {
  ACTIVITIES_COMPETENCIES_BLOCK,
  ACTIVITIES_CROSSCUTTING_BLOCK,
  ACTIVITIES_DIRECTIONS_INTRO,
  ACTIVITIES_SECTORS_BLOCK,
  ACTIVITIES_SUPERVISION_2026_BLOCK,
  FAQ_ITEMS,
  LEGAL_BLOCK,
  LEADERSHIP_BLOCK,
  MISSION_BLOCK,
  STRUCTURE_BLOCK,
  SUPERVISION_2026,
} from "./ardfm-content";
import { ACTIVITY_SLUG_TO_LEGACY } from "./ia-v2";
import type { GovDocument, GovNews, SiteContent } from "./types";

export type SectionLink = { href: string; label: string; external?: boolean };

export type SectionConfig = {
  title: string;
  intro: string;
  blocks?: string[];
  links?: SectionLink[];
  articleKeywords?: string[];
  documentKeywords?: string[];
  newsKeywords?: string[];
  articleLimit?: number;
  documentLimit?: number;
  newsLimit?: number;
};

const ABOUT_INTRO = `
<p>Указом Президента Республики Казахстан от 11 ноября 2019 года №203 с 1 января 2020 года функционирует <strong>Агентство Республики Казахстан по регулированию и развитию финансового рынка (АРРФР)</strong>.</p>
<p>Агентство — правопреемник функций Национального Банка РК в части регулирования и надзора за банками, страховщиками, рынком ценных бумаг, микрофинансовыми и иными финансовыми организациями.</p>
`;

const DIRECTION_LINKS: SectionLink[] = [
  { href: "/activities/banking-sector", label: "Банковский сектор" },
  { href: "/activities/insurance-sector", label: "Страховой сектор" },
  { href: "/activities/securities-market", label: "Рынок ценных бумаг" },
  { href: "/activities/other-financial-organizations", label: "Иные финансовые организации" },
  { href: "/activities/appointments", label: "Кадровые назначения" },
];

export const SECTION_BY_PATH: Record<string, SectionConfig> = {
  "/about": {
    title: "Об Агентстве",
    intro: ABOUT_INTRO,
    blocks: [MISSION_BLOCK, LEADERSHIP_BLOCK, LEGAL_BLOCK],
    links: [
      { href: "/about/structure", label: "Структура Агентства" },
      { href: "/about/faq", label: "Часто задаваемые вопросы" },
      ...DIRECTION_LINKS,
    ],
    newsLimit: 6,
    articleLimit: 8,
    articleKeywords: ["агентств", "регулирован", "финансов", "надзор"],
  },
  "/about/structure": {
    title: "Структура Агентства",
    intro: `<p>Организационная структура АРРФР формируется в соответствии с положением о Агентстве и направлена на эффективное выполнение надзорных и регуляторных функций.</p>`,
    blocks: [STRUCTURE_BLOCK],
    links: [
      { href: "/about", label: "← Об Агентстве" },
      { href: "/contacts", label: "Контакты (Telegram-бот)" },
    ],
  },
  "/activities/directions": {
    title: "Деятельность",
    intro: ACTIVITIES_DIRECTIONS_INTRO,
    blocks: [
      ACTIVITIES_COMPETENCIES_BLOCK,
      ACTIVITIES_SECTORS_BLOCK,
      ACTIVITIES_CROSSCUTTING_BLOCK,
      ACTIVITIES_SUPERVISION_2026_BLOCK,
    ],
    links: [
      ...DIRECTION_LINKS,
      { href: "/about/faq", label: "Часто задаваемые вопросы" },
      { href: "/documents/1", label: "Нормативные документы" },
    ],
    articleLimit: 15,
    articleKeywords: ["надзор", "регулирован", "финансов", "грамотност", "рынок", "банк", "страхов"],
    documentLimit: 12,
    documentKeywords: ["постановлен", "надзор", "регулирован"],
    newsLimit: 8,
    newsKeywords: ["надзор", "регулирован", "рынок", "банк", "лицензи"],
  },
  "/activities/789": {
    title: "Банковский сектор",
    intro: `
<p>Надзор за банками второго уровня и организациями, осуществляющими отдельные виды банковских операций: лицензирование, пруденциальные нормативы, корпоративное управление, защита вкладчиков и заёмщиков.</p>
`,
    blocks: [SUPERVISION_2026.banking],
    articleKeywords: ["банк", "банков", "кредит", "депозит", "ипотек", "заёмщик", "вклад"],
    documentKeywords: ["банк", "банков"],
    articleLimit: 25,
    documentLimit: 15,
    newsLimit: 5,
    newsKeywords: ["банк", "лицензи", "кредит"],
  },
  "/activities/847": {
    title: "Страховой сектор",
    intro: `
<p>Регулирование страховых и перестраховочных организаций, страховых брокеров; контроль платёжеспособности; защита прав страхователей; надзор за урегулированием убытков.</p>
`,
    blocks: [SUPERVISION_2026.insurance],
    articleKeywords: ["страхов", "страхован", "полис", "осаго", "каско"],
    documentKeywords: ["страхов"],
    articleLimit: 20,
    documentLimit: 12,
    newsLimit: 5,
    newsKeywords: ["страхов"],
  },
  "/activities/788": {
    title: "Рынок ценных бумаг и управление пенсионными активами",
    intro: `
<p>Надзор за профучастниками, управляющими инвестиционным портфелем, депозитариями, центральным депозитарием; развитие рынка облигаций; защита инвесторов.</p>
`,
    blocks: [SUPERVISION_2026.securities],
    articleKeywords: ["ценн", "бумаг", "облигац", "брокер", "пенсион", "бирж", "инвестиц"],
    documentKeywords: ["ценн", "бумаг", "облигац"],
    articleLimit: 20,
    documentLimit: 12,
    newsLimit: 5,
  },
  "/activities/16487": {
    title: "Иные финансовые организации",
    intro: `
<p>Регулирование МФО, ломбардов, коллекторов; ведение перечней нелицензированной деятельности; ограничение закредитованности населения.</p>
`,
    blocks: [SUPERVISION_2026.mfo],
    articleKeywords: ["микрофинанс", "мфо", "ломбард", "коллектор", "нелиценз"],
    documentKeywords: ["микрофинанс", "ломбард"],
    articleLimit: 20,
    documentLimit: 10,
    newsLimit: 5,
    newsKeywords: ["мфо", "микрофинанс", "ломбард"],
  },
  "/activities/80952": {
    title: "Кадровые назначения",
    intro: `<p>Официальная информация о назначениях на должности в Агентстве Республики Казахстан по регулированию и развитию финансового рынка.</p>`,
    newsKeywords: ["назначен", "кадр", "руковод", "председател"],
    documentKeywords: ["назначен", "кадр", "приказ"],
    newsLimit: 20,
    documentLimit: 10,
  },
};

export { FAQ_ITEMS };

function matchText(text: string, keywords?: string[]): boolean {
  if (!keywords?.length) return true;
  const t = text.toLowerCase();
  return keywords.some((k) => t.includes(k));
}

function docTitle(d: GovDocument): string {
  const t = d.type;
  if (t && typeof t === "object" && "items" in t && Array.isArray(t.items) && t.items[0]) {
    return `${t.items[0].type ?? ""} — ${d.title}`;
  }
  return d.title;
}

export function getSectionConfig(pathname: string): SectionConfig | undefined {
  const norm = pathname.replace(/\/$/, "") || "/";
  const legacy = ACTIVITY_SLUG_TO_LEGACY[norm] ?? norm;
  if (SECTION_BY_PATH[legacy]) return SECTION_BY_PATH[legacy];
  const activity = legacy.match(/^\/activities\/(\d+)$/);
  if (activity) {
    return (
      SECTION_BY_PATH[`/activities/${activity[1]}`] ?? {
        title: "Направление деятельности",
        intro: `<p>Материалы и публикации по данному направлению надзорной деятельности АРРФР.</p>`,
        articleLimit: 15,
      }
    );
  }
  return undefined;
}

function byDateDesc(a?: string, b?: string): number {
  return (b ?? "").localeCompare(a ?? "");
}

export function filterSectionContent(
  config: SectionConfig,
  content: SiteContent,
  articles: SiteContent["articles"],
) {
  const news = (content.news || [])
    .filter((n) =>
      matchText(`${n.title} ${n.short_description ?? ""}`, config.newsKeywords),
    )
    .sort((a, b) => byDateDesc(a.created_date, b.created_date))
    .slice(0, config.newsLimit ?? 0);

  let filteredArticles = articles
    .filter((a) =>
      matchText(`${a.title} ${a.short_description ?? ""}`, config.articleKeywords),
    )
    .sort((a, b) => byDateDesc(a.publication_date, b.publication_date));
  if (!filteredArticles.length && config.articleLimit) {
    filteredArticles = [...articles]
      .sort((a, b) => byDateDesc(a.publication_date, b.publication_date))
      .slice(0, config.articleLimit);
  } else {
    filteredArticles = filteredArticles.slice(0, config.articleLimit ?? 0);
  }

  let documents = (content.documents || [])
    .filter((d) => matchText(d.title, config.documentKeywords))
    .sort((a, b) => byDateDesc(a.created_date, b.created_date));

  if (!documents.length && config.documentLimit) {
    documents = [...(content.documents || [])]
      .sort((a, b) => byDateDesc(a.created_date, b.created_date))
      .slice(0, config.documentLimit);
  } else {
    documents = documents.slice(0, config.documentLimit ?? 0);
  }

  return { news, articles: filteredArticles, documents };
}

export { docTitle };
