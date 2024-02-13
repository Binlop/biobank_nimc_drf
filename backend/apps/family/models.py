from django.db import models
from laboratory.models import Laboratory

class Family(models.Model):
    """
    Описывает сущность семья
    """
    name = models.CharField('Название семьи', max_length=250, default='')
    family_descrpt = models.CharField('Описание семьи', max_length=250, null=True)
    laboratory = models.ManyToManyField(Laboratory)

    # Для нормального отображения в панели администратора таблицы Families в ед и мн.ч
    class Meta:
        verbose_name = 'Семья'
        verbose_name_plural = 'Семьи'
    
    # Для корректного отображения в админ-панели
    def __str__(self):
        return self.name
    
    def get_laboratory_id(self):
        return self.laboratory.id