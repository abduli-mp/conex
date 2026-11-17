import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { classify } from "../auth/errors";
import {
  cleanEmail,
  cleanName,
  isEmail,
  isName,
  passwordProblem,
} from "../auth/validate";
import { btnPrimary, inputClass } from "../components/ui";
import { useLang } from "../i18n/useLang";
import { supabase } from "../supabaseClient";

const MAX_FAILURES = 5;
const FIRST_LOCK_SECONDS = 30;
const LONGEST_LOCK_SECONDS = 900;

const passwordMessage = {
  short: "passwordShort",
  long: "passwordLong",
  weak: "passwordWeak",
} as const;

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockSeconds, setLockSeconds] = useState(0);
  const failures = useRef(0);
  const { t } = useLang();
  const a = t.auth;
  const isLogin = activeTab === "login";

  useEffect(() => {
    if (!lockSeconds) return;
    const timer = window.setTimeout(() => setLockSeconds(0), lockSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [lockSeconds]);

  const switchTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setAwaitingConfirm(false);
    setError(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (lockSeconds > 0) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = cleanEmail(String(data.get("email") ?? ""));
    const password = String(data.get("password") ?? "");

    setError(null);
    setAwaitingConfirm(false);

    if (!isEmail(email)) {
      setError(a.errors.emailInvalid);
      return;
    }

    if (isLogin) {
      setLoading(true);
      const { error: failure } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);

      if (failure) {
        const kind = classify(failure);
        if (kind === "invalid" && ++failures.current >= MAX_FAILURES) {
          const doublings = failures.current - MAX_FAILURES;
          setLockSeconds(
            Math.min(FIRST_LOCK_SECONDS * 2 ** doublings, LONGEST_LOCK_SECONDS),
          );
        }
        setError(a.errors[kind]);
        return;
      }

      failures.current = 0;
      // The session listener flips GuestOnly and the user lands on /dashboard.
      return;
    }

    const firstName = cleanName(String(data.get("firstName") ?? ""));
    const lastName = cleanName(String(data.get("lastName") ?? ""));

    if (!isName(firstName) || !isName(lastName)) {
      setError(a.errors.nameInvalid);
      return;
    }

    const problem = passwordProblem(password, email);
    if (problem) {
      setError(a.errors[passwordMessage[problem]]);
      return;
    }

    setLoading(true);
    const { data: created, error: failure } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { first_name: firstName, last_name: lastName },
      },
    });
    setLoading(false);

    if (failure) {
      setError(a.errors[classify(failure)]);
      return;
    }

    // With email confirmation switched on there is no session yet.
    if (!created.session) {
      form.reset();
      setAwaitingConfirm(true);
    }
  };

  const tabClass = (active: boolean) =>
    `cursor-pointer border-b-2 px-4 py-3 font-mono text-sm transition-colors ${
      active
        ? "border-primary text-primary"
        : "border-transparent text-muted hover:text-foreground"
    }`;

  const message =
    lockSeconds > 0
      ? a.errors.locked.replace("{seconds}", String(lockSeconds))
      : error;

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

        <form
          key={activeTab}
          onSubmit={onSubmit}
          className="space-y-4 px-6 pb-8 sm:px-8"
        >
          {!isLogin && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                placeholder={a.firstName}
                aria-label={a.firstName}
                autoComplete="given-name"
                maxLength={60}
                required
                className={inputClass}
              />
              <input
                type="text"
                name="lastName"
                placeholder={a.lastName}
                aria-label={a.lastName}
                autoComplete="family-name"
                maxLength={60}
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
            autoComplete={isLogin ? "username" : "email"}
            maxLength={254}
            required
            className={inputClass}
          />
          <input
            type="password"
            name="password"
            placeholder={a.password}
            aria-label={a.password}
            autoComplete={isLogin ? "current-password" : "new-password"}
            // Login stays lenient so accounts made under the old 6-character rule still work.
            minLength={isLogin ? undefined : 12}
            maxLength={128}
            required
            className={inputClass}
          />

          {!isLogin && (
            <p className="font-mono text-xs text-muted">{a.passwordHint}</p>
          )}

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
            disabled={loading || lockSeconds > 0}
            className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {loading ? "…" : isLogin ? a.submitLogin : a.submitSignup}
          </button>

          {message && (
            <p role="alert" className="font-mono text-xs text-error">
              {message}
            </p>
          )}

          {awaitingConfirm && !message && (
            <p role="status" className="font-mono text-xs text-muted">
              {a.noticeConfirm}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
