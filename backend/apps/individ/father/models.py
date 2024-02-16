from django.db import models
from ..models import FamilyMember

class Father(FamilyMember): 
    """Класс характеризует модель отец"""
    test_field = models.CharField('Тестовое поле отец', max_length=250, null=True)

    class Meta: 
        verbose_name = 'отец'
        verbose_name_plural = 'отцы'