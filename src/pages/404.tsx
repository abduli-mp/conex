import { Link } from "react-router-dom";

import { btnPrimary } from "../components/ui";
import { useLang } from "../i18n/useLang";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-mono text-6xl font-bold text-primary md:text-7xl">
        {t.notFound.title}
      </h1>
      <p className="font-mono text-sm text-muted">{t.notFound.code}</p>
      <p className="max-w-sm text-muted">{t.notFound.text}</p>
      <Link to="/" className={`${btnPrimary} mt-2`}>
        {t.notFound.back}
      </Link>
    </div>
  );
}
