from rest_framework import serializers
from .models import Family
from laboratory.serializers import LaboratorySerializer

class FamilySerializer(serializers.ModelSerializer):
    laboratory = LaboratorySerializer(read_only=True, many=True)

    class Meta:
        model = Family
        fields = ('id', 'name', 'description', 'laboratory')

    def validate_name(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Название более 2 символов")
        return value
    
    def validate_description(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Описание более 2 символов")
        return value
