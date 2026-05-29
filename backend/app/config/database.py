# pyrefly: ignore [missing-import]
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings


client = AsyncIOMotorClient(settings.MONGO_URL)

db = client[settings.DATABASE_NAME]

