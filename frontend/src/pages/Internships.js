import React from "react";
import InternshipCard from "../components/InternshipCard";
import "../styles/internships.css";
import { Link } from "react-router-dom";
import DarkVeil from '../components/DarkVeil';

export default function Internships() {
  const internships = [
    {
      title: "React Intern",
      company: "Innovate Labs",
      desc: "Learn React and contribute to production-level projects.",
      duration: "3 Months",
      location: "Remote",
      posted: "1 day ago",
      tags: ["React", "Web Dev"]
    },
    {
      title: "Backend Development Intern",
      company: "Scalable Systems",
      desc: "Assist in building scalable APIs and learning Node.js.",
      duration: "6 Months",
      location: "Mumbai",
      posted: "2 days ago",
      tags: ["Node.js", "Express", "MongoDB"]
    },
    {
      title: "UI/UX Design Intern",
      company: "Visual Pixels",
      desc: "Work on user interface designs and user research experiments.",
      duration: "2 Months",
      location: "Bangalore",
      posted: "1 week ago",
      tags: ["Figma", "UI/UX", "Adobe XD"]
    }
  ];

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

          <div className="internship-listings">

            {internships.map((internship, index) => (
              <InternshipCard
                key={index}
                title={internship.title}
                company={internship.company}
                desc={internship.desc}
                duration={internship.duration}
                location={internship.location}
                posted={internship.posted}
                tags={internship.tags}
              />
            ))}

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-item">
            <div className="faq-question">
              Are the internships paid?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Some internships offer stipends while others may be unpaid.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              Can freshers apply?
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Yes, most internships are suitable for beginners.
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="internship-cta">
        <div className="container">
          <h2>Are you hiring interns?</h2>
          <p>Post an internship and find the best talent.</p>
          <Link to="/post-internship" className="btn cta-btn">
            Post Internship
          </Link>
        </div>
      </section>

    </div>
  );
}
