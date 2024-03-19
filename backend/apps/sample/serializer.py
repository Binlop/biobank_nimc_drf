from rest_framework import serializers
from individ.serializer import EmbryoSerializerOutput, FatherSerializerOutput, MotherSerializerOutput, AdultSerializerOutput
from individ.models import Individ, Embryo, Father, Mother, AnotherFamilyMember
from storage.serializer import SamplesSerializerOutut
from .services import sample
from .models import Sample, DNA, Chorion, Blood, Endometrium, FetalSacNitrogen, FetalSacFreezer


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
        elif isinstance(value, Blood):
            serializer = BloodOutputSerializer(value)
        elif isinstance(value, Endometrium):
            serializer = EndometriumOutputSerializer(value)
        elif isinstance(value, FetalSacNitrogen):
            serializer = FetalSacNitrogenOutputSerializer(value)
        elif isinstance(value, FetalSacFreezer):
            serializer = FetalSacFreezerOutputSerializer(value)
        else:
            raise Exception('Unexpected type of sample object')
        return serializer.data
    
class SampleSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)


class IndividSamplesListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=150)
    sample = serializers.SerializerMethodField()
    sampletype = serializers.CharField(max_length=10) #e.g Кровь, ДНК, хорион
    location = serializers.SerializerMethodField()
    volume = serializers.IntegerField(read_only=True)

    def get_location(self, obj):
        sample = obj.sample.first()
        location = sample.location
        serializer = SamplesSerializerOutut(location, fields=('name', 'box'))
        return serializer.data
    
    def get_sample(self, obj):
        sample = obj.sample.first()
        serializer = SampleSerializerOutput(sample)
        return serializer.data

class CustomSampleSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=150)
    individ = serializers.SerializerMethodField()
    barcode = serializers.CharField(max_length=150, required=True)
    sampletype = serializers.CharField(max_length=10) #e.g Кровь, ДНК, хорион
    volume = serializers.IntegerField(required=False)
    location = serializers.SerializerMethodField()
    sample = serializers.SerializerMethodField()

    def get_individ(self, obj):
        individ = obj.individ.content_object
        if isinstance(individ, Embryo):
            serializer = EmbryoSerializerOutput(individ, fields=('name', 'individ_type', 'individ'))
        elif isinstance(individ, Father):
            serializer = FatherSerializerOutput(individ, fields=('name', 'individ_type', 'individ'))
        elif isinstance(individ, Mother):
            serializer = MotherSerializerOutput(individ, fields=('name','individ_type', 'individ'))
        elif isinstance(individ, AnotherFamilyMember):
            serializer = AdultSerializerOutput(individ, fields=('name', 'individ_type', 'individ'))
        else:
            raise Exception('Unexpected type of individ object')

        return serializer.data

    def get_location(self, obj):
        
        sample = obj.sample.first()
        location = sample.location
        serializer = SamplesSerializerOutut(location, fields=('id', 'name', 'box'))
        return serializer.data
    
    def get_sample(self, obj):
        sample = obj.sample.first()
        serializer = SampleSerializerOutput(sample)
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
        service = sample.DNAService()
        return service.create_biospecimen(validated_data=validated_data)
    
    def update(self, instance: DNA, validated_data: dict):
        service = sample.DNAService()
        return service.update_biospecimen(instance, validated_data)


class ChorionOutputSerializer(CustomSampleSerializerOutput):
    pass

class ChorionInputSerializer(CustomSampleSerializerInput):
    individ_id = serializers.IntegerField(required=False)
    sample_place = serializers.IntegerField(required=False)

    def create(self, validated_data: dict):
        service = sample.ChorionService()
        return service.create_biospecimen(validated_data=validated_data)
    
    def update(self, instance: DNA, validated_data: dict):
        service = sample.ChorionService()
        return service.update_biospecimen(instance, validated_data)


class BloodOutputSerializer(CustomSampleSerializerOutput):
    pass

class BloodInputSerializer(CustomSampleSerializerInput):
    individ_id = serializers.IntegerField(required=False)

    def create(self, validated_data: dict):
        print(validated_data)

        service = sample.BloodService()
        return service.create_biospecimen(validated_data=validated_data)
    
    def update(self, instance: Blood, validated_data: dict):
        service = sample.BloodService()
        return service.update_biospecimen(instance, validated_data)
    

class EndometriumOutputSerializer(CustomSampleSerializerOutput):
    pass

class EndometriumInputSerializer(CustomSampleSerializerInput):
    individ_id = serializers.IntegerField(required=False)

    def create(self, validated_data: dict):
        service = sample.EndometriumService()
        return service.create_biospecimen(validated_data=validated_data)
    
    def update(self, instance: DNA, validated_data: dict):
        service = sample.EndometriumService()
        return service.update_biospecimen(instance, validated_data)
    

class FetalSacNitrogenOutputSerializer(CustomSampleSerializerOutput):
    pass

class FetalSacNitrogenInputSerializer(CustomSampleSerializerInput):
    individ_id = serializers.IntegerField(required=False)

    def create(self, validated_data: dict):
        service = sample.FetalSacNitrogenService()
        return service.create_biospecimen(validated_data=validated_data)
    
    def update(self, instance: DNA, validated_data: dict):
        service = sample.FetalSacNitrogenService()
        return service.update_biospecimen(instance, validated_data)
    

class FetalSacFreezerOutputSerializer(CustomSampleSerializerOutput):
    pass

class FetalSacFreezerInputSerializer(CustomSampleSerializerInput):
    individ_id = serializers.IntegerField(required=False)

    def create(self, validated_data: dict):
        service = sample.FetalSacFreezerService()
        return service.create_biospecimen(validated_data=validated_data)
    
    def update(self, instance: DNA, validated_data: dict):
        service = sample.FetalSacFreezerService()
        return service.update_biospecimen(instance, validated_data)
    
