from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from .models import Individ
from django.shortcuts import get_object_or_404
from .models import Embryo, Father, Mother
from django.db.models import Q
from typing import Union
from itertools import chain

class FamilyMemberListSelector:
    """
    Класс отвечает за получение списка индивидов из бд
    """

    def get_individ_list(user: User, filters=None) -> QuerySet[Embryo, Father, Mother]:
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)
        
        individ_q = Q(laboratory__in=user_laboratory_ids)
        
        embryo_qs = Embryo.objects.filter(individ_q).distinct()
        father_qs = Father.objects.filter(individ_q).distinct()
        mother_qs = Mother.objects.filter(individ_q).distinct()
        
        individ_list = list(chain(embryo_qs, father_qs, mother_qs))
        
        return individ_list

class FamilyMemberDetailSelector:
    """
    Класс отвечает за получение индивида и проверку доступа юзера к нему
    """
    def check_user_acces_to_family_member(self, member: Individ, user: User, delete: bool = False) -> Union[Embryo, Father, Mother]:
        if member.content_object.get_individ_laboratories() & user.profile.get_user_laboratories():
            if delete:
                return member
            return member.content_object
        else: return None

    def get_individ_detail(self, user: User, pk: int, delete: bool=False) -> Individ:
        member = get_object_or_404(Individ, pk=pk)
        return self.check_user_acces_to_family_member(member=member, user=user, delete=delete)


class FamilyMemberCheckingPermission:

    def check_user_acces_to_family_member(self, member: Union[Embryo, Father, Mother], user: User) -> Union[Embryo, Father, Mother]:
        if member.get_individ_laboratories() & user.profile.get_user_laboratories():
            return member
        else: return None

