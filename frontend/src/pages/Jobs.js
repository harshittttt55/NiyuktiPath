import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import "../styles/jobs.css";
import { Link } from "react-router-dom";
import DarkVeil from '../components/DarkVeil';
import { motion } from "framer-motion";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/jobs/all");
        if (!response.ok) throw new Error("Failed to connect to the server.");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-page">
      {/* Hero */}
      <section className="jobs-hero">
        <div className="darkveil-wrapper">
          <DarkVeil />
        </div>

        <motion.div
          className="container hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Latest <span className="highlight">Opportunities</span></h1>
          <p>Find your next career move from our handpicked listings from top companies.</p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="filter-section">
        <div className="container">
          <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="filter-group">
              <label>Role Category</label>
              <select defaultValue="Software Development">
                <option value="Software Development">Software Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Work Mode</label>
              <select defaultValue="Remote">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="e.g. Bangalore, Remote" />
            </div>

            <button type="submit" className="filter-btn">
              Find Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Jobs List */}
      <section className="section">
        <div className="container">
          <div className="job-listings">
            {loading && (
              <div className="loading-placeholder">
                <p>Curating best roles for you...</p>
              </div>
            )}

            {error && (
              <div className="error-placeholder">
                <p>Unable to load jobs: {error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary mt-2">Retry</button>
              </div>
            )}

            {!loading && !error && jobs.length === 0 && (
              <div className="empty-placeholder">
                <p>No job postings found at the moment.</p>
                <Link to="/post-job" className="btn btn-primary mt-2">Post a New Job</Link>
              </div>
            )}

            {!loading && !error && jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jobs-cta">
        <div className="container">
          <h2>Looking for talent?</h2>
          <p>Get your job in front of thousands of qualified candidates today.</p>
          <Link to="/post-job" className="cta-btn">
            Create Job Posting
          </Link>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">Help & Support</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>How can I track my applications?</summary>
              <div className="faq-answer">
                <p>You can view your application status in the "User Dashboard" if you are signed in.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary>Are these jobs verified?</summary>
              <div className="faq-answer">
                <p>Yes, every job posted on NiyuktiPath undergoes a basic verification process for authenticity.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary>Can I edit my job posting later?</summary>
              <div className="faq-answer">
                <p>Yes, recruiters can manage and edit their active listings from their recruiter dashboard.</p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
