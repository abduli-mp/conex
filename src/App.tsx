import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

import Header from "./components/HeaderC";
import Footer from "./components/Footer";
import GoBack from "./components/GoBack";
import LanguageProvider from "./i18n/LanguageProvider";
import { supabase } from "./supabaseClient.ts";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Contact from "./pages/Contact";
import Ticket from "./pages/Ticket";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import AuthForm from "./pages/UserCreate";
import NotFound from "./pages/404";




// Scrolls the window to the top every time the route changes.
// Rendered inside the router so useLocation() works.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Receives `session` from App so it can decide whether to redirect.
function Layout({ session }: { session: Session | null }) {
  const { pathname } = useLocation();
  // True only on the login/signup page.
  const isAuthPage = pathname === "/create-account";

  // Already logged in and trying to open the form → send to home.
  if (isAuthPage && session) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-svh flex-col">
      {/* Resets scroll on every navigation */}
      <ScrollToTop />
      {/* Auth page shows a "back" button instead of the full header */}
      {isAuthPage ? <GoBack /> : <Header />}
      <main className="flex flex-1 flex-col">
        {/* All routes are public; only /create-account is guarded above */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<ServicesPage />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/create-ticket" element={<Ticket />} />
          <Route path="/create-account" element={<AuthForm />} />
          <Route path="/impressum" element={<Imprint />} />
          <Route path="/datenschutz" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {

  // Current Supabase session (null when logged out).
  const [session, setSession] = useState<Session | null>(null);
  // Prevents a flash of the login form before we know if the user is logged in.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read the saved session on first mount.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Keep `session` in sync on login / logout / token refresh.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the listener when the component unmounts.
    return () => subscription.unsubscribe();
  }, []);

  // Wait for the initial session check before rendering anything.
  if (loading) return null;

  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Pass the session down so Layout can do the /create-account redirect */}
        <Layout session={session} />
      </BrowserRouter>
    </LanguageProvider>
  );
}