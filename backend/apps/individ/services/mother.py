from django.db import transaction
from django.shortcuts import get_object_or_404
from family.services import FamilyCreateService
from ..models import Individ, Mother, MotherPregnancy

class MotherService():
    
    @transaction.atomic
    def create_mother(self, validated_data: dict, create_family: bool = False) -> Mother:
        laboratory = validated_data.pop('laboratory')
        create_family = validated_data.pop('create_family')

        mother = Mother.objects.create(**validated_data)
        mother.individ_type = 'mother'
        mother.laboratory.set(laboratory)
        family_service = FamilyCreateService()
        if create_family:
            mother.family = family_service.create_family(validated_data={'name': 'Семья', 'laboratory': laboratory})
        mother.save()

        individ = Individ(content_object=mother, name=mother.name)
        individ.save()
        return mother
    
    @transaction.atomic
    def update_mother(self, instance: Mother, validated_data: dict) -> Mother:
        laboratory_data = validated_data.pop('laboratory')
        for field, value in validated_data.items():
            setattr(instance, field, value)
            
        instance.laboratory.set(laboratory_data)
        instance.save()
        return instance
    
    @transaction.atomic
    def create_mother_pregnancy(self, validated_data: dict):
        mother_id = validated_data.pop('mother_id', None)
        if mother_id:
            mother = get_object_or_404(Mother, id=mother_id)
            validated_data['mother_id'] = mother.individ.first().id
            pregnancy = MotherPregnancy.objects.create(**validated_data)
            pregnancy.save()
            return pregnancy
    
    @transaction.atomic
    def update_mother_pregnancy(self, instance: MotherPregnancy, validated_data: dict):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance