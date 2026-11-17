import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Logo from "../assets/conex_black.png";
import LanguageSwitch from "./LanguageSwitch";
import { btnPrimary } from "./ui";
import { useAuth } from "../auth/useAuth";
import { useLang } from "../i18n/useLang";

type ActionsProps = {
  onDone?: () => void;
  focusable?: boolean;
};

function AccountActions({ onDone, focusable = true }: ActionsProps) {
  const { session, ready, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLang();
  const tabIndex = focusable ? 0 : -1;

  if (!ready) return null;

  if (!session) {
    return (
      <Link
        to="/create-account"
        tabIndex={tabIndex}
        onClick={onDone}
        className={`${btnPrimary} h-9`}
      >
        {t.nav.signIn}
      </Link>
    );
  }

  const leave = () => {
    onDone?.();
    navigate("/", { replace: true });
    void signOut();
  };

  return (
    <>
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={leave}
        className="cursor-pointer font-mono text-sm text-muted transition-colors hover:text-foreground"
      >
        {t.nav.signOut}
      </button>
      <Link
        to="/dashboard"
        tabIndex={tabIndex}
        onClick={onDone}
        className={`${btnPrimary} h-9`}
      >
        {t.nav.dashboard}
      </Link>
    </>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/leistungen", label: t.nav.services },
    { to: "/kontakt", label: t.nav.contact },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative flex items-center py-2 font-mono text-sm ${
      isActive ? "font-bold text-primary" : "text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="shell px-6 md:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src={Logo} alt="" className="h-9 w-9" />
            <span className="font-mono text-base font-bold tracking-wide">
              CONEX
            </span>
          </Link>

          <nav
            aria-label={t.nav.primary}
            className="hidden items-center gap-7 md:flex"
          >
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end className={linkClass}>
                {({ isActive }) => (
                  <>
                    <span
                      className={`mr-1 text-primary transition-transform duration-300 ${
                        isActive ? "-translate-x-1" : ""
                      } group-hover:-translate-x-1`}
                    >
                      _
                    </span>
                    <span>{label}</span>
                    <span
                      className={`absolute -bottom-px left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitch />
            <AccountActions />
          </div>

          <button
            type="button"
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-border md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <nav
            aria-label={t.nav.primary}
            className="flex flex-col border-t border-border pt-3"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 font-mono text-sm ${
                    isActive ? "font-bold text-primary" : "text-foreground"
                  }`
                }
              >
                <span className="mr-1 text-primary">_</span>
                {label}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center gap-4">
              <LanguageSwitch />
              <AccountActions
                focusable={menuOpen}
                onDone={() => setMenuOpen(false)}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
