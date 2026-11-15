import SectionHead from "../components/SectionHead";
import { useLang } from "../i18n/useLang";

export default function Privacy() {
  const { t } = useLang();
  const p = t.privacy;

  return (
    <>
      <SectionHead title={p.title} />
      <div className="shell border-border lg:border-x">
        <div className="max-w-2xl space-y-8 px-6 py-14 md:px-10">
          {p.blocks.map((block) => (
            <section key={block.heading}>
              <h2 className="text-lg font-bold">{block.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted">{block.text}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
