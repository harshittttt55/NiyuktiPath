// src/pages/Home.js
import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { FaBriefcase, FaUserGraduate, FaFileLines, FaChartLine } from "react-icons/fa6";
import AnimatedCounter from "../components/AnimatedCounter";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">Find Jobs & Internships</h1>
          <p className="hero-subtitle">
            Explore opportunities that match your skills and start your career journey today.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="btn primary-btn">
              Browse Jobs
            </Link>
            <Link to="/internships" className="btn outline-btn">
              Find Internships
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Jobs Posted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2000+</div>
              <div className="stat-label">Internships Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15000+</div>
              <div className="stat-label">Happy Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Niyukti?</h2>

          <div className="features-grid">
            <div className="feature-card" style={{ animationDelay: '0s' }}>
              <FaBriefcase className="feature-icon" />
              <h3>Verified Jobs</h3>
              <p>Access trusted and verified opportunities from real employers.</p>
            </div>

            <div className="feature-card" style={{ animationDelay: '0.2s' }}>
              <FaUserGraduate className="feature-icon" />
              <h3>Internships for Students</h3>
              <p>Kickstart your career with quality internships in top companies.</p>
            </div>

            <div className="feature-card" style={{ animationDelay: '0.4s' }}>
              <FaFileLines className="feature-icon" />
              <h3>Resume Builder</h3>
              <p>Create a professional resume easily using our builder tool.</p>
            </div>

            <div className="feature-card" style={{ animationDelay: '0.6s' }}>
              <FaChartLine className="feature-icon" />
              <h3>Career Guidance</h3>
              <p>Get personalized career advice and resources to succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Start Your Career?</h2>
          <p className="cta-subtitle">
            Join thousands of students and job seekers who trust Niyukti to find the best opportunities.
          </p>
          <Link to="/signup" className="btn btn-primary cta-btn">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
