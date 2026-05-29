export interface GovPage {
  id: string;
  slug: string;
  title: string;
  content?: string;
  internal_link?: string;
  is_menu_item?: boolean;
  order?: number;
  description_seo?: string;
  seo_title?: string;
}

export interface GovNews {
  id: string;
  title: string;
  slug?: string;
  created_date?: string;
  short_description?: string;
  body?: string;
  heropic?: string;
  type?: unknown;
  publication_type?: unknown;
}

export interface GovDocument {
  id: string | number;
  title: string;
  created_date?: string;
  type?: { title?: string; slug?: string };
  content?: string;
  full_text?: unknown;
  other_files?: { url?: string; name?: string }[];
}

export interface GovEvent {
  id: string | number;
  title: string;
  event_date?: string;
  event_date_end?: string;
  short_description?: string;
  heropic?: string;
  slug?: string;
}

export interface GovProject {
  id: string | number;
  title: string;
  short_description?: string;
  heropic?: string;
  internal_link?: string;
  slug?: string;
}

export interface SiteContent {
  meta: {
    syncedAt: string;
    source: string;
    entityTitle: string;
    entityShort: string;
    contacts: {
      address: string;
      phones: string[];
      emails: string[];
      mapUrl: string;
    };
  };
  menuPages: GovPage[];
  pages: GovPage[];
  news: GovNews[];
  documents: GovDocument[];
  events: { upcoming: GovEvent[]; past: GovEvent[] };
  projects: GovProject[];
  pressReleases: GovNews[];
  contacts: unknown[];
  articles: {
    id: string;
    title: string;
    alias?: string;
    content?: string;
    short_description?: string;
    publication_date?: string;
    heropic?: string;
  }[];
}
