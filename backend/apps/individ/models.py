from django.db import models
from laboratory.models import Laboratory
from family.models import Family

class FamilyMember(models.Model):
    """
    Описывает сущность индивида
    """
    name = models.CharField('Имя индивида', max_length=256)
    individ_type = models.CharField('Тип индивида', max_length=10) #e.g эмбрион, отец, мать
    description = models.CharField('Описание индивида', max_length=256, null=True)
    laboratory = models.ManyToManyField(Laboratory)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, null=True)
    count_blood = models.IntegerField('Кол-во крови', default=0)
    count_dna = models.IntegerField('Кол-во ДНК', default=0)
    count_chorion = models.IntegerField('Кол-во хориона', default=0)

    class Meta:
        abstract = True
    
    def __str__(self):
        return self.name
    
    def get_individ_laboratories(self):
        return self.laboratory.all()
