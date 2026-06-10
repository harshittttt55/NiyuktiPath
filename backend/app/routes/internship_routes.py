# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.internship_schema import PostInternshipSchema
from app.services.internship_service import create_internship, get_all_internships, delete_internship, update_internship
from app.utils.jwt_handler import verify_token

router = APIRouter(prefix="/api/internships", tags=["Internships"])

@router.post("/post")
async def post_internship(
    payload: PostInternshipSchema,
    user_data: dict = Depends(verify_token)
):
    if user_data["role"] == "job_seeker":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only recruiters can post internships"
        )
    
    return await create_internship(payload, user_data["id"])

@router.get("/all")
async def all_internships():
    return await get_all_internships()

@router.delete("/{internship_id}")
async def remove_internship(
    internship_id: str,
    user_data: dict = Depends(verify_token)
):
    try:
        return await delete_internship(internship_id, user_data["id"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{internship_id}")
async def edit_internship_route(
    internship_id: str,
    payload: PostInternshipSchema,
    user_data: dict = Depends(verify_token)
):
    try:
        return await update_internship(internship_id, payload, user_data["id"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
