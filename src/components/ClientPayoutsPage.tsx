"use client";

import { useMemo, useState } from "react";
import {
  findPayoutByCaseNumber,
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
  const [caseNumber, setCaseNumber] = useState("");
  const [searched, setSearched] = useState("");
  const data = useMemo(() => getClientPayouts(), []);
  const result = useMemo(() => findPayoutByCaseNumber(searched), [searched]);

  const latest = data.slice(0, 40);

  return (
    <div className="payouts-page">
      <h1 className="page-title">Выплата средств клиентам</h1>

      <section className="payout-search" aria-label="Проверка по номеру дела">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(caseNumber.trim().toUpperCase());
          }}
        >
          <label htmlFor="case-number">Номер дела</label>
          <div className="payout-search__row">
            <input
              id="case-number"
              type="text"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="FCA-2026-0841"
            />
            <button type="submit" className="btn">
              Проверить
            </button>
          </div>
        </form>

        {searched && (
          <div className="payout-result">
            {result ? (
              <>
                <p className="payout-result__title">Дело найдено</p>
                <dl>
                  <div><dt>Номер дела</dt><dd>{result.caseNumber}</dd></div>
                  <div><dt>ФИО</dt><dd>{result.clientName}</dd></div>
                  <div><dt>Основной телефон</dt><dd>{maskPhone(result.phone)}</dd></div>
                  <div><dt>Банк</dt><dd>{result.bank}</dd></div>
                  <div><dt>Сумма к выплате</dt><dd>{formatKzt(result.amountKzt)}</dd></div>
                  <div><dt>Оплачено</dt><dd>{formatKzt(result.paidKzt)}</dd></div>
                  <div><dt>Остаток</dt><dd>{formatKzt(result.balanceKzt)}</dd></div>
                  <div>
                    <dt>Статус</dt>
                    <dd>
                      <span className={`payout-badge ${STATUS_CLASS[result.status]}`}>{result.status}</span>
                    </dd>
                  </div>
                  <div><dt>Обновлено</dt><dd>{result.updatedAt}</dd></div>
                </dl>
                {result.statusNote && <p className="payout-result__note">{result.statusNote}</p>}
                {typeof result.serviceFeeKzt === "number" && (
                  <p className="payout-result__note">
                    Сумма комиссии составляет: <strong>{formatKzt(result.serviceFeeKzt)}</strong>.
                  </p>
                )}
              </>
            ) : (
              <p className="payout-result__empty">
                По номеру <strong>{searched}</strong> данные не найдены. Проверьте формат и повторите запрос.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="ardfm-section">
        <h2>Реестр выплат (последние обновления)</h2>
        <p style={{ color: "#5c6370" }}>Всего клиентов в реестре: {data.length}</p>
        <div className="payout-table-wrap">
          <table className="ardfm-table payout-table">
            <thead>
              <tr>
                <th>Номер дела</th>
                <th>ФИО клиента</th>
                <th>Телефон</th>
                <th>Сумма</th>
                <th>Оплачено</th>
                <th>Остаток</th>
                <th>Статус</th>
                <th>Банк</th>
                <th>Обновлено</th>
              </tr>
            </thead>
            <tbody>
              {latest.map((row) => (
                <tr key={row.caseNumber}>
                  <td>{row.caseNumber}</td>
                  <td>{row.clientName}</td>
                  <td>{maskPhone(row.phone)}</td>
                  <td>{formatKzt(row.amountKzt)}</td>
                  <td>{formatKzt(row.paidKzt)}</td>
                  <td>{formatKzt(row.balanceKzt)}</td>
                  <td>
                    <span className={`payout-badge ${STATUS_CLASS[row.status]}`}>{row.status}</span>
                  </td>
                  <td>{row.bank}</td>
                  <td>{row.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
