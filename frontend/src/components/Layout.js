import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);

  if (isAuthPage) return null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`layout ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      <main className={`layout-content ${isHomePage ? "no-sidebar" : ""}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
}
