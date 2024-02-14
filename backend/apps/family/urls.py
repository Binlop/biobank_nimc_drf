from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from family import views

urlpatterns = [
    path('', views.FamilyListView.as_view()),
    path('create', views.FamilyCreateView.as_view()),
    path('<int:pk>/', views.FamilyDetailView.as_view()),
    path('<int:pk>/update/', views.FamilyUpdateView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)