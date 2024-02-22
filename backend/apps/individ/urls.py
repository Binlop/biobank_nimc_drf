from django.urls import path, include
from individ import views

urlpatterns = [
    path('', views.FamilyMemberListView.as_view()),
    path('<int:pk>/', views.FamilyMemberDetail.as_view()),
    path('delete/', views.FamilyMemberDeleteView.as_view()),

    path('embryo/create/', views.EmbryoCreateView.as_view()),

]