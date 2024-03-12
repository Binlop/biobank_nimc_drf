from typing import TypeVar
from django.db import transaction
from django.shortcuts import get_object_or_404
from individ.models import Individ
from storage.models import SamplesMap
from ..models import Sample, DNA, Chorion

class SampleService():
    model = None
    A = TypeVar('A', DNA, Chorion)

    @transaction.atomic
    def create_sample(self, custom_sample: A, location_id: int) -> Sample:
        sample = Sample(content_object=custom_sample, name=custom_sample.name)
        if location_id:
            location = get_object_or_404(SamplesMap, id=location_id)
            sample.location = location
        print(location_id)
        sample.save()
        self.set_new_location_to_occupied(location_id=location_id, sample=sample)
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
        custom_sample = self.model.objects.create(**validated_data)
        if not validated_data.get('individ_id', None):
            raise KeyError(f'Individ_id does not exist in validated data')

        individ = get_object_or_404(Individ, id=validated_data['individ_id'])
        custom_sample.individ = individ
        print(custom_sample)
        return custom_sample
    
    def update_custom_sample(self, instance: A, validated_data: dict) -> A:
        location = validated_data.pop('sample_place', None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        self.update_sample(instance.sample, location_id=location)
        return instance

class DNAService(SampleService):
    model = DNA

    @transaction.atomic
    def create_dna(self, validated_data: dict) -> DNA:
        print(validated_data)
        location = validated_data.pop('sample_place', None)
        dna = self.create_custom_sample(validated_data=validated_data)
        dna.sampletype = 'dna'
        dna.save()
        sample = self.create_sample(custom_sample=dna, location_id=location)
        dna.sample = sample
        dna.save()
        return dna
    
    @transaction.atomic
    def update_dna(self, instance: DNA, validated_data: dict) -> DNA:
        instance = self.update_custom_sample(instance=instance, validated_data=validated_data)
        instance.save()
        return instance