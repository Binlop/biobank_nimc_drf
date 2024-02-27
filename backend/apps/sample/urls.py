from django.urls import path, include
from . import views


urlpatterns = [
    path('individ_<int:pk>_samples/', views.IndividSampleList.as_view()),

    path('', views.SampleListView.as_view()),
    path('<int:pk>/', views.SampleDetailView.as_view()),
    path('<int:pk>/delete/', views.SampleDeleteView.as_view()),

    path('dna/create/', views.DNACreateView.as_view()),
    path('dna/<int:pk>/update/', views.DNAUpdateView.as_view()),

]


