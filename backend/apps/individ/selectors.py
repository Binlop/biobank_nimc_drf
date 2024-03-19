from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from .models import Individ
from django.shortcuts import get_object_or_404
from .models import Embryo, Father, Mother, AnotherFamilyMember, MotherPregnancy
from django.db.models import Q
from typing import Union
from itertools import chain
import json
from .filters import EmbryoFilter, FatherFilter, MotherFilter

class FamilyMemberListSelector:
    """
    Класс отвечает за получение списка индивидов из бд
    """

    def filter_individs_by_q(self, user: User, individ_q: Q) -> QuerySet[Embryo, Father, Mother]:
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)
        individ_q = Q(laboratory__in=user_laboratory_ids) & individ_q 
        embryo_qs = Embryo.objects.filter(individ_q).distinct()
        father_qs = Father.objects.filter(individ_q).distinct()
        mother_qs = Mother.objects.filter(individ_q).distinct()
        another_member_qs = AnotherFamilyMember.objects.filter(individ_q).distinct()
        
        individ_list = list(chain(embryo_qs, father_qs, mother_qs, another_member_qs))
        
        return individ_list
    
    def get_individ_list(self, user: User, filters=None) -> QuerySet[Embryo, Father, Mother]:
        individ_q = Q()
        return self.filter_individs_by_q(user=user, individ_q=individ_q)

    def get_filtered_individ_list(self, user: User, filters: dict = {}) -> QuerySet[Embryo, Father, Mother]:
        filters = dict(filters)
        embryo_data = json.loads(filters.get('embryo', None)[0])
        father_data = json.loads(filters.get('father', None)[0])
        mother_data = json.loads(filters.get('mother', None)[0])

        embryo_filter = EmbryoFilter(embryo_data, queryset=Embryo.objects.all() if embryo_data else Embryo.objects.none())
        father_filter = FatherFilter(father_data, queryset=Father.objects.all() if father_data else Father.objects.none())
        mother_filter = MotherFilter(mother_data, queryset=Mother.objects.all() if mother_data else Mother.objects.none())
        embryo_qs = embryo_filter.qs 
        father_qs = father_filter.qs 
        mother_qs = mother_filter.qs

        individ_list = list(chain(embryo_qs, father_qs, mother_qs))
        return individ_list
    
    def filter_individs_by_family(self, user: User, family_id: int) -> QuerySet[Embryo, Father, Mother]:
        individ_q = Q(family__id=family_id)
        return self.filter_individs_by_q(user=user, individ_q=individ_q)


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

    def get_mother_pregnancy(self, mother_id):
        pregnancy = MotherPregnancy.objects.filter(mother_id=mother_id)
        return pregnancy
