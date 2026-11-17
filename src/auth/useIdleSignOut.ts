import { useEffect } from "react";
import { useAuth } from "./useAuth";

const IDLE_LIMIT_MS = 30 * 60 * 1000;
const ACTIVITY = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

export function useIdleSignOut(active: boolean) {
  const { signOut } = useAuth();

  useEffect(() => {
    if (!active) return;

    let timer = 0;
    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => void signOut(), IDLE_LIMIT_MS);
    };

    arm();
    for (const name of ACTIVITY) window.addEventListener(name, arm, { passive: true });

    return () => {
      window.clearTimeout(timer);
      for (const name of ACTIVITY) window.removeEventListener(name, arm);
    };
  }, [active, signOut]);
}
