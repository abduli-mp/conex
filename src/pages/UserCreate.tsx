import { useState } from "react";
import type { FormEvent } from "react";

import { btnPrimary, inputClass } from "../components/ui";
import { useLang } from "../i18n/useLang";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();
  const a = t.auth;
  const isLogin = activeTab === "login";

  const switchTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setSubmitted(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
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

          <button type="submit" className={`${btnPrimary} w-full`}>
            {isLogin ? a.submitLogin : a.submitSignup}
          </button>

          {submitted && (
            <p role="status" className="font-mono text-xs text-muted">
              {a.notice}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
