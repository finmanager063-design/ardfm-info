export type SiteAnnouncement = {
  id: string;
  title: string;
  body: string;
  published: boolean;
  createdAt: string;
};

const KEY = "regylz-site-announcements";

export function loadAnnouncements(): SiteAnnouncement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as SiteAnnouncement[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveAnnouncements(list: SiteAnnouncement[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function generateAnnouncementId(): string {
  return `ann-${Date.now().toString(36)}`;
}
