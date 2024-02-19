from django.db import models
from ..models import FamilyMember

DIAGNOSIS_CHOICES = [
    ('none', 'Нет данных'),
    ('spontaneous_abortion', 'Спонтанный аборт'),
    ('blighted_ovum', 'Неразвивающаяся беременность'),
    ('anembryonia', 'Анэмбриония'),
    ('fetal_development_abnormalities', 'Пороки развития плода'),
]

CONCEPTION_CHOICES = [
    ('none', 'Нет данных'),
    ('natural', 'Естественное'),
    ('ivf', 'ЭКО'),
    ('icsi', 'ИКСИ'),
    ('pgd', 'ПГД'),
    ('donor_egg', 'Донорская яйцеклетка'),
    ('donor_sperm', 'Донорские сперматозоиды'),
    ('other', 'Другое'),
]

KARYOTYPE_CHOICES = [
    ('46,XX', '46,XX'),
    ('46,XY', '46,XY'),
    ('45,X', '45,X'),
    ('sex chromosome trisomy', 'Трисомия по половым хромосомам'),
    ('autosome trisomy', 'Трисомия аутосом'),
    ('mosaic autosome trisomy', 'Трисомия аутосом MOS с нормальным клоном'),
    ('double trisomy', 'Двойная трисомия'),
    ('triploidy', 'Триплоидия'),
]

class Embryo(FamilyMember):
    """Класс характеризует модель эмбрион"""
    test_field = models.CharField('Тестовое поле эмбрион', max_length=250, null=True)
    family_number = models.IntegerField()
    abortus_id = models.IntegerField()
    abortus_id_in_family = models.CharField('ID абортуса в семье', max_length=256)
    date_of_receipt = models.DateField(null=True)
    diagnosis = models.CharField(choices=DIAGNOSIS_CHOICES, default='none', max_length=100)
    last_menstruation = models.DateField(null=True)
    period_pregnancy_by_date = models.FloatField('Срок беременности по дате', null=True)
    period_pregnancy_by_USI = models.FloatField('Срок беременности по УЗИ', null=True)
    conception = models.CharField(choices=CONCEPTION_CHOICES, default='none', max_length=100)
    twins = models.BooleanField(default=False)
    dimensions_fetal_sac_x_1 = models.IntegerField('Размеры 1 плодного мешка по x', null=True)
    dimensions_fetal_sac_y_1 = models.IntegerField('Размеры 1 плодного мешка по y', null=True)
    dimensions_fetal_sac_x_2 = models.IntegerField('Размеры 2 плодного мешка по x', null=True)
    dimensions_fetal_sac_y_2 = models.IntegerField('Размеры 2 плодного мешка по y', null=True)
    ktr = models.IntegerField('Копчико-теменной размер плода (КТР)', null=True)
    features_embryo = models.TextField('Особенности эмбриона', null=True)
    features_chorion = models.CharField('Особенности хориона', max_length=256, null=True)
    features_yolk_sac = models.CharField('Особенности желточного мешка', max_length=256, null=True)
    features_amniotic_membrane = models.CharField('Особенности амниотической оболочки', max_length=256, null=True)
    scan_directions = models.FileField('Cкан направления', upload_to='upload/embryo_files', null=True)
    note = models.CharField('Примечание', max_length=256, null=True)
    karyotype = models.CharField('Вероятный кариотип', max_length=20, null=True)
    karyotype_type = models.CharField(choices=KARYOTYPE_CHOICES, default='none', max_length=100)
    supernumerary_chromosome = models.CharField('Сверхчисленная хромосома', max_length=50, null=True)
    mosaicism = models.BooleanField('Мозаицизм', default=False)
    standard_karyotype = models.CharField('Стандартный кариотип', max_length=100, null=True)
    aCGH_karyotype = models.CharField('aCGH кариотип', max_length=256, null=True)
    CNV = models.CharField('CNV', max_length=256, null=True)
    FISH = models.CharField('CNV', max_length=50, null=True)
    FISH_mosaicism = models.BooleanField('FISH мозаицизм', default=False)
    CGH = models.CharField('CGH', max_length=256, null=True)
    STR = models.CharField('STR', max_length=256, null=True)
    SRY = models.CharField('SRY', max_length=256, null=True)
    RT_PCR = models.CharField('RT_PCR', max_length=256, null=True)
    methylation = models.CharField('Метилирование', max_length=256, null=True)
    LINE =  models.CharField('LINE', max_length=256, null=True)
    сonflict_between_different_methods = models.BooleanField('Конфликт между различными методами ', default=False)
    essence_conflict = models.CharField('LINE', max_length=256, null=True)


    class Meta:
        verbose_name = 'эмбрион'
        verbose_name_plural = 'эмбрионы'