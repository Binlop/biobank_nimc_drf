from rest_framework import serializers
from .models import Father
from ..serializer import FamilyMemberSerializerOutput


class FatherSerializerOutput(serializers.ModelSerializer):
    family_member = FamilyMemberSerializerOutput(read_only=True, many=True)

    class Meta:
        model = Father
        fields = ('id', 'family_member', 'test_field')