from django import forms
from .models import Customuser

class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.EmailInput(attrs={'placeholder': 'Email Address', 'class': 'form-control mb-4', 'id': 'inputUsername'}),
        label="Email Address")
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control ', 'id': 'inputPassword'}), label="Password")

class PhoneLoginForm(forms.Form):
    phone = forms.CharField(
        widget=forms.NumberInput(attrs={'placeholder': 'Phone Number', 'class': 'form-control mb-4', 'id': 'inputUsername'}),
        label="Phone Number")
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control ', 'id': 'inputPassword'}), label="Password")


class SignUpForm(forms.Form):
    full_name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Full Name', 'class': 'form-control mb-4', 'id': 'inputUsername'}),
        label="Full Name")

    email = forms.CharField(
        widget=forms.EmailInput(attrs={'placeholder': 'Email Address', 'class': 'form-control mb-4', 'id': 'inputUsername'}),
        label="Email Address")
    phone_number = forms.CharField(
        widget=forms.NumberInput(attrs={'placeholder': 'Phone Number', 'class': 'form-control mb-4', 'id': 'inputUsername'}),
        label="Phone Number")

    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control mb-4 ', 'id': 'inputPassword1'}),
        label="Password")
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password Again', 'class': 'form-control mb-4', 'id': 'inputPassword2'}),
        label="Enter Password Again")

class RegisterForm(forms.ModelForm):
    class Meta:
        model = Customuser
        fields =['username', 'email', 'phone_number', 'password']