export type FinOrgRecord = {
  id: string;
  name: string;
  type: string;
  license: string;
  status: string;
  issued: string;
};

const KEY = "regylz-fin-orgs";

export const DEFAULT_FIN_ORGS: FinOrgRecord[] = [
  { id: "1", name: "АО «Народный Банк Казахстана»", type: "Банк", license: "№1.2.3/4", status: "Действует", issued: "12.03.1999" },
  { id: "2", name: "АО «Kaspi Bank»", type: "Банк", license: "№1.2.3/12", status: "Действует", issued: "15.07.2001" },
  { id: "3", name: "АО «Банк ЦентрКредит»", type: "Банк", license: "№1.2.3/5", status: "Действует", issued: "01.02.2000" },
  { id: "4", name: "АО «Евразийский Банк»", type: "Банк", license: "№1.2.3/7", status: "Действует", issued: "10.04.1998" },
  { id: "5", name: "ТОО «МФО «Zaimer»»", type: "Микрофинансовая", license: "№3.2.5/22", status: "Приостановлена", issued: "01.02.2020" },
];

export const FIN_ORG_TYPES = ["Банк", "Страховая", "Микрофинансовая", "Рынок ценных бумаг"] as const;
export const FIN_ORG_STATUSES = ["Действует", "Приостановлена", "Отозвана"] as const;

export function loadFinOrgs(): FinOrgRecord[] {
  if (typeof window === "undefined") return DEFAULT_FIN_ORGS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_FIN_ORGS;
    const list = JSON.parse(raw) as FinOrgRecord[];
    return Array.isArray(list) && list.length ? list : DEFAULT_FIN_ORGS;
  } catch {
    return DEFAULT_FIN_ORGS;
  }
}

export function saveFinOrgs(list: FinOrgRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function generateFinOrgId(): string {
  return `org-${Date.now().toString(36)}`;
}
