import React from "react";
import "../styles/job-card.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBill, FaClock } from "react-icons/fa";

export default function JobCard({ title, company, salary, location, posted, link }) {
  return (
    <div className="job-card">
      <h3 className="job-title">{title}</h3>
      <p className="company-name">{company}</p>

      <div className="job-meta">
        <span><FaMapMarkerAlt /> {location}</span>
        <span><FaMoneyBill /> {salary}</span>
        <span><FaClock /> {posted}</span>
      </div>

      <Link to={link} className="btn job-view-btn">
        View Details
      </Link>
    </div>
  );
}
