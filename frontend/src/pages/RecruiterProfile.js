import React, { useState, useEffect, useCallback } from "react";
import "../styles/candidate-profile.css";
import {
  FaEnvelope, FaBuilding, FaGlobe,
  FaBell, FaTh, FaTimes, FaSave, FaTrash,
  FaUserTie, FaListUl, FaEdit, FaGraduationCap, FaUsers, FaChevronDown,
  FaChevronUp, FaLinkedin, FaGithub, FaFileAlt, FaUserCircle
} from "react-icons/fa";
import { API, BASE_URL, getAuthenticatedData, putAuthenticatedData, deleteAuthenticatedData } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

// ── Applicants Drawer ────────────────────────────────────────────────────────
function ApplicantsDrawer({ listingId, listingTitle }) {
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchApplicants = async () => {
    if (fetched) { setOpen(o => !o); return; }
    setOpen(true);
    setLoadingApplicants(true);
    try {
      const data = await getAuthenticatedData(`${BASE_URL}/profile/applicants/${listingId}`);
      setApplicants(Array.isArray(data) ? data : []);
      setFetched(true);
    } catch (err) {
      console.error("Failed to fetch applicants", err);
    } finally {
      setLoadingApplicants(false);
    }
  };

  return (
    <div className="applicants-drawer">
      <button className="applicants-toggle-btn" onClick={fetchApplicants}>
        <FaUsers /> View Applicants {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="applicants-panel">
          {loadingApplicants ? (
            <p className="applicants-loading">Loading applicants...</p>
          ) : applicants.length === 0 ? (
            <p className="applicants-empty">No one has applied to "{listingTitle}" yet.</p>
          ) : (
            <div className="applicants-grid">
              {applicants.map((ap, i) => (
                <div key={i} className="applicant-card">
                  <div className="applicant-avatar">
                    {ap.avatar_url ? (
                      <img src={ap.avatar_url} alt={ap.full_name} />
                    ) : (
                      <FaUserCircle size={40} color="#5E6C84" />
                    )}
                  </div>
                  <div className="applicant-info">
                    <h4>
                      <Link to={`/profile/candidate/${ap.user_id}`} className="applicant-name-link">
                        {ap.full_name}
                      </Link>
                    </h4>
                    <p className="applicant-meta">{ap.degree} · {ap.college_name}</p>
                    <p className="applicant-email"><FaEnvelope /> {ap.contact_email}</p>
                    {ap.skills?.length > 0 && (
                      <div className="applicant-skills">
                        {ap.skills.slice(0, 4).map((s, si) => (
                          <span key={si} className="skill-pill">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="applicant-actions">
                    {ap.resume_url && (
                      <a href={ap.resume_url} target="_blank" rel="noreferrer" className="ap-link-btn">
                        <FaFileAlt /> Resume
                      </a>
                    )}
                    {ap.linkedin_link && (
                      <a href={ap.linkedin_link} target="_blank" rel="noreferrer" className="ap-link-btn linkedin">
                        <FaLinkedin /> LinkedIn
                      </a>
                    )}
                    {ap.github_link && (
                      <a href={ap.github_link} target="_blank" rel="noreferrer" className="ap-link-btn github">
                        <FaGithub /> GitHub
                      </a>
                    )}
                    <a href={`mailto:${ap.contact_email}`} className="ap-link-btn contact">
                      <FaEnvelope /> Contact
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function RecruiterProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeInternships, setActiveInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const filterJobs = useCallback((jobsList, companyName, userId) => {
    if (!Array.isArray(jobsList)) return [];
    if (userId) {
      const byId = jobsList.filter(j => j.posted_by === userId);
      if (byId.length > 0) return byId;
    }
    if (companyName) {
      const targetComp = companyName.trim().toLowerCase();
      return jobsList.filter(j => j.company && j.company.trim().toLowerCase() === targetComp);
    }
    return [];
  }, []);

  const fetchProfileAndJobs = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token || !storedUser) {
      setLoading(false);
      return;
    }

    const userData = JSON.parse(storedUser);
    const userId = userData.id || userData._id;

    try {
      const profData = await getAuthenticatedData(API.PROFILE);
      if (profData && !profData.detail) {
        setProfile(profData);
        setEditData(profData);

        const [jobsData, internshipsData] = await Promise.all([
          getAuthenticatedData(`${BASE_URL}/jobs/all`),
          getAuthenticatedData(`${BASE_URL}/internships/all`),
        ]);

        if (Array.isArray(jobsData)) {
          setActiveJobs(filterJobs(jobsData, profData.company_name, userId));
        }
        if (Array.isArray(internshipsData)) {
          setActiveInternships(filterJobs(internshipsData, profData.company_name, userId));
        }
      }
    } catch (err) {
      console.error("Failed to load recruiter data:", err);
    } finally {
      setLoading(false);
    }
  }, [filterJobs]);

  useEffect(() => {
    fetchProfileAndJobs();
  }, [fetchProfileAndJobs]);

  const handleSave = async () => {
    const updated = await putAuthenticatedData(API.PROFILE, editData);
    if (updated && !updated.detail) { setProfile(updated); setIsEditing(false); }
    else alert("Update failed");
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Delete this job listing?")) return;
    setDeletingId(jobId);
    const result = await deleteAuthenticatedData(`${BASE_URL}/jobs/${jobId}`);
    if (result && !result.detail) setActiveJobs(prev => prev.filter(j => j.id !== jobId));
    else alert("Delete failed: " + (result?.detail || "Unauthorized"));
    setDeletingId(null);
  };

  const handleDeleteInternship = async (internshipId) => {
    if (!window.confirm("Delete this internship?")) return;
    setDeletingId(internshipId);
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/internships/${internshipId}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) setActiveInternships(prev => prev.filter(i => i.id !== internshipId));
    else alert("Delete failed");
    setDeletingId(null);
  };

  if (loading) return <div className="loading-state"><div className="spinner"></div></div>;

  // ── Listing Card ─────────────────────────────────────────────────────────
  const ListingCard = ({ item, type }) => (
    <div className="listing-card-full">
      <div className="activity-item">
        <div className="activity-icon-box" style={{ background: type === 'job' ? '#0052CC' : '#00875A' }}>
          {type === 'job' ? <FaListUl /> : <FaGraduationCap />}
        </div>
        <div className="activity-details">
          <h4>{item.title}</h4>
          <p>{item.location} · {type === 'job' ? item.jobType : `${item.duration} · ${item.stipend}`}</p>
        </div>
        <div className="listing-actions">
          {type === 'job' ? (
            <button className="manage-account-btn" style={{ fontSize: '11px' }}
              onClick={() => navigate("/post-job", { state: { editJob: item } })}>
              <FaEdit /> Edit
            </button>
          ) : (
            <button className="manage-account-btn" style={{ fontSize: '11px' }}
              onClick={() => navigate("/internship-post", { state: { editInternship: item } })}>
              <FaEdit /> Edit
            </button>
          )}
          <button className="manage-account-btn" style={{ fontSize: '11px', color: '#DE350B' }}
            onClick={() => type === 'job' ? handleDeleteJob(item.id) : handleDeleteInternship(item.id)}
            disabled={deletingId === item.id}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
      {/* Applicants Drawer */}
      <ApplicantsDrawer listingId={item.id} listingTitle={item.title} />
    </div>
  );

  return (
    <div className="candidate-profile-v2 recruiter-profile-page">
      {/* Navbar */}
      <div className="jira-navbar-mock">
        <div className="navbar-left">
          <FaTh className="nav-grid-icon" />
          <span className="nav-logo-text">Recruiter Dashboard</span>
          <Link to="/post-job" className="jira-create-btn" style={{ textDecoration: 'none' }}>Post Job</Link>
        </div>
        <div className="navbar-right">
          <FaBell />
          <div className="sl-avatar" style={{ background: '#6554C0' }}>{profile?.full_name?.charAt(0)}</div>
        </div>
      </div>

      <div className="profile-scroll-container">
        <div className="profile-banner">
          <img src={profile?.banner_url || "/images/profile-banner.png"} alt="Banner" className="banner-img" />
        </div>
        <div className="profile-header-container">
          <div className="profile-avatar-wrapper">
            <img src={profile?.avatar_url || "/images/profile-avatar.png"} alt="Avatar" className="profile-avatar-img" />
          </div>
          <div className="profile-info-main">
            <h1>{profile?.full_name}</h1>
            <p className="profile-subtitle"><FaUserTie /> {profile?.designation || "Recruiter"} at {profile?.company_name}</p>
            <div className="profile-social-links">
              {profile?.company_website && <a href={profile.company_website} target="_blank" rel="noreferrer"><FaGlobe /> {profile.company_website}</a>}
            </div>
            <button className="manage-account-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        </div>

        <div className="profile-content-grid">
          <aside className="profile-sidebar">
            <section className="sidebar-section">
              <h3>Company</h3>
              <div className="sidebar-item"><FaBuilding /> {profile?.company_name}</div>
              <div className="sidebar-item"><FaEnvelope /> {profile?.contact_email}</div>
            </section>
            <section className="sidebar-section" style={{ marginTop: '16px' }}>
              <h3>Overview</h3>
              <div className="sidebar-item" style={{ fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {profile?.company_description || "Add a company description..."}
              </div>
            </section>
          </aside>

          <main className="profile-main-panel">
            {/* Jobs */}
            <section className="panel-section">
              <div className="panel-section-header"><h2>Active Job Listings ({activeJobs.length})</h2></div>
              <div className="activity-list-container" style={{ padding: 0 }}>
                {activeJobs.length > 0
                  ? activeJobs.map((job, idx) => <ListingCard key={idx} item={job} type="job" />)
                  : <p style={{ color: '#5E6C84', padding: '20px' }}>No jobs posted yet. <Link to="/post-job" style={{ color: '#0052CC' }}>Post one.</Link></p>
                }
              </div>
            </section>

            {/* Internships */}
            <section className="panel-section">
              <div className="panel-section-header"><h2>Active Internships ({activeInternships.length})</h2></div>
              <div className="activity-list-container" style={{ padding: 0 }}>
                {activeInternships.length > 0
                  ? activeInternships.map((internship, idx) => <ListingCard key={idx} item={internship} type="internship" />)
                  : <p style={{ color: '#5E6C84', padding: '20px' }}>No internships posted yet. <Link to="/post-internship" style={{ color: '#0052CC' }}>Post one.</Link></p>
                }
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal-box wide">
            <div className="modal-header"><h2>Edit Profile</h2><button onClick={() => setIsEditing(false)}><FaTimes /></button></div>
            <div className="modal-body">
              <div className="modal-grid-2">
                <div className="modal-col">
                  <div className="form-group"><label>Profile Pic URL</label><input value={editData.avatar_url || ""} onChange={e => setEditData({ ...editData, avatar_url: e.target.value })} /></div>
                  <div className="form-group"><label>Full Name</label><input value={editData.full_name || ""} onChange={e => setEditData({ ...editData, full_name: e.target.value })} /></div>
                </div>
                <div className="modal-col">
                  <div className="form-group"><label>Company Name</label><input value={editData.company_name || ""} onChange={e => setEditData({ ...editData, company_name: e.target.value })} /></div>
                  <div className="form-group"><label>Designation</label><input value={editData.designation || ""} onChange={e => setEditData({ ...editData, designation: e.target.value })} /></div>
                </div>
              </div>
              <div className="form-group"><label>Website</label><input value={editData.company_website || ""} onChange={e => setEditData({ ...editData, company_website: e.target.value })} /></div>
              <div className="form-group"><label>Description</label><textarea rows="4" value={editData.company_description || ""} onChange={e => setEditData({ ...editData, company_description: e.target.value })} /></div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSave}><FaSave /> Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
