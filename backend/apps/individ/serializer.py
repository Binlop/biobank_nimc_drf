from rest_framework import serializers
from .models import FamilyMember
from laboratory.serializers import LaboratorySerializer
from family.serializer import FamilySerializerOutput
from .services import FamilyMemberService

class FamilyMemberSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    laboratory = LaboratorySerializer(read_only=True, many=True)
    family = FamilySerializerOutput(read_only=True)
    name = serializers.CharField(max_length=256)
    description = serializers.CharField(max_length=256)
    individ_type = serializers.CharField(max_length=10)
    count_blood = serializers.IntegerField()
    count_dna = serializers.IntegerField()
    count_chorion = serializers.IntegerField()


class FamilyMemberSerializerInput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)    
    name = serializers.CharField(max_length=256)
    description = serializers.CharField(max_length=256)
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    create_family = serializers.BooleanField(required=False)

    
    def validate_name(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Название более 2 символов")
        return value
    
    def validate_description(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Описание более 2 символов")
        return value