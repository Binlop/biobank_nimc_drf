from django.urls import path
from . import views

urlpatterns = [
    path('', views.FreezerListView.as_view()),

    path('freezer/<int:pk>/', views.FreezerDetailView.as_view()),
]