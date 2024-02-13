from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from laboratory import views

urlpatterns = [
    path('', views.LaboratoryListView.as_view()),
    path('create', views.LaboratoryCreateView.as_view()),
    path('<int:pk>/', views.LaboratoryDetailView.as_view()),
    path('<int:pk>/update/', views.LaboratoryUpdateView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)