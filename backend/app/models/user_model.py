# pyrefly: ignore [missing-import]
from bson import ObjectId


def user_serializer(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }
