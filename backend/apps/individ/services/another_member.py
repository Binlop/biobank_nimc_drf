from django.db import transaction
from family.services import FamilyCreateService
from individ.models import Individ, AnotherFamilyMember

class AnotherMemberService:
    @transaction.atomic
    def create_another_member(self, validated_data: dict, create_family: bool = False) -> AnotherFamilyMember:
        laboratory = validated_data.pop('laboratory')
        create_family = validated_data.pop('create_family')

        father = AnotherFamilyMember.objects.create(**validated_data)
        father.individ_type = 'another_member'
        father.laboratory.set(laboratory)
        family_service = FamilyCreateService()
        if create_family:
            father.family = family_service.create_family(validated_data={'name': 'Семья', 'laboratory': laboratory})
        father.save()

        individ = Individ(content_object=father, name=father.name)
        individ.save()
        return father
    
    @transaction.atomic
    def update_another_member(self, instance: AnotherFamilyMember, validated_data: dict) -> AnotherFamilyMember:
        laboratory_data = validated_data.pop('laboratory')
        for field, value in validated_data.items():
            setattr(instance, field, value)
            
        instance.laboratory.set(laboratory_data)
        instance.save()
        return instance