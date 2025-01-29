from ninja import Router
from django.contrib.auth.models import User
from typing import List
from ninja_jwt.authentication import JWTAuth
from .schemas import (
    UserLoginRegisterSchema, Message, CardInformation, TransactionSchema, CategoryTransactionAmountSchema, UserResponseSchema
)
from .models import CreditCard, Product, Transaction

router = Router()

@router.get("hello/")
def index(request):
    return {"message": "Hello World"}

# User Registration
@router.post("user-register/", response={200: UserResponseSchema, 400: Message})
def register_user(request, payload: UserLoginRegisterSchema):
    if payload.password1 != payload.password2:
        return 400, {"message": "Passwords do not match"}

    if User.objects.filter(username=payload.username).exists():
        return 400, {"message": "Username already exists"}

    try:
        user = User.objects.create_user(
            username=payload.username,
            email=payload.email,
            first_name=payload.first_name,
            last_name=payload.last_name,
            password=payload.password1
        )
        return 200, user
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return 400, {"message": "Validation error"}
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return 500, {"message": "Unexpected error occurred"}

# Add a new card
@router.post("add-card/", response={200: Message, 400: Message}, auth=JWTAuth())
def add_new_card(request, payload: CardInformation):
    user = request.user

    # Check if the card already exists
    if CreditCard.objects.filter(user=user, card_number=payload.card_number).exists():
        return 400, {"message": "Card already exists"}

    # Create and save the encrypted card
    card = CreditCard.objects.create(
        user=user,
        card_holder=payload.card_holder,
        card_number=payload.card_number,
        expiry_date=payload.expiry_date
    )

    return 200, {"message": "Card successfully added"}

# Remove a card
@router.post("remove-card/", response={200: Message, 400: Message}, auth=JWTAuth())
def remove_card(request, payload: CardInformation):
    user = request.user

    try:
        card = CreditCard.objects.get(user=user, card_number=payload.cardNo)
        card.delete()
        return 200, {"message": "Card successfully removed"}
    except CreditCard.DoesNotExist:
        return 400, {"message": "Card does not exist"}

# Retrieve all cards
@router.get("get-cards/", response={200: list[CardInformation], 401: Message}, auth=JWTAuth())
def get_all_cards(request):
    user = request.user
    user_cards = CreditCard.objects.filter(user=user)

    if not user_cards.exists():
        return 401, {"message": "No cards found"}

    decrypted_cards = [
        card.get_decrypted_card() for card in user_cards
    ]

    return 200, decrypted_cards

# Retrieve Transactions
@router.get("transactions/", response={200: list[TransactionSchema], 400: Message}, auth=JWTAuth())
def retrieve_transactions(request):
    user = request.user
    transactions = Transaction.objects.filter(user=user)

    if not transactions.exists():
        return 400, {"message": "No transactions found"}

    data = [
        {
            "id": transaction.id,
            "items": transaction.get_decrypted_products(),
            "total_amount": transaction.total_amount,
            "timestamp": transaction.timestamp,
        }
        for transaction in transactions
    ]

    return 200, data

import logging

# Initialize logger
logger = logging.getLogger(__name__)

@router.get("total-transaction-amount-per-category/", response={200: List[CategoryTransactionAmountSchema], 401: Message}, auth=JWTAuth())
def get_total_transaction_amount_per_category(request):
    user = request.user

    # Fetch all transactions by the user
    transactions = Transaction.objects.filter(user=user)

    if not transactions.exists():
        return 401, {"message": "No transactions found"}

    # A dictionary to store the total transaction amount per category
    category_transaction_amount = {}

    # Loop through all transactions
    for transaction in transactions:
        # Get the products for this transaction
        products = transaction.get_decrypted_products()

        if not products:
            logger.warning(f"Transaction {transaction.id} has no products.")
        
        # For each product, get its category and add the total amount to it
        for product in products:
            category = product.get('category')

            if category is None:
                logger.warning(f"Product {product['name']} in Transaction {transaction.id} has no category.")
                continue

            # Calculate the product's total price (price * quantity)
            product_total_amount = product['price'] * product['quantity']

            # Log product and category details for debugging
            logger.info(f"Transaction {transaction.id}: Product {product['name']} - Category {category.name} - Amount {product_total_amount}")

            # If category is not in the dictionary, add it with the total amount of this product
            if category.name not in category_transaction_amount:
                category_transaction_amount[category.name] = {
                    "category_name": category.name,
                    "total_amount": product_total_amount,
                    "description": category.description or "No description available",
                }
            else:
                # Add the product's total amount to the existing total for this category
                category_transaction_amount[category.name]["total_amount"] += product_total_amount

    # Convert the dictionary to a list of CategoryTransactionAmountSchema for returning in the response
    result = [CategoryTransactionAmountSchema(**data) for data in category_transaction_amount.values()]

    return 200, result
