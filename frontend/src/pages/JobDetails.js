import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaClock, 
  FaBriefcase, 
  FaRegBookmark, 
  FaBookmark,
  FaShareAlt, 
  FaChevronLeft,
  FaCheckCircle,
  FaBuilding,
  FaEnvelope,
  FaGlobe,
  FaTools
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/job-details.css";
import { API, getAuthenticatedData, putAuthenticatedData } from "../utils/api";

export default function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    checkInitialStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkInitialStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token || !job) return;

    try {
      const profile = await getAuthenticatedData(API.PROFILE);
      if (profile && !profile.detail) {
        setIsApplied(profile.applied_jobs?.some(j => (j.id === job.id) || (j.title === job.title && j.company === job.company)));
        setIsSaved(profile.saved_jobs?.some(j => (j.id === job.id) || (j.title === job.title && j.company === job.company)));
      }
    } catch (err) {
      console.error("Status check failed:", err);
    }
  };

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to apply for this job.");
      navigate("/signin");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "job_provider") {
      alert("Recruiters cannot apply for jobs.");
      return;
    }

    setApplying(true);
    try {
      const profile = await getAuthenticatedData(API.PROFILE);
      if (!profile || profile.detail) throw new Error("Could not fetch profile");

      const alreadyApplied = profile.applied_jobs?.some(j => (j.id === job.id) || (j.title === job.title && j.company === job.company));
      if (alreadyApplied) {
        alert("You have already applied for this job!");
        setIsApplied(true);
        setApplying(false);
        return;
      }

      const newApplication = {
        id: job.id,
        title: job.title,
        company: job.company,
        date: new Date().toISOString().split('T')[0],
        status: "Applied"
      };

      const result = await putAuthenticatedData(API.PROFILE, {
        ...profile,
        applied_jobs: [newApplication, ...(profile.applied_jobs || [])]
      });

      if (result && !result.detail) {
        setIsApplied(true);
        alert("Application submitted successfully!");
      }
    } catch (err) {
      console.error("Apply error:", err);
    } finally {
      setApplying(false);
    }
  };

  const handleSaveToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to save this job.");
      navigate("/signin");
      return;
    }

    setSaving(true);
    try {
      const profile = await getAuthenticatedData(API.PROFILE);
      if (!profile || profile.detail) throw new Error("Could not fetch profile");

      let updatedSavedJobs = [...(profile.saved_jobs || [])];
      
      if (isSaved) {
        // Remove from saved
        updatedSavedJobs = updatedSavedJobs.filter(j => !(j.title === job.title && j.company === job.company));
      } else {
        // Add to saved
        updatedSavedJobs = [{
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary
        }, ...updatedSavedJobs];
      }

      const result = await putAuthenticatedData(API.PROFILE, {
        ...profile,
        saved_jobs: updatedSavedJobs
      });

      if (result && !result.detail) {
        setIsSaved(!isSaved);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job at ${job.company}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!job) {
    return (
      <div className="job-details-page" style={{ padding: "100px 20px", textAlign: "center" }}>
        <div className="container">
          <h2>No job details found.</h2>
          <p>Please select a job from the <Link to="/jobs">Jobs page</Link>.</p>
          <button onClick={() => navigate("/jobs")} className="btn btn-primary" style={{ marginTop: "20px" }}>
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="job-details-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="job-details-hero">
        <div className="container">
          <motion.button 
            className="back-btn" 
            onClick={() => navigate(-1)}
            whileHover={{ x: -5 }}
          >
            <FaChevronLeft /> Back to Jobs
          </motion.button>
          
          <motion.h1 variants={itemVariants}>{job.title}</motion.h1>
          <motion.div className="company-name" variants={itemVariants}>
            <FaBuilding /> {job.company}
          </motion.div>

          <motion.div className="job-meta-badges" variants={itemVariants}>
            <span className="meta-badge"><FaMapMarkerAlt /> {job.location || "Remote"}</span>
            <span className="meta-badge"><FaBriefcase /> {job.jobType || "Full Time"}</span>
            <span className="meta-badge"><FaMoneyBillWave /> {job.salary || "Not Specified"}</span>
            <span className="meta-badge"><FaClock /> {job.posted || "Recently"}</span>
          </motion.div>

          <motion.div className="job-actions" variants={itemVariants}>
            {JSON.parse(localStorage.getItem("user") || "{}").role !== "job_provider" && (
              <button 
                className={`btn ${isApplied ? 'applied-btn' : 'apply-btn-primary'}`} 
                onClick={handleApply}
                disabled={isApplied || applying}
              >
                {applying ? "Applying..." : isApplied ? "Applied" : "Apply Now"}
              </button>
            )}
            <button 
              className="btn accent-btn-outline" 
              onClick={handleSaveToggle}
              disabled={saving}
            >
              {isSaved ? <FaBookmark color="#0052CC" /> : <FaRegBookmark />} 
              {saving ? "..." : isSaved ? "Saved" : "Save"}
            </button>
            <button className="btn accent-btn-outline" onClick={handleShare}><FaShareAlt /> Share</button>
          </motion.div>
        </div>
      </section>

      <section className="job-details-body">
        <div className="job-content-grid">
          <div className="job-main-column">
            <motion.div className="job-content-card" variants={itemVariants}>
              <div className="job-section">
                <h2><FaTools /> Job Description</h2>
                <p>{job.desc || job.description}</p>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className="job-section">
                  <h2><FaCheckCircle /> Required Skills</h2>
                  <div className="skills-chips">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="job-section">
                <h2><FaCheckCircle /> Key Responsibilities</h2>
                <ul>
                  <li>Work with cross-functional teams to deliver high-quality solutions.</li>
                  <li>Ensure code quality and maintainability.</li>
                  <li>Optimize applications for maximum speed and scalability.</li>
                  <li>Participate in code reviews and architectural discussions.</li>
                </ul>
              </div>

              {job.perks && (
                <div className="job-section">
                  <h2><FaCheckCircle /> Perks & Benefits</h2>
                  <p>{job.perks}</p>
                </div>
              )}
            </motion.div>

            <motion.div className="timeline-section-card" variants={itemVariants}>
              <h2 className="section-title">Hiring Process</h2>
              <div className="timeline-v2">
                {[
                  { step: "1", title: "Application Review", desc: "Our recruiters will review your resume and portfolio." },
                  { step: "2", title: "Technical Interview", desc: "A deep dive into your technical skills and experience." },
                  { step: "3", title: "Culture Fit Round", desc: "Conversations with the team to see if we're a match." },
                  { step: "4", title: "Job Offer", desc: "Final negotiations and signing the offer letter." }
                ].map((item, i) => (
                  <div className="timeline-item-v2" key={i}>
                    <div className="timeline-index">{item.step}</div>
                    <div className="timeline-text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <aside className="job-sidebar">
            <motion.div className="sidebar-card" variants={itemVariants}>
              <h3>Quick Summary</h3>
              <div className="sidebar-info-row">
                <span className="label"><FaEnvelope /> Contact</span>
                <span className="value">{job.email || "hiring@company.com"}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label"><FaGlobe /> Work Mode</span>
                <span className="value">{job.workMode || "On-site"}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label"><FaMapMarkerAlt /> Experience</span>
                <span className="value">{job.experience || "Fresher"}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label"><FaClock /> Application Date</span>
                <span className="value">{job.deadline || "ASAP"}</span>
              </div>
              
              {JSON.parse(localStorage.getItem("user") || "{}").role !== "job_provider" && (
                <button 
                  className={`sidebar-apply-btn mt-2 ${isApplied ? 'disabled' : ''}`}
                  onClick={handleApply}
                  disabled={isApplied || applying}
                >
                  {isApplied ? "Already Applied" : "Apply for this Job"}
                </button>
              )}
            </motion.div>

            <motion.div className="sidebar-card company-brief" variants={itemVariants}>
              <h3>About Company</h3>
              <div className="company-info">
                <div className="company-logo-placeholder">
                  <FaBuilding />
                </div>
                <div>
                  <h4>{job.company}</h4>
                  <p>Technology Solutions Provider</p>
                </div>
              </div>
              <p className="company-bio">
                Leading the way in innovative digital solutions and building the future of web technologies.
              </p>
              <Link to="#" className="view-more-link">View Company Profile</Link>
            </motion.div>
          </aside>
        </div>
      </section>
    </motion.div>
  );
}
