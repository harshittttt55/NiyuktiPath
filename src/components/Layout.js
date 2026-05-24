import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);

  if (isAuthPage) return null;

  return (
    <div className="layout">
      <Navbar />
      <Sidebar />

      <main className={`layout-content ${isHomePage ? "no-sidebar" : ""}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
}
