from rest_framework import serializers
from ..serializer import FamilyMemberSerializerOutput, FamilyMemberSerializerInput
from .services import EmbryoService

class EmbryoSerializerOutput(FamilyMemberSerializerOutput):
    test_field = serializers.CharField(max_length=256)


class EmbryoSerializerInput(FamilyMemberSerializerInput):
    test_field = serializers.CharField(max_length=256)


    def create(self, validated_data):
        service = EmbryoService()
        return service.create_embryo(validated_data=validated_data)

