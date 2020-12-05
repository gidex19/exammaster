from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
plan_type = (('6 Months','6 Months'), ('1 Year','1 Year'))
class Customuser(AbstractUser):
    full_name = models.CharField(max_length = 25, blank= True)
    phone_number = models.CharField(max_length=11, blank=True)
    subscribed = models.BooleanField(default=False)

    submitted_date = models.DateField(default= timezone.now)
    expiry_date = models.DateField(default= timezone.now)

    def set_password(self, raw_password):
        print("hash action just now")
        if self.is_password_hashed:
            super(Customuser, self).set_password(raw_password)
        else:
            self.password = raw_password

    def __str__(self):
        return ('User: {} \n email: {}'.format(self.full_name, self.email))

class Payment(models.Model):
    customers_name = models.CharField(max_length=70, blank=False)
    customers_email = models.EmailField(max_length=100, blank=False)
    customers_phone = models.CharField(max_length=11, blank=False)
    product_type = models.CharField(max_length=100, choices=plan_type, blank=False)
    amount = models.PositiveIntegerField(default=0)
    paid = models.BooleanField(default=False)
    reference = models.CharField(max_length=100, default='')
    date_created = models.DateTimeField(default=timezone.now)
    expiry_date = models.DateField(default=timezone.now)