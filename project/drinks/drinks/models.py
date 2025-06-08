from django.db import models

class Drink(models.Model):
    mail=models.CharField(max_length=100)
    password=models.CharField(max_length=200)