from rest_framework import serializers
from .models import Laboratory

class LaboratorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = ('id', 'name', 'description')

    def validate_name(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Название более 2 символов")
        return value
    
    def validate_description(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Описание более 2 символов")
        return value