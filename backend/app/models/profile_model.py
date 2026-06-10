def profile_serializer(profile) -> dict:
    return {
        "id": str(profile["_id"]),
        "user_id": str(profile["user_id"]),
        "full_name": profile.get("full_name", ""),
        "college_name": profile.get("college_name", "College Name"),
        "degree": profile.get("degree", "Degree"),
        "graduation_year": profile.get("graduation_year", "Graduation Year"),
        "skills": profile.get("skills", []),
        "projects": profile.get("projects", []),
        "resume_url": profile.get("resume_url", None),
        "career_preferences": profile.get("career_preferences", []),
        "github_link": profile.get("github_link", ""),
        "linkedin_link": profile.get("linkedin_link", ""),
        "contact_email": profile.get("contact_email", ""),
        "banner_url": profile.get("banner_url", "/images/profile-banner.png"),
        "avatar_url": profile.get("avatar_url", "/images/profile-avatar.png"),
        "applied_jobs": profile.get("applied_jobs", []),
        "saved_jobs": profile.get("saved_jobs", []),
        "designation": profile.get("designation", ""),
        "company_name": profile.get("company_name", ""),
        "company_description": profile.get("company_description", ""),
        "company_website": profile.get("company_website", "")
    }
