from rest_framework import serializers
from .models import Mother
from ..serializer import FamilyMemberSerializerOutput

class MotherSerializerOutput(serializers.ModelSerializer):
    family_member = FamilyMemberSerializerOutput(read_only=True, many=True)

    class Meta:
        model = Mother
        fields = ('id', 'family_member', 'test_field')
