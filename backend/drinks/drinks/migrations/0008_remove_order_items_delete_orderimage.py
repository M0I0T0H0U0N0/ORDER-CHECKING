# Generated by Django 5.0.4 on 2025-06-10 07:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drinks', '0007_remove_order_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='items',
        ),
        migrations.DeleteModel(
            name='OrderImage',
        ),
    ]
