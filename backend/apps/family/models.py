from django.db import models
from laboratory.models import Laboratory

class Family(models.Model):
    """
    Описывает сущность семья
    """
    name = models.CharField('Название семьи', max_length=256)
    description = models.CharField('Описание семьи', max_length=256, null=True)
    laboratory = models.ManyToManyField(Laboratory)

    class Meta:
        verbose_name = 'Семья'
        verbose_name_plural = 'Семьи'
    
    def __str__(self):
        return self.name
    
    def get_family_laboratories(self):
        return self.laboratory.all()