# pyrefly: ignore [missing-import]
from bson import ObjectId


def job_serializer(job) -> dict:
    return {
        "id": str(job["_id"]),
        "title": job["title"],
        "company": job["company"],
        "email": job["email"],
        "location": job.get("location", ""),
        "salary": job.get("salary", ""),
        "jobType": job.get("jobType", "Full Time"),
        "workMode": job.get("workMode", "On-site"),
        "experience": job.get("experience", "Fresher"),
        "category": job.get("category", "Software Development"),
        "deadline": job.get("deadline", ""),
        "applyLink": job.get("applyLink", ""),
        "description": job["description"],
        "skills": job.get("skills", []),
        "perks": job.get("perks", ""),
        "posted_by": job.get("posted_by", ""),
        "created_at": str(job.get("created_at", "")),
    }
