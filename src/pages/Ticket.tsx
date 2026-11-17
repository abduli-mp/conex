import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import SectionHead from "../components/SectionHead";
import { btnPrimary, inputClass } from "../components/ui";
import { business } from "../content/business";
import { useLang } from "../i18n/useLang";

export default function Ticket() {
  const { t } = useLang();
  const f = t.ticket;
  const [handover, setHandover] = useState(0);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    // Single-line fields must not be able to break out into extra mail headers.
    const line = (key: string) => get(key).replace(/[\r\n]+/g, " ");

    const phone = line("phone");
    const lines = [
      `${f.mailName}: ${line("name")}`,
      `${f.mailEmail}: ${line("email")}`,
      ...(phone ? [`${f.mailPhone}: ${phone}`] : []),
      `${f.mailDevice}: ${line("device")}`,
      `${f.mailHandover}: ${f.handoverOptions[handover]}`,
      "",
      `${f.mailIssue}:`,
      get("issue"),
    ];

    const subject = `${f.subject}: ${line("device")}`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <>
      <SectionHead title={f.title} />
      <div className="shell border-border lg:border-x">
        <div className="grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <p className="max-w-sm leading-relaxed text-muted">{f.intro}</p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-muted">
                  {f.name}
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-muted">
                  {f.email}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-muted">
                  {f.phone}
                </span>
                <input
                  name="phone"
                  type="tel"
                  maxLength={30}
                  autoComplete="tel"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-muted">
                  {f.device}
                </span>
                <select name="device" className={inputClass}>
                  {f.deviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-mono text-xs text-muted">
                {f.issue}
              </span>
              <textarea
                name="issue"
                required
                maxLength={2000}
                rows={6}
                placeholder={f.issuePlaceholder}
                className={`${inputClass} h-auto py-3`}
              />
            </label>

            <fieldset>
              <legend className="mb-2 font-mono text-xs text-muted">
                {f.handover}
              </legend>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {f.handoverOptions.map((option, index) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="handover"
                      checked={handover === index}
                      onChange={() => setHandover(index)}
                      className="h-4 w-4 accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-primary"
              />
              <span>
                {f.consentBefore}{" "}
                <Link
                  to="/datenschutz"
                  className="text-primary underline underline-offset-4"
                >
                  {f.consentLink}
                </Link>
                {f.consentAfter === "." ? "." : ` ${f.consentAfter}`}
              </span>
            </label>

            <button type="submit" className={btnPrimary}>
              {f.submit}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
