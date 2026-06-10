# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field
from typing import List, Optional

class ProjectItem(BaseModel):
    title: str
    description: str
    link: Optional[str] = None

class ProfileSchema(BaseModel):
    user_id: str
    full_name: str
    college_name: Optional[str] = "College Name"
    degree: Optional[str] = "Degree"
    graduation_year: Optional[str] = "Graduation Year"
    skills: List[str] = []
    projects: List[ProjectItem] = []
    resume_url: Optional[str] = None
    career_preferences: List[str] = []
    github_link: Optional[str] = None
    linkedin_link: Optional[str] = None
    banner_url: Optional[str] = "/images/profile-banner.png"
    avatar_url: Optional[str] = "/images/profile-avatar.png"
    applied_jobs: List[dict] = []
    saved_jobs: List[dict] = []
    designation: Optional[str] = None
    company_description: Optional[str] = None
    company_website: Optional[str] = None
    contact_email: str

class ProfileUpdateSchema(BaseModel):
    full_name: Optional[str] = None
    company_name: Optional[str] = None
    college_name: Optional[str] = None
    degree: Optional[str] = None
    graduation_year: Optional[str] = None
    skills: Optional[List[str]] = None
    projects: Optional[List[ProjectItem]] = None
    resume_url: Optional[str] = None
    career_preferences: Optional[List[str]] = None
    github_link: Optional[str] = None
    linkedin_link: Optional[str] = None
    banner_url: Optional[str] = None
    avatar_url: Optional[str] = None
    applied_jobs: Optional[List[dict]] = None
    saved_jobs: Optional[List[dict]] = None
    designation: Optional[str] = None
    company_description: Optional[str] = None
    company_website: Optional[str] = None
