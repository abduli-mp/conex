import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";

const baseHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

function originOf(value: string | undefined) {
  try {
    return value ? new URL(value).origin : null;
  } catch {
    return null;
  }
}

function contentSecurityPolicy(env: Record<string, string>, upgrade: boolean) {
  const supabase = originOf(env.VITE_SUPABASE_URL);
  const connect = [
    "'self'",
    supabase,
    supabase?.replace(/^https:/, "wss:"),
    originOf(env.VITE_API_URL),
  ].filter(Boolean);

  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connect.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(upgrade ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

// Cloudflare Pages and Netlify both read dist/_headers.
function headersFile(env: Record<string, string>): Plugin {
  return {
    name: "conex-headers-file",
    apply: "build",
    generateBundle() {
      const all = {
        "Content-Security-Policy": contentSecurityPolicy(env, true),
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
        ...baseHeaders,
      };
      const lines = Object.entries(all).map(([name, value]) => `  ${name}: ${value}`);
      this.emitFile({
        type: "asset",
        fileName: "_headers",
        source: `/*\n${lines.join("\n")}\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss(), headersFile(env)],

    build: {
      sourcemap: false,
      minify: "oxc",
    },

    server: { headers: baseHeaders },

    // `vite preview` serves the production build, so it gets the real CSP.
    preview: {
      headers: {
        ...baseHeaders,
        "Content-Security-Policy": contentSecurityPolicy(env, false),
      },
    },
  };
});
