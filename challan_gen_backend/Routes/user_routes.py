from fastapi import APIRouter, HTTPException, Depends
from Schemas.schemas import SignupSchema, LoginSchema
from Configs.utils import hash_password, verify_password, create_access_token
from Configs.db import users_collection
from bson import ObjectId




router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
def signup(user: SignupSchema):

    # Password check
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Email exists?
    existing_user = users_collection.find_one({"gmail": user.gmail})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = hash_password(user.password)

    new_user = {
        "name": user.name,
        "gmail": user.gmail,
        "password": hashed
    }

    users_collection.insert_one(new_user)

    return {"message": "User created successfully!"}



@router.post("/login")
def login(user: LoginSchema):

    db_user = users_collection.find_one({"gmail": user.gmail})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"user_id": str(db_user["_id"])})

    return {
        "message": "Login successful",
        "token": token
    }