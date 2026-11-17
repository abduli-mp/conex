import { supabase } from "../supabaseClient";

const API_URL = (
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://127.0.0.1:8000" : "")
).replace(/\/$/, "");

if (!API_URL) {
  throw new Error("VITE_API_URL must be set for production builds");
}
if (import.meta.env.PROD && !API_URL.startsWith("https://")) {
  throw new Error("VITE_API_URL must use https in production");
}

const API_ORIGIN = new URL(API_URL).origin;
const TIMEOUT_MS = 15_000;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function ConexAPI<T>(path: string, init: RequestInit = {}): Promise<T> {
  // The bearer token must only ever travel to our own API.
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(`Invalid API path: ${path}`);
  }
  const target = new URL(API_URL + path);
  if (target.origin !== API_ORIGIN) {
    throw new Error("API path resolves to a foreign origin");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new ApiError(401, "Not logged in");

  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${session.access_token}`);

  const timeout = AbortSignal.timeout(TIMEOUT_MS);

  const res = await fetch(target, {
    ...init,
    headers,
    credentials: "omit",
    cache: "no-store",
    signal: init.signal ? AbortSignal.any([init.signal, timeout]) : timeout,
  });

  if (res.status === 401) {
    await supabase.auth.signOut();
    throw new ApiError(401, "Session expired");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail = typeof body?.detail === "string" ? body.detail : `HTTP ${res.status}`;
    throw new ApiError(res.status, detail);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}
