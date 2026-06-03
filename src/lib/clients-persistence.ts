import {
  fetchClientsData,
  type ClientRecord,
  type ClientsDataFile,
} from "@/lib/clients-data";
import { commitClientsFile, getGitHubConfig } from "@/lib/github-sync";

export const CLIENTS_LOCAL_KEY = "regylz-clients-data";

export type ClientsSaveResult = {
  local: true;
  github:
    | { ok: true }
    | { ok: false; error: string };
};

export function saveClientsLocal(payload: ClientsDataFile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CLIENTS_LOCAL_KEY, JSON.stringify(payload));
}

export function loadClientsLocal(): ClientsDataFile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CLIENTS_LOCAL_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as ClientsDataFile;
    if (!Array.isArray(data.clients)) return null;
    return data;
  } catch {
    return null;
  }
}

function mergeClientLists(remote: ClientRecord[], local: ClientRecord[]): ClientRecord[] {
  const map = new Map<string, ClientRecord>();
  for (const c of remote) map.set(c.id, c);
  for (const c of local) {
    const prev = map.get(c.id);
    if (!prev || c.updatedAt >= prev.updatedAt) map.set(c.id, c);
  }
  return [...map.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** Загрузка: data.json + локальная копия админки (актуальнее по дате). */
export async function loadClientsMerged(): Promise<ClientsDataFile> {
  const remote = await fetchClientsData();
  const local = loadClientsLocal();
  if (!local?.clients.length) return remote;
  return {
    version: 1,
    updatedAt: local.updatedAt || remote.updatedAt,
    clients: mergeClientLists(remote.clients, local.clients),
  };
}

/** Всегда пишет в localStorage, затем пытается GitHub. */
export async function saveClientsMerged(
  payload: ClientsDataFile,
  commitMessage: string,
): Promise<ClientsSaveResult> {
  const stamped: ClientsDataFile = {
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  saveClientsLocal(stamped);

  const config = getGitHubConfig();
  if (!config.token.trim()) {
    return {
      local: true,
      github: {
        ok: false,
        error:
          "Токен GitHub не настроен. Клиент сохранён только в этом браузере — откройте «Синхронизация GitHub».",
      },
    };
  }

  const res = await commitClientsFile(config, stamped, commitMessage);
  return { local: true, github: res };
}

export function getLastLocalSaveLabel(): string | null {
  const data = loadClientsLocal();
  if (!data?.updatedAt) return null;
  try {
    return new Date(data.updatedAt).toLocaleString("ru-RU");
  } catch {
    return data.updatedAt;
  }
}
