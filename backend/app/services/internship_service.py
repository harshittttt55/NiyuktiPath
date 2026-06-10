from datetime import datetime, timezone
from app.config.database import db
from app.models.internship_model import internship_serializer

internships_collection = db["internships"]

async def create_internship(internship_data, posted_by: str):
    new_internship = {
        "title": internship_data.title,
        "company": internship_data.company,
        "email": internship_data.email,
        "location": internship_data.location,
        "stipend": internship_data.stipend,
        "internshipType": internship_data.internshipType,
        "workMode": internship_data.workMode,
        "duration": internship_data.duration,
        "category": internship_data.category,
        "deadline": internship_data.deadline,
        "applyLink": internship_data.applyLink,
        "description": internship_data.description,
        "skills": internship_data.skills,
        "perks": internship_data.perks,
        "posted_by": posted_by,
        "created_at": datetime.now(timezone.utc),
    }

    result = await internships_collection.insert_one(new_internship)
    created_internship = await internships_collection.find_one({"_id": result.inserted_id})

    return {
        "message": "Internship posted successfully",
        "internship": internship_serializer(created_internship),
    }

async def get_all_internships():
    internships = []
    async for item in internships_collection.find().sort("created_at", -1):
        internships.append(internship_serializer(item))
    return internships

async def delete_internship(internship_id: str, user_id: str):
    from bson import ObjectId
    result = await internships_collection.delete_one(
        {"_id": ObjectId(internship_id), "posted_by": user_id}
    )
    if result.deleted_count == 0:
        raise Exception("Internship not found or unauthorized")
    return {"message": "Internship deleted successfully"}

async def update_internship(internship_id: str, internship_data, user_id: str):
    from bson import ObjectId
    update_item = {
        "title": internship_data.title,
        "company": internship_data.company,
        "email": internship_data.email,
        "location": internship_data.location,
        "stipend": internship_data.stipend,
        "internshipType": internship_data.internshipType,
        "workMode": internship_data.workMode,
        "duration": internship_data.duration,
        "category": internship_data.category,
        "deadline": internship_data.deadline,
        "applyLink": internship_data.applyLink,
        "description": internship_data.description,
        "skills": internship_data.skills,
        "perks": internship_data.perks,
        "updated_at": datetime.now(timezone.utc),
    }

    result = await internships_collection.update_one(
        {"_id": ObjectId(internship_id), "posted_by": user_id},
        {"$set": update_item}
    )

    if result.matched_count == 0:
        raise Exception("Internship not found or unauthorized")

    updated_internship = await internships_collection.find_one({"_id": ObjectId(internship_id)})
    return {
        "message": "Internship updated successfully",
        "internship": internship_serializer(updated_internship),
    }
