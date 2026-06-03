"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionShell } from "./SectionShell";
import {
  FIN_ORG_STATUSES,
  FIN_ORG_TYPES,
  generateFinOrgId,
  loadFinOrgs,
  saveFinOrgs,
  type FinOrgRecord,
} from "@/lib/admin-fin-orgs";

const empty = (): Omit<FinOrgRecord, "id"> => ({
  name: "",
  type: "Банк",
  license: "",
  status: "Действует",
  issued: new Date().toLocaleDateString("ru-RU"),
});

export function RegistrySection() {
  const [orgs, setOrgs] = useState<FinOrgRecord[]>([]);
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setOrgs(loadFinOrgs());
  }, []);

  const persist = (next: FinOrgRecord[], text: string) => {
    saveFinOrgs(next);
    setOrgs(next);
    setMsg(text);
    setTimeout(() => setMsg(""), 4000);
  };

  const save = () => {
    if (!form.name.trim() || !form.license.trim()) return;
    if (editId) {
      persist(
        orgs.map((o) => (o.id === editId ? { ...o, ...form } : o)),
        "Организация обновлена",
      );
      setEditId(null);
    } else {
      persist([{ id: generateFinOrgId(), ...form }, ...orgs], "Организация добавлена");
    }
    setForm(empty());
  };

  const remove = (id: string) => {
    if (!confirm("Удалить организацию из реестра?")) return;
    persist(orgs.filter((o) => o.id !== id), "Запись удалена");
  };

  return (
    <SectionShell
      title="Реестр финансовых организаций"
      icon="📋"
      desc="Редактирование списка на странице «Финансовые организации». Сохраняется в браузере и отображается на сайте."
    >
      {msg && <p className="text-emerald-400 text-sm mb-4">{msg}</p>}

      <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 space-y-4 mb-6">
        <h3 className="text-white/80 text-sm font-semibold">{editId ? "Редактировать" : "Добавить организацию"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="admin-input sm:col-span-2"
            placeholder="Наименование"
          />
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="admin-input"
          >
            {FIN_ORG_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            className="admin-input"
          >
            {FIN_ORG_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            value={form.license}
            onChange={(e) => setForm((f) => ({ ...f, license: e.target.value }))}
            className="admin-input"
            placeholder="Номер лицензии"
          />
          <input
            value={form.issued}
            onChange={(e) => setForm((f) => ({ ...f, issued: e.target.value }))}
            className="admin-input"
            placeholder="Дата выдачи"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button type="button" onClick={save} className="premium-btn premium-btn-primary text-sm !py-2">
            {editId ? "Сохранить" : "Добавить"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm(empty());
              }}
              className="premium-btn premium-btn-outline text-sm !py-2"
            >
              Отмена
            </button>
          )}
          <Link href="/financial-organizations" target="_blank" className="premium-btn premium-btn-outline text-sm !py-2">
            Открыть на сайте →
          </Link>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase border-b border-white/5">
                <th className="text-left py-3 px-3">Наименование</th>
                <th className="text-left py-3 px-2">Тип</th>
                <th className="text-left py-3 px-2">Лицензия</th>
                <th className="text-left py-3 px-2">Статус</th>
                <th className="py-3 px-2 w-24" />
              </tr>
            </thead>
            <tbody>
              {orgs.map((o) => (
                <tr key={o.id} className="border-b border-white/5">
                  <td className="py-2.5 px-3 text-white/80">{o.name}</td>
                  <td className="py-2.5 px-2 text-white/50">{o.type}</td>
                  <td className="py-2.5 px-2 text-white/50 font-mono text-xs">{o.license}</td>
                  <td className="py-2.5 px-2 text-white/60">{o.status}</td>
                  <td className="py-2.5 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(o.id);
                        setForm({
                          name: o.name,
                          type: o.type,
                          license: o.license,
                          status: o.status,
                          issued: o.issued,
                        });
                      }}
                      className="text-premium-gold text-xs mr-2"
                    >
                      Изм.
                    </button>
                    <button type="button" onClick={() => remove(o.id)} className="text-red-400 text-xs">
                      Удал.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/35 text-xs px-4 py-3 border-t border-white/5">
          Всего в реестре: {orgs.length}. Данные общие для всех, кто открывает сайт с этого браузера (localStorage).
        </p>
      </div>
    </SectionShell>
  );
}
