from django.urls import path
from . import views

urlpatterns = [
    path('', views.FreezerListView.as_view()),

    path('freezer/<int:pk>/', views.FreezerDetailView.as_view()),
    path('freezer/create/', views.FreezerCreateView.as_view()),
    path('freezer/<int:pk>/update/', views.FreezerUpdateView.as_view()),

    path('drawer/<int:pk>/', views.DrawerDetailView.as_view()),
    path('drawer/create/', views.DrawerCreateView.as_view()),
    path('drawer/<int:pk>/update/', views.DrawerUpdateView.as_view()),
    
]