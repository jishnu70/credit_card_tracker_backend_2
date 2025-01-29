from ninja import Schema
from pydantic import BaseModel
from typing import List
from pydantic import Field, constr
from datetime import datetime

class UserLoginRegisterSchema(Schema):
    username: str
    email: str = None
    first_name: str = None
    last_name: str = None
    password1: str
    password2: str
    mobileNo: str = Field(..., pattern=r'^\d{10}$')  # 10-digit mobile number

class UserResponseSchema(Schema):
    username: str
    email: str = None
    first_name: str = None
    last_name: str = None

class Message(Schema):
    message: str

class CardInformation(Schema):
    card_holder: str
    card_number: constr(strict=True, min_length=16, max_length=16)  # Exactly 16 digits
    expiry_date: str  # MM/YYYY format

class TransactionSchema(BaseModel):
    id: int
    total_amount: int
    timestamp: datetime  # Pydantic will convert this to a string automatically
    items: List[dict]

class CategoryTransactionAmountSchema(Schema):
    category_name: str
    total_amount: int
    description: str | None
