from app.config.database import db
from app.models.profile_model import profile_serializer
# pyrefly: ignore [missing-import]
from bson import ObjectId

async def get_profile_by_user_id(user_id: str):
    profile = await db.profiles.find_one({"user_id": ObjectId(user_id)})
    if profile:
        return profile_serializer(profile)
    
    # If no profile exists, create a default one based on user info
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return None
    
    default_profile = {
        "user_id": ObjectId(user_id),
        "full_name": user["name"],
        "contact_email": user["email"],
        "college_name": "Modern Institute of Tech",
        "degree": "B.Tech in Computer Science",
        "graduation_year": "2025",
        "skills": ["JavaScript", "React", "Python", "FastAPI"],
        "projects": [
            { "title": "Portfolio Website", "description": "A personal portfolio built with React and Framer Motion.", "link": "https://github.com" },
            { "title": "E-commerce API", "description": "Backend API for a shopping platform using FastAPI and MongoDB.", "link": "https://github.com" }
        ],
        "career_preferences": ["Remote Work", "Full-time", "Front-end Development"],
        "github_link": "https://github.com",
        "linkedin_link": "https://linkedin.com",
        "banner_url": "/images/profile-banner.png",
        "avatar_url": "/images/profile-avatar.png",
        "applied_jobs": [
            {"title": "Software Engineer", "company": "Google", "date": "2026-06-01", "status": "In Review"},
            {"title": "Web Developer", "company": "Amazon", "date": "2026-05-28", "status": "Applied"}
        ],
        "saved_jobs": [
            {"title": "UI Designer", "company": "Figma", "location": "Remote", "salary": "$120k - $150k"},
            {"title": "Backend Dev", "company": "Netflix", "location": "Los Gatos, CA", "salary": "$200k+"}
        ],
        "designation": "Talent Acquisition Lead",
        "company_description": "We are a leading tech company focused on innovation.",
        "company_website": "https://company.com"
    }
    
    result = await db.profiles.insert_one(default_profile)
    new_profile = await db.profiles.find_one({"_id": result.inserted_id})
    return profile_serializer(new_profile)

async def update_profile(user_id: str, profile_data: dict):
    await db.profiles.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": profile_data}
    )
    return await get_profile_by_user_id(user_id)

async def get_applicants_for_listing(listing_id: str):
    """Find all candidate profiles that applied to a specific job or internship."""
    applicants = []
    
    # Try to find the listing first to get title/company for legacy applications
    listing = await db.jobs.find_one({"_id": ObjectId(listing_id)})
    if not listing:
        listing = await db.internships.find_one({"_id": ObjectId(listing_id)})
    
    query = {"applied_jobs": {"$elemMatch": {"id": listing_id}}}
    
    if listing:
        # Fallback for legacy applications that don't have the 'id' field
        query = {
            "$or": [
                {"applied_jobs": {"$elemMatch": {"id": listing_id}}},
                {"applied_jobs": {"$elemMatch": {"title": listing["title"], "company": listing["company"]}}}
            ]
        }

    async for profile in db.profiles.find(query):
        applicants.append({
            "user_id": str(profile.get("user_id", "")),
            "full_name": profile.get("full_name", "Unknown"),
            "contact_email": profile.get("contact_email", ""),
            "avatar_url": profile.get("avatar_url", "/images/profile-avatar.png"),
            "skills": profile.get("skills", []),
            "college_name": profile.get("college_name", ""),
            "degree": profile.get("degree", ""),
            "resume_url": profile.get("resume_url", ""),
            "linkedin_link": profile.get("linkedin_link", ""),
            "github_link": profile.get("github_link", ""),
        })
    return applicants
