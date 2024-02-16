from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from ..embryo import views

urlpatterns = [
    path('create/', views.EmbryoCreateView.as_view()),
    path('<int:pk>/', views.EmbryoDetailView.as_view()),
    path('<int:pk>/update', views.EmbryoDetailView.as_view()),
    path('<int:pk>/delete', views.EmbryoDetailView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
