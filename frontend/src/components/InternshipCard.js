import React from "react";
import "../styles/internship-card.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function InternshipCard({ internship }) {
  if (!internship) return null;

  const {
    title,
    company,
    description,
    duration,
    location,
    skills = [],
    created_at
  } = internship;

  // Simple time formatting helper
  const getTimeAgo = (dateStr) => {
    if (!dateStr) return "Recently";
    try {
      const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
      if (diff < 60) return "Just now";
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    } catch {
      return "Recently";
    }
  };

  return (
    <motion.div 
      className="internship-card-template"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="internship-header">
        <h3 className="internship-title">{title}</h3>
        <p className="company-name">{company}</p>
      </div>

      <p className="internship-desc">
        {description?.length > 120 
          ? `${description.substring(0, 117)}...` 
          : description}
      </p>

      {skills.length > 0 && (
        <div className="internship-tags">
          {skills.slice(0, 3).map((tag, index) => (
            <span key={index} className="internship-tag">{tag}</span>
          ))}
          {skills.length > 3 && <span className="internship-tag">+{skills.length - 3}</span>}
        </div>
      )}

      <div className="internship-meta">
        <span><FaMapMarkerAlt /> {location || "Remote"}</span>
        <span><FaCalendar /> {duration || "Not Specified"}</span>
        <span><FaClock /> {getTimeAgo(created_at)}</span>
      </div>

      <Link 
        to="/internship-details" 
        state={{ internship }} 
        className="internship-view-btn"
      >
        View Details
      </Link>
    </motion.div>
  );
}
