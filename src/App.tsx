import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/HeaderC";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AuthForm from "./pages/UserCreate";
import GoBack from "./components/GoBack";
import NotFound from "./pages/404";
import SiteUnderConstruction from "./pages/UnderConstructions";

function Layout() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/create-account";

  return (
    <>
      {!isAuthPage && <Header />}
      {isAuthPage && <GoBack />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<SiteUnderConstruction />} />
        <Route path="/functions" element={<SiteUnderConstruction />} />
        <Route path="/create-account" element={<AuthForm />} />
      </Routes>

      {/* {!isAuthPage && <Footer />} */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
