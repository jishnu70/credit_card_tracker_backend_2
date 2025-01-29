from ninja import Schema
from typing import List
from pydantic import Field
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
    cardNo: constr(min_length=16, max_length=16, regex=r'^\d{16}$')  # Ensures it's exactly 16 digits
    cardExpDate: constr(regex=r'^(0[1-9]|1[0-2])\/\d{4}$')  # Matches MM/YYYY format
    
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
