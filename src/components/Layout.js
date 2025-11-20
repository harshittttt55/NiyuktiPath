import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />

      <main className="layout-content">
        {children}
        <Footer />
      </main>
    </div>
  );
}
