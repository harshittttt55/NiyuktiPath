# pyrefly: ignore [missing-import]
from pydantic import BaseModel, EmailStr
from typing import Literal, Optional


class SignupSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str
    role: Literal["job_seeker", "job_provider"]
    college_name: Optional[ str ] = None 
    company_name: Optional[ str ] = None


class LoginSchema(BaseModel):
    email: EmailStr
    password: str
