
from fastapi import APIRouter, HTTPException
from Schemas.schemas import ManualStudentData
import requests
import random
import string

WEBHOOK_URL = "https://hamzaaliawan.app.n8n.cloud/webhook-test/13175e0f-b742-485a-bf22-c08a2b11a041"

router = APIRouter()

def generate_challan_no(length: int = 8) -> str:
    """Generate a random alphanumeric challan number."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# -------------------------------
# Manual Entry Endpoint
# -------------------------------
@router.post("/manual-entry")
def manual_entry(student_data: ManualStudentData):
    """
    Accepts manual student data, auto-generates challan_no,
    and sends it to the n8n webhook.
    """
    challan_no = generate_challan_no()
    
    payload = {
        "data": {
            "challan_no": challan_no,
            "student_name": student_data.student_name,
            "roll_number": student_data.roll_number,
            "class_name": student_data.class_name,
            "email": student_data.email,
            "expiry_date": student_data.expiry_date
        }
    }
    print("Manual Entry Payload:", payload)



    try:
        response = requests.post(WEBHOOK_URL, json=payload)
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to send data to n8n: {e}")

    return {
        "status": "Manual student data sent successfully",
        "challan_no": challan_no,
        "n8n_response": response.text
    }