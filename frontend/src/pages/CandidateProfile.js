import React, { useState, useEffect } from "react";
import "../styles/candidate-profile.css";
import { 
  FaBriefcase, FaGraduationCap, FaEnvelope, 
  FaCogs, FaProjectDiagram, FaFileAlt,
  FaChevronDown, FaSearch, FaBell, FaQuestionCircle, FaTh,
  FaExclamationTriangle, FaGithub, FaLinkedin, FaDownload,
  FaTimes, FaSave, FaPlus, FaTrash, FaUpload, FaCheckCircle,
  FaBookmark
} from "react-icons/fa";
import { API, BASE_URL, getAuthenticatedData, putAuthenticatedData } from "../utils/api";
import { Link, useParams } from "react-router-dom";

export default function CandidateProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfile = async () => {
    setLoading(true);
    
    // If viewing someone else's profile, we use a different URL if needed or handle the token differently
    // Actually, our backend now has GET /api/profile/:user_id
    
    try {
      let data;
      if (userId) {
        // Public/Recruiter view of a candidate
        const response = await fetch(`${BASE_URL}/profile/${userId}`);
        data = await response.json();
      } else {
        // Self view
        const token = localStorage.getItem("token");
        if (!token) {
          setError("missing_token");
          setLoading(false);
          return;
        }
        data = await getAuthenticatedData(API.PROFILE);
      }
      if (data && !data.detail) {
        setProfile(data);
        
        // Prepare editable data
        const preparedData = { ...data };
        const defaults = ["College Name", "Degree", "Graduation Year"];
        
        if (defaults.includes(preparedData.college_name)) preparedData.college_name = "";
        if (defaults.includes(preparedData.degree)) preparedData.degree = "";
        if (defaults.includes(preparedData.graduation_year)) preparedData.graduation_year = "";
        
        setEditData(preparedData);
      } else {
        setError(data?.detail || "Could not fetch profile data");
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Network error. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updated = await putAuthenticatedData(API.PROFILE, editData);
      if (updated && !updated.detail) {
        setProfile(updated);
        setIsEditing(false);
      } else {
        alert("Failed to update: " + (updated?.detail || "Unknown error"));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error saving profile");
    }
  };

  const addSkill = (skill) => {
    if (skill && !editData.skills.includes(skill)) {
      setEditData({ ...editData, skills: [...editData.skills, skill] });
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...editData.skills];
    newSkills.splice(index, 1);
    setEditData({ ...editData, skills: newSkills });
  };

  const addProject = () => {
    setEditData({ 
      ...editData, 
      projects: [...editData.projects, { title: "", description: "", link: "" }] 
    });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...editData.projects];
    newProjects[index][field] = value;
    setEditData({ ...editData, projects: newProjects });
  };

  const removeProject = (index) => {
    const newProjects = [...editData.projects];
    newProjects.splice(index, 1);
    setEditData({ ...editData, projects: newProjects });
  };

  const addPreference = (pref) => {
    if (pref && !editData.career_preferences.includes(pref)) {
      setEditData({ ...editData, career_preferences: [...editData.career_preferences, pref] });
    }
  };

  const removePreference = (index) => {
    const newPrefs = [...editData.career_preferences];
    newPrefs.splice(index, 1);
    setEditData({ ...editData, career_preferences: newPrefs });
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error === "missing_token") {
    return (
      <div className="error-state">
        <FaExclamationTriangle size={48} color="#f59e0b" />
        <h2>Authentication Required</h2>
        <p>Please sign in to view your profile.</p>
        <Link to="/signin" className="jira-create-btn" style={{marginTop: '20px', textDecoration: 'none'}}>Sign In</Link>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="error-state">
        <FaExclamationTriangle size={48} color="#ef4444" />
        <h2>Something went wrong</h2>
        <p>{error || "We couldn't load your profile."}</p>
        <button onClick={fetchProfile} className="manage-account-btn">Try Again</button>
      </div>
    );
  }

  return (
    <div className="candidate-profile-v2">
      {/* Jira Navbar */}
      <div className="jira-navbar-mock">
        <div className="navbar-left">
          <FaTh className="nav-grid-icon" />
          <div className="nav-logo-jira">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#0052CC"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#0052CC"/></svg>
            <span>Jira</span>
          </div>
          <nav className="nav-links-mock">
            <span>Your work <FaChevronDown /></span>
            <span>Projects <FaChevronDown /></span>
            <span>Filters <FaChevronDown /></span>
            <span>Dashboards <FaChevronDown /></span>
            <span className="active-link">Teams <FaChevronDown /></span>
          </nav>
          <button className="jira-create-btn">Create</button>
        </div>
        <div className="navbar-right">
          <div className="jira-search-mock">
            <FaSearch />
            <input type="text" placeholder="Search" />
          </div>
          <FaBell />
          <FaQuestionCircle />
          <FaCogs />
          <div className="sl-avatar">{profile.full_name?.charAt(0).toUpperCase()}</div>
        </div>
      </div>

      <div className="profile-scroll-container">
        {/* Banner */}
        <div className="profile-banner">
          <img 
            src={profile.banner_url || "/images/profile-banner.png"} 
            alt="Profile Banner" 
            className="banner-img"
          />
        </div>

        {/* Header Info */}
        <div className="profile-header-container">
          <div className="profile-avatar-wrapper">
            <img 
              src={profile.avatar_url || "/images/profile-avatar.png"} 
              alt={profile.full_name} 
              className="profile-avatar-img"
            />
          </div>
          <div className="profile-info-main">
            <h1>{profile.full_name}</h1>
            <p className="profile-subtitle">{profile.degree} · Class of {profile.graduation_year}</p>
            <div className="profile-social-links">
              {profile.github_link && <a href={profile.github_link} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>}
              {profile.linkedin_link && <a href={profile.linkedin_link} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>}
            </div>
            {!userId && <button className="manage-account-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>}
          </div>
        </div>

        {/* Content Grid */}
        <div className="profile-content-grid">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <section className="sidebar-section">
              <h3>Education</h3>
              <div className="sidebar-item">
                <FaProjectDiagram /> {profile.college_name}
              </div>
              <div className="sidebar-item">
                <FaGraduationCap /> {profile.degree}
              </div>
              <div className="sidebar-item">
                <FaBriefcase /> Class of {profile.graduation_year}
              </div>
            </section>

            <section className="sidebar-section">
              <h3>Contact</h3>
              <div className="sidebar-item active">
                <FaEnvelope /> {profile.contact_email}
              </div>
            </section>

            <section className="sidebar-section">
              <h3>Resume</h3>
              <div className="resume-widget">
                {profile.resume_url ? (
                  <button className="btn-secondary" onClick={() => window.open(profile.resume_url, '_blank')}>
                    <FaDownload /> Download Resume
                  </button>
                ) : (
                  <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                    <FaUpload /> Upload Resume
                  </button>
                )}
              </div>
            </section>
          </aside>

          {/* Main Panel */}
          <main className="profile-main-panel">
            {/* Recent Jobs Applied - Only for self */}
            {!userId && (
              <section className="panel-section">
              <div className="panel-section-header">
                <h2>Recent Jobs Applied</h2>
              </div>
              <div className="activity-list-container">
                {profile.applied_jobs && profile.applied_jobs.length > 0 ? (
                  profile.applied_jobs.map((job, idx) => (
                    <div key={idx} className="activity-item">
                      <div className="activity-icon-box" style={{ background: '#36B37E' }}>
                        <FaCheckCircle />
                      </div>
                      <div className="activity-details">
                        <h4>{job.title}</h4>
                        <p>{job.company} · Applied on {job.date}</p>
                        <span className="status-badge">{job.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activity-item">
                    <p style={{color: '#5E6C84', fontSize: '14px', padding: '10px'}}>No jobs applied recently.</p>
                  </div>
                )}
              </div>
            </section>
            )}

             {/* Saved Jobs - Only for self */}
             {!userId && (
               <section className="panel-section">
              <div className="panel-section-header">
                <h2>Saved Jobs</h2>
              </div>
              <div className="activity-list-container">
                {profile.saved_jobs && profile.saved_jobs.length > 0 ? (
                  profile.saved_jobs.map((job, idx) => (
                    <div key={idx} className="activity-item">
                      <div className="activity-icon-box" style={{ background: '#0052CC' }}>
                        <FaBookmark />
                      </div>
                      <div className="activity-details">
                        <h4>{job.title}</h4>
                        <p>{job.company} · {job.location || "Remote"}</p>
                        <p style={{fontSize: '11px', marginTop: '4px', fontweight: '600', color: '#0052CC'}}>{job.salary}</p>
                      </div>
                      <Link to="/jobs" className="manage-account-btn" style={{fontSize: '12px', padding: '6px 12px'}}>View</Link>
                    </div>
                  ))
                ) : (
                  <div className="activity-item">
                    <p style={{color: '#5E6C84', fontSize: '14px', padding: '10px'}}>No saved jobs.</p>
                  </div>
                )}
              </div>
            </section>
            )}

            {/* Skills Section */}
            <section className="panel-section">
              <div className="panel-section-header">
                <h2>Skills</h2>
              </div>
              <div className="skills-container-jira">
                {profile.skills?.map((skill, idx) => (
                  <span key={idx} className="skill-badge-jira">{skill}</span>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="panel-section">
              <div className="panel-section-header">
                <h2>Projects</h2>
              </div>
              <div className="activity-list-container">
                {profile.projects?.map((project, idx) => (
                  <div key={idx} className="activity-item">
                    <div className="activity-icon-box" style={{ background: '#0052CC' }}>
                      <FaFileAlt />
                    </div>
                    <div className="activity-details">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Preferences */}
            <section className="panel-section">
              <div className="panel-section-header">
                <h2>Career Preferences</h2>
              </div>
              <div className="preferences-list-jira">
                {profile.career_preferences?.map((pref, idx) => (
                  <div key={idx} className="pref-item-jira">
                    <FaBriefcase /> {pref}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal-box wide">
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button onClick={() => setIsEditing(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="modal-grid-2">
                <div className="modal-col">
                   <div className="form-group">
                    <label>College Name</label>
                    <input 
                      type="text" 
                      value={editData.college_name || ""} 
                      placeholder="College Name"
                      onChange={(e) => setEditData({...editData, college_name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Degree</label>
                    <input 
                      type="text" 
                      value={editData.degree || ""} 
                      placeholder="Degree"
                      onChange={(e) => setEditData({...editData, degree: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Graduation Year</label>
                    <input 
                      type="text" 
                      value={editData.graduation_year || ""} 
                      placeholder="Graduation Year"
                      onChange={(e) => setEditData({...editData, graduation_year: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-col">
                  <div className="form-group">
                    <label>GitHub Link</label>
                    <input 
                      type="text" 
                      value={editData.github_link || ""} 
                      placeholder="https://github.com/username"
                      onChange={(e) => setEditData({...editData, github_link: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn Link</label>
                    <input 
                      type="text" 
                      value={editData.linkedin_link || ""} 
                      placeholder="https://linkedin.com/in/profile"
                      onChange={(e) => setEditData({...editData, linkedin_link: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Resume Link</label>
                    <input 
                      type="text" 
                      value={editData.resume_url || ""} 
                      placeholder="Link to your resume"
                      onChange={(e) => setEditData({...editData, resume_url: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <hr className="modal-divider" />

              {/* Dynamic Lists */}
              <div className="modal-section">
                <h3>Skills</h3>
                <div className="tag-input-box">
                  <input 
                    type="text" 
                    placeholder="Add a skill (e.g. Python) and press Enter" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="modal-tag-cloud">
                    {editData.skills?.map((skill, idx) => (
                      <span key={idx} className="modal-tag">
                        {skill} <FaTimes onClick={() => removeSkill(idx)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Career Preferences</h3>
                <div className="tag-input-box">
                  <input 
                    type="text" 
                    placeholder="Add preference (e.g. Remote) and press Enter" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addPreference(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="modal-tag-cloud">
                    {editData.career_preferences?.map((pref, idx) => (
                      <span key={idx} className="modal-tag blue">
                        {pref} <FaTimes onClick={() => removePreference(idx)} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <div className="section-header-row">
                  <h3>Projects</h3>
                  <button className="btn-add-sm" onClick={addProject}><FaPlus /> Add Project</button>
                </div>
                <div className="modal-projects-list">
                  {editData.projects?.map((project, idx) => (
                    <div key={idx} className="modal-project-item">
                      <div className="project-inputs">
                        <input 
                          type="text" 
                          placeholder="Project Title" 
                          value={project.title}
                          onChange={(e) => updateProject(idx, 'title', e.target.value)}
                        />
                        <textarea 
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => updateProject(idx, 'description', e.target.value)}
                        />
                      </div>
                      <button className="btn-delete-sm" onClick={() => removeProject(idx)}><FaTrash /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}><FaSave /> Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
