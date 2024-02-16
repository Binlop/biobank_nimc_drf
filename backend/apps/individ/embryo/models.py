from django.db import models
from ..models import FamilyMember

class Embryo(FamilyMember):
    """Класс характеризует модель эмбрион"""
    test_field = models.CharField('Тестовое поле эмбрион', max_length=250, null=True)

    class Meta:
        verbose_name = 'эмбрион'
        verbose_name_plural = 'эмбрионы'