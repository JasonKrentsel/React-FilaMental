from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views
from .models import Directory

urlpatterns = [
    path("say_hello/", views.say_hello, name="say_hello"),
    path("create_base_directory/", views.create_base_directory, name="create_base_directory"),

    path("dir/<str:directory_pk>/", views.DirectoryViewSet.as_view({'get': 'list'}), name="directory"),

    path("dir/<str:directory_pk>/newdir", views.DirectoryCreateViewSet.as_view({'get': 'list', 'post': 'create'}), name="new_directory"),

    path("dir/<str:directory_pk>/files/", views.FileViewSet.as_view({'get': 'list', 'post': 'create'}), name="files"),
]