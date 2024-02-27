from rest_framework import serializers
from laboratory.serializers import LaboratorySerializer


class FreezerInputSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    floor = serializers.IntegerField()
    id_freezer = serializers.IntegerField()
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    
    def create(self, validated_data: dict):
        service = embryo.EmbryoService()
        return service.create_embryo(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        service = embryo.EmbryoService()
        return service.update_embryo(instance, validated_data)

class FreezerOutputSerializer(FreezerInputSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=150)
    freezer_type = serializers.CharField(max_length=20)
    floor = serializers.IntegerField()
    id_freezer = serializers.IntegerField()
    laboratory = LaboratorySerializer(many=True)
