# Generated by Django 5.0.4 on 2025-06-10 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drinks', '0004_remove_order_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='order_images/'),
        ),
    ]
