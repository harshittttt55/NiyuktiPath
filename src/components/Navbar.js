import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Internships", path: "/internships" },
    { name: "Resources", path: "/career-resources" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Niyukti</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`navbar-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <FaSun /> : <FaMoon />}
          </button>

          <div className="navbar-auth">
            <Link to="/signin" className="btn btn-outline">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
