# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException
from app.utils.jwt_handler import verify_token
from app.services.profile_service import get_profile_by_user_id, update_profile, get_applicants_for_listing
from app.schemas.profile_schema import ProfileUpdateSchema

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)

@router.get("/me")
async def get_my_profile(current_user: dict = Depends(verify_token)):
    user_id = current_user.get("id")
    profile = await get_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/me")
async def update_my_profile(
    profile_data: ProfileUpdateSchema,
    current_user: dict = Depends(verify_token)
):
    user_id = current_user.get("id")
    role = current_user.get("role")
    
    # Validation: recruiters cannot apply for jobs
    if role == "job_provider" and profile_data.applied_jobs is not None:
        # Check if they are actually changing the applied_jobs list
        # (Technically, the frontend sends the whole object, but we should prevent additions)
        # For simplicity, we just block any update to applied_jobs from a recruiter role
        raise HTTPException(status_code=403, detail="Recruiters are not allowed to apply for jobs.")

    # Only update provided fields
    update_data = {k: v for k, v in profile_data.dict().items() if v is not None}
    
    updated_profile = await update_profile(user_id, update_data)
    return updated_profile

@router.get("/applicants/{listing_id}")
async def get_applicants(
    listing_id: str,
    current_user: dict = Depends(verify_token)
):
    """Recruiters only: get all candidates who applied to a specific job/internship."""
    if current_user.get("role") != "job_provider":
        raise HTTPException(status_code=403, detail="Only recruiters can view applicants")
    applicants = await get_applicants_for_listing(listing_id)
    return applicants

@router.get("/{user_id}")
async def get_user_profile(user_id: str):
    """Publicly viewable profile (if link shared or via recruiter dashboard)."""
    profile = await get_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
