import React from "react";
import "../styles/job-details.css";

export default function JobDetails() {
  return (
    <div className="job-details-page">

      {/* Hero */}
      <section className="job-details-hero">
        <div className="container">
          <h1>Frontend Developer</h1>
          <p className="company-name">Tech Solutions Pvt. Ltd.</p>

          <div className="job-meta">
            <div><i className="fa-solid fa-location-dot"></i> New Delhi</div>
            <div><i className="fa-solid fa-briefcase"></i> Full-Time</div>
            <div><i className="fa-solid fa-indian-rupee-sign"></i> 5–8 LPA</div>
            <div><i className="fa-solid fa-clock"></i> 2 days ago</div>
          </div>

          <div className="job-actions">
            <button className="btn apply-btn">Apply Now</button>
            <button className="btn save-btn">Save Job</button>
          </div>
        </div>
      </section>

      {/* Job Description */}
      <section className="section">
        <div className="container job-body">

          <div className="job-section">
            <h2>Job Description</h2>
            <p>
              We are looking for a skilled Frontend Developer who is passionate about
              building high-quality user interfaces using React.
            </p>
          </div>

          <div className="job-section">
            <h2>Responsibilities</h2>
            <ul>
              <li>Develop responsive UI with React.</li>
              <li>Collaborate with designers & backend team.</li>
              <li>Optimize applications for speed and scalability.</li>
              <li>Debug and fix UI issues.</li>
            </ul>
          </div>

          <div className="job-section">
            <h2>Required Skills</h2>
            <ul>
              <li>Strong JavaScript & React fundamentals</li>
              <li>HTML, CSS & modern frontend tools</li>
              <li>Git, APIs, JSON</li>
              <li>Basic UI/UX understanding</li>
            </ul>
          </div>

          <div className="job-section">
            <h2>Eligibility</h2>
            <ul>
              <li>Bachelor's in Computer Science or equivalent</li>
              <li>0–2 years experience</li>
              <li>Freshers can apply</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Hiring Process</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Step 1: Apply</h4>
                <p>Submit your application with a resume.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Step 2: Technical Test</h4>
                <p>Online assessment to test your problem-solving skills.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Step 3: Interview</h4>
                <p>Round with engineers & HR team.</p>
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
              What is the work mode?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Remote work option is available depending on project requirements.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              What should I include in my application?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Resume, portfolio links, and past project details.
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="job-cta">
        <div className="container">
          <h2>Ready to Apply?</h2>
          <button className="btn apply-btn">Apply Now</button>
        </div>
      </section>

    </div>
  );
}
