from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.SampleListView.as_view()),

    path('dna/<int:pk>/', views.DNADetailView.as_view()),
    path('dna/create', views.DNACreateView.as_view()),
    path('dna/<int:pk>/update', views.DNAUpdateView.as_view()),

]