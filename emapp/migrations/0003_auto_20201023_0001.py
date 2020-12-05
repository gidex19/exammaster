# Generated by Django 2.2.2 on 2020-10-22 23:01

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('emapp', '0002_auto_20201022_2255'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='expiry_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='submitted_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]