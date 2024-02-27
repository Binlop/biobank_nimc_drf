from django.contrib import admin
from .models import Freezer, FreezerDrawer, Shelf, Box, SamplesMap

admin.site.register(Freezer)
admin.site.register(FreezerDrawer)
admin.site.register(Shelf)
admin.site.register(Box)
admin.site.register(SamplesMap)