"use client";

import { payoutBadgeModifier } from "@/lib/case-statuses";
import {
  formatKzt,
  maskPhone,
  type ClientPayoutRecord,
} from "@/lib/client-payouts";

function maskIin(iin: string): string {
  const d = iin.replace(/\D/g, "");
  if (d.length !== 12) return iin || "—";
  return `${d.slice(0, 4)}******${d.slice(-2)}`;
}

export function PayoutCaseCard({
  record,
  onClose,
}: {
  record: ClientPayoutRecord;
  onClose: () => void;
}) {
  return (
    <div className="payout-case-overlay" role="dialog" aria-modal="true" aria-labelledby="payout-case-title">
      <button type="button" className="payout-case-overlay__backdrop" aria-label="Закрыть" onClick={onClose} />
      <article className="payout-case-card payout-case-card--open">
        <header className="payout-case-card__head">
          <div>
            <p className="payout-case-card__eyebrow">Карточка дела</p>
            <h2 id="payout-case-title" className="payout-case-card__title">
              {record.caseNumber}
            </h2>
          </div>
          <button type="button" className="payout-case-card__close" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </header>

        <dl className="payout-case-card__grid" dir="ltr">
          <div>
            <dt>ФИО</dt>
            <dd>{record.clientName}</dd>
          </div>
          <div>
            <dt>ИИН</dt>
            <dd style={{ fontFamily: "monospace" }}>{maskIin(record.iin)}</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd style={{ fontFamily: "monospace" }}>{maskPhone(record.phone)}</dd>
          </div>
          <div>
            <dt>Банк</dt>
            <dd>{record.bank}</dd>
          </div>
          <div>
            <dt>Сумма к выплате</dt>
            <dd className="payout-case-card__sum">{formatKzt(record.amountKzt)}</dd>
          </div>
          <div>
            <dt>Оплачено</dt>
            <dd className="payout-case-card__paid">{formatKzt(record.paidKzt)}</dd>
          </div>
          <div>
            <dt>Остаток</dt>
            <dd className={record.balanceKzt > 0 ? "payout-case-card__due" : ""}>
              {formatKzt(record.balanceKzt)}
            </dd>
          </div>
          <div>
            <dt>Статус</dt>
            <dd>
              <span className={`payout-badge ${payoutBadgeModifier(record.status)}`}>
                {record.status}
              </span>
            </dd>
          </div>
          <div className="payout-case-card__full">
            <dt>Обновлено</dt>
            <dd>{record.updatedAt}</dd>
          </div>
        </dl>

        {record.statusNote && (
          <p className="payout-case-card__note">{record.statusNote}</p>
        )}

        <footer className="payout-case-card__foot">
          <button type="button" className="pg-btn pg-btn-primary" onClick={onClose}>
            Закрыть
          </button>
        </footer>
      </article>
    </div>
  );
}
