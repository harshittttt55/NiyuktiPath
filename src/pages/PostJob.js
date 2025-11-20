import React from "react";
import "../styles/post-job.css";

export default function PostJob() {
  return (
    <div className="postjob-page">

      {/* Hero Section */}
      <section className="postjob-hero">
        <div className="container">
          <h1>Post a Job</h1>
          <p>Find the right talent for your company quickly and easily.</p>
        </div>
      </section>

      {/* Job Posting Form */}
      <section className="section">
        <div className="container">
          <div className="postjob-form">

            <h2 className="form-title">Job Information</h2>

            <div className="form-group">
              <label>Job Title</label>
              <input type="text" placeholder="e.g., Frontend Developer" />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input type="text" placeholder="Enter company name" />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="e.g., New Delhi / Remote" />
            </div>

            <div className="form-group">
              <label>Salary / Stipend</label>
              <input type="text" placeholder="e.g., 6–10 LPA / ₹10,000 Monthly" />
            </div>

            <div className="form-group">
              <label>Experience Required</label>
              <select>
                <option>0–1 years</option>
                <option>1–3 years</option>
                <option>3–5 years</option>
              </select>
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea placeholder="Describe the job role and responsibilities"></textarea>
            </div>

            <div className="form-group">
              <label>Responsibilities</label>
              <textarea placeholder="List job responsibilities"></textarea>
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <textarea placeholder="Mention the required skills"></textarea>
            </div>

            <button className="btn submit-btn">Post Job</button>

          </div>
        </div>
      </section>
    </div>
  );
}
