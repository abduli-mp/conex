import { useState } from "react";
import type { FormEvent } from "react";

import { btnPrimary, inputClass } from "../components/ui";
import { useLang } from "../i18n/useLang";
import { supabase } from "../supabaseClient";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLang();
  const a = t.auth;
  const isLogin = activeTab === "login";

  const switchTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setSubmitted(false);
    setError(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitted(false);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSubmitted(true);
        // App.tsx redirects automatically via onAuthStateChange
      }
    } else {
      const firstName = String(form.get("firstName") ?? "");
      const lastName = String(form.get("lastName") ?? "");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.session) {
        // Email confirmation disabled → user is logged in immediately
        setSubmitted(true);
        // App.tsx redirects automatically
      } else {
        // Email confirmation enabled → user must click the link in the email
        setSubmitted(true);
        // The `a.notice` message should say "check your email"
      }
    }

    setLoading(false);
  };

  const tabClass = (active: boolean) =>
    `cursor-pointer border-b-2 px-4 py-3 font-mono text-sm transition-colors ${
      active
        ? "border-primary text-primary"
        : "border-transparent text-muted hover:text-foreground"
    }`;

  return (
    <div className="flex flex-1 items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md border border-border bg-background shadow-card">
        <div className="grid grid-cols-2 border-b border-border">
          <button
            type="button"
            onClick={() => switchTab("login")}
            className={tabClass(isLogin)}
          >
            {a.login}
          </button>
          <button
            type="button"
            onClick={() => switchTab("signup")}
            className={tabClass(!isLogin)}
          >
            {a.signup}
          </button>
        </div>

        <div className="px-6 py-7 sm:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {isLogin ? a.loginTitle : a.signupTitle}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {isLogin ? a.loginText : a.signupText}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 px-6 pb-8 sm:px-8">
          {!isLogin && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                placeholder={a.firstName}
                aria-label={a.firstName}
                required
                className={inputClass}
              />
              <input
                type="text"
                name="lastName"
                placeholder={a.lastName}
                aria-label={a.lastName}
                required
                className={inputClass}
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder={a.email}
            aria-label={a.email}
            required
            className={inputClass}
          />
          <input
            type="password"
            name="password"
            placeholder={a.password}
            aria-label={a.password}
            required
            minLength={6}
            className={inputClass}
          />

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="cursor-pointer font-mono text-xs text-muted hover:text-primary"
              >
                {a.forgot}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {loading ? "…" : isLogin ? a.submitLogin : a.submitSignup}
          </button>

          {error && (
            <p role="alert" className="font-mono text-xs text-red-500">
              {error}
            </p>
          )}

          {submitted && !error && (
            <p role="status" className="font-mono text-xs text-muted">
              {a.notice}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}