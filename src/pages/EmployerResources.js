import React from "react";
import "../styles/employer-resources.css";

export default function EmployerResources() {
  return (
    <div className="employer-page">

      {/* HERO SECTION */}
      <section className="employer-hero">
        <div className="container">
          <h1>Employer Resources</h1>
          <p>Helpful tools and guides to hire the best talent.</p>
        </div>
      </section>

      {/* RESOURCE CARDS */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Recruiter Guides</h2>

          <div className="resource-grid">

            <div className="resource-card">
              <i className="fa-solid fa-user-plus card-icon"></i>
              <h3>Hiring Guide</h3>
              <p>
                Learn how to shortlist candidates and interview efficiently.
              </p>
            </div>

            <div className="resource-card">
              <i className="fa-solid fa-file-contract card-icon"></i>
              <h3>Job Posting Tips</h3>
              <p>
                Improve your job post quality and attract the right applicants.
              </p>
            </div>

            <div className="resource-card">
              <i className="fa-solid fa-users-gear card-icon"></i>
              <h3>Candidate Evaluation</h3>
              <p>
                Evaluate applicants based on skills, mindset, and experience.
              </p>
            </div>

            <div className="resource-card">
              <i className="fa-solid fa-building card-icon"></i>
              <h3>Company Branding</h3>
              <p>
                Boost your company profile and attract high-quality talent.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="hiring-process">
        <div className="container">
          <h2 className="section-title">Smart Hiring Process</h2>

          <div className="process-steps">

            <div className="process-step">
              <span className="step-no">1</span>
              <h3>Create Job Listing</h3>
              <p>Write a clear and detailed job description.</p>
            </div>

            <div className="process-step">
              <span className="step-no">2</span>
              <h3>Review Applications</h3>
              <p>Screen candidates based on skills and experience.</p>
            </div>

            <div className="process-step">
              <span className="step-no">3</span>
              <h3>Interview & Assess</h3>
              <p>Ask role-specific questions to identify top talent.</p>
            </div>

            <div className="process-step">
              <span className="step-no">4</span>
              <h3>Hire the Best</h3>
              <p>Make an offer and welcome them to your team.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="employer-cta">
        <div className="container">
          <h2>Ready to Post a Job?</h2>
          <p>Start hiring today and find the right talent.</p>
          <a href="/post-job" className="btn cta-btn">Post a Job</a>
        </div>
      </section>

    </div>
  );
}
