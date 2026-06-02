export type PayoutStatus = "Оплачено" | "Ожидает оплату" | "Частично оплачено" | "На проверке";

export type ClientPayoutRecord = {
  caseNumber: string;
  clientName: string;
  phone: string;
  amountKzt: number;
  paidKzt: number;
  balanceKzt: number;
  status: PayoutStatus;
  bank: string;
  updatedAt: string;
  serviceFeeKzt?: number;
  statusNote?: string;
};

const FIRST_NAMES = [
  "Александр", "Сергей", "Дмитрий", "Руслан", "Ержан", "Нурлан", "Айбек", "Марат", "Тимур", "Асхат",
  "Алина", "Диана", "Сауле", "Айдана", "Жанна", "Виктория", "Екатерина", "Лейла", "Мадина", "Камила",
];
const LAST_NAMES = [
  "Иванов", "Петров", "Сидоров", "Ахметов", "Жумабаев", "Омаров", "Есенов", "Калиев", "Тлеубердиев", "Нургалиев",
  "Ким", "Смагулов", "Абдрахманов", "Садыков", "Куанышев", "Каратаев", "Мухамеджанов", "Турсунов", "Бекенов", "Сапаров",
];
const MIDDLE_NAMES = [
  "Александрович", "Сергеевич", "Дмитриевич", "Русланович", "Ержанович", "Нурланович", "Айбекович", "Маратович",
  "Тимурович", "Асхатович", "Александровна", "Сергеевна", "Дмитриевна", "Руслановна", "Ержановна",
  "Нурлановна", "Айбековна", "Маратовна", "Тимуровна", "Асхатовна",
];
const BANKS = [
  "Halyk Bank", "Kaspi Bank", "Банк ЦентрКредит", "ForteBank", "Freedom Bank Kazakhstan", "Евразийский Банк",
];

function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function makeStatus(total: number, rnd: () => number): { status: PayoutStatus; paid: number } {
  const x = rnd();
  if (x < 0.56) return { status: "Оплачено", paid: total };
  if (x < 0.76) return { status: "Ожидает оплату", paid: 0 };
  if (x < 0.93) {
    const paid = Math.floor(total * (0.2 + rnd() * 0.7));
    return { status: "Частично оплачено", paid };
  }
  return { status: "На проверке", paid: 0 };
}

export function getClientPayouts(total = 1200): ClientPayoutRecord[] {
  const rnd = seeded(24062026);
  const rows: ClientPayoutRecord[] = [];

  const featuredCase: ClientPayoutRecord = {
    caseNumber: "FCA-2026-0514",
    clientName: "Gulmira Nurmanova",
    phone: "+77474028226",
    amountKzt: 6626655,
    paidKzt: 0,
    balanceKzt: 6626655,
    status: "Ожидает оплату",
    bank: "Народный банк",
    updatedAt: "2026-06-02",
    serviceFeeKzt: 180000,
    statusNote:
      "6 626 655 тенге в статусе ожидает оплаты комиссии за обслуживание и перевод средств с резервного счёта на Ваш личный счёт. Народный банк.",
  };
  const sagitovCase: ClientPayoutRecord = {
    caseNumber: "FCA-9821-1405",
    clientName: "Сагитов Тельжан Енсапович",
    phone: "+77474028226",
    amountKzt: 31890200,
    paidKzt: 0,
    balanceKzt: 31890200,
    status: "Ожидает оплату",
    bank: "Kaspi Bank",
    updatedAt: "2026-06-02",
    statusNote: "31 890 200 тенге в статусе ожидает выплаты.",
  };

  for (let i = 1; i <= total; i++) {
    const last = pick(LAST_NAMES, rnd);
    const first = pick(FIRST_NAMES, rnd);
    const middle = pick(MIDDLE_NAMES, rnd);
    const amount = 2000000 + Math.floor(rnd() * (700000000 - 2000000 + 1));
    const { status, paid } = makeStatus(amount, rnd);
    const generatedCaseNumber = `FCA-${String(2026)}-${String(i).padStart(4, "0")}`;
    if (generatedCaseNumber === featuredCase.caseNumber || generatedCaseNumber === sagitovCase.caseNumber) {
      continue;
    }

    rows.push({
      caseNumber: generatedCaseNumber,
      clientName: `${last} ${first} ${middle}`,
      phone: `+8705${String(10000000 + Math.floor(rnd() * 89999999))}`,
      amountKzt: amount,
      paidKzt: paid,
      balanceKzt: amount - paid,
      status,
      bank: pick(BANKS, rnd),
      updatedAt: formatDate(Math.floor(rnd() * 120)),
    });
  }

  const sorted = rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const dedup = new Map<string, ClientPayoutRecord>();
  for (const row of sorted) dedup.set(row.caseNumber, row);
  // Фиксированные дела должны иметь приоритет над автогенерацией
  dedup.set(featuredCase.caseNumber, featuredCase);
  dedup.set(sagitovCase.caseNumber, sagitovCase);

  const merged = [...dedup.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const middleIndex = Math.floor(merged.length / 2);
  const withoutFixed = merged.filter(
    (r) => r.caseNumber !== featuredCase.caseNumber && r.caseNumber !== sagitovCase.caseNumber,
  );
  withoutFixed.splice(middleIndex, 0, featuredCase);
  withoutFixed.splice(Math.min(middleIndex + 60, withoutFixed.length), 0, sagitovCase);
  return withoutFixed;
}

export function findPayoutByCaseNumber(caseNumber: string): ClientPayoutRecord | null {
  const normalized = caseNumber.trim().toUpperCase();
  if (!normalized) return null;
  const all = getClientPayouts();
  return all.find((r) => r.caseNumber === normalized) ?? null;
}

export function formatKzt(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₸";
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6) return phone;
  const first = digits.slice(0, 3);
  const last = digits.slice(-3);
  return `${first}***${last}`;
}
