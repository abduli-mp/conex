import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { de } from "./de";
import { en } from "./en";
import { LanguageContext } from "./context";
import type { Lang } from "./context";

const STORAGE_KEY = "conex-lang";
const dictionaries = { de, en };

function readStoredLang(): Lang {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "en" ? "en" : "de";
  } catch {
    return "de";
  }
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      return;
    }
  }, []);

  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", t.meta.title);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", lang === "de" ? "de_DE" : "en_US");
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
