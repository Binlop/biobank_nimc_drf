import django_filters
from .models import Family
from laboratory.models import Laboratory
from django_filters import FilterSet

class FamilyFilter(FilterSet):
    laboratory = django_filters.ModelMultipleChoiceFilter(field_name='laboratory__id', to_field_name='id', queryset=Laboratory.objects.all())

    class Meta:
        model = Family
        fields = ['laboratory']