import React, { useState, useEffect } from "react";
import InternshipCard from "../components/InternshipCard";
import "../styles/internships.css";
import { Link } from "react-router-dom";
import DarkVeil from '../components/DarkVeil';

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/internships/all");
        if (!response.ok) throw new Error("Failed to fetch internships");
        const data = await response.json();
        setInternships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  return (
    <div className="internships-page">

      {/* Hero */}
      <section className="internship-hero">
        <div className="darkveil-wrapper">
          <DarkVeil />
        </div>

        <div className="container hero-content">
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

          {loading && <p className="status-msg">Loading internships...</p>}
          {error && <p className="status-msg error">Error: {error}</p>}
          {!loading && internships.length === 0 && (
            <p className="status-msg">No internships found. Be the first to post!</p>
          )}

          <div className="internship-listings">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>
                Are the internships paid?
              </summary>
              <div className="faq-answer">
                <p>Some internships offer stipends while others may be unpaid. Be sure to check the specific listing for details.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                Can freshers apply?
              </summary>
              <div className="faq-answer">
                <p>Yes! We specifically curate many internships that are beginner-friendly and perfect for students or recent graduates.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                How do I contact the recruiter?
              </summary>
              <div className="faq-answer">
                <p>Once you view the internship details, you'll find the contact information or an application link provided by the recruiter.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="internship-cta">
        <div className="container">
          <h2>Are you hiring interns?</h2>
          <p>Post an internship and find the best talent.</p>
          <Link to="/internship-post" className="btn cta-btn">
            Post Internship
          </Link>
        </div>
      </section>

    </div>
  );
}
