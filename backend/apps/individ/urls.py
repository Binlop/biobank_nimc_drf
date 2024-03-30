from django.urls import path, include
from individ import views

urlpatterns = [
    path('', views.FamilyMemberListView.as_view()),
    path('search/', views.FamilyMemberListSearchView.as_view()),
    path('family_<int:pk>_individs/', views.FamilyMembersToFamilyView.as_view()),


    path('<int:pk>/', views.FamilyMemberDetail.as_view()),
    path('<int:pk>/delete/', views.FamilyMemberDeleteView.as_view()),

    path('embryo/create/', views.EmbryoCreateView.as_view()),
    path('embryo/<int:pk>/update/', views.EmbryoUpdateView.as_view()),

    path('father/create/', views.FatherCreateView.as_view()),
    path('father/<int:pk>/update/', views.FatherUpdateView.as_view()),

    path('mother/create/', views.MotherCreateView.as_view()),
    path('mother/<int:pk>/update/', views.MotherUpdateView.as_view()),
    path('mother/<int:pk>/pregnancy/', views.MotherPregnancyView.as_view()),

    path('another_member/create/', views.AnotherMemberCreateView.as_view()),
    path('another_member/<int:pk>/update/', views.AnotherMemberUpdateView.as_view()),

    path('mother/<int:pk>/pregnancy/', views.MotherPregnancyListView.as_view()),
    path('mother/pregnancy/<int:pk>/update/', views.MotherPregnancyView.as_view()),
    path('mother/pregnancy/<int:pk>/delete/', views.MotherPregnancyView.as_view()),
]