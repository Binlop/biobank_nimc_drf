from django.urls import path, include
from . import views


urlpatterns = [
    path('individ_<int:pk>_samples/', views.IndividSampleList.as_view()),
    path('find_by_barcode/<int:barcode>', views.SampleListViewByBarcode.as_view()),

    path('', views.SampleListView.as_view()),
    path('<int:pk>/', views.SampleDetailView.as_view()),
    path('<int:pk>/delete/', views.SampleDeleteView.as_view()),

    path('dna/create/', views.DNACreateView.as_view()),
    path('dna/<int:pk>/update/', views.DNAUpdateView.as_view()),
    
    path('blood/create/', views.BloodCreateView.as_view()),
    path('blood/<int:pk>/update/', views.BloodUpdateView.as_view()),

    path('chorion/create/', views.ChorionCreateView.as_view()),
    path('chorion/<int:pk>/update/', views.ChorionUpdateView.as_view()),

    path('endometrium/create/', views.EndometriumCreateView.as_view()),
    path('endometrium/<int:pk>/update/', views.EndometriumUpdateView.as_view()),

    path('fetal_sac_nitrogen/create/', views.FetalSacNitrogenCreateView.as_view()),
    path('fetal_sac_nitrogen/<int:pk>/update/', views.FetalSacNitrogenUpdateView.as_view()),

    path('fetal_sac_freezer/create/', views.FetalSacFreezerCreateView.as_view()),
    path('fetal_sac_freezer/<int:pk>/update/', views.FetalSacFreezerUpdateView.as_view()),

    path('aliquot/<int:pk>/', views.SampleAliquotsListView.as_view()),
    path('aliquot/create/', views.AliquotCreateView.as_view()),
    path('aliquot/<int:pk>/update/', views.AliquotUpdateView.as_view()),
]


