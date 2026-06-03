"use client";

import { useState } from "react";
import Link from "next/link";
import { NextStepsBlock } from "@/components/NextStepsBlock";

export default function ConsumerProtectionPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Новое обращение:\nИмя: ${form.name}\nEmail: ${form.email}\nТелефон: ${form.phone}\nСообщение: ${form.message}`;
    window.open(
      `https://t.me/finance_regulator_bot?start=${encodeURIComponent(text.slice(0, 200))}`,
      "_blank",
    );
    setSubmitted(true);
  };

  const faq = [
    {
      q: "Как подать жалобу на банк?",
      a: "Обратитесь через Telegram-бот @finance_regulator_bot, выбрав категорию «Банковские услуги». Приложите документы, подтверждающие ваше обращение.",
    },
    {
      q: "Что делать, если МФО требует незаконные проценты?",
      a: "Направьте обращение в Агентство. Максимальная ставка вознаграждения по микрокредитам регулируется законодательством. Бот подскажет необходимые шаги.",
    },
    {
      q: "Как проверить, имеет ли компания лицензию?",
      a: "Воспользуйтесь разделом «Финансовые организации» на нашем сайте. Введите название компании в строке поиска.",
    },
    {
      q: "Как распознать финансовую пирамиду?",
      a: "Обещают высокую доходность без риска. Требуют привлечения новых участников. Нет лицензии Агентства. Сообщите о подозрительной деятельности через бот.",
    },
  ];

  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <h1 className="rz-page-title">Защита прав потребителей финансовых услуг</h1>
          <p className="rz-page-desc">
            Ваши права защищены законом. Узнайте, как действовать при нарушении ваших
            прав финансовыми организациями.
          </p>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        {/* Bot */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-navy-800), var(--color-navy-700))",
            color: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem" }}>
            Обращение в Агентство
          </h2>
          <p style={{ opacity: 0.8, margin: "0 0 1rem" }}>
            Направьте обращение через Telegram-бот
          </p>
          <a
            href="https://t.me/finance_regulator_bot"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 2rem",
              background: "var(--color-gold-500)",
              color: "var(--color-navy-900)",
              borderRadius: "var(--radius-sm)",
              fontSize: "1.25rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ✈️ @finance_regulator_bot
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          {/* Form */}
          <div>
            <h2 style={{ fontSize: "1.3rem", margin: "0 0 1rem", color: "var(--color-navy-800)" }}>
              Подать обращение
            </h2>
            {submitted ? (
              <div
                style={{
                  padding: "1.25rem",
                  background: "#e8f8ef",
                  border: "1px solid #a3d9b1",
                  borderRadius: "var(--radius-md)",
                  color: "#1a7f46",
                }}
              >
                Спасибо! Для завершения отправки перейдите в Telegram-бот.
                <br />
                <a
                  href="https://t.me/finance_regulator_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="rz-btn rz-btn-primary"
                  style={{ marginTop: "0.75rem", display: "inline-flex" }}
                >
                  Открыть Telegram-бот
                </a>
              </div>
            ) : (
              <form className="rz-form" onSubmit={handleSubmit}>
                <div className="rz-form-group">
                  <label className="rz-form-label">Ваше имя</label>
                  <input
                    className="rz-form-input"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="rz-form-group">
                  <label className="rz-form-label">Email</label>
                  <input
                    className="rz-form-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="rz-form-group">
                  <label className="rz-form-label">Телефон</label>
                  <input
                    className="rz-form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="rz-form-group">
                  <label className="rz-form-label">Сообщение</label>
                  <textarea
                    className="rz-form-textarea"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="rz-btn rz-btn-primary" style={{ alignSelf: "flex-start" }}>
                  Отправить через Telegram
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: "1.3rem", margin: "0 0 1rem", color: "var(--color-navy-800)" }}>
              Часто задаваемые вопросы
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {faq.map((item) => (
                <details
                  key={item.q}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  <summary style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-navy-800)" }}>
                    {item.q}
                  </summary>
                  <p style={{ margin: "0.75rem 0 0", fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="rz-alert-bar">
          <span className="rz-alert-bar-icon">⚠️</span>
          <div className="rz-alert-bar-content">
            <p className="rz-alert-bar-title">Обнаружили финансовое мошенничество?</p>
            <p className="rz-alert-bar-text">
              Незамедлительно сообщите в Агентство через{" "}
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer">
                Telegram-бот
              </a>
              . Ваше обращение будет рассмотрено в кратчайшие сроки.
            </p>
          </div>
        </div>

        <NextStepsBlock pathname="/consumer-protection" />
      </div>
    </div>
  );
}
