from rest_framework import serializers
from laboratory.serializers import LaboratorySerializer
from family.serializer import FamilySerializerOutput
from .models import Embryo, Father, Mother


class IndividSerializerOutput(serializers.Serializer):
    
    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, Embryo):
            serializer = EmbryoSerializerOutput(value)
        # elif isinstance(value, Note):
        #     serializer = NoteSerializer(value)
        else:
            raise Exception('Unexpected type of individ object')

        return serializer.data

class FamilyMemberSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    laboratory = LaboratorySerializer(read_only=True, many=True)
    family = FamilySerializerOutput(read_only=True)
    name = serializers.CharField(max_length=256)
    count_blood = serializers.IntegerField()
    count_dna = serializers.IntegerField()
    count_chorion = serializers.IntegerField()


class FamilyMemberSerializerInput(FamilyMemberSerializerOutput):
    laboratory = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    create_family = serializers.BooleanField(required=False)

    
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
        ('46,XX', '46,XX'),
        ('46,XY', '46,XY'),
        ('45,X', '45,X'),
        ('sex chromosome trisomy', 'Трисомия по половым хромосомам'),
        ('autosome trisomy', 'Трисомия аутосом'),
        ('mosaic autosome trisomy', 'Трисомия аутосом MOS с нормальным клоном'),
        ('double trisomy', 'Двойная трисомия'),
        ('triploidy', 'Триплоидия'),
    ]

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
    scan_directions = serializers.FileField(required=False)
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
    pass

class FatherSerializerOutput(serializers.ModelSerializer):
    family_member = FamilyMemberSerializerOutput(read_only=True, many=True)

    class Meta:
        model = Father
        fields = ('id', 'family_member', 'test_field')


class MotherSerializerOutput(serializers.ModelSerializer):
    family_member = FamilyMemberSerializerOutput(read_only=True, many=True)

    class Meta:
        model = Mother
        fields = ('id', 'family_member', 'test_field')