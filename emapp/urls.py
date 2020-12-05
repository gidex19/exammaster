from django.urls import path
from . import views as emapp_view
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', emapp_view.home, name = 'homepage'),
    path('subscription/', emapp_view.subscription, name = 'subscription'),
    path('login/', emapp_view.loginpage, name = 'login'),
    path('logout/', emapp_view.logout_view, name = 'logout'),
    path('semipay/', emapp_view.subscribe_half, name = 'semipay'),
    path('fullpay/', emapp_view.subscribe_full, name = 'fullpay'),
    path('verify/', emapp_view.verify_payment, name = 'verify'),
    path('phonelogin/', emapp_view.phoneloginpage, name = 'phonelogin'),
    path('cbtexam/', emapp_view.selectexam, name = 'cbtexam'),
    path('cbtexam/jamb/select', emapp_view.selectsubject, name = 'select'),
    #path('register/', emapp_view.register, name = 'register'),
    path('signup/', emapp_view.signup, name = 'signup'),
    path('subscription/paywithcard/', emapp_view.paywithcard, name = 'paywithcard'),
    path('subscription/paywithbank/', emapp_view.paywithbank, name = 'paywithbank'),
    #path('login/', auth_views.LoginView.as_view(template_name ='emapp/login.html'), name = 'login'),
]