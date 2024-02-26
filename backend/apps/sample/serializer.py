from rest_framework import serializers
from individ.serializer import IndividSerializerInput
from individ.serializer import EmbryoSerializerOutput, FatherSerializerOutput, MotherSerializerOutput, AdultSerializerOutput
from individ.models import Individ, Embryo, Father, Mother, AnotherFamilyMember
from .services import dna, chorion
from .models import Sample, DNA, Chorion

class SampleSerializerOutput(serializers.Serializer):
    class Meta:
        model = Sample
        fields = ['id', 'name', 'sample_type']

    # def to_representation(self, value):
    #     """
    #     Serialize bookmark instances using a bookmark serializer,
    #     and note instances using a note serializer.
    #     """
    #     if isinstance(value, DNA):
    #         serializer = DNAOutputSerializer(value)
    #     elif isinstance(value, Chorion):
    #         serializer = ChorionOutputSerializer(value)
    #     else:
    #         raise Exception('Unexpected type of individ object')

    #     return serializer.data
    
# class SampleSerializerInput(serializers.ModelSerializer):
#     class Meta:
#         model = Individ
#         fields = ['id', 'name', 'sample_type']

class CustomSampleSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=150)
    individ = serializers.SerializerMethodField()
    barcode = serializers.CharField(max_length=150, required=True)
    sampletype = serializers.CharField(max_length=10) #e.g Кровь, ДНК, хорион
    volume = serializers.IntegerField(required=False)
    sample = SampleSerializerOutput()

    def get_individ(self, obj):
        individ = obj.individ.content_object
        if isinstance(individ, Embryo):
            serializer = EmbryoSerializerOutput(individ)
        elif isinstance(individ, Father):
            serializer = FatherSerializerOutput(individ)
        elif isinstance(individ, Mother):
            serializer = MotherSerializerOutput(individ)
        elif isinstance(individ, AnotherFamilyMember):
            serializer = AdultSerializerOutput(individ)
        else:
            raise Exception('Unexpected type of individ object')

        return serializer.data

class DNAOutputSerializer(CustomSampleSerializerOutput):
    pass

class DNAInputSerializer(DNAOutputSerializer):
    sampletype = serializers.CharField(max_length=10, required=False) #e.g Кровь, ДНК, хорион

    def create(self, validated_data: dict):
        service = dna.DNAService()
        return service.create_dna(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        service = dna.DNAService()
        return service.update_dna(instance, validated_data)

class ChorionOutputSerializer(CustomSampleSerializerOutput):
    pass

class ChorionInputSerializer(DNAOutputSerializer):
    sampletype = serializers.CharField(max_length=10, required=False) 

class BloodOutputSerializer(CustomSampleSerializerOutput):
    pass

class BloodInputSerializer(DNAOutputSerializer):
    sampletype = serializers.CharField(max_length=10, required=False)