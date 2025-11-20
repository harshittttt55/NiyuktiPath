import React from "react";
import "../styles/jobs.css";
import { Link } from "react-router-dom";

export default function Jobs() {
  return (
    <div className="jobs-page">

      {/* Hero */}
      <section className="jobs-hero">
        <div className="container">
          <h1>Find Your Dream Job</h1>
          <p>Browse thousands of verified job opportunities.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filter-section">
        <div className="container">
          <form className="filter-form">

            <div className="filter-group">
              <label>Job Type</label>
              <select>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select>
                <option>Software Development</option>
                <option>Marketing</option>
                <option>Business</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="City / Remote" />
            </div>

            <button type="submit" className="btn filter-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Latest Job Openings</h2>

          <div className="job-listings">

            {/* Job Card */}
            <div className="job-card">
              <div className="job-header">
                <h3 className="job-title">Frontend Developer</h3>
                <p className="company-name">Tech Solutions Pvt. Ltd.</p>
              </div>

              <div className="job-body">
                <p className="job-description">
                  Build beautiful user interfaces using React.
                </p>

                <div className="job-tags">
                  <span className="job-tag">React</span>
                  <span className="job-tag">JavaScript</span>
                  <span className="job-tag">UI/UX</span>
                </div>

                <div className="job-meta">
                  <div className="job-meta-item">
                    <i className="fa-solid fa-location-dot"></i> New Delhi
                  </div>
                  <div className="job-meta-item">
                    <i className="fa-solid fa-briefcase"></i> Full-Time
                  </div>
                  <div className="job-meta-item">
                    <i className="fa-solid fa-clock"></i> 2 days ago
                  </div>
                </div>
              </div>

              <div className="job-footer">
                <Link to="/job-details" className="btn apply-btn">
                  View Details
                </Link>
              </div>
            </div>

            {/* Duplicate the above card for more jobs OR use map() later */}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jobs-cta">
        <div className="container">
          <h2>Are you a recruiter?</h2>
          <p>Post jobs and find the right talent for your company.</p>
          <Link to="/post-job" className="btn cta-btn">Post a Job</Link>
        </div>
      </section>

    </div>
  );
}
