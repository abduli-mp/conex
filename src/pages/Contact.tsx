import { Link } from "react-router-dom";

import SectionHead from "../components/SectionHead";
import ContactInfo from "../components/ContactInfo";
import { btnPrimary } from "../components/ui";
import { useLang } from "../i18n/useLang";

export default function Contact() {
  const { t } = useLang();
  const { contact } = t;

  return (
    <>
      <SectionHead title={contact.title} aside={contact.aside} />
      <div className="shell border-border lg:border-x">
        <div className="grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:py-20">
          <div>
            <p className="max-w-md leading-relaxed text-muted">
              {contact.intro}
            </p>
            <p className="mt-8 font-mono text-xs text-muted">
              {contact.ticketHint}
            </p>
            <Link to="/create-ticket" className={`${btnPrimary} mt-3`}>
              {contact.ticketLink}
            </Link>
          </div>
          <ContactInfo />
        </div>
      </div>
    </>
  );
}
