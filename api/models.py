from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from cryptography.fernet import Fernet
import re
import os

# Encryption key (generate a secure key and store it securely)
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key())
cipher_suite = Fernet(ENCRYPTION_KEY)

def encrypt_data(data):
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data):
    return cipher_suite.decrypt(encrypted_data.encode()).decode()

# Create your models here.

class CreditCardModel(models.Model):
    cardHolderName = models.CharField(max_length=50)
    cardNo = models.CharField(max_length=16)
    cardExpDate = models.CharField(max_length=7)

    def clean(self):
        super().clean()
        # Validate the expiration date format MM/YYYY
        if not re.match(r'^(0[1-9]|1[0-2])\/\d{4}$', self.cardExpDate):
            raise ValidationError({'cardExpDate': 'Expiration date must be in MM/YYYY format.'})

    def save(self, *args, **kwargs):
        # Encrypt sensitive data before saving
        self.cardHolderName = encrypt_data(self.cardHolderName)
        self.cardNo = encrypt_data(self.cardNo)
        self.cardExpDate = encrypt_data(self.cardExpDate)
        super().save(*args, **kwargs)

    def __str__(self):
        # Decrypt for display (only the last 4 digits of cardNo)
        return f"Card ending with {decrypt_data(self.cardNo)[-4:]}"

    def get_decrypted_data(self):
        return {
            "cardHolderName": decrypt_data(self.cardHolderName),
            "cardNo": decrypt_data(self.cardNo),
            "cardExpDate": decrypt_data(self.cardExpDate),
        }

class UserCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_cards')
    card = models.ForeignKey(CreditCardModel, on_delete=models.CASCADE, related_name='user_cards')
    date_added = models.DateTimeField(auto_now_add=True)  # Track when the card was added

    def __str__(self):
        return f"User {self.user.username} - Card ending with {self.card.get_decrypted_data()['cardNo'][-4:]}"

class TransactionModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.JSONField(default=list)
    total_amount = models.IntegerField(default=0, editable=False)  # Total amount of the transaction
    timestamp = models.DateTimeField(auto_now_add=True)  # Date and time when the transaction occurred

    def save(self, *args, **kwargs):
        # Encrypt items JSON data before saving
        self.items = encrypt_data(str(self.items))

        self.total_amount = sum(
            item.quantity * item.price_per_unit for item in self.transactionitem_set.all()
        )
        super().save(*args, **kwargs)

    def get_decrypted_items(self):
        # Decrypt items JSON data
        return eval(decrypt_data(self.items))

    def __str__(self):
        return f"Transaction by {self.user.username} on {self.timestamp}"

class TransactionItem(models.Model):
    transaction = models.ForeignKey(TransactionModel, on_delete=models.CASCADE)
    item = models.ForeignKey('ItemModel', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_per_unit = models.IntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.item.itemName} at {self.price_per_unit} each"

# Signal to update total_amount in TransactionModel
@receiver(post_save, sender=TransactionItem)
@receiver(post_delete, sender=TransactionItem)
def update_transaction_total(sender, instance, **kwargs):
    transaction = instance.transaction
    transaction.total_amount = sum(
        item.quantity * item.price_per_unit for item in transaction.transactionitem_set.all()
    )
    transaction.save()

class CategoryModel(models.Model):
    catName = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.catName

class ItemModel(models.Model):
    itemName = models.CharField(max_length=24)
    price = models.IntegerField()
    itemCat = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, related_name="item_category")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.itemName
