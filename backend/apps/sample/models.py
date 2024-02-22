from django.db import models
from individ.models import Individ


class CustomSampleType(models.Model):
    """
    Абстрактный класс для описания общих свойств образца
    """
    name = models.CharField('Название типа образца', max_length=150) # e.g кровь Василия Пупкина
    individ = models.ForeignKey(Individ, on_delete=models.CASCADE) #Донор данного образца(индивид)
    barcode = models.CharField('Баркод', max_length=150, null=True)
    # location = models.OneToOneField(SamplesMap, on_delete=models.PROTECT, null=True, related_name='related_sample') # Место хранения образца

    
    class Meta:
        abstract = True
        verbose_name = 'образец'
        verbose_name_plural = 'образцы'

    def get_sample_laboratories(self):
        return self.individ.get_individ_laboratories()

    def __str__(self):
        return str(self.name)


# class Blood(CustomSampleType):
#     """
#     Класс описывает характеристики типа образца кровь
#     """
#     volume = models.IntegerField('Кол-во данного типа образца кровь', default=0)

#     class Meta:
#         verbose_name = 'кровь индивида'
#         verbose_name_plural = 'кровь индивидов'


class DNA(CustomSampleType):
    """
    Класс описывает характеристики типа образца ДНК
    """
    volume = models.IntegerField('Кол-во данного типа образца днк', default=0)

    class Meta:
        verbose_name = 'ДНК индивида'
        verbose_name_plural = 'ДНК индивидов'


class Chorion(CustomSampleType):
    """
    Класс описывает характеристики типа образца хориона
    """
    volume = models.IntegerField('Кол-во данного типа образца хорион', default=0)

    class Meta:
        verbose_name = 'хорион индивида'
        verbose_name_plural = 'хорионы индивидов'


class Aliquot(models.Model):
    """
    Модель аликвоты(часть родительского образца). Связана с индивидом, к которому принадлежит
    данная аликвота и с родительским образцом, от которого была отлита аликвота
    """
    name = models.CharField('Название аликвоты', max_length=150)
    volume = models.IntegerField('Кол-во аликвоты', default=0)
    individ = models.ForeignKey(Individ, on_delete=models.CASCADE) #Донор данного образца(индивид)
    # location = models.OneToOneField(SamplesMap, on_delete=models.PROTECT, null=True, related_name='related_aliquot') # Место хранения аликвоты
    barcode = models.CharField('Баркод', max_length=150, null=True)

    class Meta:
        verbose_name = 'алкивота индивида'
        verbose_name_plural = 'аликвоты индивидов'
    
    def __str__(self):
        return str(self.name)
    
    # def get_laboratory_id(self):
    #     return self.family_member.laboratory.id