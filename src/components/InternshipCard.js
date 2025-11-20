import React from "react";
import "../styles/internship-card.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendar } from "react-icons/fa";

export default function InternshipCard({ title, company, duration, location, posted, link, tags }) {
  return (
    <div className="internship-card">
      <h3 className="internship-title">{title}</h3>
      <p className="company-name">{company}</p>

      <div className="internship-tags">
        {tags.map((tag, idx) => (
          <span key={idx} className="internship-tag">{tag}</span>
        ))}
      </div>

      <div className="internship-meta">
        <span><FaMapMarkerAlt /> {location}</span>
        <span><FaCalendar /> {duration}</span>
        <span><FaClock /> {posted}</span>
      </div>

      <Link to={link} className="btn internship-view-btn">
        View Details
      </Link>
    </div>
  );
}
