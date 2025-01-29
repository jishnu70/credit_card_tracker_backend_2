from django.db import models
from django.contrib.auth.models import User
from cryptography.fernet import Fernet
import json

# Direct encryption key
ENCRYPTION_KEY = "WOB_AN09Jm5c9HmmhKOlzWxefa2Zns1CwQaNDdxsDJk="
cipher_suite = Fernet(ENCRYPTION_KEY)

# Encryption functions
def encrypt_data(data):
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data):
    try:
        return cipher_suite.decrypt(encrypted_data.encode()).decode()
    except:
        return "Invalid Data"

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

# Credit Card Model
class CreditCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_holder = models.CharField(max_length=50)
    card_number = models.CharField(max_length=16)
    expiry_date = models.CharField(max_length=7)  # MM/YYYY format

    def save(self, *args, **kwargs):
        self.card_holder = encrypt_data(self.card_holder)
        self.card_number = encrypt_data(self.card_number)
        self.expiry_date = encrypt_data(self.expiry_date)
        super().save(*args, **kwargs)

    def get_decrypted_card(self):
        return {
            "card_holder": decrypt_data(self.card_holder),
            "card_number": decrypt_data(self.card_number),
            "expiry_date": decrypt_data(self.expiry_date),
        }

    def __str__(self):
        return f"Card ending in {decrypt_data(self.card_number)[-4:]}"

# Product Model
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

# Transaction Model
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(CreditCard, on_delete=models.SET_NULL, null=True)
    products = models.JSONField()  # Encrypted JSON of product details
    total_amount = models.PositiveIntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if isinstance(self.products, list):
            self.products = encrypt_data(json.dumps(self.products))
        self.total_amount = sum(item['price'] * item['quantity'] for item in self.get_decrypted_products())
        super().save(*args, **kwargs)

    def get_decrypted_products(self):
        try:
            return json.loads(decrypt_data(self.products))
        except:
            return []

    def __str__(self):
        return f"Transaction of ₹{self.total_amount} by {self.user.username}"
