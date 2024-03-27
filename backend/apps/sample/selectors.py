from typing import Union
from itertools import chain
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404
from .models import Sample, DNA, Chorion, Blood, Endometrium, FetalSacNitrogen, FetalSacFreezer, Aliquot

class SampleListSelector:
    """
    Класс отвечает за получение списка индивидов из бд
    """

    def get_samples_list(self, user: User, filters=None) -> QuerySet[DNA, Chorion]:
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)

        dna_qs = DNA.objects.all()
        chorion_qs = Chorion.objects.all()
        blood_qs = Blood.objects.all()
        endometrium_qs = Endometrium.objects.all()
        fetal_sac_freezer_qs = FetalSacFreezer.objects.all()
        fetal_sac_nitrogen_qs = FetalSacNitrogen.objects.all()
        aliquot_qs = Aliquot.objects.all()
        samples_list = list(chain(dna_qs, chorion_qs, blood_qs, endometrium_qs, fetal_sac_freezer_qs, fetal_sac_nitrogen_qs, aliquot_qs))
        
        for sample in samples_list:
            if sample.get_sample_laboratories() & user_laboratory_ids:
                continue
            else:
                samples_list.remove(sample)
        return samples_list
    
    def get_individ_samples(self, user: User, individ_id: int):
        dna_qs = DNA.objects.filter(individ_id=individ_id)
        chorion_qs = Chorion.objects.filter(individ_id=individ_id)
        blood_qs = Blood.objects.filter(individ_id=individ_id)
        endometrium_qs = Endometrium.objects.filter(individ_id=individ_id)
        fetal_sac_freezer_qs = FetalSacFreezer.objects.filter(individ_id=individ_id)
        fetal_sac_nitrogen_qs = FetalSacNitrogen.objects.filter(individ_id=individ_id)

        samples_list = list(chain(dna_qs, chorion_qs, blood_qs, endometrium_qs, fetal_sac_freezer_qs, fetal_sac_nitrogen_qs))

        return samples_list

    def get_sample_aliquots(self, user: User, sample_id: int):
        aliquots = Aliquot.objects.filter(original_sample_id=sample_id)
        return aliquots

class SampleDetailSelector:
    """
    Класс отвечает за получение образца и проверку доступа юзеру к нему
    """
    
    def check_user_acces_to_sample(self, sample: Sample, user: User, delete: bool = False) -> Union[DNA, Chorion]:
        if sample.content_object.get_sample_laboratories() & user.profile.get_user_laboratories():
            if delete:
                return sample
            return sample.content_object
        else: return None

    def get_sample_detail(self, user: User, pk: int, delete: bool=False) -> Sample:
        sample = get_object_or_404(Sample, pk=pk)
        return self.check_user_acces_to_sample(sample=sample, user=user, delete=delete)