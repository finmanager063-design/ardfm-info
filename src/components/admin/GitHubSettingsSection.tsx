"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_GITHUB_CONFIG,
  getGitHubConfig,
  saveGitHubConfig,
  testGitHubConnection,
  type GitHubRepoConfig,
} from "@/lib/github-sync";
import { SectionShell } from "./AdminApp";

export function GitHubSettingsSection() {
  const [config, setConfig] = useState<GitHubRepoConfig>({
    token: "",
    ...DEFAULT_GITHUB_CONFIG,
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getGitHubConfig());
  }, []);

  const update = (field: keyof GitHubRepoConfig, value: string) => {
    setConfig((c) => ({ ...c, [field]: value }));
    setSaved(false);
    setTestResult(null);
  };

  const saveLocal = () => {
    saveGitHubConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const test = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await testGitHubConnection(config);
    setTestResult(res.ok ? "Подключение успешно" : res.error);
    setTesting(false);
  };

  return (
    <SectionShell
      title="Синхронизация GitHub"
      icon="☁️"
      desc="Токен хранится только в браузере. При сохранении клиентов данные коммитятся в public/data.json."
    >
      <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 space-y-4 max-w-2xl">
        <div>
          <label className="admin-label">GitHub Personal Access Token *</label>
          <input
            type="password"
            value={config.token}
            onChange={(e) => update("token", e.target.value)}
            className="admin-input"
            placeholder="github_pat_…"
            autoComplete="off"
          />
          <p className="text-white/35 text-xs mt-1.5">
            Права: Contents — Read and write. Токен не попадает в код сайта.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="admin-label">Владелец (owner)</label>
            <input
              value={config.owner}
              onChange={(e) => update("owner", e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Репозиторий (repo)</label>
            <input
              value={config.repo}
              onChange={(e) => update("repo", e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Ветка</label>
            <input
              value={config.branch}
              onChange={(e) => update("branch", e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Путь к файлу</label>
            <input
              value={config.path}
              onChange={(e) => update("path", e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={saveLocal} className="premium-btn premium-btn-primary text-sm !py-2.5">
            Сохранить настройки
          </button>
          <button
            type="button"
            onClick={test}
            disabled={testing}
            className="premium-btn premium-btn-outline text-sm !py-2.5"
          >
            {testing ? "Проверка…" : "Проверить доступ"}
          </button>
        </div>
        {saved && <p className="text-emerald-400 text-sm">Настройки сохранены в этом браузере.</p>}
        {testResult && (
          <p className={`text-sm ${testResult.includes("успешно") ? "text-emerald-400" : "text-red-400"}`}>
            {testResult}
          </p>
        )}
      </div>
    </SectionShell>
  );
}
