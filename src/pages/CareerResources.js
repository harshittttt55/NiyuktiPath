import React from "react";
import "../styles/career-resources.css";

export default function CareerResources() {
  return (
    <div className="career-page">

      {/* Hero Section */}
      <section className="career-hero">
        <div className="container">
          <h1>Career Resources</h1>
          <p>Your guide to building a successful career path.</p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Explore Guides</h2>

          <div className="career-grid">

            {/* Card 1 */}
            <div className="career-card">
              <i className="fa-solid fa-file-lines card-icon"></i>
              <h3>Resume Building</h3>
              <p>
                Learn how to write a professional resume that stands out and
                impresses employers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="career-card">
              <i className="fa-solid fa-comments card-icon"></i>
              <h3>Interview Preparation</h3>
              <p>
                Know the important interview questions, tips, and strategies to
                crack your interview.
              </p>
            </div>

            {/* Card 3 */}
            <div className="career-card">
              <i className="fa-solid fa-chart-line card-icon"></i>
              <h3>Skill Development</h3>
              <p>
                Improve your skills with top courses, tutorials, and real-world
                projects.
              </p>
            </div>

            {/* Card 4 */}
            <div className="career-card">
              <i className="fa-solid fa-briefcase card-icon"></i>
              <h3>Job Search Tips</h3>
              <p>
                Smart ways to find jobs effectively and stand out from the
                competition.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Career Guide */}
      <section className="career-guide">
        <div className="container">
          <h2 className="section-title">Career Growth Path</h2>

          <div className="guide-steps">

            <div className="guide-step">
              <span className="step-number">1</span>
              <h3>Identify Your Strengths</h3>
              <p>Understand what you’re good at and what motivates you.</p>
            </div>

            <div className="guide-step">
              <span className="step-number">2</span>
              <h3>Build Real Skills</h3>
              <p>Learn relevant tools, languages, and technologies.</p>
            </div>

            <div className="guide-step">
              <span className="step-number">3</span>
              <h3>Create a Strong Resume</h3>
              <p>Present your achievements and skills in a structured way.</p>
            </div>

            <div className="guide-step">
              <span className="step-number">4</span>
              <h3>Apply Consistently</h3>
              <p>Search and apply regularly to increase your chances.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="career-cta">
        <div className="container">
          <h2>Start Your Career Journey Today</h2>
          <p>Explore jobs, internships, and career tips in one platform.</p>
          <a href="/signup" className="btn cta-btn">
            Get Started
          </a>
        </div>
      </section>

    </div>
  );
}
