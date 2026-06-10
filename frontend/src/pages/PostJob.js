import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/post-job.css";
import {
  FaRocket, FaBriefcase, FaBuilding, FaEnvelope, FaMapMarkerAlt,
  FaMoneyBillWave, FaPlus, FaInfoCircle, FaClock, FaUserTie,
  FaGlobe, FaLink, FaCalendarAlt, FaTags
} from "react-icons/fa";
import { API, getAuthenticatedData, putAuthenticatedData, BASE_URL } from "../utils/api";

export default function PostJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const editJobData = location.state?.editJob;

  const [skills, setSkills] = useState(editJobData?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [previewAccepted, setPreviewAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    title: editJobData?.title || "",
    company: editJobData?.company || "",
    email: editJobData?.email || "",
    location: editJobData?.location || "",
    salary: editJobData?.salary || "",
    jobType: editJobData?.jobType || "Full Time",
    workMode: editJobData?.workMode || "On-site",
    experience: editJobData?.experience || "Fresher",
    category: editJobData?.category || "Software Development",
    deadline: editJobData?.deadline || "",
    applyLink: editJobData?.applyLink || "",
    description: editJobData?.description || "",
    perks: editJobData?.perks || "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/signin");
        return;
      }

      const user = JSON.parse(storedUser);
      if (user.role === "job_seeker") {
        alert("Only recruiters can manage jobs.");
        navigate("/");
        return;
      }

      // Pre-fill profile info if NOT in edit mode
      if (!editJobData) {
        try {
          const profile = await getAuthenticatedData(API.PROFILE);
          if (profile && !profile.detail) {
            setFormData(prev => ({
              ...prev,
              company: profile.company_name || "",
              email: profile.contact_email || ""
            }));
          }
        } catch (err) {
          console.error("Profile fetch failed:", err);
        }
      }
    };

    checkAuth();
  }, [navigate, editJobData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = (e) => {
    if (e) e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewAccepted) {
      alert("Please check the verification box.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData, skills };

      let response;
      if (editJobData) {
        // UPDATE MODE
        const result = await putAuthenticatedData(`${API.JOBS}/${editJobData.id}`, payload);
        if (result && !result.detail) {
          alert("Job updated successfully!");
          navigate("/profile/recruiter");
        } else {
          throw new Error(result?.detail || "Update failed");
        }
      } else {
        // CREATE MODE
        response = await fetch(`${BASE_URL}/jobs/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Post failed");

        alert("Job published successfully!");
        navigate("/profile/recruiter");
      }
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="postjob-page">
      <section className="postjob-hero">
        <div className="container">
          <h1>{editJobData ? "Edit" : "Post a"} <span className="highlight">Job</span></h1>
          <p>{editJobData ? "Update your job listing details." : "Find the perfect talent for your team."}</p>
        </div>
      </section>

      <section className="postjob-section">
        <div className="postjob-container">
          <form className="postjob-form" onSubmit={handleSubmit}>

            <div className="form-section">
              <div className="section-header">
                <FaInfoCircle className="section-icon" />
                <h3>{editJobData ? "Update" : "Basic"} Information</h3>
              </div>
              <div className="form-group">
                <label><FaBriefcase className="label-icon" /> Job Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FaTags className="label-icon" /> Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Software Development">Software Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><FaClock className="label-icon" /> Job Type</label>
                  <select name="jobType" value={formData.jobType} onChange={handleChange}>
                    <option value="Full Time">Full Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header"><FaBuilding className="section-icon" /> Company & Location</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name *</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Hiring Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Salary</label>
                  <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header"><FaPlus className="section-icon" /> Additional Details</div>
              <div className="form-group">
                <label>Job Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={6}></textarea>
              </div>
              <div className="form-group">
                <label>Skills</label>
                <div className="skill-input" style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill(e)} placeholder="Add a skill" />
                  <button type="button" onClick={addSkill} className="add-skill-btn" style={{ padding: '0 15px', background: '#0052CC', color: 'white', borderRadius: '4px' }}><FaPlus /></button>
                </div>
                <div className="skill-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {skills.map((s, i) => (
                    <span key={i} className="skill-tag" style={{ background: '#EBECF0', padding: '4px 10px', borderRadius: '12px', fontSize: '13px' }}>
                      {s} <span onClick={() => removeSkill(s)} style={{ cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}>×</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-footer">
              <div className="preview-check" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input type="checkbox" id="verify" checked={previewAccepted} onChange={() => setPreviewAccepted(!previewAccepted)} />
                <label htmlFor="verify">I verify that these job details are correct.</label>
              </div>
              {submitError && <p style={{ color: 'red', marginBottom: '10px' }}>{submitError}</p>}
              <button type="submit" className="postjob-submit" disabled={!previewAccepted || isSubmitting}>
                <FaRocket /> {isSubmitting ? "Processing..." : (editJobData ? "Update Job" : "Publish Job")}
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}