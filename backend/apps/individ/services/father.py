from django.db import transaction
from family.services import FamilyCreateService
from ..models import Individ, Father

class FatherService():
    
    @transaction.atomic
    def create_father(self, validated_data: dict, create_family: bool = False) -> Father:
        laboratory = validated_data.pop('laboratory')
        create_family = validated_data.pop('create_family')

        father = Father.objects.create(**validated_data)
        father.individ_type = 'father'
        father.laboratory.set(laboratory)
        family_service = FamilyCreateService()
        if create_family:
            father.family = family_service.create_family(validated_data={'name': 'Семья', 'laboratory': laboratory})
        father.save()

        individ = Individ(content_object=father, name=father.name)
        individ.save()
        return father
    
    @transaction.atomic
    def update_father(self, instance: Father, validated_data: dict) -> Father:
        laboratory_data = validated_data.pop('laboratory')
        for field, value in validated_data.items():
            setattr(instance, field, value)
            
        instance.laboratory.set(laboratory_data)
        instance.save()
        return instance