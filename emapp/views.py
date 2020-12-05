from django.shortcuts import render, redirect
from .forms import LoginForm, SignUpForm, RegisterForm, PhoneLoginForm
from django.contrib.auth import authenticate, login, logout
from django.utils import timezone
from datetime import datetime, timedelta
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from paystackapi.transaction import Transaction
from paystackapi.paystack import Paystack

from django.contrib import messages
from .models import Customuser, Payment
from django.contrib.auth.hashers import *

paystack_secret_key = "sk_test_9b5f4ffd691edd7e62673ce7e3bba49b123c98d6"
paystack_public_key = "pk_test_e20dc9cbbd4bc7ac08b1ce0940c34f7714e5ab91"
paystack = Paystack(secret_key=paystack_secret_key)



def home(request):
    return render(request, 'emapp/homepage.html')


def subscription(request):
    return render(request, 'emapp/subscription.html')

def paywithcard(request):
    return render(request, 'emapp/paywithcard.html')

def paywithbank(request):
    return render(request, 'emapp/paywithbank.html')

def selectexam(request):

    return render(request, 'emapp/selectexam.html')

"""def selectsubject(request):
    current_user = request.user
    user_subscribed = current_user.subscribed
    print(user_subscribed)
    return render(request, 'emapp/selectsubject.html', {'user_subscribed': user_subscribed}) """

@login_required()
def selectsubject(request):
    current_user = request.user
    user_subscribed = current_user.subscribed
    print(user_subscribed)
    if user_subscribed == True:
        print("using the template for subscribed user")
        return render(request, 'emapp/selectsubject.html')
    else:
        print("using the template for unsubscribed user")
        return render(request, 'emapp/unsubscribed.html')


def logout_view(request):
    logout(request)
    return redirect('login')

@login_required()
def subscribe_half(request):
    amount = '100000'
    user = request.user
    full_name = request.user.full_name
    email = request.user.email
    phone = request.user.phone_number

    response = Transaction.initialize(amount=amount, email=email)

    ref = response['data']['reference']
    print(full_name)
    create_pay_instance = Payment.objects.create(customers_name=full_name, customers_email=email,
                                                   customers_phone=phone, product_type='6 months',
                                                   reference=ref, amount='1000')

    a_url = response['data']['authorization_url']
    return redirect(a_url)

@login_required()
def subscribe_full(request):
    amount = '170000'
    user = request.user
    full_name = request.user.full_name
    email = request.user.email
    phone = request.user.phone_number

    response = Transaction.initialize(amount=amount, email=email)

    ref = response['data']['reference']
    print(full_name)
    create_pay_instance = Payment.objects.create(customers_name=full_name, customers_email=email,
                                                   customers_phone=phone, product_type='1 Year',
                                                   reference=ref, amount='1700')

    a_url = response['data']['authorization_url']
    return redirect(a_url)



@login_required()
def verify_payment(request):
    paramz = request.GET.get('trxref', 'None')
    user = request.user
    full_name = request.user.full_name
    email = request.user.email
    phone = request.user.phone_number
    print(paramz)
    pay_queryobj = Payment.objects.all().filter(reference=paramz)
    pay_instance = Payment.objects.all().filter(reference=paramz).first()
    details = Transaction.verify(reference=paramz)
    status = details['data']['status']
    if status == 'success':
        if pay_instance.product_type == '6 months':
            expiry_date = pay_instance.date_created + timedelta(days=184)
            pay_queryobj.update(paid=True, expiry_date=expiry_date)
            email = request.user.email
            current_user = Customuser.objects.filter(email = email)
            current_user.update(subscribed=True, expiry_date=expiry_date)
        elif pay_instance.product_type == '1 Year':
            expiry_date = pay_instance.date_created + timedelta(days=367)
            pay_queryobj.update(paid=True, expiry_date=expiry_date)
            email = request.user.email
            current_user = Customuser.objects.filter(email = email)
            current_user.update(subscribed=True, expiry_date=expiry_date)

    else:
        print(' payment not successful')

    return redirect('cbtexam')



def loginpage(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            print(username)
            print(password)


            #custom_user = Customuser.objects.filter(email=username)
            custom_user = authenticate(request, username=username, password=password)
            if custom_user is not None:
                #messages.success(request, 'Login Succesful')
                login(request, custom_user)
                #print('user has been logged in')
                return redirect('cbtexam')
            elif custom_user is None:
                print('message section')
                messages.warning(request, 'Incorrect email address or password')
            print(custom_user)
        else:
            print('else portion')
    else:
        form = LoginForm()
        print('this is a get request')
    return render(request, 'emapp/login.html', {'form': form})

def phoneloginpage(request):
    if request.method == 'POST':
        form = PhoneLoginForm(request.POST)
        if form.is_valid():
            phone = form.cleaned_data.get('phone')
            password = form.cleaned_data.get('password')

            def verify_exists():
                if Customuser.objects.filter(phone_number=phone).exists():
                    return True
                else:
                    return False
            if verify_exists():
                user = Customuser.objects.filter(phone_number=phone).first()
                username = (user.username)
                custom_user = authenticate(request, username=username, password=password)
                if custom_user is not None:
                    # messages.success(request, 'Login Succesful')
                    login(request, custom_user)
                    print('user has been logged in')
                    return redirect('subscription')
                elif custom_user is None:
                    messages.warning(request, 'Incorrect password')
                #print(custom_user)
            else:
                messages.warning(request, 'Incorrect phone Number')
                print(" phone Number not register with exammaster.com")
            """
            custom_user = authenticate(request, username=username, password=password)
            if custom_user is not None:
                #messages.success(request, 'Login Succesful')
                login(request, custom_user)
                #print('user has been logged in')
                return redirect('subscription')
            elif custom_user is None:
                print('message section')
                messages.warning(request, 'Incorrect email address or password')
            print(custom_user)
            """
        else:
            print('else portion')
        #print(username)
        #print(password)
    else:
        form = PhoneLoginForm()
        #print('this is a get request')
    return render(request, 'emapp/phonelogin.html', {'form': form})


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            full_name = form.cleaned_data.get('full_name')
            email = form.cleaned_data.get('email')
            phone_number = form.cleaned_data.get('phone_number')
            password1 = form.cleaned_data.get('password1')
            password2 = form.cleaned_data.get('password2')
            def verify_doesnt_exists():
                if Customuser.objects.filter(email = email).exists():
                    messages.warning(request, 'This email has been used already')
                    print("email address already exists")
                    return False
                elif Customuser.objects.filter(phone_number = phone_number).exists():
                    messages.warning(request, 'This phone number has already been used before')
                    print("phone_number already exists")
                    return False
                else:
                    return True

            if password1 == password2:
                if verify_doesnt_exists():
                    hashed = make_password(password1, salt = None, hasher='default')
                    print(hashed)
                    Customuser.objects.create(username=email, full_name=full_name, email=email, phone_number=phone_number, password = hashed)
                    custom_user = authenticate(username=email, password=password1)
                    messages.success(request, 'Account Successfully Created')
                    return redirect('login')

            else:
                messages.warning(request, 'Passwords Don\'t Match')

        else:
            print('else portion')
        #print(username)
        #print(password)
    else:
        form = SignUpForm()
        #print('this is a get request')
    return render(request, 'emapp/signup.html', {'form': form})

"""def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            phone_number = form.cleaned_data.get('phone_number')
            password1 = form.cleaned_data.get('password')
            #password2 = form.cleaned_data.get('password2')



            if password1 == password2:
                Customuser.objects.create(username=username, email=email, phone_number=phone_number)
                custom_user = authenticate(username=username, password=password1)
                messages.warning(request, 'Account Successfully Created')
                return redirect('login')
            else:
                messages.warning(request, 'Passwords Don\'t Match')
            
        else:
            print('else portion')
        #print(username)
        #print(password)
    else:
        form = RegisterForm()
        print('this is a get request')
    return render(request, 'emapp/signup.html', {'form': form})
"""


