from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('create/', views.DNACreateView.as_view()),
    path('<int:pk>/', views.DNADetailView.as_view()),
    path('<int:pk>/update/', views.DNAUpdateView.as_view()),
    # path('<int:pk>/delete/', views.EmbryoDetailView.as_view()),
]