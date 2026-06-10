import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaClock, 
  FaBriefcase, 
  FaRegBookmark, 
  FaShareAlt, 
  FaChevronLeft,
  FaCheckCircle,
  FaBuilding,
  FaEnvelope,
  FaGlobe,
  FaTools
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/internship-detail.css";

import { API, getAuthenticatedData, putAuthenticatedData } from "../utils/api";

export default function InternshipDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const internship = location.state?.internship;

  const [isApplied, setIsApplied] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [applying, setApplying] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    checkInitialStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkInitialStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token || !internship) return;

    try {
      const profile = await getAuthenticatedData(API.PROFILE);
      if (profile && !profile.detail) {
        setIsApplied(profile.applied_jobs?.some(j => (j.id === internship.id) || (j.title === internship.title && j.company === internship.company)));
        setIsSaved(profile.saved_jobs?.some(j => (j.id === internship.id) || (j.title === internship.title && j.company === internship.company)));
      }
    } catch (err) {
      console.error("Status check failed:", err);
    }
  };

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to apply for this internship.");
      navigate("/signin");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "job_provider") {
      alert("Recruiters cannot apply for internships.");
      return;
    }

    setApplying(true);
    try {
      const profile = await getAuthenticatedData(API.PROFILE);
      if (!profile || profile.detail) throw new Error("Could not fetch profile");

      const alreadyApplied = profile.applied_jobs?.some(j => (j.id === internship.id) || (j.title === internship.title && j.company === internship.company));
      if (alreadyApplied) {
        alert("You have already applied for this internship!");
        setIsApplied(true);
        setApplying(false);
        return;
      }

      const newApplication = {
        id: internship.id,
        title: internship.title,
        company: internship.company,
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
      alert("Please sign in to save this internship.");
      navigate("/signin");
      return;
    }

    setSaving(true);
    try {
      const profile = await getAuthenticatedData(API.PROFILE);
      if (!profile || profile.detail) throw new Error("Could not fetch profile");

      let updatedSavedJobs = [...(profile.saved_jobs || [])];
      
      if (isSaved) {
        updatedSavedJobs = updatedSavedJobs.filter(j => !( (j.id === internship.id) || (j.title === internship.title && j.company === internship.company) ));
      } else {
        updatedSavedJobs = [{
          id: internship.id,
          title: internship.title,
          company: internship.company,
          location: internship.location,
          salary: internship.stipend
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
        title: internship.title,
        text: `Check out this internship at ${internship.company}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!internship) {
    return (
      <div className="internship-details-page" style={{ padding: "100px 20px", textAlign: "center" }}>
        <div className="container">
          <h2>No internship details found.</h2>
          <p>Please select an internship from the <Link to="/internships">Internships page</Link>.</p>
          <button onClick={() => navigate("/internships")} className="btn btn-primary" style={{ marginTop: "20px" }}>
            Browse Internships
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
      className="internship-details-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ── HERO SECTION ── */}
      <section className="internship-details-hero">
        <div className="container">
          <motion.button 
            className="back-btn" 
            onClick={() => navigate(-1)}
            whileHover={{ x: -5 }}
          >
            <FaChevronLeft /> Back to Internships
          </motion.button>
          
          <motion.h1 variants={itemVariants}>{internship.title}</motion.h1>
          <motion.div className="company-name" variants={itemVariants}>
            <FaBuilding /> {internship.company}
          </motion.div>

          <motion.div className="internship-meta-badges" variants={itemVariants}>
            <span className="meta-badge"><FaMapMarkerAlt /> {internship.location || "Remote"}</span>
            <span className="meta-badge"><FaBriefcase /> {internship.internshipType || "Full Time"}</span>
            <span className="meta-badge"><FaMoneyBillWave /> {internship.stipend || "Not Specified"}</span>
            <span className="meta-badge"><FaClock /> {internship.posted || "Recently"}</span>
          </motion.div>

          <motion.div className="internship-actions" variants={itemVariants}>
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
              {isSaved ? <FaRegBookmark color="#0052CC" fill="#0052CC" /> : <FaRegBookmark />} 
              {saving ? "..." : isSaved ? "Saved" : "Save"}
            </button>
            <button className="btn accent-btn-outline" onClick={handleShare}><FaShareAlt /> Share</button>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="internship-details-body">
        <div className="internship-content-grid">
          
          {/* LEFT: INTERNSHIP CONTENT */}
          <div className="internship-main-column">
            <motion.div className="internship-content-card" variants={itemVariants}>
              
              <div className="internship-section">
                <h2><FaTools /> Internship Description</h2>
                <p>{internship.desc || internship.description}</p>
              </div>

              {internship.skills && internship.skills.length > 0 && (
                <div className="internship-section">
                  <h2><FaCheckCircle /> Required Skills</h2>
                  <div className="skills-chips">
                    {internship.skills.map((skill, i) => (
                      <span key={i} className="skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="internship-section">
                <h2><FaCheckCircle /> Role & Responsibilities</h2>
                <ul>
                  <li>Assist the team in developing and implementing new features.</li>
                  <li>Learn and apply modern technologies under guidance.</li>
                  <li>Participate in daily stand-ups and sprint planning.</li>
                  <li>Gain hands-on experience in a professional environment.</li>
                </ul>
              </div>

              {internship.perks && (
                <div className="internship-section">
                  <h2><FaCheckCircle /> Perks & Benefits</h2>
                  <p>{internship.perks}</p>
                </div>
              )}
            </motion.div>

            {/* Selection Process */}
            <motion.div className="timeline-section-card" variants={itemVariants}>
              <h2 className="section-title">Selection Process</h2>
              <div className="timeline-v2">
                {[
                  { step: "1", title: "Shortlisting", desc: "Our team will review your application and portfolio." },
                  { step: "2", title: "Assignment / Initial Screening", desc: "A task to evaluate your basic skills or a quick call." },
                  { step: "3", title: "Technical/Panel Interview", desc: "Interactive session with our technical leads." },
                  { step: "4", title: "Selection Letter", desc: "Welcome aboard! Final details and onboarding." }
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

          {/* RIGHT: SIDEBAR */}
          <aside className="internship-sidebar">
            <motion.div className="sidebar-card" variants={itemVariants}>
              <h3>Quick Summary</h3>
              <div className="sidebar-info-row">
                <span className="label"><FaEnvelope /> Contact</span>
                <span className="value">{internship.email || "careers@company.com"}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label"><FaGlobe /> Work Mode</span>
                <span className="value">{internship.workMode || "Remote"}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label"><FaClock /> Duration</span>
                <span className="value">{internship.duration || "3-6 Months"}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label"><FaClock /> Deadline</span>
                <span className="value">{internship.deadline || "Apply Soon"}</span>
              </div>
              
              {JSON.parse(localStorage.getItem("user") || "{}").role !== "job_provider" && (
                <button 
                  className={`sidebar-apply-btn mt-2 ${isApplied ? 'disabled' : ''}`}
                  onClick={handleApply}
                  disabled={isApplied || applying}
                >
                  {isApplied ? "Already Applied" : "Apply for Internship"}
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
                  <h4>{internship.company}</h4>
                  <p>Innovation Center</p>
                </div>
              </div>
              <p className="company-bio">
                A leading startup dedicated to providing amazing opportunities for students and freshers to kickstart their careers.
              </p>
              <Link to="#" className="view-more-link">View Company Profile</Link>
            </motion.div>
          </aside>

        </div>
      </section>
    </motion.div>
  );
}
