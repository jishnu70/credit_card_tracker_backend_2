from django.contrib import admin
from .models import CreditCard, Product, Transaction, Category

# Register models
admin.site.register(CreditCard)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Transaction)
