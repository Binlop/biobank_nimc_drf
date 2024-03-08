import django_filters
from .models import Embryo

class EmbryoFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')    
    count_blood = django_filters.CharFilter(method='filter_count_sample_gt_zero')
    count_dna = django_filters.CharFilter(method='filter_count_sample_gt_zero')
    count_chorion = django_filters.CharFilter(method='filter_count_sample_gt_zero')
    abortus_id = django_filters.NumberFilter()
    abortus_id_in_family = django_filters.CharFilter(lookup_expr='exact')
    date_of_receipt = django_filters.DateFilter()
    diagnosis = django_filters.CharFilter(lookup_expr='exact')    
    last_menstruation = django_filters.DateFilter()
    period_pregnancy_by_date = django_filters.NumberFilter()
    period_pregnancy_by_USI = django_filters.NumberFilter()
    conception = django_filters.ChoiceFilter(choices=Embryo.CONCEPTION_CHOICES)
    twins = django_filters.BooleanFilter()
    dimensions_fetal_sac_x_1 = django_filters.NumberFilter()
    dimensions_fetal_sac_y_1 = django_filters.NumberFilter()
    dimensions_fetal_sac_x_2 = django_filters.NumberFilter()
    dimensions_fetal_sac_y_2 = django_filters.NumberFilter()
    ktr = django_filters.NumberFilter()
    features_embryo = django_filters.CharFilter(lookup_expr='icontains')
    features_chorion = django_filters.CharFilter(lookup_expr='icontains')
    features_yolk_sac = django_filters.CharFilter(lookup_expr='icontains')
    features_amniotic_membrane = django_filters.CharFilter(lookup_expr='icontains')
    note = django_filters.CharFilter(lookup_expr='icontains')

    karyotype = django_filters.CharFilter(lookup_expr='icontains')
    karyotype_type = django_filters.ChoiceFilter(choices=Embryo.KARYOTYPE_CHOICES)
    supernumerary_chromosome = django_filters.CharFilter(lookup_expr='icontains')
    mosaicism = django_filters.BooleanFilter()
    standard_karyotype = django_filters.CharFilter(lookup_expr='icontains')
    aCGH_karyotype = django_filters.CharFilter(lookup_expr='icontains')
    CNV = django_filters.CharFilter(lookup_expr='icontains')
    FISH = django_filters.CharFilter(lookup_expr='icontains')
    FISH_mosaicism = django_filters.BooleanFilter()
    STR = django_filters.CharFilter(lookup_expr='icontains')
    SRY = django_filters.CharFilter(lookup_expr='icontains')
    RT_PCR = django_filters.CharFilter(lookup_expr='icontains')
    methylation = django_filters.CharFilter(lookup_expr='icontains')
    LINE = django_filters.CharFilter(lookup_expr='icontains')
    сonflict_between_different_methods = django_filters.BooleanFilter()


    class Meta:
        model = Embryo
        fields = ['name', 'count_blood', 'count_dna', 'count_chorion']

    def filter_count_sample_gt_zero(self, queryset, name, value):
        if name=="count_blood" and value == "on":
            return queryset.filter(count_blood__gt=0)            
        elif name=="count_dna" and value == "on":
            return queryset.filter(count_dna__gt=0)            
        elif name=="count_chorion" and value == "on":
            return queryset.filter(count_chorion__gt=0)            
        return queryset
        
    def filter_char_field_with_ixact_and_icontains(self, queryset, name, value):
        lookup_iexact = f'{name}__iexact'
        lookup_icontains = f'{name}__icontains'
        return queryset.filter(**{lookup_iexact: value}) | queryset.filter(**{lookup_icontains: value})

