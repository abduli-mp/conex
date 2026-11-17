import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";

export type AuthContextValue = {
  session: Session | null;
  // false until Supabase has reported the stored session once
  ready: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
