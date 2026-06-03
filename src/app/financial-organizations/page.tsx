"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NextStepsBlock } from "@/components/NextStepsBlock";

const LICENSE_DATA = [
  { name: "АО «Народный Банк Казахстана»", type: "Банк", license: "№1.2.3/4", status: "Действует", issued: "12.03.1999" },
  { name: "АО «Kaspi Bank»", type: "Банк", license: "№1.2.3/12", status: "Действует", issued: "15.07.2001" },
  { name: "АО «Банк ЦентрКредит»", type: "Банк", license: "№1.2.3/5", status: "Действует", issued: "01.02.2000" },
  { name: "АО «Евразийский Банк»", type: "Банк", license: "№1.2.3/7", status: "Действует", issued: "10.04.1998" },
  { name: "АО «ДБ «Альфа-Банк Казахстан»", type: "Банк", license: "№1.2.3/9", status: "Действует", issued: "21.08.2005" },
  { name: "АО «Банк Kassa Nova»", type: "Банк", license: "№1.2.3/15", status: "Действует", issued: "03.11.2010" },
  { name: "АО «СК «Nomad Life»»", type: "Страховая (страхование жизни)", license: "№2.1.4/3", status: "Действует", issued: "14.06.2002" },
  { name: "АО «СК «Евразия»»", type: "Страховая (общее)", license: "№2.1.1/6", status: "Действует", issued: "20.01.1996" },
  { name: "АО «СК «Freedom Life»»", type: "Страховая (страхование жизни)", license: "№2.1.4/8", status: "Действует", issued: "11.09.2015" },
  { name: "ТОО «МФО «Kredit24»»", type: "Микрофинансовая", license: "№3.2.5/12", status: "Действует", issued: "05.03.2018" },
  { name: "ТОО «МФО «Rocket Money»»", type: "Микрофинансовая", license: "№3.2.5/18", status: "Действует", issued: "12.07.2019" },
  { name: "ТОО «МФО «Zaimer»»", type: "Микрофинансовая", license: "№3.2.5/22", status: "Приостановлена", issued: "01.02.2020" },
  { name: "АО «КФБ»", type: "Рынок ценных бумаг", license: "№4.1.2/2", status: "Действует", issued: "20.12.1997" },
  { name: "ТОО «ИК «BCC Invest»»", type: "Рынок ценных бумаг", license: "№4.2.1/7", status: "Действует", issued: "14.04.2008" },
  { name: "АО «ИК «Halyk Finance»»", type: "Рынок ценных бумаг", license: "№4.2.1/3", status: "Действует", issued: "30.06.2003" },
];

const FILTERS = ["Все", "Банк", "Страховая", "Микрофинансовая", "Рынок ценных бумаг"];

export default function FinancialOrganizationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    return LICENSE_DATA.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.license.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "Все" || org.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <h1 className="rz-page-title">Финансовые организации</h1>
          <p className="rz-page-desc">
            Реестр лицензированных финансовых организаций Республики Казахстан.
            Поиск по наименованию и номеру лицензии.
          </p>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <input
            type="search"
            placeholder="Поиск по названию или номеру лицензии..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="rz-form-input"
            style={{ minWidth: 280, flex: 1 }}
          />
        </div>

        <div className="rz-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`rz-filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => { setFilter(f); setCurrentPage(1); }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="rz-table-wrap">
          <table className="rz-table">
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Тип</th>
                <th>Номер лицензии</th>
                <th>Статус</th>
                <th>Дата выдачи</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((org) => (
                <tr key={org.license}>
                  <td style={{ fontWeight: 600 }}>{org.name}</td>
                  <td>{org.type}</td>
                  <td style={{ fontFamily: "monospace" }}>{org.license}</td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "0.2rem 0.6rem",
                        borderRadius: 999,
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        background:
                          org.status === "Действует"
                            ? "#e8f8ef"
                            : org.status === "Приостановлена"
                            ? "#fff3dc"
                            : "#ffe8e8",
                        color:
                          org.status === "Действует"
                            ? "#1a7f46"
                            : org.status === "Приостановлена"
                            ? "#9b6500"
                            : "#c62828",
                      }}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td>{org.issued}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>
                    Ничего не найдено. Попробуйте изменить параметры поиска.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="rz-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`rz-page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <NextStepsBlock pathname="/financial-organizations" />
      </div>
    </div>
  );
}
