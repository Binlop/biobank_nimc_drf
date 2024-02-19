from django.db import transaction
from .models import Embryo
from family.services import FamilyCreateService

class EmbryoService():
    
    @transaction.atomic
    def create_embryo(self, validated_data: dict, create_family: bool = False):
        laboratory = validated_data.pop('laboratory')
        create_family = validated_data.pop('create_family')
        embryo = Embryo.objects.create(**validated_data)
        embryo.individ_type = 'embryo'
        embryo.laboratory.set(laboratory)
        family_service = FamilyCreateService()
        if create_family:
            embryo.family = family_service.create_family(validated_data={'name': 'Семья', 'laboratory': laboratory})
        embryo.save()
        return embryo
    
    @transaction.atomic
    def update_embryo(self, instance: Embryo, validated_data: dict):
        laboratory_data = validated_data.pop('laboratory')
        print('Валидные данные в put service: ', validated_data)
        for field, value in validated_data.items():
            setattr(instance, field, value)
            
        instance.laboratory.set(laboratory_data)
        instance.save()
        return instance