"use client";

import { useEffect, useMemo, useState } from "react";
import { formatKzt, type ClientPayoutRecord, type PayoutStatus } from "@/lib/client-payouts";

const ADMIN_PASSWORD = "1304";
const STORAGE_KEY = "regylz-payout-records";

const STATUS_OPTIONS: PayoutStatus[] = [
  "Ожидает оплату",
  "Оплачено",
  "Частично оплачено",
  "На проверке",
];

type FormState = {
  caseNumber: string;
  clientName: string;
  phone: string;
  amountKzt: string;
  status: PayoutStatus;
  bank: string;
  statusNote: string;
};

const INITIAL_FORM: FormState = {
  caseNumber: "",
  clientName: "",
  phone: "",
  amountKzt: "",
  status: "Ожидает оплату",
  bank: "Народный банк",
  statusNote: "",
};

function readCustomRecords(): ClientPayoutRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ClientPayoutRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCustomRecords(records: ClientPayoutRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function AdminPayoutsPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<ClientPayoutRecord[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    if (authorized) {
      setRecords(readCustomRecords());
    }
  }, [authorized]);

  const sorted = useMemo(
    () => [...records].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [records],
  );

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true);
      setError("");
      return;
    }
    setError("Неверный пароль");
  };

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amountKzt.replace(/[^\d]/g, ""));
    if (!form.caseNumber || !form.clientName || !form.phone || !amount) return;

    const paid = form.status === "Оплачено" ? amount : 0;
    const next: ClientPayoutRecord = {
      caseNumber: form.caseNumber.trim().toUpperCase(),
      clientName: form.clientName.trim(),
      phone: form.phone.trim(),
      amountKzt: amount,
      paidKzt: paid,
      balanceKzt: amount - paid,
      status: form.status,
      bank: form.bank.trim() || "Народный банк",
      updatedAt: new Date().toISOString().slice(0, 10),
      statusNote: form.statusNote.trim() || undefined,
    };

    const map = new Map(records.map((r) => [r.caseNumber, r]));
    map.set(next.caseNumber, next);
    const merged = [...map.values()];
    setRecords(merged);
    writeCustomRecords(merged);
    setForm(INITIAL_FORM);
  };

  if (!authorized) {
    return (
      <section className="payout-search">
        <h1 className="page-title">Служебный доступ</h1>
        <form onSubmit={onLogin}>
          <label htmlFor="admin-pass">Пароль</label>
          <div className="payout-search__row">
            <input
              id="admin-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
            <button className="btn" type="submit">
              Войти
            </button>
          </div>
          {error && <p className="payout-result__empty">{error}</p>}
        </form>
      </section>
    );
  }

  return (
    <div>
      <h1 className="page-title">Админка выплат</h1>
      <section className="payout-search" aria-label="Добавить или обновить клиента">
        <form onSubmit={onAdd}>
          <div className="payout-result" style={{ borderTop: "none", paddingTop: 0 }}>
            <div className="payout-search__row">
              <input
                value={form.caseNumber}
                onChange={(e) => setForm((v) => ({ ...v, caseNumber: e.target.value }))}
                placeholder="Номер дела (FCA-2026-9999)"
              />
              <input
                value={form.clientName}
                onChange={(e) => setForm((v) => ({ ...v, clientName: e.target.value }))}
                placeholder="ФИО"
              />
            </div>
            <div className="payout-search__row" style={{ marginTop: "0.5rem" }}>
              <input
                value={form.phone}
                onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
                placeholder="Телефон"
              />
              <input
                value={form.amountKzt}
                onChange={(e) => setForm((v) => ({ ...v, amountKzt: e.target.value }))}
                placeholder="Сумма (тенге)"
              />
            </div>
            <div className="payout-search__row" style={{ marginTop: "0.5rem" }}>
              <select
                value={form.status}
                onChange={(e) => setForm((v) => ({ ...v, status: e.target.value as PayoutStatus }))}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                value={form.bank}
                onChange={(e) => setForm((v) => ({ ...v, bank: e.target.value }))}
                placeholder="Банк"
              />
            </div>
            <div className="payout-search__row" style={{ marginTop: "0.5rem" }}>
              <input
                value={form.statusNote}
                onChange={(e) => setForm((v) => ({ ...v, statusNote: e.target.value }))}
                placeholder="Комментарий / статус"
              />
              <button className="btn" type="submit">
                Сохранить запись
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="ardfm-section">
        <h2>Пользовательские записи</h2>
        <div className="payout-table-wrap">
          <table className="ardfm-table payout-table">
            <thead>
              <tr>
                <th>Дело</th>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Банк</th>
                <th>Обновлено</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.caseNumber}>
                  <td>{r.caseNumber}</td>
                  <td>{r.clientName}</td>
                  <td>{r.phone}</td>
                  <td>{formatKzt(r.amountKzt)}</td>
                  <td>{r.status}</td>
                  <td>{r.bank}</td>
                  <td>{r.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
