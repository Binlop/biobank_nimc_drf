from django.contrib import admin
from .models import Freezer, Drawer, Shelf, Box, SamplesMap

admin.site.register(Freezer)
admin.site.register(Drawer)
admin.site.register(Shelf)
admin.site.register(Box)
admin.site.register(SamplesMap)