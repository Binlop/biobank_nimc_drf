from django.urls import path, include
from individ import views

urlpatterns = [
    path('', views.FamilyMemberListView.as_view()),
    path('<int:pk>/', views.FamilyMemberDetail.as_view()),
    path('delete/', views.FamilyMemberDeleteView.as_view()),

    path('embryo/create/', views.EmbryoCreateView.as_view()),
    path('embryo/<int:pk>/update/', views.EmbryoUpdateView.as_view()),

    path('father/create/', views.FatherCreateView.as_view()),
    path('father/<int:pk>/update/', views.FatherUpdateView.as_view()),

    path('mother/create/', views.MotherCreateView.as_view()),
    path('mother/<int:pk>/update/', views.MotherUpdateView.as_view()),

    path('another_member/create/', views.AnotherFamilyCreateView.as_view()),
    path('another_member/<int:pk>/update/', views.AnotherFamilyUpdateView.as_view()),

]