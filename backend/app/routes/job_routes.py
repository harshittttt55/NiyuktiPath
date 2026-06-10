# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, Header
from typing import Optional, List
from app.schemas.job_schema import PostJobSchema
from app.services.job_service import create_job, get_all_jobs, delete_job, update_job
from app.utils.jwt_handler import decode_access_token

router = APIRouter(
    prefix="/api/jobs",
    tags=["Jobs"]
)


@router.post("/post")
async def post_job(
    job_data: PostJobSchema,
    authorization: Optional[str] = Header(None)
):
    try:
        # Extract user from JWT token
        posted_by = "anonymous"
        if authorization and authorization.startswith("Bearer "):
            token = authorization.split(" ")[1]
            payload = decode_access_token(token)
            if payload:
                posted_by = payload.get("user_id", "anonymous")

        return await create_job(job_data, posted_by)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/all")
async def list_jobs():
    try:
        return await get_all_jobs()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.delete("/{job_id}")
async def remove_job(
    job_id: str,
    authorization: Optional[str] = Header(None)
):
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        token = authorization.split(" ")[1]
        payload = decode_access_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid token")
            
        user_id = payload.get("user_id")
        return await delete_job(job_id, user_id)
    except Exception as e:
         raise HTTPException(status_code=400, detail=str(e))

@router.put("/{job_id}")
async def edit_job(
    job_id: str,
    job_data: PostJobSchema,
    authorization: Optional[str] = Header(None)
):
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        token = authorization.split(" ")[1]
        payload = decode_access_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid token")
            
        user_id = payload.get("user_id")
        return await update_job(job_id, job_data, user_id)
    except Exception as e:
         raise HTTPException(status_code=400, detail=str(e))
