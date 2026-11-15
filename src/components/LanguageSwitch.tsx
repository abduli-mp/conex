import { useLang } from "../i18n/useLang";
import type { Lang } from "../i18n/context";

const options: Lang[] = ["de", "en"];

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex h-9 items-stretch border border-border font-mono text-xs"
    >
      {options.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={t.language[code]}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`cursor-pointer px-3 uppercase transition-colors ${
              active
                ? "bg-primary text-white"
                : "text-muted hover:bg-surface-hover hover:text-foreground"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
