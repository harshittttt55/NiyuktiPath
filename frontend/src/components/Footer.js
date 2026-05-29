import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">

      {/* Top Section */}
      <div className="footer-container">
        
        <div className="footer-col">
          <h3 className="footer-title">NiyuktiPath</h3>
          <p className="footer-text">
            Your smart gateway to jobs, internships & career growth.
          </p>

          <div className="footer-social">
            <a href="www.facebook.com"><FaFacebook /></a>
            <a href="www.instagram.com"><FaInstagram /></a>
            <a href="www.linkedin.com"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/internships">Internships</Link></li>
            <li><Link to="/career-resources">Career Resources</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/signup">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: info@niyukti.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NiyuktiPath. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
    