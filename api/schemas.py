from ninja import Schema, Field
from pydantic import constr
# from datatime import date

class UserLoginRegister_Schema(Schema):
    # loginMethod: int
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
    cardNo: str
    cardExpDate: str
