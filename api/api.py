from ninja import Router
from django.contrib.auth.models import User
from ninja_jwt.authentication import JWTAuth
from .schemas import UserLoginRegister_Schema, Message, CardInformation, TransactionSchema
from .models import UserCard, CreditCardModel, CategoryModel, TransactionModel, TransactionItem

router = Router()

@router.get("hello/")
def index(request):
    return {"sentence": "Hello World"}

@router.post("user-register/", response={200: UserLoginRegister_Schema, 400: Message})
def register_user(request, payload: UserLoginRegister_Schema):
    if payload.password1 != payload.password2:
        return 400, {"message": "Password does not match"}

    if User.objects.filter(username=payload.username).exists():
        return 400, {"message": "Username already exists"}

    user = User.objects.create_user(**payload.dict())
    return 200, user

# Add a new card
@router.post("add-card/", response={200: Message, 400: Message}, auth=JWTAuth())
def add_new_card(request, payload: CardInformation):
    try:
        # Encrypt the card data
        encrypted_card = CreditCardModel(
            cardHolderName=payload.cardHolderName,
            cardNo=payload.cardNo,
            cardExpDate=payload.cardExpDate
        )
        encrypted_card.full_clean()  # Validate the card data

        user = request.user

        # Check if the card already exists for the user
        if UserCard.objects.filter(user=user, card__cardNo=encrypted_card.cardNo).exists():
            return 400, {"message": "Card already exists"}

        # Save the card and associate it with the user
        encrypted_card.save()
        UserCard.objects.create(user=user, card=encrypted_card)

        return 200, {"message": "Card successfully added"}

    except Exception as e:
        return 400, {"message": f"Error occurred: {str(e)}"}

# Remove a card
@router.post("remove-card/", response={200: Message, 400: Message}, auth=JWTAuth())
def remove_card(request, payload: CardInformation):
    try:
        # Encrypt the card number to find the card in the database
        encrypted_card_no = CreditCardModel(cardNo=payload.cardNo).cardNo

        user = request.user
        try:
            user_card = UserCard.objects.get(user=user, card__cardNo=encrypted_card_no)
            card = user_card.card
            user_card.delete()

            # If no other users are linked to this card, delete it
            if not card.user_cards.exists():
                card.delete()

            return 200, {"message": "Card successfully removed"}

        except UserCard.DoesNotExist:
            return 400, {"message": "Card does not exist"}

    except Exception as e:
        return 400, {"message": f"Error occurred: {str(e)}"}

# Retrieve transactions
@router.get("transactions/", response={200: list[TransactionSchema], 400: Message}, auth=JWTAuth())
def retrieve_transactions(request):
    try:
        user = request.user
        transactions = TransactionModel.objects.filter(user=user)

        # Decrypt transaction items
        data = [
            {
                "id": transaction.id,
                "items": transaction.get_decrypted_items(),
                "total_amount": transaction.total_amount,
                "timestamp": transaction.timestamp,
            }
            for transaction in transactions
        ]
        return 200, data

    except Exception as e:
        return 400, {"message": f"Error occurred: {str(e)}"}

# Retrieve all cards for the authenticated user
@router.get("get-cards/", response={200: list[CardInformation], 401: Message}, auth=JWTAuth())
def get_all_cards(request):
    user = request.user
    user_cards = UserCard.objects.filter(user=user)

    if not user_cards.exists():
        return 401, {"message": "No cards found"}

    decrypted_cards = [
        {
            "cardHolderName": card.card.get_decrypted_data()["cardHolderName"],
            "cardNo": card.card.get_decrypted_data()["cardNo"],
            "cardExpDate": card.card.get_decrypted_data()["cardExpDate"]
        }
        for card in user_cards
    ]

    return 200, decrypted_cards
