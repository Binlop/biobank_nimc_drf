from .models import FamilyMember

class FamilyMemberService():

    def create_family_member(self, validated_data: dict):
        print('Валидированные данные в family_member', validated_data)


