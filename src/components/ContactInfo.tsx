import { business } from "../content/business";
import { useLang } from "../i18n/useLang";

export default function ContactInfo() {
  const { t, lang } = useLang();
  const { contact } = t;

  const rows = [
    {
      label: contact.phone,
      value: (
        <a href={`tel:${business.phoneHref}`} className="hover:text-primary">
          {business.phone}
        </a>
      ),
    },
    {
      label: contact.email,
      value: (
        <a href={`mailto:${business.email}`} className="hover:text-primary">
          {business.email}
        </a>
      ),
    },
    {
      label: contact.address,
      value: (
        <address className="not-italic">
          {business.legalName}
          <br />
          {business.street}
          <br />
          {business.city}
        </address>
      ),
    },
    { label: contact.hours, value: business.hours[lang] },
  ];

  return (
    <dl className="divide-y divide-border border border-border bg-background">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 px-6 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <dt className="font-mono text-xs text-primary">_{row.label}</dt>
          <dd className="text-sm font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
