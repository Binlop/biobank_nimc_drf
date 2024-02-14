from rest_framework import serializers
from .models import Family
from laboratory.serializers import LaboratorySerializer
from .services import FamilyCreateService

class FamilySerializerOutput(serializers.ModelSerializer):
    laboratory = LaboratorySerializer(read_only=True, many=True)

    class Meta:
        model = Family
        fields = ('id', 'name', 'description', 'laboratory')


class FamilySerializerInput(serializers.ModelSerializer):
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    
    class Meta:
        model = Family
        fields = ('id', 'name', 'description', 'laboratory')
        extra_kwargs = {'laboratory': {'required': False}}

    def create(self, validated_data):
        service = FamilyCreateService()
        return service.create_family(validated_data=validated_data)
    
    def validate_name(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Название более 2 символов")
        return value
    
    def validate_description(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Описание более 2 символов")
        return value
