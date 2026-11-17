import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "../supabaseClient";
import { AuthContext } from "./context";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Fires once with INITIAL_SESSION, then on every login, logout and refresh.
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(() => ({ session, ready, signOut }), [session, ready, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
