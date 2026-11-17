import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// A service-role key in a browser bundle bypasses every RLS policy.
function isPrivilegedKey(value: string) {
  if (value.startsWith("sb_secret_")) return true;
  const payload = value.split(".")[1];
  if (!payload) return false;
  try {
    const claims = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return claims.role === "service_role";
  } catch {
    return false;
  }
}

if (!url || !key) {
  throw new Error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set");
}
if (import.meta.env.PROD && !url.startsWith("https://")) {
  throw new Error("VITE_SUPABASE_URL must use https in production");
}
if (isPrivilegedKey(key)) {
  throw new Error("Refusing to start with a privileged Supabase key");
}

export const supabase = createClient(url, key, {
  auth: {
    flowType: "pkce",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
