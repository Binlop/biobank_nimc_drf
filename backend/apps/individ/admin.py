from django.contrib import admin
from .models import Individ, Embryo, Father, Mother, MotherPregnancy, AnotherFamilyMember

admin.site.register(Individ)
admin.site.register(Embryo)
admin.site.register(Father)
admin.site.register(Mother)
admin.site.register(MotherPregnancy)
admin.site.register(AnotherFamilyMember)