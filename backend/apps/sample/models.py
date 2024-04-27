from django.db import models
from django.db.models import Q
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from individ.models import Individ
from storage.models import SamplesMap
from laboratory.models import Laboratory
from user.models import Profile


class Sample(models.Model):
    name = models.CharField('Имя образца', max_length=256)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    location = models.OneToOneField(SamplesMap, on_delete=models.PROTECT, null=True, related_name='related_sample') # Место хранения образца
    sample_in_work = models.BooleanField('Статус образца', default=False)

    def __str__(self):
        return str(self.name)

class AllSamplesManager(models.Manager):
    pass

class UserSamplesManager(models.Manager):

    def filter_user(self, user):
        user_laboratories = user.profile.get_user_laboratories()
        user_laboratory_ids = user_laboratories.values_list('id', flat=True)
        return super(UserSamplesManager, self).get_queryset().filter(Q(individ__embryo__laboratory__id__in=user_laboratory_ids) | 
                                                                     Q(individ__father__laboratory__id__in=user_laboratory_ids) |
                                                                     Q(individ__mother__laboratory__id__in=user_laboratory_ids) |
                                                                     Q(individ__another_member__laboratory__id__in=user_laboratory_ids))

class CustomSampleType(models.Model):
    """
    Абстрактный класс для описания общих свойств образца
    """
    sample = GenericRelation(Sample)
    individ = models.ForeignKey(Individ, on_delete=models.CASCADE) #Донор данного образца(индивид)
    sampletype = models.CharField('Тип образца', max_length=150) #e.g Кровь, ДНК, хорион
    name = models.CharField('Название образца', max_length=150) # e.g кровь Василия Пупкина
    barcode = models.CharField('Баркод', max_length=150, null=True)
    volume = models.IntegerField('Кол-во данного типа образца днк', default=0)
    objects = AllSamplesManager()
    user_samples = UserSamplesManager()

    class Meta:
        abstract = True
        verbose_name = 'образец'
        verbose_name_plural = 'образцы'

    def get_sample_laboratories(self):
        return self.individ.content_object.get_individ_laboratories()

    def __str__(self):
        return str(self.name)


class DNA(CustomSampleType):
    concentration = models.IntegerField('Концентрация ДНК, нг/нкл', default=0)

    class Meta:
        verbose_name = 'ДНК индивида'
        verbose_name_plural = 'ДНК индивидов'


class Blood(CustomSampleType):
    class Meta:
        verbose_name = 'Кровь индивида'
        verbose_name_plural = 'Кровь индивидов'


class Chorion(CustomSampleType):
    class Meta:
        verbose_name = 'хорион индивида'
        verbose_name_plural = 'хорионы индивидов'
    

class Endometrium(CustomSampleType):
    class Meta:
        verbose_name = 'эндометриум индивида'
        verbose_name_plural = 'эндометриум индивидов'

class FetalSacNitrogen(CustomSampleType):
    class Meta:
        verbose_name = 'плодный мешок в азоте'
        verbose_name_plural = 'плодные мешки в азоте'

class FetalSacFreezer(CustomSampleType):
    class Meta:
        verbose_name = 'плодный мешок в -80'
        verbose_name_plural = 'плодные мешки в -80'



class Aliquot(models.Model):
    """
    Модель аликвоты(часть родительского образца). Связана с индивидом, к которому принадлежит
    данная аликвота и с родительским образцом, от которого была отлита аликвота
    """
    sample = GenericRelation(Sample)
    original_sample = models.ForeignKey(Sample,  on_delete=models.CASCADE)
    individ = models.ForeignKey(Individ, on_delete=models.CASCADE) #Донор данного образца(индивид)
    location = models.OneToOneField(SamplesMap, on_delete=models.PROTECT, null=True, related_name='related_aliquot') # Место хранения аликвоты
    name = models.CharField('Название аликвоты', max_length=150)
    volume = models.IntegerField('Кол-во аликвоты', default=0)
    barcode = models.CharField('Баркод', max_length=150, null=True)
    concentration = models.IntegerField('Концентрация ДНК, нг/нкл', default=0)
    sampletype = models.CharField('Тип образца', max_length=150) #e.g Кровь, ДНК, хорион
    objects = AllSamplesManager()
    user_samples = UserSamplesManager()

    class Meta:
        verbose_name = 'алкивота индивида'
        verbose_name_plural = 'аликвоты индивидов'
    
    def get_sample_laboratories(self):
        return self.individ.content_object.get_individ_laboratories()

    def __str__(self):
        return str(self.name)
    

class SampleInWork(models.Model):
    sample = models.OneToOneField(Sample, on_delete=models.CASCADE, related_name="sample_work", null=True)
    in_work = models.BooleanField('Образец в работе', default=False)
    user = models.ForeignKey(Profile, verbose_name='Пользователь, взявший образец', on_delete=models.PROTECT)
