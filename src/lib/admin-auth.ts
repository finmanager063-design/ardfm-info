const PASSWORD_KEY = "regylz-admin-password";
const DEFAULT_PASSWORD = "1304";

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
}

export function setAdminPassword(password: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PASSWORD_KEY, password.trim());
}

export function checkAdminPassword(input: string): boolean {
  return input === getAdminPassword();
}
