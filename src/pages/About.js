import React from "react";
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Niyukti</h1>
          <p>
            Empowering students, job seekers, and employers by bridging
            opportunities with talent.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            At Niyukti, our mission is to simplify job and internship discovery,
            making career-building accessible to everyone.
          </p>

          <div className="mission-grid">
            <div className="mission-card">
              <i className="fa-solid fa-bullseye"></i>
              <h3>Career Guidance</h3>
              <p>
                We help students find their direction with verified internships
                and career resources.
              </p>
            </div>

            <div className="mission-card">
              <i className="fa-solid fa-handshake"></i>
              <h3>Employer Support</h3>
              <p>
                Creating a seamless platform for companies to post jobs and
                assess talent.
              </p>
            </div>

            <div className="mission-card">
              <i className="fa-solid fa-users"></i>
              <h3>Building Community</h3>
              <p>
                Connecting thousands of learners and professionals to grow
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>2023</h4>
                <p>Concept of Niyukti was introduced to help students.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>2024</h4>
                <p>Beta launch with Jobs, Internships & Resume Builder.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>2025</h4>
                <p>Platform expanded with Career Resources & Employer Portal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-img"></div>
              <h3>Harshit Sharma</h3>
              <p>Founder / Full-Stack Developer</p>
            </div>

            <div className="team-card">
              <div className="team-img"></div>
              <h3>Aryan Gupta</h3>
              <p>Co-Founder / UI Designer</p>
            </div>

            <div className="team-card">
              <div className="team-img"></div>
              <h3>Team Member 3</h3>
              <p>Marketing Lead</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
