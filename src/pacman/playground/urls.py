from django.urls import path
from django.urls import path
from . import views


urlpatterns = [
    path("pacman/", views.pacman)
]