# Generated by Django 2.2.2 on 2020-10-22 21:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='submitted',
            new_name='subscribed',
        ),
    ]
