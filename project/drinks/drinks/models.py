from django.db import models

class Drink(models.Model):
    mail=models.CharField(max_length=100)
    password=models.CharField(max_length=200)

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    email = models.EmailField()
    order_date = models.DateTimeField()
    order_item= models.TextField(default="No items listed")
    status = models.CharField(max_length=20, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20)
    shipping_address = models.TextField()

    last_updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='order_images/', null=True, blank=True)


