from rest_framework import serializers
import json
from laboratory.serializers import LaboratorySerializer
from family.serializer import FamilySerializerOutput
from .models import Individ, Embryo, Father, Mother, AnotherFamilyMember, MotherPregnancy
from .services import embryo, mother, father, another_member
from file.serializer import FileSerializer

class IndividSerializerListOutput(serializers.Serializer):

    def to_representation(self, obj):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(obj, Embryo):
            serializer = EmbryoSerializerOutput(obj, fields=('name', 'laboratory', 'family', 'individ_type', 'individ'))
        elif isinstance(obj, Father):
            serializer = FatherSerializerOutput(obj, fields=('name', 'laboratory', 'family', 'individ_type', 'individ'))
        elif isinstance(obj, Mother):
            serializer = MotherSerializerOutput(obj, fields=('name', 'laboratory', 'family', 'individ_type', 'individ'))
        elif isinstance(obj, AnotherFamilyMember):
            serializer = AnotherMemberSerializerOutput(obj, fields=('name', 'laboratory', 'family', 'individ_type', 'individ'))
        else:
            raise Exception('Unexpected type of individ object')

        return serializer.data
    
class IndividSerializerDetailOutput(serializers.Serializer):

    def to_representation(self, obj):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(obj, Embryo):
            serializer = EmbryoSerializerOutput(obj)
        elif isinstance(obj, Father):
            serializer = FatherSerializerOutput(obj)
        elif isinstance(obj, Mother):
            serializer = MotherSerializerOutput(obj)
        elif isinstance(obj, AnotherFamilyMember):
            serializer = AnotherMemberSerializerOutput(obj)
        else:
            raise Exception('Unexpected type of individ object')

        return serializer.data
    
class IndividSerializerInput(serializers.ModelSerializer):
    class Meta:
        model = Individ
        fields = ['id']


class FamilyMemberSerializerOutput(serializers.Serializer):

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    id = serializers.IntegerField(read_only=True)
    family = FamilySerializerOutput(read_only=True)
    name = serializers.CharField(max_length=256)
    individ_type = serializers.CharField(max_length=20, required=False)
    count_blood = serializers.IntegerField(required=False)
    count_dna = serializers.IntegerField(required=False)
    count_chorion = serializers.IntegerField(required=False)
    laboratory = LaboratorySerializer(read_only=True, many=True)
    individ = serializers.SerializerMethodField()
    
    family_id = serializers.IntegerField(required=False)

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

    scan_directions = serializers.FileField(required=False)

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
    scan_directions = serializers.FileField(required=False)

    def create(self, validated_data: dict):
        service = embryo.EmbryoService()
        return service.create_embryo(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        service = embryo.EmbryoService()
        return service.update_embryo(instance, validated_data)

class AdultSerializerOutput(FamilyMemberSerializerOutput):
    """
    Класс описывает общие своства для всех взрослых членов семьи
    """
    family_number = serializers.IntegerField()
    abortion_id = serializers.IntegerField(required=False)
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
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    def create(self, validated_data: dict):
        service = father.FatherService()
        return service.create_father(validated_data=validated_data)
    
    def update(self, instance: Father, validated_data: dict):
        service = father.FatherService()
        return service.update_father(instance, validated_data)

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
    id = serializers.IntegerField()
    mother_id = serializers.IntegerField()
    diagnosis = serializers.ChoiceField(choices=DIAGNOSIS_CHOICES, default='none')
    pregnancy_year = serializers.IntegerField(required=False)

    def update(self, instance: MotherPregnancy, validated_data: dict) -> MotherPregnancy:
        service = mother.MotherService()
        return service.update_mother_pregnancy(instance, validated_data)
    

class MotherSerializerOutput(AdultSerializerOutput):
    test_field = serializers.CharField(max_length=250, required=False)
    mother_id = serializers.IntegerField()
    number_of_pregnancies = serializers.IntegerField(required=False)
    habitual_miscarriage = serializers.CharField(max_length=250, required=False)
    diagnosis_of_current_pregnancy = serializers.ChoiceField(choices=Embryo.DIAGNOSIS_CHOICES, default='none')
    note = serializers.CharField(max_length=256, required=False)
    mother_gynecological_diseases = serializers.CharField(max_length=256, required=False)
    mother_extragenital_diseases = serializers.CharField(max_length=256, required=False)
    age_at_menarche = serializers.IntegerField(required=False)
    cycle_duration_days = serializers.IntegerField(required=False)
    menstrual_note = serializers.CharField(max_length=256, required=False)
    pregnancy = serializers.SerializerMethodField()

    def get_pregnancy(self, obj):
        pregnancies = obj.pregnancy.all()
        serializer = PregnancySerializer(pregnancies, many=True)
        return serializer.data

class PregnancySerializer(serializers.Serializer):
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
    mother_preg_id = serializers.IntegerField(required=False)
    pregnancy_year = serializers.IntegerField()
    diagnosis = serializers.ChoiceField(choices=DIAGNOSIS_CHOICES, default='none')

    def create(self, validated_data: dict):
        service = mother.MotherService()
        return service.create_mother_pregnancy(validated_data=validated_data)

class MotherSerializerInput(MotherSerializerOutput):
    create_family = serializers.BooleanField(required=False)
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    pregnancy = serializers.SerializerMethodField()

    def get_pregnancy(self, obj):
        json_data = self.initial_data['pregnancy']
        list_of_dicts = json.loads(json_data)
        for element in list_of_dicts:
            element['mother_preg_id'] = obj.id

        serializer = PregnancySerializer(data=list_of_dicts, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.create(validated_data=serializer.validated_data)
            return serializer.data
    
    def create(self, validated_data: dict):
        service = mother.MotherService()
        return service.create_mother(validated_data=validated_data)
    
    def update(self, instance: Embryo, validated_data: dict):
        service = mother.MotherService()
        return service.update_mother(instance, validated_data)

class AnotherMemberSerializerOutput(AdultSerializerOutput):
    another_member_user_id = serializers.IntegerField()


class AnotherMemberSerializerInput(AdultSerializerOutput):
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    create_family = serializers.BooleanField(required=False)
    another_member_user_id = serializers.IntegerField()


    def create(self, validated_data: dict) -> AnotherFamilyMember:
        service = another_member.AnotherMemberService()
        return service.create_another_member(validated_data=validated_data)
    
    def update(self, instance: AnotherFamilyMember, validated_data: dict) -> AnotherFamilyMember:
        service = another_member.AnotherMemberService()
        return service.update_another_member(instance, validated_data)