from rest_framework import serializers
from individ.serializer import IndividSerializerInput
from individ.serializer import EmbryoSerializerOutput, FatherSerializerOutput, MotherSerializerOutput, AdultSerializerOutput
from individ.models import Individ, Embryo, Father, Mother, AnotherFamilyMember
from storage.serializer import SamplesSerializerOutut
from .services import dna, chorion
from .models import Sample, DNA, Chorion

class SampleSerializerBase(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)

    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, DNA):
            serializer = DNAOutputSerializer(value)
        elif isinstance(value, Chorion):
            serializer = ChorionOutputSerializer(value)
        else:
            raise Exception('Unexpected type of sample object')
        return serializer.data
    
class SampleSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)


class CustomSampleSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=150)
    individ = serializers.SerializerMethodField()
    barcode = serializers.CharField(max_length=150, required=True)
    sampletype = serializers.CharField(max_length=10) #e.g Кровь, ДНК, хорион
    volume = serializers.IntegerField(required=False)
    sample = SampleSerializerOutput()
    location = serializers.SerializerMethodField()

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

    def get_location(self, obj):
        location = obj.sample.location
        serializer = SamplesSerializerOutut(location, fields=('id', 'name', 'box'))
        return serializer.data

class CustomSampleSerializerInput(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    barcode = serializers.CharField(max_length=150, required=False)
    volume = serializers.IntegerField(required=False)
    individ_id = serializers.IntegerField()
    sample_place = serializers.IntegerField(required=False)


class DNAOutputSerializer(CustomSampleSerializerOutput):
    pass

class DNAInputSerializer(CustomSampleSerializerInput):
    individ_id = serializers.IntegerField(required=False)

    def create(self, validated_data: dict):
        service = dna.DNAService()
        return service.create_dna(validated_data=validated_data)
    
    def update(self, instance: DNA, validated_data: dict):
        service = dna.DNAService()
        return service.update_dna(instance, validated_data)


class ChorionOutputSerializer(CustomSampleSerializerOutput):
    pass

class ChorionInputSerializer(CustomSampleSerializerInput):
    sampletype = serializers.CharField(max_length=10, required=False) 


class BloodOutputSerializer(CustomSampleSerializerOutput):
    pass

class BloodInputSerializer(CustomSampleSerializerInput):
    sampletype = serializers.CharField(max_length=10, required=False)