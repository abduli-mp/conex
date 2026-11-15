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
      </div>
    </section>
  );
}
