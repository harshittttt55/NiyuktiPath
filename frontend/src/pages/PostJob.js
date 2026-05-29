import React, { useState } from "react";
import "../styles/post-job.css";

export default function PostJob() {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [previewAccepted, setPreviewAccepted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    email: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    workMode: "On-site",
    experience: "Fresher",
    category: "",
    deadline: "",
    applyLink: "",
    description: "",
    perks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewAccepted) {
      alert("Please confirm the preview checkbox before submitting.");
      return;
    }

    console.log("Job Posted:", { ...formData, skills });
    alert("Job posted successfully!");
  };

  return (
    <div className="postjob-page">

      {/* HERO */}
      <section className="postjob-hero">
        <div className="container">
          <h1>Post a Job</h1>
          <p>Reach the right applicants with structured details.</p>
        </div>
      </section>

      {/* FORM */}
      <section className="postjob-section">
        <div className="postjob-container">
          <h2 className="postjob-title">Job Posting Form</h2>

          <form className="postjob-form" onSubmit={handleSubmit}>

            {/* Job Title */}
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Backend Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Company Info */}
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Microsoft"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Email *</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. hiring@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Fields */}
            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Remote / Mumbai"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  placeholder="e.g. ₹5L – ₹12L"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Work Mode */}
            <div className="form-group">
              <label>Work Mode</label>
              <select name="workMode" value={formData.workMode} onChange={handleChange}>
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Experience */}
            <div className="form-group">
              <label>Experience Level</label>
              <select name="experience" value={formData.experience} onChange={handleChange}>
                <option>Fresher</option>
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>Senior (6+ Years)</option>
              </select>
            </div>

            {/* Job Category */}
            <div className="form-group">
              <label>Job Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>HR</option>
                <option>Product</option>
                <option>Finance</option>
                <option>Operations</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="form-group">
              <label>Application Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
            </div>

            {/* Skills */}
            <div className="form-group">
              <label>Required Skills</label>
              <div className="skill-input">
                <input
                  type="text"
                  placeholder="e.g. React, UI/UX, Node.js"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button onClick={addSkill}>Add</button>
              </div>
              <div className="skill-list">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag" onClick={() => removeSkill(skill)}>
                    {skill} ✕
                  </span>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="form-group">
              <label>Perks & Benefits</label>
              <textarea
                name="perks"
                placeholder="e.g. Insurance, Free meals, Bonus"
                rows="3"
                value={formData.perks}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Apply Link */}
            <div className="form-group">
              <label>Application Link / Email</label>
              <input
                type="text"
                name="applyLink"
                placeholder="https://company.com/careers or hr@company.com"
                value={formData.applyLink}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                placeholder="Roles, responsibilities, expectations..."
                rows="6"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Preview Confirmation */}
            <div className="preview-check">
              <input
                type="checkbox"
                checked={previewAccepted}
                onChange={() => setPreviewAccepted(!previewAccepted)}
              />
              <span>I confirm the details and want to publish this job.</span>
            </div>

            {/* Submit */}
            <button type="submit" className="postjob-submit" disabled={!previewAccepted}>
              Submit Job
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
