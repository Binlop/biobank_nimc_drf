from django.db import transaction
from ..models import Sample, DNA

class DNAService():
    
    @transaction.atomic
    def create_dna(self, validated_data: dict) -> DNA:
        dna = DNA.objects.create(**validated_data)
        dna.sampletype = 'dna'
        dna.save()

        sample = Sample(content_object=dna, name=dna.name)
        sample.save()
        return dna
    
    @transaction.atomic
    def update_dna(self, instance: DNA, validated_data: dict) -> DNA:
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance