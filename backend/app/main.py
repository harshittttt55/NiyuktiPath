# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import (
    router as auth_router
)
from app.routes.job_routes import (
    router as job_router
)
from app.routes.internship_routes import (
    router as internship_router
)
from app.routes.profile_routes import (
    router as profile_router
)

app = FastAPI()

# Allowed frontend origins
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "*", # Allow all for now during deployment phase, or add your specific vercel.app URL later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(job_router)
app.include_router(internship_router)
app.include_router(profile_router)


@app.get("/")
async def home():
    return {
        "message":
        "NiyuktiPath Backend Running"
    }
