// client/src/utils/api.ts
export const getApiBase = (): string => {
  // 1) Env override (Vite)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2) If running on Replit (or remote), try to detect window origin + port mapping
  try {
    const { hostname, protocol } = window.location;
    // if page served from e.g. replit host and backend runs on same host + port 5000:
    // allow: http(s)://<host>:5000
    if (hostname && hostname !== "localhost") {
      return `${protocol}//${hostname}:5000`;
    }
  } catch (e) {
    // ignore in SSR / non-browser env
  }

  // 3) local default
  return "http://localhost:5000";
};

const API_BASE = getApiBase();

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };

  // attach token if present
  const token = localStorage.getItem("sf_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...opts,
    headers,
    credentials: "include",
  });

  // return JSON if possible, otherwise text
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiGet(path: string, raw = false) {
  const res = await request(path, { method: "GET" });
  return raw ? res : res;
}

export async function apiPost(path: string, body?: any) {
  return await request(path, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}
