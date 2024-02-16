from django.db import models
from ..models import FamilyMember

class Mother(FamilyMember):
    """Класс характеризует модель мать"""
    test_field = models.CharField('Тестовое поле мать', max_length=250, null=True)

    class Meta:
        verbose_name = 'мать'
        verbose_name_plural = 'матери'