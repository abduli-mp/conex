import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

import LanguageSwitch from "./LanguageSwitch";
import { useLang } from "../i18n/useLang";

export default function GoBack() {
  const { t } = useLang();

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="shell flex items-center justify-between px-6 py-3 md:px-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-primary"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            <MdKeyboardArrowLeft aria-hidden="true" />
          </span>
          <span className="underline underline-offset-4">_{t.auth.back}_</span>
        </Link>
        <LanguageSwitch />
      </div>
    </div>
  );
}
