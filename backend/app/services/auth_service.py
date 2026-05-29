from app.config.database import db
from app.utils.hash import (
    hash_password,
    verify_password
)
from app.utils.jwt_handler import (
    create_access_token
)
from app.models.user_model import (
    user_serializer
)


users_collection = db["users"]


async def register_user(user_data):

    existing_user = await users_collection.find_one(
        {"email": user_data.email}
    )

    if existing_user:
        raise Exception(
            "User already exists"
        )

    if (
        user_data.password
        != user_data.confirm_password
    ):
        raise Exception(
            "Passwords do not match"
        )

    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "password": hash_password(
            user_data.password
        ),
        "role": user_data.role,
        "college_name": user_data.college_name,
        "company_name": user_data.company_name
    }

    result = (
        await users_collection.insert_one(
            new_user
        )
    )

    created_user = (
        await users_collection.find_one(
            {"_id": result.inserted_id}
        )
    )

    token = create_access_token({
        "user_id": str(
            created_user["_id"]
        ),
        "role": created_user["role"]
    })

    return {
        "message":
            "User registered successfully",
        "token": token,
        "user": user_serializer(
            created_user
        )
    }


async def login_user(login_data):

    user = await users_collection.find_one(
        {"email": login_data.email}
    )

    if not user:
        raise Exception(
            "Invalid email or password"
        )

    valid_password = verify_password(
        login_data.password,
        user["password"]
    )

    if not valid_password:
        raise Exception(
            "Invalid email or password"
        )

    token = create_access_token({
        "user_id": str(user["_id"]),
        "role": user["role"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": user_serializer(user)
    }
