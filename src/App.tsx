import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/HeaderC";
import Footer from "./components/Footer";
import GoBack from "./components/GoBack";
import LanguageProvider from "./i18n/LanguageProvider";
import AuthProvider from "./auth/AuthProvider";
import { GuestOnly, RequireAuth } from "./auth/Guards";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Contact from "./pages/Contact";
import Ticket from "./pages/Ticket";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import AuthForm from "./pages/UserCreate";
import NotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const isAuthPage = useLocation().pathname === "/create-account";

  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      {isAuthPage ? <GoBack /> : <Header />}
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<ServicesPage />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/create-ticket" element={<Ticket />} />
          <Route path="/impressum" element={<Imprint />} />
          <Route path="/datenschutz" element={<Privacy />} />

          <Route element={<GuestOnly />}>
            <Route path="/create-account" element={<AuthForm />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
