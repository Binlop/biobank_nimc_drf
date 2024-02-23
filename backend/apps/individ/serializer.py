from rest_framework import serializers
from laboratory.serializers import LaboratorySerializer
from family.serializer import FamilySerializerOutput
from .models import Individ, Embryo, Father, Mother, AnotherFamilyMember, MotherPregnancy
from .services.embryo import EmbryoService
from file.serializer import FileSerializer

class IndividSerializerOutput(serializers.Serializer):
    
    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, Embryo):
            serializer = EmbryoSerializerOutput(value)
        elif isinstance(value, Father):
            serializer = FatherSerializerOutput(value)
        elif isinstance(value, Mother):
            serializer = MotherSerializerOutput(value)
        elif isinstance(value, AnotherFamilyMember):
            serializer = AdultSerializerOutput(value)
        else:
            raise Exception('Unexpected type of individ object')

        return serializer.data
    
class IndividSerializerInput(serializers.ModelSerializer):
    class Meta:
        model = Individ
        fields = ['id']


class FamilyMemberSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    family = FamilySerializerOutput(read_only=True)
    name = serializers.CharField(max_length=256)
    individ_type = serializers.CharField(max_length=10, required=False)
    count_blood = serializers.IntegerField(required=False)
    count_dna = serializers.IntegerField(required=False)
    count_chorion = serializers.IntegerField(required=False)
    laboratory = LaboratorySerializer(read_only=True, many=True)
    individ = serializers.SerializerMethodField()
    
    def get_individ(self, obj):
        individ_instance = obj.individ.first()  # Получаем первый связанный объект Individ
        if individ_instance:
            individ_serializer = IndividSerializerInput(individ_instance)
            return individ_serializer.data
        else:
            return None

    def validate_name(self, value):
        if len(value) < 2:
             raise serializers.ValidationError("Название более 2 символов")
        return value


class EmbryoSerializerOutput(FamilyMemberSerializerOutput):

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

    scan_directions = FileSerializer(required=False)

    test_field = serializers.CharField(max_length=256)
    family_number = serializers.IntegerField()
    abortus_id = serializers.IntegerField()
    abortus_id_in_family = serializers.CharField(max_length=256)
    date_of_receipt = serializers.DateField(required=False)
    diagnosis = serializers.ChoiceField(choices=DIAGNOSIS_CHOICES, default='none')
    last_menstruation = serializers.DateField(required=False)
    period_pregnancy_by_date = serializers.FloatField(required=False)
    period_pregnancy_by_USI = serializers.FloatField(required=False)
    conception = serializers.ChoiceField(choices=CONCEPTION_CHOICES, default='none')
    twins = serializers.BooleanField(default=False)
    dimensions_fetal_sac_x_1 = serializers.IntegerField(required=False)
    dimensions_fetal_sac_y_1 = serializers.IntegerField(required=False)
    dimensions_fetal_sac_x_2 = serializers.IntegerField(required=False)
    dimensions_fetal_sac_y_2 = serializers.IntegerField(required=False)
    ktr = serializers.IntegerField(required=False)
    features_embryo = serializers.CharField(required=False)
    features_chorion = serializers.CharField(max_length=256, required=False)
    features_yolk_sac = serializers.CharField(max_length=256, required=False)
    features_amniotic_membrane = serializers.CharField(max_length=256,required=False)
    note = serializers.CharField(max_length=256, required=False)
    karyotype = serializers.CharField(max_length=20, required=False)
    karyotype_type = serializers.ChoiceField(choices=KARYOTYPE_CHOICES, default='none')
    supernumerary_chromosome = serializers.CharField(max_length=50, required=False)
    mosaicism = serializers.BooleanField(default=False)
    standard_karyotype = serializers.CharField(max_length=100, required=False)
    aCGH_karyotype = serializers.CharField(max_length=256, required=False)
    CNV = serializers.CharField(max_length=256, required=False)
    FISH = serializers.CharField(max_length=50, required=False)
    FISH_mosaicism = serializers.BooleanField(default=False)
    CGH = serializers.CharField(max_length=256, required=False)
    STR = serializers.CharField(max_length=256, required=False)
    SRY = serializers.CharField(max_length=256, required=False)
    RT_PCR = serializers.CharField(max_length=256, required=False)
    methylation = serializers.CharField(max_length=256, required=False)
    LINE =  serializers.CharField(max_length=256, required=False)
    сonflict_between_different_methods = serializers.BooleanField(default=False)
    essence_conflict = serializers.CharField(max_length=256, required=False)


class EmbryoSerializerInput(EmbryoSerializerOutput):
    create_family = serializers.BooleanField(required=False)
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    def create(self, validated_data: dict):
        service = EmbryoService()
        return service.create_embryo(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        print('валидированние данные в update:', validated_data)
        service = EmbryoService()
        return service.update_embryo(instance, validated_data)

class AdultSerializerOutput(FamilyMemberSerializerOutput):
    """
    Класс описывает общие своства для всех взрослых членов семьи
    """
    family_number = serializers.IntegerField()
    abortion_id = serializers.IntegerField()
    last_name = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    patronymic = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()
    age_at_sampling = serializers.IntegerField()
    phone = serializers.CharField(max_length=15, required=False)
    home_address = serializers.CharField(max_length=255, required=False)
    nationality = serializers.CharField(max_length=100, required=False)
    place_of_birth = serializers.CharField(max_length=255, required=False)
    hereditary_burden_in_the_family = serializers.CharField(max_length=255, required=False)


class FatherSerializerOutput(AdultSerializerOutput):
    father_id = serializers.IntegerField()
    test_field = serializers.CharField(max_length=250, required=False)


class FatherSerializerInput(FatherSerializerOutput):
    create_family = serializers.BooleanField(required=False)

    def create(self, validated_data: dict):
        service = EmbryoService()
        return service.create_embryo(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        service = EmbryoService()
        return service.update_embryo(instance, validated_data)


class MotherSerializerOutput(AdultSerializerOutput):
    test_field = serializers.CharField(max_length=250, required=False)
    mother_id = serializers.IntegerField()
    number_of_pregnancies = serializers.IntegerField()
    habitual_miscarriage = serializers.CharField(max_length=250, required=False)
    diagnosis_of_current_pregnancy = serializers.ChoiceField(choices=Embryo.DIAGNOSIS_CHOICES, default='none')
    note = serializers.CharField(max_length=256, required=False)
    mother_gynecological_diseases = serializers.CharField(max_length=256, required=False)
    mother_extragenital_diseases = serializers.CharField(max_length=256, required=False)
    age_at_menarche = serializers.IntegerField()
    cycle_duration_days = serializers.IntegerField()
    menstrual_note = serializers.CharField(max_length=256, required=False)
    pregnancy = serializers.SerializerMethodField()

    def get_pregnancy(self, obj):
        pregnancies = obj.pregnancy.all()
        serializer = MotherPregnancySerializer(pregnancies, many=True)
        return serializer.data

class MotherSerializerInput(MotherSerializerOutput):
    create_family = serializers.BooleanField(required=False)

    def create(self, validated_data: dict):
        service = EmbryoService()
        return service.create_embryo(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        service = EmbryoService()
        return service.update_embryo(instance, validated_data)


class MotherPregnancySerializer(serializers.Serializer):
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
    diagnosis = serializers.ChoiceField(choices=DIAGNOSIS_CHOICES, default='none')
    pregnancy_year = serializers.IntegerField()


class AnotherSerializerInput(FatherSerializerInput):
    pass