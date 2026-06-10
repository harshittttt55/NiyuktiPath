from datetime import datetime, timezone
from app.config.database import db
from app.models.job_model import job_serializer


jobs_collection = db["jobs"]


async def create_job(job_data, posted_by: str):
    new_job = {
        "title": job_data.title,
        "company": job_data.company,
        "email": job_data.email,
        "location": job_data.location,
        "salary": job_data.salary,
        "jobType": job_data.jobType,
        "workMode": job_data.workMode,
        "experience": job_data.experience,
        "category": job_data.category,
        "deadline": job_data.deadline,
        "applyLink": job_data.applyLink,
        "description": job_data.description,
        "skills": job_data.skills,
        "perks": job_data.perks,
        "posted_by": posted_by,
        "created_at": datetime.now(timezone.utc),
    }

    result = await jobs_collection.insert_one(new_job)

    created_job = await jobs_collection.find_one(
        {"_id": result.inserted_id}
    )

    return {
        "message": "Job posted successfully",
        "job": job_serializer(created_job),
    }


async def get_all_jobs():
    jobs = []
    async for job in jobs_collection.find().sort(
        "created_at", -1
    ):
        jobs.append(job_serializer(job))
    return jobs

async def delete_job(job_id: str, user_id: str):
    from bson.objectid import ObjectId
    # Ensure only the owner can delete
    result = await jobs_collection.delete_one({"_id": ObjectId(job_id), "posted_by": user_id})
    if result.deleted_count == 0:
        raise Exception("Job not found or unauthorized")
    return {"message": "Job deleted successfully"}

async def update_job(job_id: str, job_data, user_id: str):
    from bson.objectid import ObjectId
    update_data = job_data.dict(exclude_unset=True)
    result = await jobs_collection.update_one(
        {"_id": ObjectId(job_id), "posted_by": user_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise Exception("Job not found or unauthorized")
    return {"message": "Job updated successfully"}
