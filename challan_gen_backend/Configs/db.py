from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise Exception("MONGO_URL missing in .env")

client = MongoClient(MONGO_URL)

db = client["auth_db"]
users_collection = db["users"]
