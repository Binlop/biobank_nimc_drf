from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf.urls.static import static
from config.django import base

router = routers.DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('api/laboratory/', include('laboratory.urls')),
    path('api/family/', include('family.urls')),
    path('api/individ/', include('individ.urls')),
    path('api/sample/', include('sample.urls')),
    path('api/storage/', include('storage.urls')),

] + static(base.STATIC_ROOT, document_root=base.MEDIA_ROOT)