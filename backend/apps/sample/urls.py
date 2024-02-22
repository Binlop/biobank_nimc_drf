from django.urls import path, include
from .views import SampleListView

urlpatterns = [
    path('', SampleListView.as_view()),
    path('dna/', include('sample.dna.urls')),
    path('blood/', include('sample.dna.urls')),
    path('chorion/', include('sample.dna.urls')),
]