import type { ClientsDataFile } from "@/lib/clients-data";

export type GitHubRepoConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string;
};

const CONFIG_KEY = "regylz-github-config";

export const DEFAULT_GITHUB_CONFIG: Omit<GitHubRepoConfig, "token"> = {
  owner: "finmanager063-design",
  repo: "regylz",
  branch: "main",
  path: "public/data.json",
};

export function getGitHubConfig(): GitHubRepoConfig {
  if (typeof window === "undefined") {
    return { token: "", ...DEFAULT_GITHUB_CONFIG };
  }
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return { token: "", ...DEFAULT_GITHUB_CONFIG };
    const parsed = JSON.parse(raw) as Partial<GitHubRepoConfig>;
    return {
      token: parsed.token ?? "",
      owner: parsed.owner ?? DEFAULT_GITHUB_CONFIG.owner,
      repo: parsed.repo ?? DEFAULT_GITHUB_CONFIG.repo,
      branch: parsed.branch ?? DEFAULT_GITHUB_CONFIG.branch,
      path: parsed.path ?? DEFAULT_GITHUB_CONFIG.path,
    };
  } catch {
    return { token: "", ...DEFAULT_GITHUB_CONFIG };
  }
}

export function saveGitHubConfig(config: GitHubRepoConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

function toBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function apiHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function commitClientsFile(
  config: GitHubRepoConfig,
  payload: ClientsDataFile,
  commitMessage: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!config.token.trim()) {
    return { ok: false, error: "Укажите GitHub Personal Access Token в настройках синхронизации." };
  }
  if (!config.owner.trim() || !config.repo.trim()) {
    return { ok: false, error: "Укажите владельца и название репозитория." };
  }

  const path = config.path.replace(/^\//, "");
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${encodeURIComponent(path)}`;

  let sha: string | undefined;
  const getRes = await fetch(`${url}?ref=${encodeURIComponent(config.branch)}`, {
    headers: apiHeaders(config.token),
  });
  if (getRes.ok) {
    const meta = (await getRes.json()) as { sha?: string };
    sha = meta.sha;
  } else if (getRes.status !== 404) {
    const err = await getRes.json().catch(() => ({}));
    const msg = (err as { message?: string }).message ?? getRes.statusText;
    return { ok: false, error: `GitHub GET: ${msg}` };
  }

  const body = JSON.stringify(
    { ...payload, updatedAt: new Date().toISOString() },
    null,
    2,
  );
  const putRes = await fetch(url, {
    method: "PUT",
    headers: { ...apiHeaders(config.token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: commitMessage,
      content: toBase64Utf8(body),
      branch: config.branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    const msg = (err as { message?: string }).message ?? putRes.statusText;
    return { ok: false, error: `GitHub PUT: ${msg}` };
  }
  return { ok: true };
}

export async function testGitHubConnection(
  config: GitHubRepoConfig,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!config.token.trim()) return { ok: false, error: "Токен не указан" };
  const res = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}`,
    { headers: apiHeaders(config.token) },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { ok: false, error: (err as { message?: string }).message ?? res.statusText };
  }
  return { ok: true };
}
