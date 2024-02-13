from rest_framework import serializers
from .models import Laboratory

class LaboratorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = ('id', 'name', 'description')
