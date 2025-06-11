
from django.urls import path
from . import views # this imports views from directory pages/ views.py

urlpatterns = [
 path('', views.home, name='home'),  # Home page
]
