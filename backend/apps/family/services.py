from .models import Family

class FamilyCreateService:
    
    def create_family(self, validated_data: dict):
        laboratory_data = validated_data.pop('laboratory')
        
        family = Family.objects.create(**validated_data)
        family.laboratory.set(laboratory_data)
        
        return family