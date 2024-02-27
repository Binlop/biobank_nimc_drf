from django.db import transaction
from django.shortcuts import get_object_or_404
from individ.models import Individ
from ..models import Sample, DNA

class DNAService():
    
    @transaction.atomic
    def create_dna(self, validated_data: dict) -> DNA:
        dna = DNA.objects.create(**validated_data)
        dna.sampletype = 'dna'
        if validated_data.get('individ_id', None):
            individ = get_object_or_404(Individ, id=validated_data['individ_id'])
            dna.individ = individ
            dna.save()

            sample = Sample(content_object=dna, name=dna.name, sample_type='dna')
            sample.save()
            return dna
        return KeyError(f'Individ_id does not exist in validated data')
    
    @transaction.atomic
    def update_dna(self, instance: DNA, validated_data: dict) -> DNA:
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance