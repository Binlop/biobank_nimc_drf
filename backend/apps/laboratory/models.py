from django.db import models


class Laboratory(models.Model):
    name = models.CharField('Название', max_length=256)
    description = models.CharField('Описание', max_length=256)

    def __str__(self):
        return self.name