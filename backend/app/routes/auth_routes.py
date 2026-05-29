# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException
from app.schemas.auth_schema import (
    SignupSchema,
    LoginSchema
)
from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/signup")
async def signup(
    user_data: SignupSchema
):
    try:
        return await register_user(
            user_data
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
async def login(
    login_data: LoginSchema
):
    try:
        return await login_user(
            login_data
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
