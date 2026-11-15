import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";

import { useLang } from "../i18n/useLang";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell flex flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
          <p>{t.footer.rights}</p>
          <nav aria-label={t.footer.legal} className="flex gap-5">
            <Link to="/impressum" className="hover:text-primary">
              {t.footer.imprint}
            </Link>
            <Link to="/datenschutz" className="hover:text-primary">
              {t.footer.privacy}
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span>{t.footer.credit}</span>
          <a
            href="https://abduliputz.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-primary"
          >
            Abduli Pütz
          </a>
          <span>+</span>
          <a
            href="https://gustavorochaduck.github.io/gustavorochaduck/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-primary"
          >
            Gustavo
          </a>
          <MdOutlineArrowOutward aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
