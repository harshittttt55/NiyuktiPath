import React from "react";
import "../styles/resume-builder.css";

export default function ResumeBuilder() {
  return (
    <div className="resume-builder-page">

      {/* HERO */}
      <section className="resume-hero">
        <div className="container">
          <h1>Resume Builder</h1>
          <p>Create a professional resume in minutes.</p>
        </div>
      </section>

      {/* FORM */}
      <section className="section">
        <div className="container">
          <div className="resume-form">

            <h2 className="form-title">Personal Information</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" placeholder="Enter your phone number" />
            </div>

            <h2 className="form-title">Education</h2>

            <div className="form-group">
              <label>Course / Degree</label>
              <input type="text" placeholder="e.g., B.Tech in CSE" />
            </div>

            <div className="form-group">
              <label>College Name</label>
              <input type="text" placeholder="Enter college name" />
            </div>

            <div className="form-group">
              <label>Passing Year</label>
              <input type="text" placeholder="e.g., 2025" />
            </div>

            <h2 className="form-title">Skills</h2>

            <div className="form-group">
              <label>Skills</label>
              <textarea placeholder="e.g., React, JavaScript, HTML, CSS"></textarea>
            </div>

            <h2 className="form-title">Projects</h2>

            <div className="form-group">
              <label>Project Title</label>
              <input type="text" placeholder="Enter project title" />
            </div>

            <div className="form-group">
              <label>Project Description</label>
              <textarea placeholder="Describe your project..."></textarea>
            </div>

            <button className="btn preview-btn">Preview Resume</button>

          </div>
        </div>
      </section>
    </div>
  );
}
