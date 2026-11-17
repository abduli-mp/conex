import type { AuthError } from "@supabase/supabase-js";

export type AuthFailure =
  | "invalid"
  | "unconfirmed"
  | "rateLimited"
  | "weak"
  | "taken"
  | "unavailable";

// Supabase's raw messages leak details we don't want on screen, so map codes instead.
export function classify(error: AuthError): AuthFailure {
  switch (error.code) {
    case "invalid_credentials":
      return "invalid";
    case "email_not_confirmed":
      return "unconfirmed";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "rateLimited";
    case "weak_password":
      return "weak";
    case "user_already_exists":
    case "email_exists":
      return "taken";
    default:
      return error.status === 429 ? "rateLimited" : "unavailable";
  }
}
