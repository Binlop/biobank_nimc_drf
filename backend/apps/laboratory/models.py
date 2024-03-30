from django.db import models
from .laboratory.domain import Laboratory as LaboratoryBase

class Laboratory(models.Model):
    name = models.CharField('Название', max_length=256)
    description = models.CharField('Описание', max_length=256)

    def to_entity(self) -> LaboratoryBase:
        return LaboratoryBase(self.name, self.description, self.pk)

    @staticmethod
    def from_entity(laboratory: LaboratoryBase) -> "Laboratory":
        return LaboratoryBase(name=laboratory.name, description=laboratory.description)

    def __str__(self):
        return self.name