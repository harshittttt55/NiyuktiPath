import React from "react";
import "../styles/internship-post.css";

export default function InternshipPost() {
  return (
    <div className="internship-post-page">

      {/* Hero */}
      <section className="internship-post-hero">
        <div className="container">
          <h1>React Internship</h1>
          <p className="company-name">Innovate Labs</p>

          <div className="internship-meta">
            <div><i className="fa-solid fa-briefcase"></i> Internship</div>
            <div><i className="fa-solid fa-location-dot"></i> Remote</div>
            <div><i className="fa-solid fa-indian-rupee-sign"></i> ₹8,000 / month</div>
            <div><i className="fa-solid fa-calendar"></i> 3 Months</div>
          </div>

          <div className="internship-actions">
            <button className="btn apply-btn">Apply Now</button>
            <button className="btn save-btn">Save</button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section">
        <div className="container post-body">

          <div className="post-section">
            <h2>About the Internship</h2>
            <p>
              This internship is designed to train students in real-world
              frontend development using React, JavaScript, and modern UI
              practices.
            </p>
          </div>

          <div className="post-section">
            <h2>Responsibilities</h2>
            <ul>
              <li>Work with React components and hooks.</li>
              <li>Write clean and optimized JavaScript code.</li>
              <li>Fix UI bugs and improve user experience.</li>
              <li>Collaborate with senior developers.</li>
            </ul>
          </div>

          <div className="post-section">
            <h2>Required Skills</h2>
            <ul>
              <li>Basic understanding of HTML, CSS, JS</li>
              <li>Knowledge of React fundamentals</li>
              <li>Problem-solving skills</li>
              <li>Eagerness to learn</li>
            </ul>
          </div>

          <div className="post-section">
            <h2>Perks</h2>
            <ul>
              <li>Certificate</li>
              <li>Letter of Recommendation</li>
              <li>Flexible Work Hours</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Selection Process</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Step 1: Apply</h4>
                <p>Submit your application and resume.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Step 2: Assignment</h4>
                <p>Complete a short React task.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Step 3: Interview</h4>
                <p>Technical + HR round.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">FAQs</h2>

          <div className="faq-item">
            <div className="faq-question">
              Is this internship remote?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Yes, this internship is fully remote.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              Are there extension opportunities?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              High-performing interns may be offered full-time roles.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="internship-cta">
        <div className="container">
          <h2>Ready to Apply?</h2>
          <button className="btn apply-btn">Submit Application</button>
        </div>
      </section>

    </div>
  );
}
