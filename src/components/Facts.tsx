import { useLang } from "../i18n/useLang";

export default function Facts() {
  const { t } = useLang();

  return (
    <div className="border-t border-border">
      <dl className="shell grid divide-border border-border md:grid-cols-3 md:divide-x lg:border-x max-md:divide-y">
        {t.facts.items.map((item) => (
          <div key={item.title} className="px-6 py-6 md:px-10">
            <dt className="font-mono text-xs text-primary">_{item.title}</dt>
            <dd className="mt-1 text-sm font-medium">{item.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
