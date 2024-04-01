from rest_framework import serializers
from .models import Laboratory

# class LaboratorySerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField()
#     description = serializers.CharField()

#     def validate_name(self, value):
#         if len(value) < 2:
#              raise serializers.ValidationError("Название более 2 символов")
#         return value
    
#     def validate_description(self, value):
#         if len(value) < 2:
#              raise serializers.ValidationError("Описание более 2 символов")
#         return value
    
#     def create(self, validated_data: dict):
#         service = sample.DNAService()
#         return service.create_biospecimen(validated_data=validated_data)
    
#     def update(self, instance: DNA, validated_data: dict):
#         service = sample.DNAService()
#         return service.update_biospecimen(instance, validated_data)
    
class LaboratorySerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # name = serializers.CharField()
    # description = serializers.CharField()
    class Meta:
        model = Laboratory
        fields = ('id', 'name', 'description')

    # def validate_name(self, value):
    #     if len(value) < 2:
    #          raise serializers.ValidationError("Название более 2 символов")
    #     return value
    
    # def validate_description(self, value):
    #     if len(value) < 2:
    #          raise serializers.ValidationError("Описание более 2 символов")
    #     return value
    
    # def create(self, validated_data: dict):
    #     service = sample.DNAService()
    #     return service.create_biospecimen(validated_data=validated_data)
    
    # def update(self, instance: DNA, validated_data: dict):
    #     service = sample.DNAService()
    #     return service.update_biospecimen(instance, validated_data)