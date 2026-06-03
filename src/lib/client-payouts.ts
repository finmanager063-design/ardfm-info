export type PayoutStatus =
  | "Оплачено"
  | "Ожидает оплату"
  | "Частично оплачено"
  | "На проверке"
  | "На рассмотрении";

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

const MALE_FIRST_NAMES = [
  "Александр", "Сергей", "Дмитрий", "Руслан", "Ержан", "Нурлан", "Айбек", "Марат", "Тимур", "Асхат",
  "Тельжан", "Бауыржан", "Арман", "Рустем", "Ильяс", "Данияр", "Ермек", "Жасулан", "Канат", "Бекзат",
];
const FEMALE_FIRST_NAMES = [
  "Алина", "Диана", "Сауле", "Айдана", "Жанна", "Виктория", "Екатерина", "Лейла", "Мадина", "Камила",
  "Гульмира", "Асем", "Назгуль", "Динара", "Гульжан", "Айгуль", "Мария", "Ольга", "Людмила", "Зарина",
];
const MALE_LAST_NAMES = [
  "Иванов", "Петров", "Сидоров", "Ахметов", "Жумабаев", "Омаров", "Есенов", "Калиев", "Тлеубердиев", "Нургалиев",
  "Ким", "Смагулов", "Абдрахманов", "Садыков", "Куанышев", "Каратаев", "Мухамеджанов", "Турсунов", "Бекенов", "Сапаров",
];
const FEMALE_LAST_NAMES = [
  "Иванова", "Петрова", "Сидорова", "Ахметова", "Жумабаева", "Омарова", "Есенова", "Калиева", "Тлеубердиева", "Нургалиева",
  "Ким", "Смагулова", "Абдрахманова", "Садыкова", "Куанышева", "Каратаева", "Мухамеджанова", "Турсунова", "Бекенова", "Сапарова",
];
const MALE_MIDDLE_NAMES = [
  "Александрович", "Сергеевич", "Дмитриевич", "Русланович", "Ержанович", "Нурланович", "Айбекович", "Маратович",
  "Тимурович", "Асхатович", "Талгатович", "Бауыржанович", "Арманович", "Рустемович", "Ильясович", "Даниярович",
];
const FEMALE_MIDDLE_NAMES = [
  "Александровна", "Сергеевна", "Дмитриевна", "Руслановна", "Ержановна", "Нурлановна", "Айбековна", "Маратовна",
  "Тимуровна", "Асхатовна", "Талгатовна", "Бауыржановна", "Армановна", "Рустемовна", "Ильясовна", "Данияровна",
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

function makeProfile(rnd: () => number): { first: string; last: string; middle: string } {
  const male = rnd() < 0.52;
  if (male) {
    return {
      first: pick(MALE_FIRST_NAMES, rnd),
      last: pick(MALE_LAST_NAMES, rnd),
      middle: pick(MALE_MIDDLE_NAMES, rnd),
    };
  }
  return {
    first: pick(FEMALE_FIRST_NAMES, rnd),
    last: pick(FEMALE_LAST_NAMES, rnd),
    middle: pick(FEMALE_MIDDLE_NAMES, rnd),
  };
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
    phone: "+7 705 616 94 85",
    amountKzt: 6626655,
    paidKzt: 0,
    balanceKzt: 6626655,
    status: "Ожидает оплату",
    bank: "Народный банк",
    updatedAt: "2026-06-02",
    serviceFeeKzt: 180000,
    statusNote: "6 626 655 тенге в статусе ожидает оплаты",
  };
  const sagitovCase: ClientPayoutRecord = {
    caseNumber: "FCA-9821-1405",
    clientName: "Сагитов Тельжан Енсапович",
    phone: "+7 747 402 82 26",
    amountKzt: 31890200,
    paidKzt: 0,
    balanceKzt: 31890200,
    status: "Ожидает оплату",
    bank: "Kaspi Bank",
    updatedAt: "2026-06-02",
    statusNote: "31 890 200 тенге в статусе ожидает выплаты.",
  };
  const kalievCase: ClientPayoutRecord = {
    caseNumber: "FCA-2026-1418",
    clientName: "Калиев Мурат Талгатович",
    phone: "+7 707 804 15 27",
    amountKzt: 16235175,
    paidKzt: 0,
    balanceKzt: 16235175,
    status: "Ожидает оплату",
    bank: "Home Credit Bank",
    updatedAt: "2026-06-02",
    statusNote: "16 235 175 тенге в статусе ожидает выплаты. Реквизиты карты: **** **** **** 1389.",
  };
  const lotikCase: ClientPayoutRecord = {
    caseNumber: "FCA-2026-1405",
    clientName: "Лотик Галина Федоровна",
    phone: "+7 771 324 28 11",
    amountKzt: 1540200,
    paidKzt: 0,
    balanceKzt: 1540200,
    status: "Ожидает оплату",
    bank: "Forte Bank",
    updatedAt: "2026-06-02",
    statusNote: "1 540 200 тенге к получению, ожидает выплаты.",
  };
  const turymshevaCase: ClientPayoutRecord = {
    caseNumber: "FCA-2026-1950",
    clientName: "Турымшаева Алимахан (Алима)",
    phone: "+7 701 349 25 61",
    amountKzt: 173814594,
    paidKzt: 0,
    balanceKzt: 173814594,
    status: "На рассмотрении",
    bank: "Kaspi Bank",
    updatedAt: "2026-06-03",
    statusNote:
      "Дело на рассмотрении. Подтверждённые потери 173 814 594 ₸. "
      + "Выплата не произведена. Обновлено 03.06.2026.",
  };

  const fixedCases = [featuredCase, sagitovCase, kalievCase, lotikCase, turymshevaCase];

  for (let i = 1; i <= total; i++) {
    const profile = makeProfile(rnd);
    const amount = 2000000 + Math.floor(rnd() * (700000000 - 2000000 + 1));
    const { status, paid } = makeStatus(amount, rnd);
    const generatedCaseNumber = `FCA-${String(2026)}-${String(i).padStart(4, "0")}`;
    if (fixedCases.some((c) => c.caseNumber === generatedCaseNumber)) {
      continue;
    }

    rows.push({
      caseNumber: generatedCaseNumber,
      clientName: `${profile.last} ${profile.first} ${profile.middle}`,
      phone: `+7 7${String(100 + Math.floor(rnd() * 89))} ${String(100 + Math.floor(rnd() * 899))} ${String(10 + Math.floor(rnd() * 89))} ${String(10 + Math.floor(rnd() * 89))}`,
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
  const fixedCaseNumbers = new Set(fixedCases.map((c) => c.caseNumber));
  for (const row of fixedCases) dedup.set(row.caseNumber, row);

  const merged = [...dedup.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const middleIndex = Math.floor(merged.length / 2);
  const withoutFixed = merged.filter((r) => !fixedCaseNumbers.has(r.caseNumber));
  withoutFixed.splice(middleIndex, 0, featuredCase);
  withoutFixed.splice(Math.min(middleIndex + 30, withoutFixed.length), 0, turymshevaCase);
  withoutFixed.splice(Math.min(middleIndex + 60, withoutFixed.length), 0, sagitovCase);
  withoutFixed.splice(Math.min(middleIndex + 100, withoutFixed.length), 0, kalievCase);
  withoutFixed.splice(Math.min(middleIndex + 120, withoutFixed.length), 0, lotikCase);
  return withoutFixed;
}

/** Следующий свободный номер дела FCA-2026-XXXX (для админки). */
export function suggestNextCaseNumber(existing: string[] = []): string {
  const taken = new Set(existing.map((c) => c.trim().toUpperCase()));
  for (const row of getClientPayouts()) taken.add(row.caseNumber);
  for (let i = 1; i <= 9999; i++) {
    const candidate = `FCA-2026-${String(i).padStart(4, "0")}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `FCA-2026-${Date.now().toString().slice(-4)}`;
}

export function findPayoutByQuery(query: string, records?: ClientPayoutRecord[]): ClientPayoutRecord | null {
  const q = query.trim();
  if (!q) return null;
  const all = records ?? getClientPayouts();
  const byCase = all.find((r) => r.caseNumber === q.toUpperCase());
  if (byCase) return byCase;
  const lower = q.toLowerCase();
  const byName = all.find((r) => r.clientName.toLowerCase().includes(lower));
  if (byName) return byName;
  const tokens = lower.split(/\s+/).filter((t) => t.length > 1);
  if (tokens.length < 2) return null;
  return (
    all.find((r) => {
      const name = r.clientName.toLowerCase();
      return tokens.every((t) => name.includes(t));
    }) ?? null
  );
}

export function findPayoutByCaseNumber(caseNumber: string): ClientPayoutRecord | null {
  return findPayoutByQuery(caseNumber);
}

export function formatKzt(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " ₸";
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6) return phone;
  const country = digits.slice(0, 1);
  const code = digits.slice(1, 4);
  const first = digits.slice(4, 6);
  const last = digits.slice(-2);
  return `+${country} ${code} ${first}** ** ${last}`;
}
