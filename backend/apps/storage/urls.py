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

    path('shelf/<int:pk>/', views.ShelfrDetailView.as_view()),
    path('shelf/create/', views.ShelfCreateView.as_view()),
    path('shelf/<int:pk>/update/', views.ShelfUpdateView.as_view()),

    path('box/<int:pk>/', views.BoxDetailView.as_view()),
    path('box/create/', views.BoxCreateView.as_view()),
    path('box/<int:pk>/update/', views.BoxUpdateView.as_view()),
    
    path('sample_map/create/', views.SampleMapCreateView.as_view()),
    path('sample_map/<int:pk>', views.SampleMapListView.as_view()),

]