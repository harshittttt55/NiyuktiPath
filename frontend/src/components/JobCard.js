import React from "react";
import "../styles/job-card.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBill, FaClock } from "react-icons/fa";

export default function JobCard({
  title,
  company,
  desc,
  salary,
  location,
  posted,
  tags = [],
  link = "/job-details"
}) {
  return (
    <div className="job-card-template">

      {/* Header */}
      <div className="job-header">
        <h3 className="job-title">{title}</h3>
        <p className="company-name">{company}</p>
      </div>

      {/* Description */}
      <p className="job-desc">{desc}</p>

      {/* Tag chips */}
      {tags.length > 0 && (
        <div className="job-tags">
          {tags.map((tag, index) => (
            <span key={index} className="job-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Meta info */}
      <div className="job-meta">
        <span><FaMapMarkerAlt /> {location}</span>
        <span><FaMoneyBill /> {salary}</span>
        <span><FaClock /> {posted}</span>
      </div>

      {/* CTA */}
      <Link to={link} className="job-view-btn">
        View Job
      </Link>

    </div>
  );
}
