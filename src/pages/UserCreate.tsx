import { useState } from "react";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");

  const isLogin = activeTab === "login";

  return (
    <div
      className="
        relative
        min-h-[calc(100svh-65px)]
        w-full
        overflow-hidden
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          min-h-[calc(100svh-65px)]
          w-full
          items-center
          justify-center
          border-border
          sm:border-r
          sm:border-l
          px-4
          sm:px-6
          md:px-0
          lg:max-w-[60%]
        "
      >
        <div className="w-full max-w-md border border-border">
          <div className="grid grid-cols-2 border-b border-border transition delay-150 duration-300 ease-in-out">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`border-b-2 px-3 py-3 font-mono text-sm transition-colors cursor-pointer sm:px-4 ${
                isLogin
                  ? "border-text border-blue-700 text-blue-700"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`border-b-2 px-3 py-3 font-mono text-sm transition-colors cursor-pointer sm:px-4 ${
                !isLogin
                  ? "border-text border-blue-700 text-blue-700"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              Sign up
            </button>
          </div>

          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <h1 className="font-poppins text-2xl font-semibold sm:text-3xl">
              {isLogin ? "Welcome back." : "Create account."}
            </h1>

            <p className="mt-2 font-poppins text-sm text-muted">
              {isLogin
                ? "Log in to manage your support requests."
                : "Create your account to get better results."}
            </p>
          </div>

          <form className="space-y-4 px-5 pb-7 sm:px-8 sm:pb-8">
            {!isLogin && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  required
                  className="h-12 w-full border border-border bg-transparent px-4 font-poppins text-sm outline-none placeholder:text-muted focus:border-text"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required
                  className="h-12 w-full border border-border bg-transparent px-4 font-poppins text-sm outline-none placeholder:text-muted focus:border-text"
                />
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="h-12 w-full border border-border bg-transparent px-4 font-poppins text-sm outline-none placeholder:text-muted focus:border-text"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="h-12 w-full border border-border bg-transparent px-4 font-poppins text-sm outline-none placeholder:text-muted focus:border-text"
            />

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="font-mono text-xs text-muted hover:text-text"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="h-12 w-full cursor-pointer bg-text font-mono text-sm text-bg transition-opacity hover:opacity-80 bg-blue-700"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
              }}
            >
              {isLogin ? "Login" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
