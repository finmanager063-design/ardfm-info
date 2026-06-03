"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  findPayoutByQuery,
  formatKzt,
  getClientPayouts,
  maskPhone,
  type ClientPayoutRecord,
} from "@/lib/client-payouts";

const STATUS_CLASS: Record<ClientPayoutRecord["status"], string> = {
  "Оплачено": "paid",
  "Ожидает оплату": "pending",
  "Частично оплачено": "partial",
  "На проверке": "review",
};

export function ClientPayoutsPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("");
  const [custom, setCustom] = useState<ClientPayoutRecord[]>([]);
  const data = useMemo(() => {
    const base = getClientPayouts();
    if (!custom.length) return base;
    const map = new Map(base.map((r) => [r.caseNumber, r]));
    for (const r of custom) map.set(r.caseNumber, r);
    return [...map.values()];
  }, [custom]);
  const result = useMemo(
    () => (searched ? findPayoutByQuery(searched, data) : null),
    [data, searched],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("regylz-payout-records");
      if (!raw) return;
      const parsed = JSON.parse(raw) as ClientPayoutRecord[];
      if (Array.isArray(parsed)) setCustom(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  const latest = data.slice(0, 40);

  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <div className="rz-breadcrumb" style={{ color: "rgba(255,255,255,0.7)", paddingTop: 0, marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.8)" }}>Главная</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Выплаты клиентам</span>
          </div>
          <h1 className="rz-page-title">Выплата средств клиентам</h1>
          <p className="rz-page-desc">
            Проверка статуса выплат по номеру дела или ФИО клиента
          </p>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <section style={{ marginBottom: "2rem" }} aria-label="Проверка по номеру дела или ФИО">
          <form onSubmit={(e) => { e.preventDefault(); setSearched(query.trim()); }}>
            <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.5rem" }}>
              <label htmlFor="payout-query" style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                Номер дела или ФИО клиента
              </label>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <input
                  id="payout-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="FCA-2026-1405 или Лотик Галина"
                  className="rz-form-input"
                  style={{ minWidth: 280, flex: 1 }}
                />
                <button type="submit" className="rz-btn rz-btn-primary">
                  Проверить
                </button>
              </div>
            </div>
          </form>

          {searched && (
            <div style={{ marginTop: "1.25rem", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.5rem" }} dir="ltr">
              {result ? (
                <>
                  <p style={{ margin: "0 0 1rem", fontWeight: 700, fontSize: "1rem" }}>Дело найдено</p>
                  <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem 1.5rem" }}>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Номер дела</dt><dd style={{ margin: 0, fontWeight: 600 }}>{result.caseNumber}</dd></div>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>ФИО</dt><dd style={{ margin: 0, fontWeight: 600 }}>{result.clientName}</dd></div>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Телефон</dt><dd style={{ margin: 0, fontWeight: 600, fontFamily: "monospace", letterSpacing: "0.02em" }}>{maskPhone(result.phone)}</dd></div>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Банк</dt><dd style={{ margin: 0, fontWeight: 600 }}>{result.bank}</dd></div>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Сумма к выплате</dt><dd style={{ margin: 0, fontWeight: 700, color: "var(--color-navy-700)" }}>{formatKzt(result.amountKzt)}</dd></div>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Оплачено</dt><dd style={{ margin: 0, fontWeight: 700, color: "#1a7f46" }}>{formatKzt(result.paidKzt)}</dd></div>
                    <div><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Остаток</dt><dd style={{ margin: 0, fontWeight: 700, color: result.balanceKzt > 0 ? "#c62828" : "inherit" }}>{formatKzt(result.balanceKzt)}</dd></div>
                    <div>
                      <dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Статус</dt>
                      <dd style={{ margin: 0 }}>
                        <span className={`payout-badge ${STATUS_CLASS[result.status]}`}>{result.status}</span>
                      </dd>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}><dt style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>Обновлено</dt><dd style={{ margin: 0, fontWeight: 600 }}>{result.updatedAt}</dd></div>
                  </dl>
                  {result.statusNote && <p style={{ margin: "1rem 0 0", fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{result.statusNote}</p>}
                  {typeof result.serviceFeeKzt === "number" && (
                    <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Сумма комиссии: <strong>{formatKzt(result.serviceFeeKzt)}</strong>
                    </p>
                  )}
                </>
              ) : (
                <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
                  По запросу <strong>{searched}</strong> данные не найдены. Укажите номер дела (FCA-…) или часть ФИО.
                </p>
              )}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: "1.2rem", margin: "0 0 1rem", color: "var(--color-navy-800)" }}>
            Реестр выплат (последние обновления)
          </h2>
          <div className="rz-table-wrap">
            <table className="rz-table payout-table" dir="ltr">
              <thead>
                <tr>
                  <th>Номер дела</th>
                  <th>ФИО клиента</th>
                  <th>Телефон</th>
                  <th style={{ textAlign: "right" }}>Сумма</th>
                  <th style={{ textAlign: "right" }}>Оплачено</th>
                  <th style={{ textAlign: "right" }}>Остаток</th>
                  <th>Статус</th>
                  <th>Банк</th>
                  <th>Обновлено</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((row) => (
                  <tr key={row.caseNumber}>
                    <td style={{ fontWeight: 600, fontFamily: "monospace", fontSize: "0.82rem" }}>{row.caseNumber}</td>
                    <td>{row.clientName}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.02em" }}>{maskPhone(row.phone)}</td>
                    <td style={{ textAlign: "right", fontWeight: 600, fontFeatureSettings: "'tnum' 1" }}>{formatKzt(row.amountKzt)}</td>
                    <td style={{ textAlign: "right", fontWeight: 600, color: "#1a7f46", fontFeatureSettings: "'tnum' 1" }}>{formatKzt(row.paidKzt)}</td>
                    <td style={{ textAlign: "right", fontWeight: 600, color: row.balanceKzt > 0 ? "#c62828" : "inherit", fontFeatureSettings: "'tnum' 1" }}>{formatKzt(row.balanceKzt)}</td>
                    <td>
                      <span className={`payout-badge ${STATUS_CLASS[row.status]}`}>{row.status}</span>
                    </td>
                    <td>{row.bank}</td>
                    <td style={{ fontSize: "0.82rem" }}>{row.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
