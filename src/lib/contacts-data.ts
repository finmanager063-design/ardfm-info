import { SUPPORT_CHAT } from "./contacts";

export const AGENCY_ADDRESS = {
  country: "Казахстан",
  city: "Алматы",
  zip: "050000",
  street: "ул. Жибек Жолы, 135",
};

export const AGENCY_SCHEDULE = {
  reception: "Пн–Пт, 09:00–18:00",
  break: "13:00–14:00",
  online: "Круглосуточно",
};

export const CONTACT_CHANNELS = [
  {
    id: "telegram",
    icon: "✈️",
    title: "Telegram-бот",
    href: SUPPORT_CHAT.url,
    value: SUPPORT_CHAT.handle,
    note: "Круглосуточная поддержка",
    primary: true,
  },
  {
    id: "email",
    icon: "📧",
    title: "Электронная почта",
    href: "mailto:support@payguard.kz",
    value: "support@payguard.kz",
    note: "Ответ в течение 24 часов",
  },
  {
    id: "phone",
    icon: "📞",
    title: "Горячая линия",
    href: "tel:+77000000000",
    value: "+7 700 000 00 00",
    note: "Пн–Пт, 09:00–18:00",
  },
] as const;

export const CONTACT_SERVICES = [
  {
    icon: "🛡️",
    title: "Проверка реквизитов",
    text: "Узнайте статус получателя перед переводом. Проверка по ИИН/БИН.",
    href: "/client-payouts",
    internal: true,
  },
  {
    icon: "🔍",
    title: "Верификация сделки",
    text: "Убедитесь в надёжности контрагента. Полный отчёт о платёжеспособности.",
    href: SUPPORT_CHAT.url,
  },
  {
    icon: "📋",
    title: "Статус выплаты",
    text: "Проверьте по номеру дела или ИИН статус выплаты средств.",
    href: "/client-payouts",
    internal: true,
  },
  {
    icon: "💬",
    title: "Консультация",
    text: "Задайте вопрос о безопасности финансовой операции. Бесплатно.",
    href: SUPPORT_CHAT.url,
  },
] as const;

export const CONTACT_STEPS = [
  { num: 1, title: "Напишите в бот", text: `Откройте ${SUPPORT_CHAT.handle} в Telegram и нажмите «Старт»` },
  { num: 2, title: "Укажите данные", text: "Введите ИИН, БИН или номер дела для проверки" },
  { num: 3, title: "Получите результат", text: "Мгновенный отчёт о статусе и реквизитах" },
  { num: 4, title: "Безопасный перевод", text: "После подтверждения средств — инструкция по переводу" },
] as const;

export const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.8!2d76.9285!3d43.2365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzExLjQiTiA3NsKwNTUnNDIuNiJF!5e0!3m2!1sru!2skz!4v1";

export const CONTACT_SOCIAL = [
  { href: "https://t.me/payguard_kz", label: "Telegram-канал", icon: "✈️" },
  { href: "https://instagram.com/payguard.kz", label: "Instagram", icon: "📸" },
] as const;
