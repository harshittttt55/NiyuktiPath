# pyrefly: ignore [missing-import]
from bson import ObjectId

def internship_serializer(internship) -> dict:
    return {
        "id": str(internship["_id"]),
        "title": internship["title"],
        "company": internship["company"],
        "email": internship["email"],
        "location": internship.get("location", ""),
        "stipend": internship.get("stipend", ""),
        "internshipType": internship.get("internshipType", "Full Time"),
        "workMode": internship.get("workMode", "Remote"),
        "duration": internship.get("duration", "3 Months"),
        "category": internship.get("category", "Software Development"),
        "deadline": internship.get("deadline", ""),
        "applyLink": internship.get("applyLink", ""),
        "description": internship["description"],
        "skills": internship.get("skills", []),
        "perks": internship.get("perks", ""),
        "posted_by": internship.get("posted_by", ""),
        "created_at": str(internship.get("created_at", "")),
    }
