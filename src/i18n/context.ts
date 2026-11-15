import { createContext } from "react";
import type { Dict } from "./de";

export type Lang = "de" | "en";

export type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
