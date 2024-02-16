from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('api/laboratory/', include('laboratory.urls')),
    path('api/family/', include('family.urls')),
    path('api/individ/', include('individ.urls')),
]