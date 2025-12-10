import React from "react";
import JobCard from "../components/JobCard";
import "../styles/jobs.css";
import { Link } from "react-router-dom";
import DarkVeil from '../components/DarkVeil';

export default function Jobs() {

  const jobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Pvt. Ltd.",
      desc: "Build interactive UI components and modern web experiences.",
      salary: "₹8L – ₹14L",
      location: "New Delhi",
      posted: "2 days ago",
      tags: ["React", "UI/UX", "JavaScript"],
    },
    {
      title: "Backend Engineer",
      company: "CloudLift Technologies",
      desc: "Design APIs and backend architecture for scalable systems.",
      salary: "₹10L – ₹18L",
      location: "Remote",
      posted: "4 days ago",
      tags: ["Node.js", "MongoDB", "REST API"],
    },
    {
      title: "UI/UX Designer",
      company: "Creative Labs",
      desc: "Design digital products and seamless experiences.",
      salary: "₹6L – ₹12L",
      location: "Bangalore",
      posted: "1 week ago",
      tags: ["Figma", "Wireframes"],
    }
  ];

  return (
    <div className="jobs-page">
      {/* Hero */}
      <section className="jobs-hero">
        <div className="darkveil-wrapper">
          <DarkVeil />
        </div>

        <div className="container hero-content">
          <h1>Latest Opportunities</h1>
          <p>Explore curated openings from top companies.</p>
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
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Work Mode</label>
              <select>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="City / Remote" />
            </div>

            <button type="submit" className="btn filter-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Jobs List */}
      <section className="section">
        <div className="container">
          <div className="job-listings">

            {jobs.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                company={job.company}
                desc={job.desc}
                salary={job.salary}
                location={job.location}
                posted={job.posted}
                tags={job.tags}
                link="/job-details"
              />
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jobs-cta">
        <div className="container">
          <h2>Are you hiring?</h2>
          <p>Post your job openings and reach top talent.</p>
          <Link to="/post-job" className="btn cta-btn">
            Post a Job
          </Link>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>

          <div className="faq-list">

            <details className="faq-item">
              <summary>How do I apply for a job?</summary>
              <p>Click “View Job” and follow the application instructions given for that position.</p>
            </details>

            <details className="faq-item">
              <summary>Can companies post jobs here?</summary>
              <p>Yes! Employers can add job listings using the Post Job page.</p>
            </details>

            <details className="faq-item">
              <summary>Is applying for jobs free?</summary>
              <p>Yes, job seekers can apply without any charges.</p>
            </details>

            <details className="faq-item">
              <summary>Does this site support remote jobs?</summary>
              <p>Yes, you can filter and find remote or hybrid openings easily.</p>
            </details>

          </div>
        </div>
      </section>

    </div>
  );
}
