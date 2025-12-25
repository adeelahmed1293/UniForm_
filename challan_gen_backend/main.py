from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routes.user_routes import router as user_router
from Routes.csv_email_router import router as csv_email_router
from Routes.manual_route import router as manual_router
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routes ---
app.include_router(user_router)
app.include_router(csv_email_router, prefix="/api")
app.include_router(manual_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "FastAPI Auth Backend Running!"}
