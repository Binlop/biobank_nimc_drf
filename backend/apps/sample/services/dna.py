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
    def create_sample(self, custom_sample: A, location: int) -> Sample:
        sample = Sample(content_object=custom_sample, name=custom_sample.name)
        if location:
            location = get_object_or_404(SamplesMap, id=location)
            sample.location = location
        sample.save()
        return sample

    @transaction.atomic
    def update_sample(self, sample: Sample, location: int) -> Sample:
        if location:
            location = get_object_or_404(SamplesMap, id=location)
            sample.location = location
        sample.save()
        return sample

    def create_custom_sample(self, validated_data: dict) -> A:
        if self.model in None:
            raise ValueError("Model is not specified")
        custom_sample = self.model.objects.create(**validated_data)
        if not validated_data.get('individ_id', None):
            raise KeyError(f'Individ_id does not exist in validated data')

        individ = get_object_or_404(Individ, id=validated_data['individ_id'])
        custom_sample.individ = individ
        return custom_sample
    
    def update_custom_sample(self, instance: A, validated_data: dict) -> A:
        location = validated_data.pop('sample_place', None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        self.update_sample(instance.sample, location=location)
        return instance

class DNAService(SampleService):
    model = DNA

    @transaction.atomic
    def create_dna(self, validated_data: dict) -> DNA:
        location = validated_data.pop('sample_place', None)
        dna = self.create_custom_sample(validated_data=validated_data)
        dna.sampletype = 'dna'
        dna.save()
        self.create_sample(custom_sample=dna, location=location)
        return dna
    
    @transaction.atomic
    def update_dna(self, instance: DNA, validated_data: dict) -> DNA:
        instance = self.update_custom_sample(instance=instance, validated_data=validated_data)
        instance.save()
        return instance