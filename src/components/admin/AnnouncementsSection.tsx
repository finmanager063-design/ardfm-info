"use client";

import { useEffect, useState } from "react";
import { SectionShell } from "./SectionShell";
import {
  generateAnnouncementId,
  loadAnnouncements,
  saveAnnouncements,
  type SiteAnnouncement,
} from "@/lib/admin-announcements";

export function AnnouncementsSection() {
  const [items, setItems] = useState<SiteAnnouncement[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setItems(loadAnnouncements());
  }, []);

  const add = () => {
    if (!title.trim()) return;
    const next: SiteAnnouncement[] = [
      {
        id: generateAnnouncementId(),
        title: title.trim(),
        body: body.trim(),
        published: true,
        createdAt: new Date().toISOString(),
      },
      ...items,
    ];
    saveAnnouncements(next);
    setItems(next);
    setTitle("");
    setBody("");
    setMsg("Объявление сохранено (отображается в админке; лента новостей — через sync контента)");
    setTimeout(() => setMsg(""), 5000);
  };

  const toggle = (id: string) => {
    const next = items.map((a) => (a.id === id ? { ...a, published: !a.published } : a));
    saveAnnouncements(next);
    setItems(next);
  };

  const remove = (id: string) => {
    if (!confirm("Удалить объявление?")) return;
    const next = items.filter((a) => a.id !== id);
    saveAnnouncements(next);
    setItems(next);
  };

  return (
    <SectionShell
      title="Объявления и уведомления"
      icon="📰"
      desc="Внутренние объявления для команды. Публикация в раздел «Новости» на сайте — через синхронизацию content.json (npm run sync)."
    >
      {msg && <p className="text-amber-300/90 text-sm mb-4">{msg}</p>}

      <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 space-y-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="admin-input"
          placeholder="Заголовок"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="admin-input min-h-[100px]"
          placeholder="Текст объявления"
          rows={4}
        />
        <button type="button" onClick={add} className="premium-btn premium-btn-primary text-sm !py-2">
          Добавить объявление
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-white/30 text-sm text-center py-8">Нет объявлений</p>
        )}
        {items.map((a) => (
          <article key={a.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between gap-2 mb-2">
              <h3 className="text-white font-medium">{a.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.published ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"}`}>
                {a.published ? "Активно" : "Скрыто"}
              </span>
            </div>
            {a.body && <p className="text-white/50 text-sm mb-3">{a.body}</p>}
            <p className="text-white/30 text-xs mb-3">
              {new Date(a.createdAt).toLocaleString("ru-RU")}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => toggle(a.id)} className="text-premium-gold text-xs">
                {a.published ? "Скрыть" : "Показать"}
              </button>
              <button type="button" onClick={() => remove(a.id)} className="text-red-400 text-xs">
                Удалить
              </button>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
