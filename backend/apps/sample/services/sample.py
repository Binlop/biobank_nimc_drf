from typing import TypeVar
from django.db import transaction
from django.shortcuts import get_object_or_404
from individ.models import Individ
from storage.models import SamplesMap
from ..models import Sample, DNA, Chorion, Blood, Endometrium, FetalSacNitrogen, FetalSacFreezer, Aliquot

class BaseSampleService():
    model = None
    A = TypeVar('A', DNA, Chorion)

    @transaction.atomic
    def create_sample(self, custom_sample: A, location_id: int) -> Sample:
        sample = Sample(content_object=custom_sample, name=custom_sample.name)
        if location_id:
            location = get_object_or_404(SamplesMap, id=location_id)
            sample.location = location
            sample.save()
            self.set_new_location_to_occupied(location_id=location_id, sample=sample)
        sample.save()
        return sample

    @transaction.atomic
    def update_sample(self, sample: Sample, location_id: int) -> Sample:
        if location_id:
            if sample.location:
                self.set_previous_location_to_free(previous_location=sample.location)
            sample.location = self.set_new_location_to_occupied(location_id=location_id, sample=sample)
        sample.save()
        return sample

    @transaction.atomic
    def set_new_location_to_occupied(self, location_id: int, sample: Sample) -> SamplesMap:
        location = get_object_or_404(SamplesMap, id=location_id)
        location.sample_id = sample.id
        location.sample_type = sample.content_object.sampletype
        location.state_location = 'occupied'
        location.save()
        return location

    @transaction.atomic
    def set_previous_location_to_free(self, previous_location: SamplesMap):
        previous_location.sample_id = None
        previous_location.sample_type = None
        previous_location.state_location = 'free'
        previous_location.save()

    def create_custom_sample(self, validated_data: dict) -> A:
        if self.model is None:
            raise ValueError("Model is not specified")
        custom_sample = self.model(**validated_data)
        if not validated_data.get('individ_id', None):
            raise KeyError(f'Individ_id does not exist in validated data')

        individ = get_object_or_404(Individ, id=validated_data['individ_id'])
        custom_sample.individ = individ
        return custom_sample
    
    def update_custom_sample(self, instance: A, validated_data: dict) -> A:
        location = validated_data.pop('sample_place', None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.sample.name = instance.name
        self.update_sample(instance.sample.first(), location_id=location)
        return instance

    @transaction.atomic
    def delete_sample(self, instance: A):
        if instance.location_id:
            self.set_previous_location_to_free(previous_location=instance.location)
        biospecimen = instance.content_object
        biospecimen.delete()
        instance.delete()

class SampleService(BaseSampleService):
    model = None
    A = TypeVar('A', DNA, Chorion)

    @transaction.atomic
    def create_biospecimen(self, validated_data: dict) -> A:
        location = validated_data.pop('sample_place', None)
        biospecimen = self.create_custom_sample(validated_data=validated_data)
        biospecimen.sampletype = self.sampletype
        biospecimen.save()
        sample = self.create_sample(custom_sample=biospecimen, location_id=location)
        biospecimen.sample.add(sample, bulk=False)
        biospecimen.save()
        return biospecimen
    
    @transaction.atomic
    def update_biospecimen(self, instance, validated_data: dict) -> A:
        instance = self.update_custom_sample(instance=instance, validated_data=validated_data)
        instance.save()
        return instance
    
class DNAService(SampleService):
    model = DNA
    sampletype = 'dna'

class BloodService(SampleService):
    model = Blood
    sampletype = 'blood'

class ChorionService(SampleService):
    model = Chorion
    sampletype = 'chorion'

class EndometriumService(SampleService):
    model =Endometrium
    sampletype = 'endometrium'

class FetalSacNitrogenService(SampleService):
    model = FetalSacNitrogen
    sampletype = 'fetal_sac_nitrogen'

class FetalSacFreezerService(SampleService):
    model = FetalSacFreezer
    sampletype = 'fetal_sac_freezer'

class AliquotService(SampleService):
    model = Aliquot
    sampletype = 'aliquot'



    @transaction.atomic
    def create_biospecimen(self, validated_data: dict) -> SampleService.A:
        if not validated_data.get('original_sample_id', None):
            raise KeyError(f'Original sample id does not exist in validated data')
        
        location = validated_data.pop('sample_place', None)
        biospecimen = self.create_custom_sample(validated_data=validated_data)
        biospecimen.sampletype = self.sampletype
        
        original_sample_id = validated_data.pop('original_sample_id')
        original_sample = Sample.objects.get(id=original_sample_id)
        biospecimen.original_sample = original_sample

        biospecimen.save()
        sample = self.create_sample(custom_sample=biospecimen, location_id=location)
        biospecimen.sample.add(sample, bulk=False)
        biospecimen.save()
        return biospecimen


    def create_aliquot(self, validated_data: dict):
        if not validated_data.get('original_sample_id', None):
            raise KeyError(f'Original sample id does not exist in validated data')
        aliquot = self.create_biospecimen(validated_data=validated_data)
        return aliquot