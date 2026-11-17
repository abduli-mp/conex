import type { Lang } from "../../i18n/context";

const locales = { de: "de-DE", en: "en-GB" } as const;

export function formatDate(
  iso: string,
  lang: Lang,
  options: Intl.DateTimeFormatOptions,
) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "–";
  return new Intl.DateTimeFormat(locales[lang], options).format(date);
}

export const shortDateTime: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "short",
};
export const longDateTime: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "short",
};
export const longDate: Intl.DateTimeFormatOptions = { dateStyle: "long" };

export const shortId = (id: string) => id.slice(0, 8).toUpperCase();

// Only render an address as a link when it can't smuggle in a mailto query string.
export const isPlainEmail = (value: string) => /^[^\s@<>"'?&#]+@[^\s@<>"'?&#]+$/.test(value);
