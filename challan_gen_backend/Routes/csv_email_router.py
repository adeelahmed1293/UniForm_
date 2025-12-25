from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import csv
import requests

WEBHOOK_URL = "https://sibwue.app.n8n.cloud/webhook-test/13175e0f-b742-485a-bf22-c08a2b11a041"

router = APIRouter()

# -------------------------------
# CSV Upload and Send to n8n
# -------------------------------
@router.post("/send-csv")
async def send_csv_to_n8n(file: UploadFile = File(...)):
    """
    Accepts a CSV file from frontend, reads it, and sends the data to n8n webhook.
    """
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")

    try:
        # Read CSV file
        contents = await file.read()
        decoded = contents.decode("utf-8").splitlines()
        reader = csv.DictReader(decoded)
        data = [row for row in reader]
        print("CSV Data:", data)

        # Send data to n8n
        response = requests.post(WEBHOOK_URL, json={"data": data})

        return JSONResponse({
            "status": "CSV data sent to n8n webhook",
            "n8n_response": response.text
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process CSV: {e}")


