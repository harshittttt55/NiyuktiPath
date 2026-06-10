import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/internship-post.css";
import {
  FaRocket,
  FaLaptopCode,
  FaBuilding,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPlus,
  FaInfoCircle,
  FaClock,
  FaUserGraduate,
  FaGlobe,
  FaLink,
  FaCalendarAlt,
  FaTags
} from "react-icons/fa";
import { BASE_URL } from "../utils/api";

export default function InternshipPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editInternshipData = location.state?.editInternship;

  const [skills, setSkills] = useState(editInternshipData?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [previewAccepted, setPreviewAccepted] = useState(false);

  const [formData, setFormData] = useState({
    title: editInternshipData?.title || "",
    company: editInternshipData?.company || "",
    email: editInternshipData?.email || "",
    location: editInternshipData?.location || "",
    stipend: editInternshipData?.stipend || "",
    internshipType: editInternshipData?.internshipType || "Full Time",
    workMode: editInternshipData?.workMode || "Remote",
    duration: editInternshipData?.duration || "3 Months",
    category: editInternshipData?.category || "Software Development",
    deadline: editInternshipData?.deadline || "",
    applyLink: editInternshipData?.applyLink || "",
    description: editInternshipData?.description || editInternshipData?.desc || "",
    perks: editInternshipData?.perks || "",
  });

  // Role protection (Similar to PostJob)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      const shouldSignin = window.confirm("You must sign in as a recruiter to post internships.\n\nDo you want to sign in?");
      if (shouldSignin) navigate("/signin");
      else navigate("/");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.role === "job_seeker") {
      const allowRedirect = window.confirm("Only recruiters/employers can post internships.\n\nDo you want to sign in with an employer account?");
      if (allowRedirect) navigate("/signin");
      else navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewAccepted) {
      alert("Please confirm the preview before publishing.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData, skills };
      
      console.log("Submitting internship payload:", payload);

      if (editInternshipData) {
        // UPDATE MODE
        const response = await fetch(`${BASE_URL}/internships/${editInternshipData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Update failed");

        alert("Internship updated successfully!");
        navigate("/profile/recruiter");
      } else {
        // CREATE MODE
        const response = await fetch(`${BASE_URL}/internships/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Failed to post internship.");

        alert("Internship posted successfully!");
        navigate("/internships");
      }
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="internpost-page">
      {/* HERO */}
      <section className="internpost-hero">
        <div className="container">
          <h1>
            {editInternshipData ? "Edit" : "Post an"} <span className="highlight">Internship</span>
          </h1>
          <p>
            {editInternshipData ? "Update your internship listing details." : "Help students and freshers kickstart their careers. Share your opportunities with talented young minds."}
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="internpost-section">
        <div className="internpost-container">
          <form className="internpost-form" onSubmit={handleSubmit}>
            
            {/* BASIC INFO */}
            <div className="form-section">
              <div className="section-header">
                <FaInfoCircle className="section-icon" />
                <h3>Internship Basics</h3>
              </div>
              
              <div className="form-group">
                <label>
                  <FaLaptopCode className="label-icon" /> Internship Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. ReactJS Intern"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaTags className="label-icon" /> Category
                  </label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Design">UI/UX Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FaClock className="label-icon" /> Internship Type
                  </label>
                  <select name="internshipType" value={formData.internshipType} onChange={handleChange}>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaGlobe className="label-icon" /> Work Mode
                  </label>
                  <select name="workMode" value={formData.workMode} onChange={handleChange}>
                    <option value="Remote">Remote</option>
                    <option value="In-office">In-office</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FaCalendarAlt className="label-icon" /> Duration
                  </label>
                  <select name="duration" value={formData.duration} onChange={handleChange}>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            {/* COMPANY INFO */}
            <div className="form-section">
              <div className="section-header">
                <FaBuilding className="section-icon" />
                <h3>Employer Details</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaBuilding className="label-icon" /> Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Innovate Labs"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaEnvelope className="label-icon" /> Hiring Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="hr@innovate.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaMapMarkerAlt className="label-icon" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Remote / Mumbai"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaMoneyBillWave className="label-icon" /> Stipend (per month)
                  </label>
                  <input
                    type="text"
                    name="stipend"
                    placeholder="e.g. ₹5,000 - ₹10,000"
                    value={formData.stipend}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="form-section">
              <div className="section-header">
                <FaPlus className="section-icon" />
                <h3>Role Description & Skills</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaCalendarAlt className="label-icon" /> Last Date to Apply
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaLink className="label-icon" /> Application Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="applyLink"
                    placeholder="https://..."
                    value={formData.applyLink}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FaInfoCircle className="label-icon" /> Internship Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us about the project, learning opportunities, and requirements..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>
                  <FaTags className="label-icon" /> Skills Required
                </label>
                <div className="skill-input">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g. React)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill(e)}
                  />
                  <button type="button" onClick={addSkill} className="add-btn">
                    <FaPlus />
                  </button>
                </div>
                <div className="skill-list">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-tag" onClick={() => removeSkill(skill)}>
                      {skill} <span>×</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FaUserGraduate className="label-icon" /> Perks & Benefits
                </label>
                <input
                  type="text"
                  name="perks"
                  placeholder="e.g. Certificate, Letter of Rec, PPO offer"
                  value={formData.perks}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="form-footer">
              <div className="confirm-check">
                <input
                  type="checkbox"
                  id="preview-confirm"
                  checked={previewAccepted}
                  onChange={() => setPreviewAccepted(!previewAccepted)}
                />
                <label htmlFor="preview-confirm">
                  I agree to the <a href="/terms">Employer Terms</a> and confirm the details are correct.
                </label>
              </div>

              {submitError && <p className="error-msg">❌ {submitError}</p>}

              <button
                type="submit"
                className="submit-btn"
                disabled={!previewAccepted || isSubmitting}
              >
                <FaRocket className="icons" />
                {isSubmitting ? "Processing..." : (editInternshipData ? "Update Internship" : "Publish Internship")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
