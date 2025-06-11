from rest_framework import serializers
from .models import Drink
from .models import Order

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Drink
        fields=['id','mail','password']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=[
    'id',
    'customer_name',
    'email',
    'order_date',
    'order_item',
    'status',
    'total_amount',
    'payment_method',
    'shipping_address',
   
    'last_updated',
    'image',
]

