from django.db import models
from laboratory.models import Laboratory

class Freezer(models.Model):
    name = models.CharField('Название морозилки', max_length=255)
    freezer_type = models.CharField('Тип морозилки', max_length=50, null=True)
    floor = models.IntegerField('Этаж')
    id_freezer = models.IntegerField('Номер морозильника')
    laboratory = models.ManyToManyField(Laboratory)

    class Meta:
        verbose_name = 'морозильник'
        verbose_name_plural = 'морозильники'
    
    def __str__(self):
        return self.name
    
    def get_freezer_laboratories(self):
        return self.laboratory.all()


class Drawer(models.Model):
    freezer = models.ForeignKey(Freezer, on_delete=models.CASCADE, related_name='drawer')
    name = models.CharField('Название', max_length=255)
    
    class Meta:
        verbose_name = 'ящик  морозильника'
        verbose_name_plural = 'ящики морозильника'

    def __str__(self):
        return self.name
    
    def get_freezer_laboratories(self):
        return self.freezer.get_freezer_laboratories()

class Shelf(models.Model):
    drawer = models.ForeignKey(Drawer, on_delete=models.CASCADE, related_name='shelf')
    name = models.CharField('Название', max_length=255, null=True)
    len_row = models.IntegerField('Длина по горизонтали', default=0)
    len_col = models.IntegerField('Длина по вертикали', default=0) 

    class Meta:
        verbose_name = 'полка  морозильника'
        verbose_name_plural = 'полки морозильника'

    def __str__(self):
        return self.name
    
    def get_freezer_laboratories(self):
        return self.drawer.freezer.get_freezer_laboratories()

class Box(models.Model):
    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='box')
    name = models.CharField('Название', max_length=255, null=True)
    len_row = models.IntegerField('Кол-во строк коробки', default=0)
    len_col = models.IntegerField('Кол-во столбцов коробки', default=0) 
    count_samples = models.IntegerField('Макс. кол-во образцов', default=0)

    class Meta:
        verbose_name = 'коробка  морозильника'
        verbose_name_plural = 'коробки морозильника'

    def __str__(self):
        return self.name
    
    def get_freezer_laboratories(self):
        return self.shelf.drawer.freezer.get_freezer_laboratories()

class SamplesMap(models.Model):
    box = models.ForeignKey(Box, on_delete=models.CASCADE, related_name='samples_map')
    name = models.CharField('Название', max_length=255)
    state_location = models.CharField('Состояние хранения', max_length=10, default='free')
    sample_type = models.CharField('Тип биологического образца', max_length=20, null=True)
    sample_id = models.BigIntegerField('ID образца', null=True) 

    class Meta:
        verbose_name = 'образцы  коробки'
        verbose_name_plural = 'образцы коробки'
    
    def __str__(self):
        return self.name
    
    def get_freezer_laboratories(self):
        return self.box.shelf.drawer.freezer.get_freezer_laboratories()