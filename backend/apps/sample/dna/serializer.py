from rest_framework import serializers
# from individ.serializer import IndividSerializer

class DNAOutputSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # individ = IndividSerializer(read_only=True)
    name = serializers.CharField(max_length=150)
    barcode = serializers.CharField(max_length=150, required=False)
    volume = serializers.IntegerField(required=False)


class DNAInputSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # individ = IndividSerializer(read_only=True)
    name = serializers.CharField(max_length=150)
    barcode = serializers.CharField(max_length=150, required=False)
    volume = serializers.IntegerField(required=False)