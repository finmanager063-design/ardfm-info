import type { PayoutStatus } from "@/lib/client-payouts";

/** Канонические статусы дела в админке (жизненный цикл обращения). */
export const CLIENT_STATUS_OPTIONS = [
  "Новый",
  "Принято в работу",
  "На рассмотрении",
  "Запрошены документы",
  "Проверка документов",
  "Экспертиза",
  "Направлено в организацию",
  "Ожидает ответа клиента",
  "Согласование",
  "Ожидает выплаты",
  "Частично выплачено",
  "Выплачено",
  "Приостановлено",
  "Отклонено",
  "Архив",
] as const;

export type CanonicalClientStatus = (typeof CLIENT_STATUS_OPTIONS)[number];

/** Старые значения в data.json — при чтении приводим к каноническим. */
const LEGACY_STATUS_MAP: Record<string, CanonicalClientStatus> = {
  "В работе": "Принято в работу",
  "На проверке": "Проверка документов",
  "Решено": "Выплачено",
};

export type ClientStatus = CanonicalClientStatus | keyof typeof LEGACY_STATUS_MAP;

export type StatusPhase =
  | "intake"
  | "review"
  | "external"
  | "decision"
  | "payout"
  | "closed";

export type StatusMeta = {
  phase: StatusPhase;
  /** Текст на публичном сайте (реестр выплат) */
  publicLabel: PayoutStatus;
  adminClass: string;
  dotClass: string;
};

export const STATUS_META: Record<CanonicalClientStatus, StatusMeta> = {
  Новый: {
    phase: "intake",
    publicLabel: "На рассмотрении",
    adminClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    dotClass: "bg-sky-400",
  },
  "Принято в работу": {
    phase: "intake",
    publicLabel: "На рассмотрении",
    adminClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    dotClass: "bg-blue-400",
  },
  "На рассмотрении": {
    phase: "review",
    publicLabel: "На рассмотрении",
    adminClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    dotClass: "bg-indigo-400",
  },
  "Запрошены документы": {
    phase: "review",
    publicLabel: "Запрошены документы",
    adminClass: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    dotClass: "bg-violet-400",
  },
  "Проверка документов": {
    phase: "review",
    publicLabel: "Проверка документов",
    adminClass: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    dotClass: "bg-purple-400",
  },
  Экспертиза: {
    phase: "review",
    publicLabel: "Экспертиза",
    adminClass: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
    dotClass: "bg-fuchsia-400",
  },
  "Направлено в организацию": {
    phase: "external",
    publicLabel: "Направлено в организацию",
    adminClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    dotClass: "bg-cyan-400",
  },
  "Ожидает ответа клиента": {
    phase: "external",
    publicLabel: "Ожидает ответа",
    adminClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    dotClass: "bg-amber-400",
  },
  Согласование: {
    phase: "decision",
    publicLabel: "Согласование",
    adminClass: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    dotClass: "bg-orange-400",
  },
  "Ожидает выплаты": {
    phase: "payout",
    publicLabel: "Ожидает выплату",
    adminClass: "bg-yellow-500/20 text-yellow-200 border-yellow-500/30",
    dotClass: "bg-yellow-400",
  },
  "Частично выплачено": {
    phase: "payout",
    publicLabel: "Частично оплачено",
    adminClass: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    dotClass: "bg-teal-400",
  },
  Выплачено: {
    phase: "payout",
    publicLabel: "Оплачено",
    adminClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    dotClass: "bg-emerald-400",
  },
  Приостановлено: {
    phase: "closed",
    publicLabel: "Приостановлено",
    adminClass: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
    dotClass: "bg-zinc-400",
  },
  Отклонено: {
    phase: "closed",
    publicLabel: "Отклонено",
    adminClass: "bg-red-500/20 text-red-400 border-red-500/30",
    dotClass: "bg-red-400",
  },
  Архив: {
    phase: "closed",
    publicLabel: "Закрыто",
    adminClass: "bg-white/10 text-white/50 border-white/15",
    dotClass: "bg-white/40",
  },
};

export const STATUS_OPTIONS: CanonicalClientStatus[] = [...CLIENT_STATUS_OPTIONS];

export function normalizeClientStatus(raw: string): CanonicalClientStatus {
  const trimmed = raw?.trim() || "";
  if (trimmed in LEGACY_STATUS_MAP) return LEGACY_STATUS_MAP[trimmed];
  if ((CLIENT_STATUS_OPTIONS as readonly string[]).includes(trimmed)) {
    return trimmed as CanonicalClientStatus;
  }
  return "На рассмотрении";
}

export function getStatusMeta(status: string): StatusMeta {
  return STATUS_META[normalizeClientStatus(status)];
}

export function mapStatusToPayout(status: string): PayoutStatus {
  return getStatusMeta(status).publicLabel;
}

/** CSS-модификатор для payout-badge на публичном сайте. */
export function payoutBadgeModifier(status: PayoutStatus | string): string {
  const label = status;
  if (label === "Оплачено") return "paid";
  if (label === "Частично оплачено") return "partial";
  if (label === "Ожидает выплату" || label === "Ожидает оплату") return "pending";
  if (label === "Отклонено" || label === "Приостановлено" || label === "Закрыто") return "closed";
  if (
    label === "Запрошены документы"
    || label === "Проверка документов"
    || label === "Экспертиза"
    || label === "На проверке"
  ) {
    return "review";
  }
  if (label === "Направлено в организацию" || label === "Ожидает ответа") return "external";
  return "review";
}

export function isPaidStatus(status: string): boolean {
  const s = normalizeClientStatus(status);
  return s === "Выплачено" || s === "Частично выплачено";
}

export function countByPhase(clients: { status: string }[]): Record<StatusPhase, number> {
  const counts: Record<StatusPhase, number> = {
    intake: 0,
    review: 0,
    external: 0,
    decision: 0,
    payout: 0,
    closed: 0,
  };
  for (const c of clients) {
    counts[getStatusMeta(c.status).phase] += 1;
  }
  return counts;
}

/** Группы для select в форме админки */
/** Уникальные подписи для публичного реестра (выпадающий список в AdminPayouts). */
export const PUBLIC_PAYOUT_STATUS_OPTIONS: PayoutStatus[] = [
  ...new Set(Object.values(STATUS_META).map((m) => m.publicLabel)),
] as PayoutStatus[];

export const STATUS_GROUPS: { label: string; items: CanonicalClientStatus[] }[] = [
  {
    label: "Приём",
    items: ["Новый", "Принято в работу"],
  },
  {
    label: "Рассмотрение",
    items: ["На рассмотрении", "Запрошены документы", "Проверка документов", "Экспертиза"],
  },
  {
    label: "Взаимодействие",
    items: ["Направлено в организацию", "Ожидает ответа клиента", "Согласование"],
  },
  {
    label: "Выплаты",
    items: ["Ожидает выплаты", "Частично выплачено", "Выплачено"],
  },
  {
    label: "Завершение",
    items: ["Приостановлено", "Отклонено", "Архив"],
  },
];
