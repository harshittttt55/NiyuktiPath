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

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
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
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <span className="logo">{expanded ? "Niyukti" : "N"}</span>
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
              {expanded && <span className="label">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
