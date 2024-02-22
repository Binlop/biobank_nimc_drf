from rest_framework import serializers
# from individ.serializer import IndividSerializer

class SampleSerializerOutput(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # individ = IndividSerializer(read_only=True)
    name = serializers.CharField(max_length=150)
