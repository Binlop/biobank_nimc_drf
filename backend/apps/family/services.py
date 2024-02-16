from .models import Family
from django.db import transaction

class FamilyCreateService:
    
    @transaction.atomic
    def create_family(self, validated_data: dict):
        laboratory_data = validated_data.pop('laboratory')
        family = Family.objects.create(**validated_data)
        family.laboratory.set(laboratory_data)
        return family
    
class FamilyUpdateService:
    
    @transaction.atomic
    def update_family(self, instance: Family, validated_data: dict):
        laboratory_data = validated_data.pop('laboratory')
        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.laboratory.set(laboratory_data)
        instance.save()
        return instance