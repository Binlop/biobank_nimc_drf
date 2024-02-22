from typing import Union
from itertools import chain
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.query import QuerySet
from .models import DNA, Chorion

class SampleListSelector:
    """
    Класс отвечает за получение списка индивидов из бд
    """

    def get_samples_list(user: User, filters=None) -> QuerySet[DNA, Chorion]:
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)
        

        dna_qs = DNA.objects.all()
        chorion_qs = Chorion.objects.all()
        
        samples_list = list(chain(dna_qs, chorion_qs))
        
        for sample in samples_list:
            if sample.get_sample_laboratories() & user_laboratory_ids:
                continue
            else:
                samples_list.remove(sample)

        return samples_list

class SampleCheckingPermission:

    def check_user_acces_to_family_member(self, sample: Union[DNA, Chorion], user: User) -> Union[DNA, Chorion]:
        if sample.individ.get_individ_laboratories() & user.profile.get_user_laboratories():
            return sample
        else: return None
