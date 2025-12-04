// client/src/utils/auth.ts
const KEY = "shoobu_auth";

export type AuthState = { token?: string; customer?: any; sessionId?: string } | null;

export function saveAuth(data: AuthState) {
  localStorage.setItem(KEY, JSON.stringify(data || {}));
}

export function getAuth(): AuthState {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}
