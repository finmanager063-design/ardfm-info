export const SUPPORT_CHAT = {
  username: "payguard_support_bot",
  handle: "@payguard_support_bot",
  url: "https://t.me/payguard_support_bot",
} as const;

export type SiteContacts = {
  telegram: typeof SUPPORT_CHAT;
};

export function getSiteContacts(): SiteContacts {
  return { telegram: SUPPORT_CHAT };
}
