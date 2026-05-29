import React, { useState } from "react";
import "../styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaUserGraduate,
  FaTools,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Sidebar({ isOpen, onToggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Internships", icon: <FaUserGraduate />, path: "/internships" },
    { name: "Resources", icon: <FaTools />, path: "/career-resources" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
    { name: "Contact", icon: <FaPhoneAlt />, path: "/contact" },
  ];

  return (
    <div
      className={`sidebar ${isOpen ? "expanded" : ""}`}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header" onClick={onToggleSidebar} style={{ cursor: 'pointer' }}>
        <span className="logo">{isOpen ? "NiyuktiPath" : "N"}</span>
      </div>

      {/* Menu */}
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="label">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
