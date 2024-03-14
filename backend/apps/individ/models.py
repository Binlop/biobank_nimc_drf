from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from laboratory.models import Laboratory
from family.models import Family
from file.models import File

class Individ(models.Model):
    name = models.CharField('Имя индивида', max_length=256)
    individ_type = models.CharField('Тип индивида', max_length=10) #e.g эмбрион, отец, мать
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

class FamilyMember(models.Model):
    """
    Описывает сущность индивида
    """
    individ = GenericRelation(Individ, on_delete=models.CASCADE)
    name = models.CharField('Имя индивида', max_length=256)
    individ_type = models.CharField('Тип индивида', max_length=10)
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

class Embryo(FamilyMember):

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
        ('none', 'Нет данных'),
        ('46,XX', '46,XX'),
        ('46,XY', '46,XY'),
        ('45,X', '45,X'),
        ('sex_chromosome_trisomy', 'Трисомия по половым хромосомам'),
        ('autosome_trisomy', 'Трисомия аутосом'),
        ('mosaic_autosome_trisomy', 'Трисомия аутосом MOS с нормальным клоном'),
        ('double_trisomy', 'Двойная трисомия'),
        ('triploidy', 'Триплоидия'),
    ]

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
    # scan_directions = models.OneToOneField(File, on_delete=models.CASCADE, null=True)
    note = models.CharField('Примечание', max_length=256, null=True)
    karyotype = models.CharField('Вероятный кариотип', max_length=20, null=True)
    karyotype_type = models.CharField(choices=KARYOTYPE_CHOICES, default='none', max_length=100)
    supernumerary_chromosome = models.CharField('Сверхчисленная хромосома', max_length=50, null=True)
    mosaicism = models.BooleanField('Мозаицизм', default=False)
    standard_karyotype = models.CharField('Стандартный кариотип', max_length=100, null=True)
    aCGH_karyotype = models.CharField('aCGH кариотип', max_length=256, null=True)
    CNV = models.CharField('CNV', max_length=256, null=True)
    FISH = models.CharField('FISH', max_length=256, null=True)
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

class Adult(FamilyMember): 
    """
    Класс характеризует любого члена семьи кроме абортуса
    """
    family_number = models.IntegerField('№ семьи', null=True)
    abortion_id = models.IntegerField('ID абортуса',  null=True)
    last_name = models.CharField('Фамилия', max_length=100, null=True)
    first_name = models.CharField('Имя', max_length=100, null=True)
    patronymic = models.CharField('Отчество', max_length=100, null=True)
    date_of_birth = models.DateField('Дата рождения', null=True)
    age_at_sampling = models.IntegerField('Возраст на момент взятия, лет', null=True)
    phone = models.CharField('телефон', max_length=15, null=True)
    home_address = models.CharField('Домашний адрес', max_length=255, null=True)
    nationality = models.CharField('Национальность', max_length=100, null=True)
    place_of_birth = models.CharField('Место рождения', max_length=255,null=True)
    hereditary_burden_in_the_family = models.CharField('Наследственная отягощенность в семье', max_length=255, null=True)

    class Meta:
        abstract = True

class Father(Adult): 
    """Класс характеризует модель отец"""
    father_id = models.IntegerField(null=True)
    test_field = models.CharField('Тестовое поле отец', max_length=250, null=True)

    class Meta: 
        verbose_name = 'отец'
        verbose_name_plural = 'отцы'


class Mother(Adult):
    """Класс характеризует модель мать"""

    MISCARRIAGE_CHOICES = [
        ('none', 'Нет данных'),
        ('fisrt', 'Первичное'),
        ('second', 'Вторичное'),
        ('no_PNB', 'Нет ПНБ'),
    ]
    test_field = models.CharField('Тестовое поле мать', max_length=250, null=True)
    mother_id = models.IntegerField('ID матери', null=True)
    number_of_pregnancies = models.IntegerField('Число беременностей',null=True)
    habitual_miscarriage = models.CharField('Привычное невынашивание', choices=MISCARRIAGE_CHOICES, default='none', max_length=100, null=True)
    diagnosis_of_current_pregnancy = models.CharField('Настоящая беременность - диагноз', choices=Embryo.DIAGNOSIS_CHOICES, max_length=255, null=True)
    note = models.TextField('Примечание', null=True)
    mother_gynecological_diseases = models.TextField('Гинекологические заболевания матери', null=True)
    mother_extragenital_diseases = models.TextField('Экстрагенитальные заболевания матери', null=True)
    age_at_menarche = models.IntegerField('Возраст начала менструации, лет', null=True)
    cycle_duration_days = models.IntegerField('Продолжительность цикла, дней', null=True)
    menstrual_note = models.TextField('Примечание', null=True)

    class Meta:
        verbose_name = 'Мать'
        verbose_name_plural = 'Матери'

class MotherPregnancy(models.Model):
    DIAGNOSIS_CHOICES = {
        'none': 'Нет данных',
        'spontaneous_abortion': 'Спонтанный аборт',
        'blighted_ovum': 'Неразвивающаяся беременность',
        'anembryonia': 'Анэмбриония',
        'fetal_development_abnormalities': 'Пороки развития плода',
        'medical_abortion': 'Медицинский аборт',
        'ectopic_pregnancy': 'Внематочная беременность',
        'stillbirth': 'Мертворожденный ребенок',
        'live_birth': 'Живорожденный ребенок',
        'child_with_developmental_defects': 'Ребенок с пороками развития',
        'child_with_delayed_development': 'Ребенок с задержкой психо-речевого развития',
    }

    mother = models.ForeignKey(Mother, related_name='pregnancy', on_delete=models.CASCADE)
    pregnancy_year = models.IntegerField('Год беременности')
    diagnosis = models.CharField(choices=DIAGNOSIS_CHOICES, default='none', max_length=100)
    

    class Meta:
        verbose_name = 'Беременность матери'
        verbose_name_plural = 'Беременности матерей'



class AnotherFamilyMember(Adult):
    """Класс характеризует иного возможного члена семьи"""
    another_member_user_id = models.IntegerField('ID члена семьи')
    test_field = models.CharField('Тестовое поле иной член семьи', max_length=250, null=True)

    class Meta: 
        verbose_name = 'Иной член семьи'
        verbose_name_plural = 'Иные члены семьи'