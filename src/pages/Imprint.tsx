import SectionHead from "../components/SectionHead";
import { business } from "../content/business";
import { useLang } from "../i18n/useLang";

export default function Imprint() {
  const { t } = useLang();
  const p = t.imprint;

  return (
    <>
      <SectionHead title={p.title} />
      <div className="shell border-border lg:border-x">
        <div className="max-w-2xl space-y-8 px-6 py-14 md:px-10">
          <section>
            <h2 className="font-mono text-xs text-primary">_{p.section}</h2>
            <p className="mt-3 leading-relaxed">
              {business.legalName}
              <br />
              {business.street}
              <br />
              {business.city}
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-primary">_{p.contact}</h2>
            <p className="mt-3 leading-relaxed">
              {p.phone}: {business.phone}
              <br />
              {p.email}: {business.email}
            </p>
          </section>

          {business.vatId && (
            <section>
              <h2 className="font-mono text-xs text-primary">_{p.vat}</h2>
              <p className="mt-3">{business.vatId}</p>
            </section>
          )}

          <section>
            <h2 className="font-mono text-xs text-primary">_{p.responsible}</h2>
            <p className="mt-3 leading-relaxed">
              {business.owner}, {business.street}, {business.city}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
