import { TELEGRAM_BOT } from "./contacts";

export const AGENCY_ADDRESS = {
  city: "г. Астана",
  street: "проспект Мәңгілік Ел, 20а",
  zip: "010000",
  country: "Республика Казахстан",
  full: "010000, г. Астана, проспект Мәңгілік Ел, 20а",
} as const;

export const AGENCY_SCHEDULE = {
  reception: "понедельник — пятница, 09:00–18:30",
  break: "обед 13:00–14:00",
  online: "Telegram-бот — круглосуточно",
} as const;

export const CONTACT_CHANNELS = [
  {
    id: "telegram",
    icon: "✈️",
    title: "Telegram-бот",
    value: TELEGRAM_BOT.handle,
    href: TELEGRAM_BOT.url,
    primary: true,
    note: "Основной канал обращений",
  },
  {
    id: "web",
    icon: "🌐",
    title: "Официальный сайт",
    value: "govkz.online",
    href: "https://govkz.online/",
    note: "Информационный ресурс Агентства",
  },
  {
    id: "call",
    icon: "📞",
    title: "Единый контакт-центр",
    value: "1414",
    href: "tel:1414",
    note: "Бесплатно по РК",
  },
] as const;

export const CONTACT_SERVICES = [
  {
    icon: "📋",
    title: "Обращение гражданина",
    text: "Заявления, жалобы, предложения по финансовому рынку",
    href: TELEGRAM_BOT.url,
  },
  {
    icon: "🛡️",
    title: "Защита прав потребителей",
    text: "Споры с банками, страховщиками, МФО и брокерами",
    href: TELEGRAM_BOT.url,
  },
  {
    icon: "⚠️",
    title: "Финансовое мошенничество",
    text: "Сообщить о нелегальной деятельности и мошеннических схемах",
    href: TELEGRAM_BOT.url,
  },
  {
    icon: "📄",
    title: "Лицензирование",
    text: "Вопросы по лицензиям и регулируемым видам деятельности",
    href: TELEGRAM_BOT.url,
  },
  {
    icon: "❓",
    title: "Частые вопросы",
    text: "Ответы до обращения в Агентство",
    href: "/about/faq",
    internal: true as const,
  },
] as const;

export const CONTACT_STEPS = [
  { num: "1", title: "Откройте Telegram", text: "На телефоне или компьютере" },
  { num: "2", title: "Запустите бота", text: TELEGRAM_BOT.handle },
  { num: "3", title: "Выберите тему", text: "Следуйте меню бота" },
  { num: "4", title: "Отправьте обращение", text: "Приложите документы при необходимости" },
] as const;

/** Карта: центр Астаны, район Есиль (Мәңгілік Ел). */
export const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=71.404%2C51.082%2C71.448%2C51.108&layer=mapnik&marker=51.095%2C71.426";
