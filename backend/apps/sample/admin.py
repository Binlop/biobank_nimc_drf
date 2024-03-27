from django.contrib import admin
from .models import Sample, DNA, Chorion, Blood, Endometrium, FetalSacNitrogen, FetalSacFreezer, Aliquot

admin.site.register(Sample)
admin.site.register(DNA)
admin.site.register(Chorion)
admin.site.register(Blood)
admin.site.register(Endometrium)
admin.site.register(FetalSacNitrogen)
admin.site.register(FetalSacFreezer)
admin.site.register(Aliquot)