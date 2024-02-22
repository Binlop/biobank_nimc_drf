from django.db import transaction
from .models import Individ

class FamilyMemberService():

    @transaction.atomic
    def create_family_member(self, name: str) -> Individ:
        return Individ.objects.create(name=name)


