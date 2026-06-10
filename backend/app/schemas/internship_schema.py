# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import List, Optional

class PostInternshipSchema(BaseModel):
    title: str
    company: str
    email: str
    location: Optional[str] = ""
    stipend: Optional[str] = ""
    internshipType: Optional[str] = "Full Time"
    workMode: Optional[str] = "Remote"
    duration: Optional[str] = "3 Months"
    category: Optional[str] = "Software Development"
    deadline: Optional[str] = ""
    applyLink: Optional[str] = ""
    description: str
    skills: Optional[List[str]] = []
    perks: Optional[str] = ""

    model_config = {"extra": "ignore"}
