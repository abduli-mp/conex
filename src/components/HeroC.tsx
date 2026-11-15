import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";

import { btnPrimary, btnSoft } from "./ui";
import { useLang } from "../i18n/useLang";

const diagonal = [0, 4, 8];

export default function Hero() {
  const { t } = useLang();
  const { card } = t.hero;

  return (
    <section className="shell grid lg:grid-cols-[1.1fr_1fr] lg:border-x lg:border-border">
      <div className="flex flex-col justify-center gap-8 px-6 py-14 md:px-10 lg:py-24">
        <h1 className="font-mono text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
          {t.hero.title}
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {t.hero.text}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/create-ticket" className={btnPrimary}>
            {t.hero.ctaTicket}
          </Link>
          <Link to="/create-account" className={btnSoft}>
            {t.hero.ctaTrack}
          </Link>
        </div>

        <p className="font-mono text-xs text-muted">
          <span className="text-primary">_</span>
          {t.hero.note}
        </p>
      </div>

      <div
        className="relative flex min-h-[26rem] items-center justify-center overflow-hidden border-t border-border px-6 py-12 lg:border-l lg:border-t-0"
        role="img"
        aria-label={card.label}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className={
                diagonal.includes(i) ? "bg-primary-soft" : "bg-primary"
              }
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="relative w-full max-w-sm border border-border bg-background shadow-card"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono text-xs text-muted">{card.label}</span>
          </div>

          <dl className="space-y-3 border-b border-border px-5 py-4 text-sm">
            <div className="flex gap-4">
              <dt className="w-16 shrink-0 font-mono text-xs text-muted">
                {card.device}
              </dt>
              <dd className="font-medium">{card.deviceValue}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 shrink-0 font-mono text-xs text-muted">
                {card.issue}
              </dt>
              <dd>{card.issueValue}</dd>
            </div>
          </dl>

          <ol className="px-5 py-4">
            {card.steps.map((step, index) => (
              <li
                key={step.label}
                className="relative flex items-center gap-3 py-2"
              >
                {index < card.steps.length - 1 && (
                  <span className="absolute left-[9px] top-[26px] h-full w-px bg-border" />
                )}
                <span
                  className={`relative flex h-5 w-5 shrink-0 items-center justify-center border text-white ${
                    step.state === "done"
                      ? "border-primary bg-primary"
                      : step.state === "current"
                        ? "border-primary bg-background"
                        : "border-border bg-background"
                  }`}
                >
                  {step.state === "done" && <MdCheck size={14} />}
                  {step.state === "current" && (
                    <span className="h-2 w-2 bg-primary" />
                  )}
                </span>
                <span
                  className={`text-sm ${
                    step.state === "todo" ? "text-muted" : "font-medium"
                  }`}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
