import SectionHead from "./SectionHead";
import { useLang } from "../i18n/useLang";

export default function Principles() {
  const { t } = useLang();
  const { principles } = t;

  return (
    <section aria-labelledby="principles-title">
      <SectionHead
        id="principles-title"
        title={principles.title}
        aside={principles.aside}
      />

      <div className="shell border-border lg:border-x">
        <ul className="grid divide-border md:grid-cols-2 md:divide-x max-md:divide-y">
          {principles.items.map((item, index) => (
            <li
              key={item.title}
              className={`px-6 py-10 md:px-10 ${
                index > 1 ? "md:border-t md:border-border" : ""
              }`}
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
