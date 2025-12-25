from pydantic import BaseModel, EmailStr, Field

class SignupSchema(BaseModel):
    name: str
    gmail: EmailStr
    password: str
    confirm_password: str

class LoginSchema(BaseModel):
    gmail: EmailStr
    password: str


class ManualStudentData(BaseModel):
    student_name: str
    roll_number: str
    class_name: str
    email: EmailStr
    expiry_date: str  # You can also use date type if needed: date
