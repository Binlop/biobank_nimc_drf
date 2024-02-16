from django.urls import path, include
from individ.views import FamilyMemberListView

urlpatterns = [
    path('', FamilyMemberListView.as_view()),
    path('embryo/', include('individ.embryo.urls')),
    path('father/', include('individ.embryo.urls')),
    path('mother/', include('individ.embryo.urls')),
]