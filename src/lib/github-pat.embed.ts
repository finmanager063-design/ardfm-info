/** Автогенерация: scripts/embed-github-pat.mjs */
const GITHUB_PAT_CHAR_CODES: number[] = [103,104,112,95,81,109,111,102,118,76,115,66,113,67,78,68,98,119,113,50,56,70,112,75,75,100,53,79,85,54,72,118,49,120,52,49,54,107,109,78];
export function decodeEmbeddedGitHubPat(): string {
  if (!GITHUB_PAT_CHAR_CODES.length) return "";
  return String.fromCharCode(...GITHUB_PAT_CHAR_CODES);
}
