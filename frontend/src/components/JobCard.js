import React from "react";
import "../styles/job-card.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  if (!job) return null;

  // Basic formatting for the card
  const { 
    title, 
    company, 
    description, 
    salary, 
    location, 
    skills = [], 
    created_at 
  } = job;

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
      className="job-card-template"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="job-header">
        <h3 className="job-title">{title}</h3>
        <p className="company-name">{company}</p>
      </div>

      <p className="job-desc">
        {description?.length > 120 
          ? `${description.substring(0, 117)}...` 
          : description}
      </p>

      {skills.length > 0 && (
        <div className="job-tags">
          {skills.slice(0, 3).map((tag, index) => (
            <span key={index} className="job-tag">{tag}</span>
          ))}
          {skills.length > 3 && <span className="job-tag">+{skills.length - 3}</span>}
        </div>
      )}

      <div className="job-meta">
        <span><FaMapMarkerAlt /> {location || "Remote"}</span>
        <span><FaMoneyBillWave /> {salary || "Not Specified"}</span>
        <span><FaClock /> {getTimeAgo(created_at)}</span>
      </div>

      <Link 
        to="/job-details" 
        state={{ job }} 
        className="job-view-btn"
      >
        View Job Details
      </Link>
    </motion.div>
  );
}
