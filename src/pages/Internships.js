import React from "react";
import "../styles/internships.css";
import { Link } from "react-router-dom";

export default function Internships() {
  return (
    <div className="internships-page">

      {/* Hero */}
      <section className="internship-hero">
        <div className="container">
          <h1>Discover Internships</h1>
          <p>Find internships that fit your goals and skills.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filter-section">
        <div className="container">
          <form className="filter-form">

            <div className="filter-group">
              <label>Category</label>
              <select>
                <option>Software Development</option>
                <option>Marketing</option>
                <option>Design</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="City / Remote" />
            </div>

            <div className="filter-group">
              <label>Duration</label>
              <select>
                <option>1 Month</option>
                <option>2 Months</option>
                <option>6 Months</option>
              </select>
            </div>

            <button type="submit" className="btn filter-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Internship Cards */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Latest Internships</h2>

          <div className="internship-listings">

            {/* Internship Card */}
            <div className="internship-card">
              <div className="internship-header">
                <h3 className="internship-title">React Intern</h3>
                <p className="company-name">Innovate Labs</p>
              </div>

              <div className="internship-body">
                <p className="internship-description">
                  Learn React and contribute to production-level projects.
                </p>

                <div className="internship-tags">
                  <span className="internship-tag">React</span>
                  <span className="internship-tag">Web Dev</span>
                </div>

                <div className="internship-meta">
                  <div><i className="fa-solid fa-location-dot"></i> Remote</div>
                  <div><i className="fa-solid fa-calendar"></i> 3 Months</div>
                  <div><i className="fa-solid fa-clock"></i> 1 day ago</div>
                </div>
              </div>

              <div className="internship-footer">
                <Link to="/internship-post" className="btn view-btn">
                  View Details
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-item">
            <div className="faq-question">
              Are the internships paid?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Some internships offer stipends while others may be unpaid.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              Can freshers apply?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Yes, most internships are suitable for beginners.
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="internship-cta">
        <div className="container">
          <h2>Are you hiring interns?</h2>
          <p>Post an internship and find the best talent.</p>
          <Link to="/post-internship" className="btn cta-btn">
            Post Internship
          </Link>
        </div>
      </section>

    </div>
  );
}
