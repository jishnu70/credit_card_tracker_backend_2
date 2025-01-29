from ninja import Schema
from typing import List
from pydantic import Field, constr
# from datatime import date

class UserLoginRegister_Schema(Schema):
    username: str
    email: str = None
    first_name: str = None
    last_name: str = None
    password1: str
    password2: str = None
    mobileNo: str = Field(..., pattern=r'^\d{10}$')  # Mobile number should be exactly 10 digits

class Message(Schema):
    message: str

class CardInformation(Schema):
    cardHolderName: str
    cardNo: constr(strict=True, min_length=16, max_length=16)  # Length restriction only
    cardExpDate: str  # Matches MM/YYYY format
    
# Transaction item schema
class TransactionItemSchema(Schema):
    item_id: int
    quantity: int
    price_per_unit: int

# Transaction schema
class TransactionSchema(Schema):
    id: int
    user_id: int
    items: List[TransactionItemSchema]
    total_amount: int
    timestamp: str  # ISO format timestamp
