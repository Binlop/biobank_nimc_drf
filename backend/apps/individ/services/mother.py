from django.db import transaction
from family.services import FamilyCreateService
from ..models import Individ, Mother

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