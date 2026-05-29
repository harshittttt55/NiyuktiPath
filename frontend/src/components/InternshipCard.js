import React from "react";
import "../styles/internship-card.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendar } from "react-icons/fa";

export default function InternshipCard({ title, company, desc, duration, location, posted, link = "/internship-post", tags = [] }) {
  return (
    <div className="internship-card">
      <div className="internship-header">
        <h3 className="internship-title">{title}</h3>
        <p className="company-name">{company}</p>
      </div>

      <div className="internship-body">
        {desc && <p className="internship-description">{desc}</p>}

        {tags.length > 0 && (
          <div className="internship-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="internship-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="internship-meta">
          <span><FaMapMarkerAlt /> {location}</span>
          <span><FaCalendar /> {duration}</span>
          <span><FaClock /> {posted}</span>
        </div>
      </div>

      <div className="internship-footer">
        <Link to={link} className="btn internship-view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}
