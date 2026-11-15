import { Link } from "react-router-dom";

import SectionHead from "./SectionHead";
import { btnSoft } from "./ui";
import { useLang } from "../i18n/useLang";

export default function Services({ detailed = false }: { detailed?: boolean }) {
  const { t } = useLang();
  const { services } = t;

  return (
    <section aria-labelledby="services-title">
      <SectionHead
        id="services-title"
        title={services.title}
        aside={services.aside}
      />

      <div className="shell border-border lg:border-x">
        <p className="max-w-2xl px-6 pb-2 pt-10 text-muted md:px-10">
          {services.intro}
        </p>

        <ul className="divide-y divide-border border-t border-border mt-8">
          {services.items.map((item) => (
            <li
              key={item.name}
              className="grid gap-4 px-6 py-8 md:grid-cols-[18rem_1fr] md:gap-10 md:px-10"
            >
              <h3 className="text-lg font-bold leading-snug">{item.name}</h3>

              <div>
                <p className="max-w-2xl leading-relaxed text-muted">
                  {item.text}
                </p>

                {detailed && (
                  <div className="mt-5">
                    <p className="font-mono text-xs text-primary">
                      _{services.casesLabel}
                    </p>
                    <ul className="mt-2 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
                      {item.cases.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="mt-2 h-0.5 w-2 shrink-0 bg-primary" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {!detailed && (
          <div className="border-t border-border px-6 py-6 md:px-10">
            <Link to="/leistungen" className={btnSoft}>
              {services.more}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
