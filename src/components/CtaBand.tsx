import { Link } from "react-router-dom";

import { btnBase } from "./ui";
import { useLang } from "../i18n/useLang";

export default function CtaBand() {
  const { t } = useLang();

  return (
    <section className="bg-primary text-white">
      <div className="shell flex flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-2 max-w-lg text-white/85">{t.cta.text}</p>
        </div>
        <Link
          to="/create-ticket"
          className={`${btnBase} shrink-0 bg-white text-primary hover:bg-primary-soft`}
        >
          {t.cta.button}
        </Link>
      </div>
    </section>
  );
}
