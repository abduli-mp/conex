import SectionHead from "./SectionHead";
import { useLang } from "../i18n/useLang";

export default function Faq() {
  const { t } = useLang();
  const { faq } = t;

  return (
    <section aria-labelledby="faq-title">
      <SectionHead id="faq-title" title={faq.title} aside={faq.aside} />

      <div className="shell border-border lg:border-x">
        <div className="divide-y divide-border">
          {faq.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 px-6 py-5 font-bold marker:content-none hover:bg-surface md:px-10">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-xl text-primary transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl px-6 pb-6 leading-relaxed text-muted md:px-10">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
