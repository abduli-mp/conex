import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../assets/conex_white.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "index" },
    { to: "/features", label: "Features" },
    { to: "/functions", label: "Functions" },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative flex items-center font-jet ${
      isActive ? "font-medium" : "font-normal"
    }`;

  return (
    <header className="border-b border-border sticky top-0 z-99 bg-background">
      <div className="mx-auto w-full md:max-w-[60%] px-10 lg:px-0">
        <div className="flex h-16 items-center lg:items-end justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-end">
            <div
              className="h-15 w-15 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${Logo})` }}
            />
            <span className="font-mono">CONEX</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-5 md:flex font-mono">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    <span
                      className={`relative transition-transform duration-300 ${
                        isActive ? "-translate-x-2" : ""
                      } group-hover:-translate-x-2`}
                    >
                      _
                    </span>

                    <span>{label}</span>

                    <span
                      className={`absolute -bottom-[1px] left-0 h-px bg-current transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop sign in */}
          <Link
            to="/create-account"
            className="
              hidden
              h-9
              items-center
              bg-[#f5f5f5]
              px-4
              font-mono
              text-sm
              font-medium
              text-[#111]
              transition-transform
              duration-150
              hover:-translate-y-0.5
              hover:bg-blue-700
              hover:text-[#f5f5f5]
              active:translate-y-0
              md:inline-flex
            "
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
            }}
          >
            Sign in
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-border
              md:hidden
              font-mono
            "
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 top-4 h-px w-5 bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-80 pb-5 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav
            className="flex flex-col border-t border-border pt-4 
              font-mono"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center py-3 font-jet text-sm ${
                    isActive ? "font-medium" : "font-normal"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`mr-1 transition-transform duration-300 ${
                        isActive ? "-translate-x-1" : ""
                      } group-hover:-translate-x-1`}
                    >
                      _
                    </span>

                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}

            {/* Mobile sign in */}
            <Link
              to="/create-account"
              onClick={() => setMenuOpen(false)}
              className="
                mt-3
                inline-flex
                h-9
                w-fit
                items-center
                bg-[#f5f5f5]
                px-4
                font-mono
                text-sm
                font-medium
                text-[#111]
                transition-transform
                duration-150
                hover:-translate-y-0.5
              "
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
              }}
            >
              Sign in
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
