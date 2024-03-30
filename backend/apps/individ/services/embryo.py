from django.db import transaction
from family.services import FamilyCreateService
from file.services import FileService
from ..models import Individ, Embryo, Family

class EmbryoService():
    
    @transaction.atomic
    def create_embryo(self, validated_data: dict, create_family: bool = False) -> Embryo:
        laboratory = validated_data.pop('laboratory')
        create_family = validated_data.pop('create_family')
        family_id = validated_data.get('family_id')
        embryo = Embryo.objects.create(**validated_data)
        embryo.individ_type = 'embryo'
        embryo.laboratory.set(laboratory)
        family_service = FamilyCreateService()
        if create_family:
            embryo.family = family_service.create_family(validated_data={'name': 'Семья', 'laboratory': laboratory})
        if family_id:
            family = Family.objects.get(id=family_id)
            embryo.family = family

        embryo.save()

        individ = Individ(content_object=embryo, name=embryo.name)
        individ.save()
        return embryo
    
    @transaction.atomic
    def update_embryo(self, instance: Embryo, validated_data: dict) -> Embryo:
        laboratory_data = validated_data.pop('laboratory')
        # scan_directions = validated_data.pop('scan_directions')
        for field, value in validated_data.items():
            setattr(instance, field, value)
            
        instance.laboratory.set(laboratory_data)
        file_service = FileService()
        # instance.scan_directions = file_service.save_file(data={scan_directions})
        instance.save()
        return instance