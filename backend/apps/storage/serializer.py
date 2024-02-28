from rest_framework import serializers
from laboratory.serializers import LaboratorySerializer
from .services.storage import FreezerService, DrawerService
from .models import Freezer

class FreezerInputSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    floor = serializers.IntegerField()
    id_freezer = serializers.IntegerField()
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    
    def create(self, validated_data: dict):
        service = FreezerService()
        return service.create_freezer(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = FreezerService()
        return service.update_freezer(instance, validated_data)

class FreezerOutputSerializer(FreezerInputSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=150)
    freezer_type = serializers.CharField(max_length=20)
    floor = serializers.IntegerField()
    id_freezer = serializers.IntegerField()
    laboratory = LaboratorySerializer(many=True)


class DrawerSrializerInput(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    freezer_id = serializers.IntegerField()

    def create(self, validated_data: dict):
        service = DrawerService()
        return service.create_drawer(validated_data=validated_data)
    
    def update(self, instance: Freezer, validated_data: dict):
        service = DrawerService()
        return service.update_storage_object(instance, validated_data)

class DrawerSerializerOutput(DrawerSrializerInput):
    id = serializers.IntegerField()
    freezer = FreezerOutputSerializer()