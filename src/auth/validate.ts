const NAME = /^[\p{L}\p{M}][\p{L}\p{M}.' -]{0,59}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GUESSABLE = /password|passwort|qwert|asdf|123456|conex/i;

export const PASSWORD_MIN = 12;
// bcrypt, which Supabase uses, ignores everything past 72 bytes.
const PASSWORD_MAX_BYTES = 72;

export const cleanEmail = (value: string) => value.trim().toLowerCase();
export const cleanName = (value: string) => value.trim().replace(/\s+/g, " ");

export const isEmail = (value: string) => value.length <= 254 && EMAIL.test(value);
export const isName = (value: string) => NAME.test(value);

export type PasswordProblem = "short" | "long" | "weak";

export function passwordProblem(password: string, email: string): PasswordProblem | null {
  if (password.length < PASSWORD_MIN) return "short";
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) return "long";

  const local = email.split("@")[0].toLowerCase();
  const echoesEmail = local.length >= 4 && password.toLowerCase().includes(local);
  if (GUESSABLE.test(password) || new Set(password).size < 5 || echoesEmail) return "weak";

  return null;
}
