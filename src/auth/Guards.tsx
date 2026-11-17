import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./useAuth";
import { useIdleSignOut } from "./useIdleSignOut";

// Signed-in only. Anyone else is sent to the login page.
export function RequireAuth() {
  const { session, ready } = useAuth();
  useIdleSignOut(Boolean(session));

  if (!ready) return null;
  if (!session) return <Navigate to="/create-account" replace />;
  return <Outlet />;
}

// Login and signup. Someone who already has a session has no business here.
export function GuestOnly() {
  const { session, ready } = useAuth();

  if (!ready) return null;
  if (session) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
